import json from '@assets/json/data'


// function which parse data from URL, validate or replaces them with defaults values
export const parseUrlData = () => {
    // meta info
    const SLIDE = 'slide'
    const THEME = 'theme'

    // default values
    const defaultSlide = 0
    const defaultIsThemeDark = true
    const defaultReturnValue = {
        slide: defaultSlide,
        isThemeDark: defaultIsThemeDark
    }

    // parse slide and theme data
    let searchString = window.location.search
    if(searchString) searchString = searchString.slice(1)
    else return {slide: 0, isThemeDark: true}
    const arraySearchData = searchString.split('&')

    // transform arrayData to objectData
    const returnEntriesData = arraySearchData.map(query => {
        const splitQuery = query.split('=')
        return [splitQuery[0], splitQuery[1]]
    })
    const objectData = Object.fromEntries(returnEntriesData)

    // validation
    let returnValue = {}
    for(let key in objectData) {
        if(key === SLIDE || key === THEME) 
        {
            if(key === SLIDE) returnValue = validationSlide(SLIDE, objectData, returnValue, defaultSlide)
            if(key === THEME) returnValue = validationTheme(THEME, objectData, returnValue, defaultIsThemeDark)
        } 
        else 
        {
            returnValue = defaultReturnValue
            break
        }
    }

    // return the resulting value
    // spread for validation if one of the two properties is present
    return {...defaultReturnValue, ...returnValue}
}



// BELOW LOCATE PRIVATE FUNCTIONS FOR THE MODULE !!!

// handler for validation slide prop
function validationSlide(key, object, currentReturnValue, defaultValue) {
    const slideLength = json.length
    const valueSlide = Number(object[key])
    
    if(valueSlide > slideLength || valueSlide < 1 || !(typeof valueSlide === 'number')) 
    {
        return {...currentReturnValue, slide: defaultValue}
    }

    return {
        ...currentReturnValue,
        slide: valueSlide - 1
    }
}

// handler for validation theme prop
function validationTheme(key, object, currentReturnValue, defaultValue) {
    const LIGHT = 'light'
    const DARK = 'dark'

    const value = object[key]
    if(value !== LIGHT && value !== DARK) 
    {
        return {...currentReturnValue, isThemeDark: defaultValue}
    }

    return {
        ...currentReturnValue,
        isThemeDark: value === DARK ? true : false
    }
}