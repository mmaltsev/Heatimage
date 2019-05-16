import { HeatData } from './types'

export function saveAsJSON(data: number[][]) {
  let heatData: HeatData[] = []
  for (let element of data) {
    heatData.push({ x: element[0], y: element[1], value: element[2] })
  }
  downloadJSON(heatData, 'heatpath.json', 'application/json')
}

function downloadJSON(data: HeatData[], fileName: string, contentType: string) {
  let txtData = JSON.stringify(data)
  let a = document.createElement('a')
  a.id = 'downloadJSON'
  let file = new Blob([txtData], {type: contentType})
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

export function saveAsPNG(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  if (canvas.width > 0) {
    let image = canvasToPng(img, canvas)
    let a = document.createElement('a')
    a.href = image
    a.download = 'heat_image.png'
    a.click()
  } else {
    alert('Nothing to save!')
  }
}

export function canvasToPng(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  let heatCanvas = document.createElement('canvas')
  heatCanvas.width = img.width
  heatCanvas.height = img.height
  let heatCanvasContext = heatCanvas.getContext('2d')
  console.log('img', img, 'canvas', canvas)
  heatCanvasContext.drawImage(img, 0, 0)
  heatCanvasContext.drawImage(canvas, 0, 0)
  return heatCanvas.toDataURL('image/png')
}
