let isDrawing = false;
const totalFrames = 200;
let currentFrame = 0;
let rotation = 0;
let zoom = 1;
let x = 0;
let y = 0;

function startTransformation(rotationChecked, zoomChecked,
                             newRotation, newZoom,
                             moveByCenterChecked, moveByCenterX, moveByCenterY) {
    console.log("Start transformation method called")

    if (isDrawing === false) {
        isDrawing = true;

        rotation = rotationChecked ? newRotation : 0;
        zoom = zoomChecked ? newZoom : 1;
        zoom = zoomChecked ? newZoom : 1;
        zoom = zoomChecked ? newZoom : 1;

        const center = rectangle.getCenter();

        x = moveByCenterChecked ? moveByCenterX : center[0];
        y = moveByCenterChecked ? moveByCenterY : center[1];

        startAnimation();
    } else {
        window.alert('Please wait until the previous movement ends');
    }
}

function startAnimation() {
    console.log("Start animation method called")
    currentFrame = 0;
    const center = rectangle.getCenter();
    x = x - center[0]
    y = y - center[1]
    animate();
}

function animate() {
    if (currentFrame < totalFrames) {
        const incrementalRotation = rotation / totalFrames
        const incrementalScale = Math.pow(zoom, 1 / totalFrames)
        const incrementalX = (x) / totalFrames
        const incrementalY = (y) / totalFrames

        rectangle.scaleRotateAndMove(
            incrementalScale,
            incrementalScale,
            incrementalRotation,
            incrementalX,
            incrementalY
        )

        draw();

        if (canvas) {
            currentFrame++
            requestAnimationFrame(animate);
        }
    } else {
        isDrawing = false;
    }
}