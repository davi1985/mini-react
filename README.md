# MiniReact — A Simple React Clone for Learning

This project is a minimal and simplified version of React built from scratch, created for learning and experimentation purposes.

It supports:

- `createElement` to create elements
- `useState` hook to manage state
- Rendering components and text nodes
- Basic event handling (e.g., button clicks)

---

## How It Works

- `createElement(type, props, ...children)` builds a virtual DOM object.
- `render(element, container)` renders the virtual DOM into the actual DOM.
- `useState(initialValue)` provides a simple way to add state and update the UI.

---

## Usage

1. Clone this repository.

2. Open `index.html` in your browser.

3. See the MiniReact app running — you can interact with buttons that update state using `useState`.

---

## Project Structure

- `index.html` — main HTML file, includes script and styles
- `miniReact.js` — core MiniReact implementation (createElement, render, useState)
- `styles.css` — styles inspired by React official docs
