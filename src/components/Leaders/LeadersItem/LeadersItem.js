import styles from './LeadersItem.module.css'

import {PeopleCard} from '../../General/PeopleCard/PeopleCard'


export const LeadersItem = () => {

    const peopleProps =  {
        "id": 3, 
        "name": "Дарья Ковалева", 
        "avatar": "3.jpg", 
        "valueText": "32"
    }
    

    return `
    <div class="leadersCard">
        ${PeopleCard()}

        <div class="barChart text-center">
            <span class="headline">4</span>
        </div>
    </div>
    `
}