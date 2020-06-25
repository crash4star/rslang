function addElement(element, parent, className, id, text, ...dataArr) {
    const el = document.createElement(element);
    if (parent) parent.appendChild(el);
    if (className) el.className = className;
    if (id || id === 0) el.id = id;
    if (text) el.innerHTML = text;
    if (dataArr.length) {
      dataArr.forEach(([attributeName, attributeValue]) => {
        el.setAttribute(attributeName, attributeValue);
      });
    }
    return el;
}

export { addElement };
  