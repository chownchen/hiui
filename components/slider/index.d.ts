import React from "react"

export interface SliderProps {
  type?: 'primary' | 'danger' | 'success' | 'warning'
  defaultValue?: number
  value?: number
  min?: number
  max?: number
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  showRangeLabel?: boolean
  tipFormatter?: (value: number) => JSX.Element
  marks?: {
    [prop: number]: any
  }
  step?: number
  vertical?: boolean
  onChange?: (value: number) => void
}
declare const Slider: React.ComponentType<SliderProps>
export default Slider
