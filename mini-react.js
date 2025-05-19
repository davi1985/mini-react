let hookStates = []
let currentHook = 0
let rerenderFn = null

/**
 * A simplified version of React's useState hook.
 *
 * Stores state values in an internal array based on the current hook index.
 * Each call to useState retrieves or initializes a value at a specific position.
 *
 * When setState is called, it updates the value and triggers a re-render.
 *
 * @template T
 * @param {T} initialValue - The initial value of the state.
 * @returns {[T, (newValue: T) => void]} - A stateful value and a function to update it.
 */
const useState = (initialValue) => {
  const hookIndex = currentHook

  if (hookStates[hookIndex] === undefined) {
    hookStates[hookIndex] = initialValue
  }

  const setState = (newValue) => {
    hookStates[hookIndex] = newValue
    currentHook = 0
    rerenderFn()
  }

  currentHook++

  return [hookStates[hookIndex], setState]
}

/**
 * Creates a virtual DOM element.
 *
 * This function mimics React.createElement. It returns an object
 * that represents a DOM node or a component, including its type,
 * props, and children.
 *
 * Strings and numbers in children are automatically converted
 * to text elements.
 *
 * @param {string | Function} type - The HTML tag name (e.g., 'div') or a functional component.
 * @param {Object} [props] - The props/attributes for the element.
 * @param {...any} children - The child elements or text nodes.
 * @returns {{ type: string | Function, props: { [key: string]: any, children: any[] } }} - A virtual DOM node.
 */
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

/**
 * Creates a virtual text node element.
 *
 * Used to wrap plain strings or numbers into a virtual DOM format
 * so they can be processed like regular elements.
 *
 * @param {string | number} text - The raw text content.
 * @returns {{ type: 'TEXT_ELEMENT', props: { nodeValue: string | number, child: [] } }}
 *   A virtual DOM node representing a text node.
 */
const createTextElement = (text) => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
    child: [],
  },
})

/**
 * Renders a virtual DOM element into a real DOM container.
 *
 * Clears the container, resets the hook index, converts the virtual element
 * to a real DOM node, and appends it. It also stores a reference to the
 * rerender function for use in hooks like useState.
 *
 * @param {Object} element - The virtual DOM element to render.
 * @param {HTMLElement} container - The target DOM node to render into.
 */
const render = (element, container) => {
  container.innerHTML = ''
  currentHook = 0

  const dom = createDom(element)
  container.appendChild(dom)
  rerenderFn = () => render(element, container)
}

/**
 * Converts a virtual DOM element into a real DOM node.
 *
 * If the element is a function (component), it invokes it and processes
 * its returned structure. Otherwise, it creates an HTML or text node,
 * applies props, and recursively appends children.
 *
 * @param {Object} element - The virtual DOM element.
 * @returns {Node} - A real DOM node.
 */
const createDom = (element) => {
  if (typeof element.type === 'function') {
    const component = element.type
    const childElement = component(element.props || {})
    return createDom(childElement)
  }

  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type)

  Object.entries(element.props || {}).forEach(([name, value]) => {
    if (name !== 'children') {
      dom[name] = value
    }
  })
  ;(element.props.children || []).forEach((child) =>
    dom.appendChild(createDom(child))
  )

  return dom
}

export const MiniReact = { createElement, render, useState }
