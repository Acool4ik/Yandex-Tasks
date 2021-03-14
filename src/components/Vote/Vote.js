import styles from './Vote.module.css'

import {PeopleCard} from '../General/PeopleCard/PeopleCard'
import {BarChart} from '../General/BarChart/BarChart'
import {Buttons} from '../General/Buttons/Buttons'

import {hoverButtonHandler} from '../General/Buttons/hoverButtonHandler'
import {hoverUsersWithBarchar, setFocusWithoutRefreshPage} from './hoverUsersWithBarchar'
import {randomKeyGenerator} from '@handlers/randomKeyGenerator.js'



export const Vote = (props) => {
    const {id, elements} = generateVoteElementsAndIdForThem(props)
    const {voteContainerHorisontal, voteContainerVerticle} = styles
    const containerClass = props.isVertical ? voteContainerVerticle : voteContainerHorisontal

    const {IDFirstBtn, IDSecontBtn, IDForUsersWithBarcharElements} = id
    const {btnsElement, usersWithBarcharElements} = elements

    hoverButtonHandler(IDFirstBtn, props.isThemeDark, true)
    hoverButtonHandler(IDSecontBtn, props.isThemeDark, false)
    IDForUsersWithBarcharElements.map(id => hoverUsersWithBarchar(id))

    setFocusWithoutRefreshPage(containerClass)



    return `
    <section class="${containerClass}">
        ${
            btnsElement.join('')
        }
        
        ${
            usersWithBarcharElements.join('')
        }
    </section>
    `
}


// private function for the module
function generateVoteElementsAndIdForThem(props) {
    const {isThemeDark, users, offset = 8, emoji, isVertical} = props


    let width = 104
    let padding = 20
    if(window.innerWidth > 900) width = 104 + 0.07 * window.innerWidth
    if(window.innerWidth < 350) padding = 0
    if(window.innerWidth < 350) width = 90

    const styleBarChartContainer = `
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        justify-content: center;
        width: ${width}px;
        padding: 0 ${padding}px;
    `.replace(/\s\s+/g, "")


    const quantity = isVertical ? offset : offset - 2
    const shortPeopleData = users
        .map((user, number) => { delete user.valueText
            if((number < quantity) && number === 0) return {...user, emoji, isThemeDark}
            if(number < quantity) return {...user, isThemeDark}
        })
        .filter(user => user !== undefined)


    const arrayNamesUsersAreaHorisontal = [
        'leftItem', 'topLeftItem', 'topRightItem', 'rightItem', 'bottomLeftItem', 'bottomRightItem'
    ]

    const arrayNamesUsersAreaVertical = [
        'leftTopItem', 'middleTopItem', 'rightTopItem',
        'leftMiddleItem', 'middleBottomItem', 'rightMiddleItem',
        'leftBottomItem', 'rightBottomItem'
    ]

    const arrayNamesUsersArea = isVertical 
        ? arrayNamesUsersAreaVertical 
        : arrayNamesUsersAreaHorisontal

    const dinamicUserStyles = (nameArea) => (`grid-area: ${nameArea};`)


    const IDForUsersWithBarcharElements = new Array(shortPeopleData.length).fill('').map(randomKeyGenerator)
    const usersWithBarcharElements = shortPeopleData.map((user, index) => (`
        <a href="${window.location.href}"
            style="${dinamicUserStyles(arrayNamesUsersArea[index])}"
        >
            ${BarChart(
                {
                    ...user, 
                    _id: IDForUsersWithBarcharElements[index],
                    place: index + 1, 
                    style: styleBarChartContainer,
                    innerElement: PeopleCard(user)
                }
            )}
        </a>`
    ))

    
    const IDFirstBtn = randomKeyGenerator()
    const IDSecontBtn = randomKeyGenerator()
    const btnsElement = [
        Buttons({isThemeDark, isDisabled: true, _id: IDFirstBtn, style: 'grid-area: btnFirst'}),
        Buttons({isThemeDark, isDisabled: false, _id: IDSecontBtn, style: 'grid-area: btnSecond'})
    ]


    return {
        id: 
        {
            IDFirstBtn,
            IDSecontBtn,
            IDForUsersWithBarcharElements
        },

        elements: 
        {
            btnsElement,
            usersWithBarcharElements
        }
    }
}



