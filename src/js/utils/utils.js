export default function addElement(element, parent, className, id, text, ...dataArr) {
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

function clearMarkup() {
  const body = document.querySelector('body');
  const {children} = body;
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].tagName.toLowerCase() !== 'script'){
        body.removeChild(children[i]);
        i -=1;
    }
  }
}

export { clearMarkup };