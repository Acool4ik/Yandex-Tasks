
export const getPathToImage = (props) => {
    const {folder, name, ext} = props
    if(!name) throw new Error('Отсутствует имя фотографии')
    const rootDir = 'static/images/'
    
    const src = `${rootDir}${folder || ''}${name}${ext || ''}` 
    return src    
}


// BELOW LOCATE VARIABLES ONLY FOR READER !!!
export const _EXTENTIONS = {
    JPG: '.jpg',
    PNG: '.png',
    SVG: '.svg'
}

export const _FOLDERS = {
    X1: '1x/',
    X2: '2x/',
    X3: '3x/',
    X4: '4x/'
}

export const _NAME = {
    
}

