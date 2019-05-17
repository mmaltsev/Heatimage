import { canvasToPng, saveAsJSON, saveAsPNG } from './exporting'
import { applyStyles, canvasWrapperStyle, menuExpandedInnerHTML,
  menuExpandedStyle, menuInnerHTML, menuStyle } from './outline'
import { gradientPalettes } from './palettes'
import * as simpleheat from './simpleheat.js'
import { ColorGradientName, HeatData, HeatOptions, Simpleheat } from './types'

// Global variables.
let isDraw: boolean
let heat: Simpleheat
let canceled: number[][]
let canceledMoves: number[]
let value: number
let canvas: HTMLCanvasElement
let data: number[][] = []
let lastMoves: number[] = []

export function heatimage(img: HTMLImageElement, heatOptions: HeatOptions) {
  // Catching missing of image reference.
  if (img) {
    let { heatValue, heatRadius, heatBlur, colorGradient, exporting,
      edit, keys, displayCanvas, defaultData} = heatOptions
    value = heatValue
    if (edit) {
      document.addEventListener('mousedown', mouseDown)
      document.addEventListener('mouseup', mouseUp)
      document.addEventListener('mousemove', mouseMove)
      if (keys) {
        document.onkeydown = keyPress
      }
    }
    onImageLoad(img, colorGradient, heatRadius, heatBlur, exporting, edit, displayCanvas,
      defaultData)
    return exportHeatimage(img)
  } else {
    console.error('Heatimage Error: No image specified')
  }
  return undefined
}

function exportHeatimage(img) {
  let exportImg = document.createElement('img')
  exportImg.src = canvasToPng(img, canvas)
  return exportImg
}

function onImageLoad(img: HTMLImageElement, colorGradient: ColorGradientName, heatRadius: number,
  heatBlur: number, exporting: boolean, edit: boolean, displayCanvas: boolean,
  defaultData: HeatData[]) {
  let canvasWrapper = generateCanvas(img, edit, displayCanvas)
  // Initializing simpleheat object.
  heat = simpleheat(canvas, gradientPalettes, colorGradient)
  heat.radius(heatRadius, heatBlur)
  if (defaultData) {
    data = heatDataValues(defaultData)
    heat.data(data)
    heat.draw()
  }
  if (exporting) {
    menuOutline(img, canvasWrapper)
  }
}

function generateCanvas(img: HTMLImageElement, edit: boolean, displayCanvas: boolean) {
  let canvasWrapper: HTMLDivElement = document.createElement('div')
  canvas = document.createElement('canvas')
  canvas.style.display = displayCanvas ? 'initial' : 'none'
  canvasWrapper.appendChild(canvas)
  img.parentNode.insertBefore(canvasWrapper, img.nextSibling)
  applyStyles(canvasWrapper, canvasWrapperStyle(img))
  canvas.width = img.width
  canvas.height = img.height
  canvas.style.cursor = edit ? 'crosshair' : 'default'
  img.style.userSelect = 'none'
  return canvasWrapper
}

function menuOutline(img: HTMLImageElement, canvasWrapper: HTMLDivElement) {
  let menu = document.createElement('div')
  let menuExpanded = document.createElement('div')
  canvasWrapper.appendChild(menu)
  canvasWrapper.appendChild(menuExpanded)
  menu.innerHTML = menuInnerHTML
  menuExpanded.innerHTML = menuExpandedInnerHTML
  applyStyles(menu, menuStyle)
  applyStyles(menuExpanded, menuExpandedStyle)
  document.querySelector('#heatimageSaveAsJSON')
    .addEventListener('click', () => saveAsJSON(data))
  document.querySelector('#heatimageSaveAsPNG')
    .addEventListener('click', () => saveAsPNG(img, canvas))
  menu.addEventListener('mouseover', () => {
    menu.style.background = 'rgb(247, 247, 247)'
    menuExpanded.style.display = 'initial'
  })
  menuExpanded.addEventListener('mouseleave', () => {
    menu.style.background = 'rgb(255, 255, 255)'
    menuExpanded.style.display = 'none'
  })
}

// Event Listeners.
function mouseDown(event: MouseEvent) {
  let x = event.clientX
  let y = event.clientY
  // Left click on canvas.
  if (isInRange(x,y) && event.button === 0) {
    // Possible right click while left mouse button down.
    isDraw = !isDraw
    lastMoves.push(0)
    canceled = []
    canceledMoves = []
  }
}

function mouseUp(event: MouseEvent) {
  isDraw = false
}

function mouseMove(event: MouseEvent) {
  let x = event.clientX
  let y = event.clientY
  if (isDraw && isInRange(x, y)) {
    data.push([x, y, value])
    heat.clear()
    heat.data(data)
    heat.draw()
    lastMoves[lastMoves.length - 1] ++
  }
}

function keyPress(event: KeyboardEvent) {
  if (event.ctrlKey && event.keyCode === 90 && lastMoves.length > 0) {
    isDraw = false
    let lastMovesNum = lastMoves.pop()
    canceledMoves.push(lastMovesNum)
    for (let i = 0; i < lastMovesNum; i++) {
      canceled.push(data.pop())
    }
    heat.data(data)
    heat.draw()
  } else if (event.ctrlKey && event.keyCode === 89  && canceledMoves.length > 0) {
    isDraw = false
    let canceledMovesNum = canceledMoves.pop()
    lastMoves.push(canceledMovesNum)
    for (let i = 0; i < canceledMovesNum; i++) {
      data.push(canceled.pop())
    }
    heat.data(data)
    heat.draw()
  }
}

// Helpers.
function isInRange(x: number, y: number) {
  return x <= canvas.width && y <= canvas.height
}

function heatDataValues(defaultData: HeatData[]) {
  return defaultData.map(el => Object.keys(el).map(key => el[key]))
}
