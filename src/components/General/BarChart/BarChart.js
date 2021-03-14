import styles from './BarChart.module.css'


export const BarChart = (props) => {
    const {place, innerElement, style, _id} = props
    const {barChart} = styles


    return `
    <div 
        ${_id ? ` id="${_id}"` : ''} 
        class="${barChart} ${place === 1 ? 'barChart leading' : 'barChart'}"
        style="${style || ''}"
    >
        ${innerElement || ''}
    </div>
    `
}  