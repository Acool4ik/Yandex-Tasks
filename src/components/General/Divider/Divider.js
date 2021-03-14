import styles from './Divider.module.css'


export const Divider = (style) => {
    const {divider} = styles

    return `<div class="${divider}" style="${style || ''}"></div>`
}