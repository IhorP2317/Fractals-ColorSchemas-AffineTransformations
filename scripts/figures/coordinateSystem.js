let canvas = document.getElementById("figures-canvas");
let ctx = canvas.getContext("2d");

const gridSize = {value:20};
const margin = 0;

let vertices = [
    [1, 1, 1], //a
    [1, 3, 1], //b
    [3, 3, 1], //c
    [3, 1, 1]  //d
];

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    drawGrid(ctx,
        canvas.width, canvas.height,
        margin,
        gridSize
    );
    drawRectangle(new Rectangle(vertices));
}


function updatePoints(xa, ya, xb, yb, xc, yc) {
    console.log("update points");

    vertices[0][0] = xa;
    vertices[0][1] = xb;
    vertices[1][0] = xb;
    vertices[1][1] = yb;
    vertices[2][0] = xc;
    vertices[2][1] = yc;

    const A = [+vertices[0][0], +vertices[0][1], 1]
    const B = [+vertices[1][0], +vertices[1][1], 1]
    const C = [+vertices[2][0], +vertices[2][1], 1]
    const D = calculateFourthPoint([A, B, C])

    vertices[3][0] = D[0];
    vertices[3][1] = D[1];

    console.log(vertices);

    if (isParallelogram(vertices) === false) {
        window.alert('Not a parallelogram')
        return false;
    } else {
    }

    vertices = vertices.map((innerArray) => [...innerArray]);
    return true;
}
function gridToCanvas(x, y) {
    const gridStep = canvas.width / (gridSize.value * 2)
    const canvasX = (x + +gridSize.value) * +gridStep
    const canvasY = (-y + +gridSize.value) * +gridStep
    return [canvasX, canvasY]
}

function drawRectangle(rectangle) {
    console.log("draw rectangle");

    const vertices = rectangle.vertices.map((v) => gridToCanvas(v[0], v[1]))
    ctx.beginPath()
    ctx.moveTo(vertices[0][0], vertices[0][1])
    for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i][0], vertices[i][1])
    }
    ctx.closePath()
    ctx.strokeStyle = '#340B56' // Change color as needed
    ctx.stroke();

    console.log("rectangle drawn");

}

function drawGrid(ctx, width, height, margin, gridSize) {
    console.log("draw grid");

    const effectiveWidth = width - 2 * margin
    const effectiveHeight = height - 2 * margin
    const step = effectiveWidth / (gridSize.value * 2)

    // Draw the grid lines
    ctx.beginPath()
    for (let x = margin; x <= effectiveWidth + margin; x += step) {
        ctx.moveTo(x, margin)
        ctx.lineTo(x, effectiveHeight + margin)
    }
    for (let y = margin; y <= effectiveHeight + margin; y += step) {
        ctx.moveTo(margin, y)
        ctx.lineTo(effectiveWidth + margin, y)
    }
    ctx.strokeStyle = '#F9CAFF';
    ctx.stroke()

    // Draw the axes
    ctx.beginPath()
    ctx.strokeStyle = 'black' // Black color for axes
    ctx.moveTo(width / 2, margin)
    ctx.lineTo(width / 2, effectiveHeight + margin)
    ctx.moveTo(margin, height / 2)
    ctx.lineTo(effectiveWidth + margin, height / 2)
    ctx.stroke()

    // Label the axes
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    for (let i = -gridSize.value; i <= gridSize.value; i++) {
        if (i !== 0) {
            if (gridSize.value > 10 && i % 2 !== 0) {
                continue
            }
            if (gridSize.value > 20 && i % 5 !== 0) {
                continue
            }
            ctx.fillText(i.toString(), width / 2 + i * step, height / 2 + step)
            ctx.fillText(i.toString(), width / 2 - step, height / 2 - i * step)
        }
    }

    console.log("grid drawn");
}




