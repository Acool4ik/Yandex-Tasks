import styles from './LeadersItem.module.css'
import {PeopleCard} from '../../General/PeopleCard/PeopleCard'
import {BarChart} from '../../General/BarChart/BarChart'


export const LeadersItem = (props) => {
    const {leadersItem, leadersInnerComponent} = styles

  
    const innerBarChartProps = (props, className) => {
        const additionalPeople = `
            ${PeopleCard(props)}
            <span class="fontHeadline ${className}" style="padding-top: 0px;">${props.place}</span>
        `

        const innerElement = () => (`
            <span class="fontHeadline ${className}">${props.place}</span>
            ${(props.isVertical && props.place === 1) ? additionalPeople.replace(/\s\s+/g, "") : ''}
        `)

        let maxHeight = props.isVertical ? 325 : 108
        let stepHeight = props.isVertical ? 50 : 20
        let currentHeight = 0

        if(window.innerWidth > 800) {
            maxHeight = maxHeight * 2 + 25
            stepHeight = stepHeight * 2 + 25
        } 

        if(props.place % 2 === 0) currentHeight = props.isVertical 
            ? maxHeight - stepHeight * (props.place - 1)
            : maxHeight - stepHeight * (props.place / 2)
        else currentHeight = props.isVertical 
            ? maxHeight - stepHeight * (props.place - 1)
            : maxHeight - stepHeight * ((props.place - 1) / 2)


        return {...props, innerElement: innerElement(), style: `height:${currentHeight}px`}
    }


    const generateStylesDependingOnPlace = ({place}) => {
        const maxCount = 100
        const step = 16
        let dinamicStyles = {left: 0, right: 0}

        if(place % 2 === 0) dinamicStyles = {
            ...dinamicStyles,
            right: (place / 2) * step,
        }

        if(place % 2 === 1) dinamicStyles = {
            ...dinamicStyles, 
            left: ((place - 1) / 2) * step
        }

        const defaultStyles = `
            z-index:${maxCount - place};
            ${dinamicStyles.left ? `left:${dinamicStyles.left}px` : ''};
            ${dinamicStyles.right ? `right:${dinamicStyles.right}px` : ''};
        `
  
        return defaultStyles.replace(/\s\s+/g, "");
    } 

    
    return `
    <div class="${leadersItem}" style="${generateStylesDependingOnPlace({...props})}">
        ${PeopleCard(props)}
        ${BarChart(innerBarChartProps(props, leadersInnerComponent))}
    </div>
    `
}




