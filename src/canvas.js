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

const colors = ['#7ECEFD', '#FF7F66'] // ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
let selectedBlue = false;
let stdRadius = 20;
// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY - offset.y
})

addEventListener('click', () => {
    dots.push(new Dot(
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

// Perceptron
function Perceptron(input_size) {
    this.weights = (() => {
        const zeroes = []
        for (let i = 0; i < input_size; i++) {
            zeroes.push(Math.random()*2-1)
        }
        return zeroes
    })()
    this.bias = Math.random()*2-1
    console.dir(this)
}

Perceptron.prototype.heaviside = function(x) {
    return x >= 0 ? 1 : 0
}

Perceptron.prototype.process = function(inputs) {
    // inputs: int[]
    let sum = this.bias
    for (const input of inputs) {
        sum += input * this.weights[inputs.indexOf(input)]
    }
    return this.heaviside(sum)
}

Perceptron.prototype.adjust = function(inputs, delta, learningRate) {
    // inputs: int[], delta: int, learningRate: int
    for (const input of inputs) {
        this.weights[inputs.indexOf(input)] += input * delta * learningRate
    }
    this.bias += delta * learningRate
}

let a = 0;
let b = 0;

function f(x) {
    // x: int
    return ( a*x ) + b
}

function isAboveLine(point, f) {
    // point: [int,int], f: function(int) int
    const x = point[0]
    const y = point[1]
    return y > utils.f(canvas.width, canvas.height, x) ? 1 : 0
}

function train(p, iters, rate, dots) {
    // p: Perceptron, iters: int, rate: intfloat
    for (var i = 0; i < dots.length; i++) {
        const point = [
            dots[i].x, //utils.randomIntFromRange(-100,100),
            dots[i].y  //utils.randomIntFromRange(-100,100)
        ]

        const actual = p.process(point)
        const expected = isAboveLine(point, f)
        const delta = expected - actual

        p.adjust(point, delta, rate)
    }
    a = p.weights[0]
    b = p.weights[1]
}

function verify(p, dots) {
    // p: Perceptron
    let correctAnswers = 0
    for (const dot of dots) {
        const point = [dot.x, dot.y]
        const result = p.process(point)
        correctAnswers += result == isAboveLine(point, f) ? 1 : 0
    }
    console.log(`correctAnswers: ${correctAnswers}`)
    return correctAnswers
}

function runNet(dots) {
    a = utils.randomIntFromRange(-5,5)
    b = utils.randomIntFromRange(-50,50)
    console.log("vals",a,b)

    let p = new Perceptron(2)

    const iterations = 100
    const learningRate = 0.2

    console.log(p.weights)
    train(p, iterations, learningRate, dots)
    console.log(p.weights)

    const successRate = verify(p, dots)
    console.log("vals",a,b)
}


// Dots
function Dot(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
}

Dot.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    this.color = this.y > utils.f(canvas.width, canvas.height, this.x) ? colors[0] : colors[1];
    c.fillStyle = this.color
    c.fill()
    c.closePath()
}

Dot.prototype.update = function() {
    this.draw()
}

// Implementation
let dots
function init() {
    dots = []
    for (let i = 0; i < 100; i++) {
        dots.push(new Dot(
            utils.randomIntFromRange(0, canvas.width),
            utils.randomIntFromRange(0, canvas.height),
            utils.randomIntFromRange(5, 18),
            utils.randomColor(colors)
        ));
    }
    runNet(dots)
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
        c.lineTo( i, utils.f(canvas.width, canvas.height, f(i), 3, 5) );
    }
    c.stroke()
    c.closePath()
}

init()
animate()
