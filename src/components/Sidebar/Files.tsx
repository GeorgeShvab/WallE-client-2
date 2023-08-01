import { FC, UIEvent, useState, TouchEvent, useRef } from 'react'
import AddButton from './AddButton'
import Saves from './Saves'
import FileSystem from './FileSystem'
import throttle from '@/utils/throttle'
import Bookmarks from './Bookmarks'

const Files: FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollInterval = useRef<number>()

  const scrollPosition = useRef<'up' | 'down' | null>(null)

  const handleScroll = throttle((e: UIEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).scrollTop > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }, 25)

  const handleTouchEnd = (e: TouchEvent) => {
    clearInterval(scrollInterval.current)

    scrollPosition.current = null
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!scrollContainerRef.current) return

    const scrollContainerPos = scrollContainerRef.current.getBoundingClientRect()

    if (
      e.changedTouches[0].screenY < scrollContainerPos.bottom &&
      e.changedTouches[0].screenY > scrollContainerPos.top &&
      e.changedTouches[0].screenY > scrollContainerPos.bottom - scrollContainerPos.height / 3
    ) {
      if (scrollPosition.current === 'down') return

      clearInterval(scrollInterval.current)

      scrollPosition.current = 'down'

      scrollInterval.current = setInterval(() => {
        scrollContainerRef.current?.scrollBy(0, 5)
      }, 10)
    } else if (
      e.changedTouches[0].screenY > scrollContainerPos.top &&
      e.changedTouches[0].screenY < scrollContainerPos.bottom &&
      e.changedTouches[0].screenY < scrollContainerPos.top + scrollContainerPos.height / 3
    ) {
      if (scrollPosition.current === 'up') return

      clearInterval(scrollInterval.current)

      scrollPosition.current = 'up'

      scrollInterval.current = setInterval(() => {
        scrollContainerRef.current?.scrollBy(0, -5)
      }, 10)
    } else {
      clearInterval(scrollInterval.current)

      scrollPosition.current = null
    }
  }

  return (
    <div
      className={`h-[calc(100vh-124px)] overflow-auto transition-all duration-200 pretty-scrollbar pb-4 ${
        isScrolled ? 'shadow-[inset_0px_5px_5px_-5px_rgba(0,_0,_0,_0.175)]' : ''
      }`}
      onScroll={handleScroll}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      ref={scrollContainerRef}
    >
      <Bookmarks />
      <Saves />
      <div>
        <div className="flex justify-between items-center mb-2 px-4">
          <h3 className="text-sm text-neutral-500 font-medium">Файли</h3>
          <AddButton />
        </div>
        <div className="px-2">
          <FileSystem />
        </div>
      </div>
    </div>
  )
}

export default Files
