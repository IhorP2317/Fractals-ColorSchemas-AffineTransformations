const clearButton = document.getElementById("clear-button");
const inputXA = document.getElementById("input-x-A");
const inputXB = document.getElementById("input-x-B");
const inputXC = document.getElementById("input-x-C");
const inputYA = document.getElementById("input-y-A");
const inputYB = document.getElementById("input-y-B");
const inputYC = document.getElementById("input-y-C");

const zoomSlider = document.getElementById("zoom-slider");
const zoomSliderLabel = document.getElementById("zoom-slider-label");
const angleSlider = document.getElementById("angle-slider");
const angleSliderLabel = document.getElementById("angle-slider-label");

const chooseTurnTypeSelect = document.getElementById("choose-turn-type");
const scaleButtonPlus = document.getElementById("scale-button-plus");
const scaleButtonMinus = document.getElementById("scale-button-minus");

function validateInput(inputElement) {
    inputElement.value = inputElement.value.replace(/[^0-9+.-]/g, '');
}

scaleButtonPlus.addEventListener("click", () => {
    updateParameters(scaleIndex - 1);
})

scaleButtonMinus.addEventListener("click", () => {
    updateParameters(scaleIndex + 1);
})

function updateSliderValueLabel(slider, label) {
    label.textContent = slider.value;
}

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
    inputYC.value = ''

    zoomSlider.value = 1;
    zoomSliderLabel.textContent = "1";
    angleSlider.value = 0;
    angleSliderLabel.textContent = "0";

    chooseTurnTypeSelect.selectedIndex = 0;
});
