import styles from './Slider.module.css'
import {TimeInterval} from './TimeInterval'


export const Slider = (props) => {
    const {isThemeDark, isVertical} = props
    const {item, container} = styles

    const backgrounds = getBackgroundColors(isThemeDark)


    return `
    <section class="${container}">
        <div class="${item}">
            <div>
                ${TimeInterval({isThemeDark})}
            </div>
            <p class="fontBody grayText">${isVertical ? 1 : 2} часа</p>
        </div>

        <div class="${item}">
            <div style="${backgrounds[0]}"></div>
            <p class="fontBody grayText">0</p>
        </div>

        <div class="${item}">
            <div style="${backgrounds[1]}"></div>
            <p class="fontBody grayText">1 - 2</p>
        </div>

        <div class="${item}">
            <div style="${backgrounds[2]}"></div>
            <p class="fontBody grayText">3 - 4</p>
        </div>

        <div class="${item}">
            <div style="${backgrounds[3]}"></div>
            <p class="fontBody grayText">5 - 6</p>
        </div>
    </section>
    `
}



function getBackgroundColors(isThemeDark) {

    const darkBackgrounds = [
        `background: radial-gradient(3906.1% 3815.36% at 89.06% 78.28%, rgba(19, 17, 16, 0.65) 0%, rgba(0, 0, 0, 0.65) 100%);
        box-shadow: inset -1px 0px 2px rgba(255, 255, 255, 0.2), inset 1px 1px 16px rgba(112, 102, 94, 0.2);`,
    
        `background: radial-gradient(5752.25% 5190.32% at 74.43% 60.32%, rgba(0, 0, 0, 0.9) 0%, rgba(35, 22, 0, 0.9) 0.01%, rgba(112, 92, 94, 0.9) 100%);
        box-shadow: inset -1px 0px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(93, 116, 141, 0.6);`,
   
        `background: radial-gradient(5528.36% 3005.63% at 74.43% 75.84%, rgba(0, 0, 0, 0.9) 0%, rgba(33, 22, 2, 0.9) 0.01%, rgba(172, 113, 9, 0.9) 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.2);`,
  
        `background: radial-gradient(2258.03% 620.37% at 83.33% 88.95%, #201502 0%, #C7830A 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.2), inset 2px 2px 10px rgba(242, 159, 13, 0.9);`
    ]

    const lightBackgrounds = [
        `background: radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.6) 0%, rgba(250, 250, 250, 0.6) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.2);`,

        `background: radial-gradient(2408.25% 2730.55% at 89.06% 78.28%, rgba(250, 250, 250, 0.8) 0%, rgba(250, 250, 250, 0.8) 100%);
        box-shadow: inset -1px 0px 2px rgba(250, 250, 250, 0.2), inset 1px 1px 16px rgba(106, 106, 106, 0.3);`,

        `background: radial-gradient(68.1% 68.1% at 4.41% 31.9%, #FFF6DD 8.72%, #FFFEFA 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);`,

        `background: radial-gradient(66.02% 86.49% at -16.18% 13.51%, rgba(255, 186, 6, 0.85) 0%, #FFF2AD 100%);
        box-shadow: inset -1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px 0px 20px rgba(255, 176, 57, 0.4);`
    ]
        
    
    return isThemeDark ? darkBackgrounds : lightBackgrounds
}