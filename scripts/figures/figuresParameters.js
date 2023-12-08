const inputXA = document.getElementById("input-x-A");
const inputXB = document.getElementById("input-x-B");
const inputXC = document.getElementById("input-x-C");
const inputYA = document.getElementById("input-y-A");
const inputYB = document.getElementById("input-y-B");
const inputYC = document.getElementById("input-y-C");

const zoomSlider = document.getElementById("zoom-slider");
const angleSlider = document.getElementById("angle-slider");
const scaleSlider = document.getElementById("scale-slider");

const angleSliderLabel = document.getElementById("angle-slider-label");
const zoomSliderLabel = document.getElementById("zoom-slider-label");
const scaleSliderLabel = document.getElementById("scale-slider-value");

//const chooseTurnTypeSelect = document.getElementById("choose-turn-type");

const clearButton = document.getElementById("clear-button");
const drawRectangleButton = document.getElementById("draw-rectangle-button");

function validateInput(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9+.-]/g, '');
}

function updateSliderValueLabel(slider, label) {
    label.textContent = slider.value;
}

drawRectangleButton.addEventListener("click", () => {
    console.log("draw rectangle button clicked");

    // Update points and draw new rectangle
    if(updatePoints(parseInt(inputXA.value), parseInt(inputYA.value),
        parseInt(inputXB.value), parseInt(inputYB.value),
        parseInt(inputXC.value), parseInt(inputYC.value))) {
        draw();
    }
})

scaleSlider.addEventListener("input", () => {
    updateSliderValueLabel(scaleSlider, scaleSliderLabel);
    gridSize.value = scaleSlider.value;
    draw();
})

scaleSlider.addEventListener("change", () => {
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

zoomSlider.addEventListener("mouseup", () => {
});

angleSlider.addEventListener("mouseup", () => {
});

clearButton.addEventListener('click', () => {
    inputXA.value = '';
    inputXB.value = '';
    inputXC.value = '';
    inputYA.value = '';
    inputYB.value = '';
    inputYC.value = '';

    // zoomSlider.value = 1;
    // zoomSliderLabel.textContent = "1";
    //
    // angleSlider.value = 0;
    // angleSliderLabel.textContent = "0";
    //
    // scaleSlider.value = 1;
    // scaleSliderLabel.textContent = "1";

    //chooseTurnTypeSelect.selectedIndex = 0;
});
