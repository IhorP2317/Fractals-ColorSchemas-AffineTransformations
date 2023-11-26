const beforeCanvas = document.getElementById("before-canvas");
const afterCanvas = document.getElementById("after-canvas");
const ctx = beforeCanvas.getContext("2d");

let img;
let beforeCanvasImageData = null;

document.getElementById("upload-button").addEventListener("click", function () {
    document.getElementById("upload-input").click();
});

//upload chosen image to beforeCanvas
document.getElementById("upload-input").addEventListener("change", (event) => {
    console.log("File input changed");
    uploadImageToBeforeCanvas(event);
});

function uploadImageToBeforeCanvas(event) {
    console.log("uploadImageToBeforeCanvas called");
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            img = new Image();  // Initialize img here
            img.onload = function () {
                beforeCanvas.width = beforeCanvas.clientWidth;
                beforeCanvas.height = beforeCanvas.clientHeight;

                // Improve image quality
                ctx.imageSmoothingEnabled = true;

                ctx.clearRect(0, 0, beforeCanvas.width, beforeCanvas.height);
                ctx.drawImage(img, 0, 0, beforeCanvas.width, beforeCanvas.height);
                enableSelection();
                beforeCanvasImageData = ctx.getImageData(
                    0,
                    0,
                    beforeCanvas.width,
                    beforeCanvas.height
                );


                uploadImageToAfterCanvas();
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
}

function uploadImageToAfterCanvas() {
    console.log("uploadImageToAfterCanvas called");
    const beforeCtx = beforeCanvas.getContext("2d");

    const afterCtx = afterCanvas.getContext("2d");

    // const imageData = beforeCtx.getImageData(
    //     0,
    //     0,
    //     beforeCanvas.width,
    //     beforeCanvas.height
    // );

    const imageData = new ImageData(
        new Uint8ClampedArray(beforeCanvasImageData.data),
        beforeCanvasImageData.width,
        beforeCanvasImageData.height
    );

    for (let i = 0; i < imageData.data.length; i += 4) {
        let pixelX = (i / 4) % beforeCanvas.width;
        let pixelY = Math.floor((i / 4) / beforeCanvas.width);

        let isInRange = true;

        if(isSelected === true) {
            if (!(pixelX >= selection.startX &&
                pixelX <= selection.endX &&
                pixelY >= selection.startY &&
                pixelY <= selection.endY)) {

                isInRange = false;
            }
        }

        let rgb = {
            red: imageData.data[i],
            green: imageData.data[i + 1],
            blue: imageData.data[i + 2],
        };

        let hsl = rgbToHsl(rgb);
        rgb = hslToRgb(hsl, isInRange);
        let cmyk = rgbToCmyk(rgb);
        rgb = cmykToRgb(cmyk);

        imageData.data[i] = rgb.red; // red
        imageData.data[i + 1] = rgb.green; // green
        imageData.data[i + 2] = rgb.blue; // blue
    }
    afterCanvas.width = imageData.width;
    afterCanvas.height = imageData.height;

    afterCtx.imageSmoothingEnabled = true;
    afterCtx.putImageData(imageData, 0, 0);
}

function showConversion(rgb) {
    //console.log("RGB value of pixel: " + JSON.stringify(rgb));
    let hsl = rgbToHsl(rgb);
    //console.log("HSL value of pixel: " + JSON.stringify(hsl));

    let cmyk = rgbToCmyk(rgb);
    //console.log("CMYK value of pixel: " + JSON.stringify(cmyk));

    setHslSlidersValues(hsl);
    setCmykSlidersValues(cmyk);

    //rgb = hslToRgb(hsl);
    //console.log("Hsl to rgb: " + JSON.stringify(rgb));

    //rgb = cmykToRgb(cmyk);
    //console.log("Cmyk to rgb: " + JSON.stringify(rgb));
}
beforeCanvas.addEventListener("mousemove", (event) => {
    let rgb = getRGBAForPixelOnCanvas(event, beforeCanvas);
    showConversion(rgb);
});
afterCanvas.addEventListener("mousemove", (event) => {
    let rgb = getRGBAForPixelOnCanvas(event, afterCanvas);
    showConversion(rgb);
});

function getRGBAForPixelOnCanvas(event, canvas) {
    const bounding = canvas.getBoundingClientRect();
    const x = event.clientX - bounding.left;
    const y = event.clientY - bounding.top;
    let context = canvas.getContext("2d");
    const pixel = context.getImageData(x, y, 1, 1);
    const data = pixel.data;

    const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    return {
        red: data[0],
        green: data[1],
        blue: data[2],
    };
}








