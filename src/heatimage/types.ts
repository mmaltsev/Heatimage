export interface HeatOptions {
  heatValue: number
  heatRadius: number
  heatBlur: number
  colorGradient: ColorGradients,
  exporting: boolean
  edit: boolean
  keys: boolean
}

export type ColorGradients = 'Black Aqua White' | 'Blue Red' | 'Dark Green' | 'Deep Sea' |
  'Color Spectrum' | 'Incandescent' | 'Heated Metal' | 'Sunrise' | 'Stepped Colors' |
  'Visible Spectrum'
