import styles from './Diagram.module.css'
import {CategoriesItem} from './CategoriesItem/CategoriesItem'
import {CirclePlotDark} from './static/CirclePlotDark.js'
import {CirclePlotLight} from './static/CirclePlotLight.js'


export const Diagram = (props) => {
    const {categories, totalText, differenceText, isVertical, isThemeDark} = props
    const {diagramContainer, circlePlotContainer, categoriesContainer,
        firstPlaceColor, 
        secondPlaceColor, 
        thirdPlaceColor, 
        fourthPlaceColor
    } =  styles

    const colors = [firstPlaceColor, secondPlaceColor, thirdPlaceColor, fourthPlaceColor]
    const {stylesDiagramContainer, stylesCirclePlotContainer, fontColor} = getStyles(isVertical, isThemeDark)

    const circlePlotSize = () => {
        let size = isVertical ? 328 : 240
        if(window.innerWidth > 900) size = size * 1.3 + window.innerWidth * 0.05

        if(window.innerWidth < 400) size -= window.innerWidth * 0.25
        return size
    }


    return `
    <section class="${diagramContainer}" style="${stylesDiagramContainer}">
        <div class="${circlePlotContainer}" style="${stylesCirclePlotContainer}">
            ${isThemeDark ? CirclePlotDark(circlePlotSize()) : CirclePlotLight(circlePlotSize())}
            <div style="width: ${circlePlotSize() * 0.5}px;">
                <p class="fontSubhead" style="${fontColor}">${totalText}</p>
                <p class="fontBody grayText">${differenceText}</p>
            </div>
        </div>

        <ul class="${categoriesContainer}" style="${isVertical ? 'flex-grow: 0;' : ''}">
            ${categories
                .map((category, number) => CategoriesItem({
                    ...category, 
                    isThemeDark,
                    isLast: number === categories.length - 1,
                    styleBackgroundColor: colors[number]
                }))
                .join('')
            }
        </ul>
    </section>
    `.replace(/\s\s+/g, "")
}


// private module for the component
function getStyles(isVertical, isThemeDark) {
    const stylesDiagramContainer = isVertical 
        ? `
            margin-top: 32px; 
            margin-bottom: 24px; 
            flex-direction: column; 
            justify-content: space-between;
            align-items: stretch;
        `.replace(/\s\s+/g, "")
        : ''

    const stylesCirclePlotContainer = isVertical
        ? `
            margin-right: 0px; 
            display: flex; 
            flex-direction: column; 
            justify-content: center;
        `.replace(/\s\s+/g, "")
        : ''

    const fontColor = isThemeDark 
        ? 'color: var(--white-color) !important;'
        : 'color: var(--black-color) !important;'

    return {stylesDiagramContainer, stylesCirclePlotContainer, fontColor}
}