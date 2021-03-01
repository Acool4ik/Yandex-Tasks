import styles from './Leaders.module.css'
import {LeadersItem} from './LeadersItem/LeadersItem'



export const Leaders = (props) => {
    

    return `
    <main style="display: flex;" class="container">

        ${LeadersItem()}
        ${LeadersItem()}
        ${LeadersItem()}

    </main>
    `
}