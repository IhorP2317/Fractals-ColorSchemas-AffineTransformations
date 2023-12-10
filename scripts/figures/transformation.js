let isDrawing = false;
const totalFrames = 200;
let currentFrame = 0;
let rotation = 0;
let zoom = 1;
let x = 0;
let y = 0;

function startTransformation(rotationChecked, zoomChecked, newRotation, newZoom) {
    console.log("Start transformation method called")

    if (isDrawing === false) {
        isDrawing = true;

        rotation = rotationChecked ? newRotation : 0;
        zoom = zoomChecked ? newZoom : 1;

        console.log("rotation: " + rotation);
        console.log("zoom: " + zoom);

        const center = rectangle.getCenter();
        x = center[0];
        y = center[1];

        console.log("x: " + x);
        console.log("y: " + y);
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

        draw();

        rectangle.scaleRotateAndMove(
            incrementalScale,
            incrementalScale,
            incrementalRotation,
            x,
            y
        )

        if (canvas) {
            currentFrame++
            requestAnimationFrame(animate);
        }
    } else {
        isDrawing = false;
    }
}