

function parseToPercent(value, maximum, useVarianteB = false){
    if(useVarianteB){
        return (value / maximum) * 100
    }
    return value / maximum
}

export { parseToPercent }