export const createEl = (elType, textVal, parent, cls, className) => {
  elType.innerText = textVal;
  elType.setAttribute(cls, className);
  parent.appendChild(elType);
};

export const removeEl = (el, parent) => {
  if (el) {
    parent.removeChild(el);
  }
};
