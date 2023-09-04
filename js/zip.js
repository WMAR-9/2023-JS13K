const string2Array = (str, color_bit = 4) =>
  [...str].flatMap(e => {
    let temp = e.codePointAt(0)
    const result = []
    const color_space = (2 ** color_bit) - 1

    while (temp) {
      result.push(temp & color_space)
      temp >>= color_bit
    }
    return result
})