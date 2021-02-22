import './index.css'
import json from './assets/json/data.json'
import swg from '@assets/images/extra-light.svg'
import jpeg from '@assets/images/1x/1.jpg'
import styles from './component.module.css'


console.log(styles);


console.log(swg);
console.log(jpeg);

console.log('Hello world 3');
console.log(json);


const p = document.createElement('p')
p.textContent = 'edhviuewjvwev'
p.classList.add(styles.logo)

document.body.insertAdjacentElement('afterbegin', p)