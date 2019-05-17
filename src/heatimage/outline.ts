export function canvasWrapperStyle(img) {
  return {
    display: 'block',
    marginTop: -img.height + 'px',
    position: 'relative',
    width: img.width + 'px',
    height: img.height + 'px'
  }
}

export function applyStyles(element, styles) {
  for (let attr in styles) {
    if (styles.hasOwnProperty(attr)) {
      element.style[attr] = styles[attr]
    }
  }
}

export const menuStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '5px',
  cursor: 'pointer',
  background: 'rgb(255, 255, 255)',
  border: '2px solid rgba(0,0,0,0.2)',
  borderRadius: '5px'
}

export const menuExpandedStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'rgb(255, 255, 255)',
  border: '2px solid rgba(0,0,0,0.2)',
  borderRadius: '5px',
  display: 'none',
}

export const menuExpandedInnerHTML = '<style>.heatimage-menu-element { display: block;' +
  ' cursor: pointer; padding: 7px; font-size: 14px; } .heatimage-menu-element:hover' +
  ' { background-color: #f0f0f0; }</style><span class="heatimage-menu-element"' +
  ' id="heatimageSaveAsPNG">Save as PNG</span><span class="heatimage-menu-element"' +
  ' id="heatimageSaveAsJSON">Save as JSON</span>'

export const menuInnerHTML = '<svg class="feather-menu" xmlns="http://www.w3.org/2000/svg"' +
  ' stroke-width="3" width="20" height="20" viewBox="0 0 24 24" fill="none"' +
  ' stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
  ' data-reactid="791"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21"' +
  ' y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>'
