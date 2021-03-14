import styles from './ChartPeopleCard.module.css'
import {getPathToImage, _FOLDERS} from '@handlers/getPathToImage'


export const ChartPeopleCart = (props) => {
    const {name, valueText, avatar, isThemeDark} = props
    const {ChartPeopleCard} = styles

    const colorTextDependTheme = isThemeDark 
        ? 'color: var(--white-color) !important' 
        : 'color: var(--black-color) !important;'  
    
        
    return `
    <div class="${ChartPeopleCard}">
        <img src="${setNeededFolder(avatar)}" alt="people avatar">

        <div>
            <p class="fontBody" style="${colorTextDependTheme}">${name || 'N/A'}</p>
            <span class="fontCaption grayText">${valueText || 'N/A'}</span>
        </div>
    </div>
    `.replace(/\s\s+/g, "")
}


// below located Private module for the component
function setNeededFolder(name = '') {
    if(!name) return 'https://via.placeholder.com/60'

    const {X1, X2, X3} = _FOLDERS
    const moreThen900 = window.innerWidth > 900
    const moreThen1400 = window.innerWidth > 1400

    if(moreThen1400) return getPathToImage({name, folder: X3})
    if(moreThen900) return getPathToImage({name, folder: X2})
    if(!moreThen1400 && !moreThen900) return getPathToImage({name, folder: X1})
}