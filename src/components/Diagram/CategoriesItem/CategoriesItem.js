import styles from './CategoriesItem.module.css'
import {Divider} from '../../General/Divider/Divider'


export const CategoriesItem = (props) => {
    const {title, valueText, differenceText, isThemeDark, isLast, styleBackgroundColor} = props
    const {categoriesItem} = styles

    const parseNumberHandler = text => text.split(' ')[0].trim(' ')


    const stylesDivider = isThemeDark 
        ? 'background-color: var(--grey-color);' 
        : ''
    const stylesTitle = isThemeDark 
        ? 'color: var(--white-color) !important;'
        : 'color: var(--black-color) !important;'


    return `
    <li class="${categoriesItem}">
        <div>
            <span class="${styleBackgroundColor}"></span>
            <p class="fontBody" style="${stylesTitle}">${title}</p>
        </div>

        <div>
            <span class="fontBody grayText">${parseNumberHandler(differenceText)}</span>
            <span class="fontBody grayText">${parseNumberHandler(valueText)}</span>
        </div>
    </li>
    ${!isLast ? Divider(stylesDivider) : ''}
    `.replace(/\s\s+/g, "")
}