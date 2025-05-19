const createElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children
      .flat()
      .map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
  },
})

const createTextElement = (text) => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
    child: [],
  },
})

const render = (element, container) => {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  Object.entries(element.props || {}).forEach(([name, value]) => {
    if (name !== 'children') {
      dom[name] = value
    }
  })
  ;(element.props.children || []).forEach((child) => {
    render(child, dom)
  })

  container.appendChild(dom)
}

export const MiniReact = { createElement, render }
