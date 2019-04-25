let element = document.querySelector('#heatimage')

let heatOptions = {
  heatValue: 0.05,
  heatRadius: 35,
  heatBlur: 25,
  colorGradient: 'Visible Spectrum',
  exporting: true,
  edit: true,
  keys: false
}

HeatImage.heatimage(element, heatOptions)
