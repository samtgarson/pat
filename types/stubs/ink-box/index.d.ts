declare module 'ink-box' {
  import { FunctionComponent, ReactElement, Component } from "react"

  class Box extends Component<BoxProps> {}

  type BorderStyle = 'single' | 'double' | 'round' | 'singleDouble' | 'doubleSingle' | 'classic'
  type BorderDefinition = {
    topLeft: string
    topRight: string
    bottomLeft: string
    bottomRight: string
    horizontal: string
    vertical: string
  }

  type SpacingDefinition = {
    top: string
    right: string
    bottom: string
    left: string
  }

  interface BoxProps {
    children: ReactElement | ReactElement[] | Text
    borderColor?: string
    borderStyle?: BorderStyle | BorderDefinition
    dimBorder?: boolean
    padding?: number | SpacingDefinition
    margin?: number | SpacingDefinition
    float?: 'right' | 'left' | 'center'
    backgroundColor?: string
    align?: 'right' | 'left' | 'center'
  }

  export default Box
}
