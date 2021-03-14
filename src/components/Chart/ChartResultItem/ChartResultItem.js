import styles from './ChartResultItem.module.css'
import {BarChart} from '../../General/BarChart/BarChart'


export const ChartResultItem = (props) => {
    const {title, value, maxValue, isVertical, isThemeDark} = props
    const {peopleItem, valueStyle, titleStyle} = styles

    const isFirstPlace = value === maxValue
    const minHeight = 8
    const heightLayoutDivCountCommits = isVertical ? 1.483 : 0.642
    let height = value === 0 ? minHeight : value * heightLayoutDivCountCommits
    if(height > 180) height = 180 * value / maxValue

    let height70present = 0

    if(isFirstPlace) 
    {
        height70present = height / 0.7 - height - 21.7
    }


    const innerBarChartProps = () => {
        const place = isFirstPlace ? 1 : 100
        

        const dinamicStyles = `
            height: ${height}px; 
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
        `

        return {place, style: dinamicStyles.replace(/\s\s+/g, "")}
    }

    const colorTextDependTheme = isThemeDark 
        ? 'color: var(--white-color) !important' 
        : 'color: var(--black-color) !important;'  


    return `
    <div class="${peopleItem}" style="padding-top: ${height70present}px">
        ${
            value !== 0 
            ? 
            `<div class="${valueStyle} fontSubhead ${!isFirstPlace ? 'grayText' : ''}" 
                style="${colorTextDependTheme}"
            >
                ${value}
            </div>`
            : ''
        }
        ${BarChart(innerBarChartProps())}
        <div class="${titleStyle} fontBody grayText">${title}</div>
    </div>
    `
}