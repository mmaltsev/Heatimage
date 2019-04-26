let element = document.querySelector('#heatimage')

let heatOptions = {
  heatValue: 0.05,
  heatRadius: 15,
  heatBlur: 25,
  colorGradient: 'Incandescent',
  exporting: true,
  edit: true,
  keys: true
}

Heatimage.heatimage(element, heatOptions)
