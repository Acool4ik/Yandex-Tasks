import json from '@assets/json/data'

// function return all types aliases which are in the data
const getAllAliases = () => {
    let aliases = []

    json.map(page => {
        const aliasIndex = aliases.findIndex(alias => alias === page.alias)
        if(aliasIndex === -1) return aliases.push(page.alias)
    })

    return aliases
}


export const aliases = getAllAliases()

