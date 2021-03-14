import {_EXTENTIONS, getPathToImage} from '@handlers/getPathToImage.js'


export const Buttons = (props) => {
    const {isThemeDark, isDisabled, _id, style} = props
    const defaultNames = ['button-dark', 'button-hover-dark', 'button-light', 'button-hover-light']

    const images = defaultNames.map(name => getPathToImage({name, ext: _EXTENTIONS.SVG}))
    const buttonDark = images[0]
    const buttonDarkHover = images[1]

    const buttonLight = images[3]
    const buttonLightHover = images[2]


    return `
    ${
        isDisabled 
            ? `<img id="${_id}" style="${style || ''}" src="${isThemeDark ? buttonDarkHover : buttonLightHover}" />`
            : `<img id="${_id}" style="${style || ''}" src="${isThemeDark ? buttonDark : buttonLight}" />`
    }
    `.replace(/\s\s+/g, "")
}