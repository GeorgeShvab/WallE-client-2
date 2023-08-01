import { FC, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react'

interface Props {
  placeholder?: string
  autoFocus?: boolean
  onChange?: (param: string[]) => void
}

const ItemsInput: FC<Props> = ({ placeholder, autoFocus, onChange }) => {
  const [value, setValue] = useState<string>('')

  const [items, setItems] = useState<string[]>([])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value[value.length - 1] === ' ' && !items.find((item) => value.trim() === item)) {
      setItems((prev) => [...prev, value.trim()])
      setValue('')
    } else {
      setValue(value)
    }
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Backspace' && !e.currentTarget.value) {
      setValue(items[items.length - 1])
      setItems((prev) => prev.slice(0, prev.length - 1))
    }
  }

  useEffect(() => {
    onChange && onChange(items)
  }, [items])

  return (
    <div className="flex flex-wrap break-all">
      {items.map((item) => (
        <span key={item} className="mr-1.5 py-1 px-2 bg-neutral-100 rounded text-sm mb-2 break-all">
          {item}
        </span>
      ))}
      <input
        className="outline-none border-none text-sm h-[28px]"
        placeholder={placeholder || ''}
        type="text"
        value={value}
        onInput={handleInput}
        onKeyUp={handleKey}
        autoFocus={autoFocus}
      />
    </div>
  )
}

export default ItemsInput
