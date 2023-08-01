function debounce(fn: (...arg: any) => void, ms: number = 250) {
  let time: number

  return function (this: any, ...args: any) {
    clearTimeout(time)

    time = setTimeout(() => {
      fn.apply(this, args)
    }, ms)
  }
}

export default debounce
