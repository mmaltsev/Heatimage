export interface HeatOptions {
  heatValue: number
  heatRadius: number
  heatBlur: number
  colorGradient: ColorGradientName,
  exporting: boolean
  edit: boolean
  keys: boolean
  displayCanvas: boolean
  defaultData: HeatData[]
}

export type ColorGradientName = 'Black Aqua White' | 'Blue Red' | 'Dark Green' | 'Deep Sea' |
  'Color Spectrum' | 'Incandescent' | 'Heated Metal' | 'Sunrise' | 'Stepped Colors' |
  'Visible Spectrum'

export interface HeatData {
  x: number
  y: number
  value: number
}

type ColorGradients = {
  [key in ColorGradientName]: {
    [key: number]: string
  }
}

export interface Simpleheat {
  _canvas: HTMLCanvasElement
  _circle: HTMLCanvasElement
  _ctx: CanvasRenderingContext2D
  _data: number[][]
  _defaultGradientName: ColorGradientName
  _height: number
  _max: number
  _r: number
  _width: number
  defaultRadius: number
  defaultGradientName: ColorGradientName
  defaultGradients: ColorGradients
  data: (data: number[][]) => this
  max: (max: number) => this
  add: (point: HeatData) => this
  clear: () => this
  radius: (r: number, blur: number) => this
  resize: () => any
  gradient: (grad: ColorGradients) => this
  draw: (minOpacity?: number) => this
  _colorize: (pixels: Uint8ClampedArray, gradient: Uint8ClampedArray) => any
  _createCanvas: () => HTMLCanvasElement
}
