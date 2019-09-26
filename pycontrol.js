var vkey = require('vkey')

var zerorpc = require("zerorpc")
var client = new zerorpc.Client()
client.connect("tcp://127.0.0.1:4242")

module.exports = function createEvents(data) {
    if (data.click) {
        var x = scale(data.clientX, 0, data.canvasWidth, 0, screen.width)
        var y = scale(data.clientY, 0, data.canvasHeight, 0, screen.height)

        click(x, y);

        // var pos = robot.getMousePos() // hosts current x/y
        // robot.moveMouse(x, y) // move to remotes pos
        // robot.mouseToggle('up', 'left') // set mouse position to up
        // robot.mouseClick() // click on remote click spot
        // robot.moveMouse(pos.x, pos.y) // go back to hosts position
    }

    if (data.keyCode) {
        var k = vkey[data.keyCode].toLowerCase()
        if (k === '<space>') k = ' '
        var modifiers = []
        if (data.shift) modifiers.push('shift')
        if (data.control) modifiers.push('control')
        if (data.alt) modifiers.push('alt')
        if (data.meta) modifiers.push('command')
        if (k[0] !== '<') {
            console.log('typed ' + k + ' ' + JSON.stringify(modifiers))
            if (modifiers[0]) press(k + ' ' + modifiers[0])
            else press(k)
        } else {
            if (k === '<enter>') press('enter')
            else if (k === '<backspace>') press('backspace')
            else if (k === '<up>') press('up')
            else if (k === '<down>') press('down')
            else if (k === '<left>') press('left')
            else if (k === '<right>') press('right')
            else if (k === '<delete>') press('delete')
            else if (k === '<home>') press('home')
            else if (k === '<end>') press('end')
            else if (k === '<page-up>') press('pageup')
            else if (k === '<page-down>') press('pagedown')
            else console.log('did not type ' + k)
        }
    }
}

function click(x, y) {
    client.invoke("click", { x: x, y: y }, (error, res) => {
        console.log('sent click', x, y)
        if (error) {
            console.error(error)
        }
    })
}

function press(keys) {
    client.invoke("press", keys, (error, res) => {
        console.log('sent press', keys)
        if (error) {
            console.error(error)
        }
    })
}

function scale(x, fromLow, fromHigh, toLow, toHigh) {
    return (x - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow
}