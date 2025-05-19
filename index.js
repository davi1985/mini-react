import { MiniReact } from './mini-react.js'
const { createElement, render, useState } = MiniReact

const Counter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount(count + 1)
  const handleDecrement = () => setCount(count - 1)

  return createElement(
    'div',
    { className: 'container' },
    createElement('h1', null, `Count: ${count}`),
    createElement('button', { onclick: handleIncrement }, 'Increment'),
    createElement('button', { onclick: handleDecrement }, 'Decrement')
  )
}

const App = () =>
  createElement(
    'div',
    { style: 'text-align: center;' },
    createElement('h1', null, 'MiniReact'),
    createElement(
      'p',
      {
        style: 'margin-bottom: 16px',
      },
      'This is a simplified React clone.'
    ),
    createElement('br', null),
    createElement(Counter, null)
  )

const rootElement = document.getElementById('root')
render(App(), rootElement)
