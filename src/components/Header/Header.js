import styles from './Header.module.css'


export const Header = (props) => {
    const {isVertical, title, subtitle} = props
    const {header, headerHorisontal, headerVerticle} = styles

    
    return `
    <header class="${header} ${isVertical ? headerVerticle : headerHorisontal}">
        <h5 class="fontHeadline">${title}</h5>
        <p class="fontBody grayText">${subtitle}</p>
    </header>
    `
}