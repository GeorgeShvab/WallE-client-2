function throttle(fn: (...args: any[]) => void, ms: number = 250) {
  let throttled: boolean = false

  let savedArgs: any
  let savedThis: any

  return function (this: any, ...args: any[]) {
    if (throttled) {
      savedArgs = args
      savedThis = this

      return
    }

    throttled = true

    fn.apply(this, args)

    setTimeout(() => {
      throttled = false

      if (savedArgs) {
        fn.apply(savedThis, savedArgs)

        throttled = true
        savedArgs = undefined
        savedThis = undefined
      }

      setTimeout(() => {
        throttled = false
      }, ms)
    }, ms)
  }
}

export default throttle
