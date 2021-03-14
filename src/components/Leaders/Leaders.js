import styles from './Leaders.module.css'
import {LeadersItem} from './LeadersItem/LeadersItem'


export const Leaders = (props) => {
    const {users, emoji, isVertical, isThemeDark} = props
    const {leadersContainer} = styles
    const quantityItems = window.innerWidth > 600 ? 5 : 3

    const sortUsers = (notSortUsers) => {
        let evenPlases = []
        let notEvenPlases = []
        const fifthPlaceEmoji = '👍'

        notSortUsers.forEach((user, index) => {
            if(!(index < quantityItems)) return;
            const place = index + 1

            if(place === 1) return evenPlases.push({...user, emoji, place, isVertical})
            if(place % 2 === 0) return evenPlases.push({...user, place, isVertical})
            if(place === 5) return notEvenPlases.unshift({...user, emoji: fifthPlaceEmoji, place, isVertical})
            if(place % 2 === 1) return notEvenPlases.unshift({...user, place, isVertical})
        })

        return [...notEvenPlases, ...evenPlases]
    }


    return `
    <main class="${leadersContainer}">
        ${sortUsers(users).map(user => LeadersItem({...user, isThemeDark})).join(' ')}
    </main> 
    `
}

