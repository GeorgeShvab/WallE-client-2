import { FC, ReactElement, TouchEvent, memo, useRef, useState } from 'react'
import Sidebar from './Sidebar/Index'
import useMe from '@/hooks/useMe'

const Container: FC<{ children: ReactElement }> = memo(({ children }) => {
  return children
})

interface Touches {
  startX?: number
  startY?: number
  endY?: number
  endX?: number
}

const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const { user } = useMe()

  const touches = useRef<Touches>({
    startX: undefined,
    startY: undefined,
    endY: undefined,
    endX: undefined,
  })

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false)

  const handleTouchStart = (e: TouchEvent) => {
    if (touches.current) {
      touches.current.startX = e.changedTouches[0].clientX
      touches.current.startY = e.changedTouches[0].clientY
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (touches.current) {
      touches.current.endX = e.changedTouches[0].clientX
      touches.current.endY = e.changedTouches[0].clientY

      if (touches.current.startY && Math.abs(touches.current.startY - touches.current.endY) > 30) return

      if (touches.current.startX && touches.current.startX + 20 < touches.current.endX) {
        setIsMenuOpened(true)
      } else if (touches.current.startX && touches.current.startX > touches.current.endX + 20) {
        setIsMenuOpened(false)
      }

      touches.current = {}
    }
  }

  return (
    <div className="w-screen md:w-auto" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex w-screen md:w-auto">
        {user && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isMenuOpened ? 'basis-[280px]' : 'basis-0 md:basis-[280px]'
            } grow-[3] shrink-0 md:grow-0`}
          >
            <Container>
              <Sidebar />
            </Container>
          </div>
        )}
        <div className="grow-0 shrink-[3] md:shrink-0 md:grow-[3] overflow-hidden bg-white shadow-[0_0_5px_0_rgba(0,0,0,0.10)]">
          <div className="w-screen md:w-auto">
            <Container>{children}</Container>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
