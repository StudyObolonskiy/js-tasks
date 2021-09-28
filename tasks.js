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
