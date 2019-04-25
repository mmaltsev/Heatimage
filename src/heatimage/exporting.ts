import { JSONData } from './types'

export function saveAsJSON(data: number[][]) {
  let jsonData: JSONData[] = []
  for (let element of data) {
    jsonData.push({ x: element[0], y: element[1], value: element[2] })
  }
  download(jsonData, 'heatpath.json', 'application/json')
}

function download(data: JSONData[], fileName: string, contentType: string) {
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
    let heatCanvas = document.createElement('canvas')
    heatCanvas.width = img.width
    heatCanvas.height = img.height
    let heatCanvasContext = heatCanvas.getContext('2d')
    heatCanvasContext.drawImage(img, 0, 0)
    heatCanvasContext.drawImage(canvas, 0, 0)
    let image = heatCanvas.toDataURL('image/png')
    let a = document.createElement('a')
    a.href = image
    a.download = 'heat_image.png'
    a.click()
  } else {
    alert('Nothing to save!')
  }
}
