const rule = (node) => {
  if (node._isTitle) {
    node._translate = true
  }
}

export default rule