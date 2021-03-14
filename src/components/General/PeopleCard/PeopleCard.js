import styles from './PeopleCard.module.css'
import {getPathToImage, _FOLDERS} from '@handlers/getPathToImage'


export const PeopleCard = (props) => {
    const {name, avatar, valueText, emoji, isThemeDark} = props
    const {peopleCard, unicode} = styles

    const stylesFontBody = isThemeDark 
        ? 'color: var(--white-color) !important;'
        : 'color: var(--black-color) !important;'


    return `
    <div class="${peopleCard}">
        ${emoji ? `<span class="${unicode}">${emoji}</span>` : ''}

        <img src="${setNeededFolder(avatar)}" alt="people avatar">

        <div>
            <p class="fontBody" style="${stylesFontBody}">${name}</p>
            ${valueText ? `<span class="fontCaption grayText">${valueText}</span>` : ''}
        </div>
    </div>
    `.replace(/\s\s+/g, "")
}


// below located Private module for the component
function setNeededFolder(name) {
    if(!name) return 'https://via.placeholder.com/64'

    const {X1, X2, X3} = _FOLDERS
    const moreThen1000 = window.innerWidth > 1000
    const moreThen1500 = window.innerWidth > 1500

    if(moreThen1500) return getPathToImage({name, folder: X3})
    if(moreThen1000) return getPathToImage({name, folder: X2})
    if(!moreThen1500 && !moreThen1000) return getPathToImage({name, folder: X1})
}