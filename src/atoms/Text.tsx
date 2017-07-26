import { createBox, BoxProps } from './Box'
import { Style } from '../types/style'
import { withStyle } from './style'

export type TextProps = React.HTMLProps<HTMLSpanElement> & {
    align?: 'left' | 'right' | 'center' | 'justify',
    bold?: boolean,
    italic?: boolean, 
    color?: string,
    decoration?: 'none' | 'underline' | 'line-through',
    fontFamily?: string,
    lineHeight?: number,
    size?: number,
}


export function createTextComponent<Props extends object>(
    withStyles?: (props: TextProps & BoxProps & Props) => Style
) {
    return createBox<TextProps & Props>('span', (props: any) => {
        const {
            align,
            bold,
            color,
            decoration,
            fontFamily,
            italic, 
            lineHeight,
            size = 0,
            css,
            ...restProps,
        } = props

        const addedStyles = withStyles ? withStyles(props) : {}
        
        return {
            css: withStyle(addedStyles, css, theme => ({
                color: color || theme.text.color,
                fontFamily,
                ...(align ? { textAlign: align } : null), 
                ...(bold ? { fontWeight: 'bold' } : null),
                ...(decoration ? { textDecoration: decoration } : null),
                ...(italic ? { fontStyle: 'italic' } : null),
                ...(lineHeight ? { lineHeight } : null),
                fontSize: size
            })),
            emulateReactNative: false,
            ...restProps
        }
    })
}


export default createTextComponent()
