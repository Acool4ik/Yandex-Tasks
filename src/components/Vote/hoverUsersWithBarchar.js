export function hoverUsersWithBarchar(id = '') {
    let isEnter = false
    let isFocus = false
    let isFirst = false

    setTimeout(() => {
        const $element = document.getElementById(id)
        if(!$element) return

        isFirst = $element.classList.contains('leading')
        $element.style.boxShadow = 'none'
        $element.style.background = isFirst ? '' : 'transparent'

        $element.closest('a').onfocus = (event) => {
            if(isFirst) return

            event.target.firstElementChild.style.background = ''
            isFocus = true
            isEnter = true
        }

        $element.closest('a').onblur = (event) => {
            if(isFirst) return
            
            event.target.firstElementChild.style.background = 'transparent'
            isFocus = false
            isEnter = false
        }

        $element.onmouseenter = (event) => {
            if(isEnter || isFocus || isFirst) return
    
            event.target.style.background = ''
            isEnter = true
        }
    
        $element.onmouseleave = (event) => {
            if(!isEnter || isFocus || isFirst) return
    
            event.target.style.background = 'transparent'
            isEnter = false
        }
    }, 150)
}


export function setFocusWithoutRefreshPage(classContainer) {
    setTimeout(() => {
        document.body.querySelector(`section.${classContainer}`)
            .onclick = (e) => {
                e.preventDefault()
                e.stopPropagation()
                e.target.closest('a').focus()
            }
    }, 150)
}