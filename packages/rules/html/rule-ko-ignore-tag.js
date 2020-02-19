const rule = (node) => {
  if (node._isTitle) {
    node._translated = true
  }
}

export default rule