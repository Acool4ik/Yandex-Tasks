export async function hoverButtonHandler(id = '', isThemeDark = true, isDisabled = false) {
    const {_EXTENTIONS, getPathToImage} = await import('@handlers/getPathToImage.js')
    const defaultNames = ['button-dark', 'button-hover-dark', 'button-light', 'button-hover-light']

    const images = defaultNames.map(name => getPathToImage({name, ext: _EXTENTIONS.SVG}))

    const buttonDark = images[0]
    const buttonDarkHover = images[1]
    const buttonLight = images[3]
    const buttonLightHover = images[2]

    let isEnter = false
    setTimeout(() => {
        const btn = document.getElementById(id)
        if(!btn) return
        
        if(isDisabled) btn.style.transform = 'rotate(180deg)'
        else btn.src = isThemeDark ? buttonDark : buttonLight

        btn.onmouseenter = (event) => {
            if(isEnter || isDisabled) return
    
            event.target.src = isThemeDark ? buttonDarkHover : buttonLightHover
            isEnter = true
        }
    
        btn.onmouseleave = (event) => {
            if(!isEnter || isDisabled) return
    
            event.target.src = isThemeDark ? buttonDark : buttonLight
            isEnter = false
        }
    }, 150)
}