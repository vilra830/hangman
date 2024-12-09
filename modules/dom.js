export const createEl = (elType, textVal, parent, cls, className) => {
  const el = document.createElement(elType); //for example "p"
  el.innerText = textVal;
  el.setAttribute(cls, className);
  parent.appendChild(el);
};

export const removeEl = (el, parent) => {
  if (el) {
    parent.removeChild(el);
  }
};
