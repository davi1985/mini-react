import { MiniReact } from './mini-react.js'

const App = () =>
  MiniReact.createElement(
    'div',
    {},
    MiniReact.createElement('h1', null, 'Hello MiniReact'),
    MiniReact.createElement('p', null, 'This is a simplified React clone.')
  )

const rootElement = document.getElementById('root')
MiniReact.render(App(), rootElement)
