import { saveAsJSON, saveAsPNG } from './exporting'
import { applyStyles, canvasWrapperStyle, menuExpandedInnerHTML,
  menuExpandedStyle, menuInnerHTML, menuStyle } from './interface'
import * as simpleheat from './simpleheat.js'
import { ColorGradients, HeatOptions } from './types'

// Global variables.
let isDraw: boolean
let heat
let canceled: number[][]
let canceledMoves: number[]
let value: number
let canvas: HTMLCanvasElement
let data: number[][] = []
let lastMoves: number[] = []

export function heatimage(img: HTMLImageElement, heatOptions: HeatOptions) {
  // Catching missing of image reference.
  if (img) {
    let { heatValue, colorGradient, heatRadius, heatBlur, exporting, edit, keys} = heatOptions
    value = heatValue
    // Waiting for image to load, checking every 0.1 sec.
    let interval = setInterval(() => {
      if (img.complete) {
        clearInterval(interval)
        onImageLoad(img, colorGradient, heatRadius, heatBlur, exporting, edit)
      }
    }, 100)

    if (edit) {
      document.addEventListener('mousedown', mouseDown)
      document.addEventListener('mouseup', mouseUp)
      document.addEventListener('mousemove', mouseMove)
      if (keys) {
        document.onkeydown = keyPress
      }
    }
  } else {
    console.error('Heatimage Error: No image specified')
  }
}

function onImageLoad(img: HTMLImageElement, colorGradient: ColorGradients,
  heatRadius: number, heatBlur: number, exporting: boolean, edit: boolean) {
  let canvasWrapper = generateCanvas(img, edit)
  // Initializing simpleheat object.
  heat = simpleheat(canvas, colorGradient)
  heat.radius(heatRadius, heatBlur)
  if (exporting) {
    menuOutline(img, canvasWrapper)
  }
}

function generateCanvas(img: HTMLImageElement, edit: boolean) {
  let canvasWrapper: HTMLDivElement = document.createElement('div')
  canvas = document.createElement('canvas')
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
function mouseDown(event) {
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

function mouseUp(event) {
  isDraw = false
}

function mouseMove(event) {
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

function keyPress(e) {
  let evtobj = window.event ? event : e
  if (evtobj.ctrlKey && evtobj.keyCode === 90 && lastMoves.length > 0) {
    isDraw = false
    let lastMovesNum = lastMoves.pop()
    canceledMoves.push(lastMovesNum)
    for (let i = 0; i < lastMovesNum; i++) {
      canceled.push(data.pop())
    }
    heat.data(data)
    heat.draw()
  } else if (evtobj.ctrlKey && evtobj.keyCode === 89  && canceledMoves.length > 0) {
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
