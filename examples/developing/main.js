let element = document.querySelector('#heatimage')

let heatOptions = {
  heatValue: 0.05,
  heatRadius: 15,
  heatBlur: 25,
  colorGradient: 'Incandescent',
  exporting: true,
  edit: true,
  keys: true,
  defaultData: [{"x":375,"y":84,"value":0.05},{"x":377,"y":84,"value":0.05},{"x":379,"y":88,"value":0.05},{"x":831,"y":375,"value":0.05},{"x":832,"y":375,"value":0.05},{"x":833,"y":375,"value":0.05},{"x":834,"y":376,"value":0.05},{"x":836,"y":376,"value":0.05},{"x":838,"y":376,"value":0.05},{"x":840,"y":376,"value":0.05},{"x":842,"y":376,"value":0.05},{"x":843,"y":376,"value":0.05},{"x":844,"y":376,"value":0.05},{"x":845,"y":376,"value":0.05},{"x":848,"y":378,"value":0.05},{"x":849,"y":378,"value":0.05},{"x":852,"y":380,"value":0.05},{"x":853,"y":380,"value":0.05},{"x":855,"y":380,"value":0.05},{"x":855,"y":382,"value":0.05},{"x":856,"y":382,"value":0.05},{"x":857,"y":384,"value":0.05},{"x":858,"y":386,"value":0.05},{"x":858,"y":388,"value":0.05},{"x":858,"y":389,"value":0.05},{"x":858,"y":390,"value":0.05},{"x":857,"y":391,"value":0.05},{"x":857,"y":392,"value":0.05},{"x":856,"y":393,"value":0.05},{"x":855,"y":394,"value":0.05},{"x":854,"y":395,"value":0.05},{"x":853,"y":395,"value":0.05},{"x":852,"y":394,"value":0.05},{"x":852,"y":393,"value":0.05},{"x":852,"y":392,"value":0.05},{"x":852,"y":390,"value":0.05},{"x":853,"y":389,"value":0.05},{"x":854,"y":387,"value":0.05},{"x":855,"y":385,"value":0.05},{"x":856,"y":385,"value":0.05},{"x":856,"y":383,"value":0.05},{"x":857,"y":383,"value":0.05},{"x":858,"y":383,"value":0.05},{"x":859,"y":382,"value":0.05},{"x":860,"y":381,"value":0.05},{"x":862,"y":379,"value":0.05},{"x":864,"y":379,"value":0.05},{"x":866,"y":377,"value":0.05},{"x":868,"y":375,"value":0.05},{"x":871,"y":374,"value":0.05},{"x":872,"y":373,"value":0.05},{"x":875,"y":372,"value":0.05}],
}

let heatimage = Heatimage.heatimage(element, heatOptions)
