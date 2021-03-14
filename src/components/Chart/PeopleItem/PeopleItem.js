import styles from './PeopleItem.module.css'
import {ChartPeopleCart} from '../../General/ChartPeopleCard/ChartPeopleCard'
import {Divider} from '../../General/Divider/Divider'


export const PeopleItem = (props) => {
    const {peopleItem} = styles

    const generateStyleForChartPeopleCart = () => {
        let inlineStyle = !props.isVertical 
            ? 'height: 40px; width: 2px;' 
            : ''
 
        if(props.isThemeDark) inlineStyle += 'background-color: var(--grey-color);'
        
        return inlineStyle
    }
    

        
    return `
    <li class="${peopleItem}">
        ${ChartPeopleCart(props)}
    </li>
    ${!props.isLast ? Divider(generateStyleForChartPeopleCart()) : ''}
    `.replace(/\s\s+/g, "")
}