const inputXA = document.getElementById("input-x-A");
const inputXB = document.getElementById("input-x-B");
const inputXC = document.getElementById("input-x-C");
const inputYA = document.getElementById("input-y-A");
const inputYB = document.getElementById("input-y-B");
const inputYC = document.getElementById("input-y-C");

const resultXD = document.getElementById("result-x-D");
const resultYD = document.getElementById("result-y-D");

const zoomSlider = document.getElementById("zoom-slider");
const angleSlider = document.getElementById("angle-slider");
const scaleSlider = document.getElementById("scale-slider");

const angleSliderLabel = document.getElementById("angle-slider-label");
const zoomSliderLabel = document.getElementById("zoom-slider-label");
const scaleSliderLabel = document.getElementById("scale-slider-value");

//const chooseTurnTypeSelect = document.getElementById("choose-turn-type");

const clearButton = document.getElementById("clear-button");
const drawRectangleButton = document.getElementById("draw-rectangle-button");
const startAnimationButton = document.getElementById("start-animation-button");

const zoomCheckBox = document.getElementById("zoom-checkbox");
const rotateCheckBox = document.getElementById("rotate-checkbox");

drawRectangleButton.addEventListener("click", () => {
    console.log("Draw rectangle button clicked");

    // Update points and draw new rectangle
    if(updatePoints(parseInt(inputXA.value), parseInt(inputYA.value),
                    parseInt(inputXB.value), parseInt(inputYB.value),
                    parseInt(inputXC.value), parseInt(inputYC.value))) {

        setFourthPointValues(vertices[3][0], vertices[3][1]);
    }

    draw();
})

startAnimationButton.addEventListener("click", () => {
    startTransformation(
        rotateCheckBox.checked,
        zoomCheckBox.checked,
        angleSlider.value,
        zoomSlider.value
    );
})

scaleSlider.addEventListener("input", () => {
    updateSliderValueLabel(scaleSlider, scaleSliderLabel);
    gridSize.value = scaleSlider.value;
    draw();
})


zoomSlider.addEventListener("input", () => {
    updateSliderValueLabel(zoomSlider, zoomSliderLabel);
});

angleSlider.addEventListener("input", () => {
    updateSliderValueLabel(angleSlider, angleSliderLabel);
});

clearButton.addEventListener('click', () => {
    console.log("Clear button clicked");

    inputXA.value = '';
    inputXB.value = '';
    inputXC.value = '';
    inputYA.value = '';
    inputYB.value = '';
    inputYC.value = '';
    resultXD.value = '';
    resultYD.value = '';

    console.log(rectangle);
});

function validateInput(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9+.-]/g, '');
}

function updateSliderValueLabel(slider, label) {
    label.textContent = slider.value;
}

function setFourthPointValues(x, y) {
    resultXD.value = x;
    resultYD.value = y;
}

function setPointsInputValues(vertices) {
    inputXA.value = vertices[0][0];
    inputYA.value = vertices[0][1];
    inputXB.value = vertices[1][0];
    inputYB.value = vertices[1][1];
    inputXC.value = vertices[2][0];
    inputYC.value = vertices[2][1];
    resultXD.value = vertices[3][0];
    resultYD.value = vertices[3][1];
}
