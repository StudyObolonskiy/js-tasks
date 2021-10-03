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
