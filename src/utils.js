function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function f(width, height, x, m, b) {
    const realX = (x * 100) / width  // Normaliza de px a % (width->100%)
    const realY = 100 - realX  // Este es el cálculo de la función
    const y = (realY * height) / 100  // Retorna a px para display
    return y
}

module.exports = { randomIntFromRange, randomColor, distance, f }
