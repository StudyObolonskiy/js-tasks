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
        stack.push(open)
      }
      if (char === close) {
        if (open === stack[stack.length - 1]) {
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

// (2).plus(3).minus(1) => 4.

Number.prototype.plus = function(num) {
  return this + num
}
Number.prototype.minus = function(num) {
  return this - num
}

// createStore

function createStore(reducer, initialState) {
  let state = initialState
  const subscribers = []
  return {
    dispatch: (action) => {
      state = reducer(state, action)
      subscribers.forEach(item => item(state))
    },
    getState: () => {
      return state
    },
    subscribe : (subscriber) => {
      subscribers.push(subscriber)
    }
  }
}


// subscribers, reducer and actions for testing
// function mySubscriber1(state) {
//   console.log('work', state);
// }

// function mySubscriber2(state) {
//   console.log('work2', state);
// }

// const add_item = {
//   type: 'ADD_ITEMS',
//   payload: {
//     a: 1,
//     b: 2
//   }
// }

// const add_item2 = {
//   type: 'ADD_ITEMS2',
//   payload: {
//     a: 'a',
//     b: 'b'
//   }
// }

// function myReducer(state, action) {
//   switch(action.type){
//     case 'ADD_ITEMS': 
//       return state = {...state,  some: action.payload}
//     case 'ADD_ITEMS2':
//       return state = {...state, some2: action.payload}
//     default: 
//       return state
//   }
// }

// range date

function getRanges(range, date) {
  const dataDate = new Date(date)
  const newRanges = range.map(item => {
    const [first, second] =  item.split('-')
    if(new Date(first) <= dataDate && dataDate <= new Date(second)) {
      return `${first}-${dataDate.toISOString().slice(0, 10).replace(/-/g, '/')}, ${date}-${second}`.split(',')
    }
    return item
  }).flat()
  if (newRanges.length === range.length) throw new Error('This date is not in the range')
  return newRanges
}

// debounce

function debounce(f, ms) {
  let timeout = false
  return function() {
    if (timeout) return
    f.apply(this, arguments)
    timeout = true
    setTimeout(() => timeout = false, ms)
  }
}

// test
// const f = debounce(console.log, 1000);

// f(1);
// f(2);
// setTimeout( () => f(3), 100);
// setTimeout( () => f(4), 1100);
// setTimeout( () => f(5), 1500);
