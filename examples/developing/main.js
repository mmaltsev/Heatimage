let element = document.querySelector('#heatimage')

let heatOptions = {
  heatValue: 0.05,
  heatRadius: 15,
  heatBlur: 25,
  colorGradient: 'Incandescent',
  exporting: true,
  edit: true,
  keys: true,
  defaultData: [
    {x: 375, y: 84, value: 0.05},
    {x: 377, y: 84, value: 0.05},
    {x: 379, y: 88, value: 0.05}
  ],
}

Heatimage.heatimage(element, heatOptions)
