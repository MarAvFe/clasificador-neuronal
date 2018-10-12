import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const offset = { x: 0, y: 200 }
canvas.width = innerWidth
canvas.height = innerHeight - offset.y

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
let selectedBlue = false;
let stdRadius = 20;
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY - offset.y
})

addEventListener('click', () => {
    dots.push(new Object(
        mouse.x, 
        mouse.y, 
        stdRadius,
        selectedBlue ? colors[1] : colors[3]
    ));
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight - offset.y
})

addEventListener('keydown', (e) => {
    console.log(e.keyCode)
    switch(e.keyCode) {
        case 65: // A
            selectedBlue = !selectedBlue;
            break;
        case 67: // C
	    console.log("Calculando...")
            break;
        case 85: // U
            dots.splice(dots.length-1, 1)
            break;
    }
})

// Objects
function Object(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

Object.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //c.fillStyle = this.color
    c.fillStyle = this.y > utils.f(canvas.width, canvas.height, this.x) ? colors[1] : colors[3];
    c.fill()
    c.closePath()
}

Object.prototype.update = function() {
    this.draw()
}

// Implementation
let dots
function init() {
    dots = []

    for (let i = 0; i < 100; i++) {
        dots.push(new Object(
            utils.randomIntFromRange(0, canvas.width), 
            utils.randomIntFromRange(0, canvas.height), 
            utils.randomIntFromRange(20, 50), 
            utils.randomColor(colors)
        ));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    dots.forEach(dot => {
      dot.update();
    });
    c.beginPath()
    c.arc(mouse.x, mouse.y, 10, Math.PI*2, false)
    c.fillStyle = selectedBlue ? colors[1] : colors[3];
    c.fill()

    c.moveTo(0,0)
    for (let i = 0; i < canvas.width; i++) {
        c.lineTo( i, utils.f(canvas.width, canvas.height, i) );
    }
    c.stroke()
    c.closePath()
}

init()
animate()
