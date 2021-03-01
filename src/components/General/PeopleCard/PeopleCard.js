import styles from './PeopleCard.module.css'


export const PeopleCard = (userProps) => {
    // const {id, name, avatar, valueText, emoji} = userProps
    const {peopleCard} = styles

    const id = 43
    const name = 'ewofew'
    const avatar = undefined
    const valueText = 'ejwnfje'
    const emoji = undefined


    return `
    <div class="${peopleCard}" data-userID="${id}">
        ${emoji && `<span class="unicode">${emoji}</span>`}

        <img src="${avatar ? avatar : 'https://via.placeholder.com/64'}" alt="people avatar">
        <p class="body">${name}</p>

        ${valueText && `<span class="caption gray">${valueText}</span>`}
    </div>
    `
}