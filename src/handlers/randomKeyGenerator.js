export function randomKeyGenerator() {
    const letter = 'hmowpqyrgcnzgvwtft'
    let wordID = ''

    for (let i = 0; i < letter.length; i++) {
        wordID += letter.charAt(Math.floor(Math.random() * letter.length))
    }

    const randomKey = wordID.substring(0, 6) + '-' + wordID.substring(6, 12) + '-' + wordID.substring(12, 18)

    
    return randomKey.toUpperCase()
}