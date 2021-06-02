let tip = document.querySelector("#tip");
const string = '一个简易的小画板，在下方画布自由地作画吧~'
let n = 1
tip.innerHTML = string.substr(0, n)
let id = setInterval(() => {
    n += 1
    if (n > string.length) {
        window.clearInterval(id)
        return
    }
    tip.innerHTML = string.substr(0, n)
}, 150)

let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
//画线
let ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.strokeStyle = 'none';
ctx.lineWidth = 8;
ctx.lineCap = "round";

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let painting = false
let last

let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        last = [x, y]
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        drawLine(last[0], last[1], x, y)
        last = [x, y]
    }
} else {
    canvas.onmousedown = (e) => {
        painting = true
        last = [e.clientX, e.clientY]
    }

    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        } else {}

    }

    canvas.onmouseup = () => {
        painting = false
    }
}