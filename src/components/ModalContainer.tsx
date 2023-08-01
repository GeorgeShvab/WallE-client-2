import { FC, ReactElement } from 'react'

const ModalContainer: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <div className="bg-white rounded overflow-hidden shadow md:w-full md:min-w-[420px] max-w-[500px] w-[95vw] px-5 md:px-8 py-5 md:py-6">
      {children}
    </div>
  )
}

export default ModalContainer
