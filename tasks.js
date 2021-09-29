// Brackets

function bracketsValidator(sample) {
  const patterns = [
    ['[', ']'],
    ['{', '}'],
    ['(', ')'],
  ]
  const stack = []
  const sampleArray = sample.split('')

  sampleArray.forEach(char => {
    patterns.forEach(pattern => {
      const [open, close] = pattern
      if (char === open) {
        stack.push(close)
      }
      if (char === close) {
        if (char === stack[stack.length - 1]) {
          stack.pop()
        } else {
          stack.push(char)
        }
      }
    })
  })
  return stack.length ? false : true
}

// Lodash get

function get(obj, path, defaultValue = undefined) {
  const pathArray = Array.isArray(path)
    ? path
    : path.split('.').reduce((acc, curr) => acc = [...acc, ...curr.replace(']', '').split('[')], [])
  let result = obj;

  pathArray.forEach(item => {
    if (!result) return
    if (Array.isArray(result)) {
      result = result[+item]
    } else {
      result = result[item]
    }
  })
  return result ? result : defaultValue
}
