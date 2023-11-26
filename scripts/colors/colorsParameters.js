const hslHueSlider = document.getElementById("hsl-hue-slider");
const hslSaturationSlider = document.getElementById("hsl-saturation-slider");
const hslLightnessSlider = document.getElementById("hsl-lightness-slider");
const hslHueSliderLabel = document.getElementById("hsl-hue-slider-value");
const hslSaturationSliderLabel = document.getElementById("hsl-saturation-slider-value");
const hslLightnessSliderLabel = document.getElementById("hsl-lightness-slider-value");

const cmykCyanSlider = document.getElementById("cmyk-cyan-slider");
const cmykMagentaSlider = document.getElementById("cmyk-magenta-slider");
const cmykYellowSlider = document.getElementById("cmyk-yellow-slider");
const cmykBlackSlider = document.getElementById("cmyk-black-slider");
const cmykCyanSliderLabel = document.getElementById("cmyk-cyan-slider-value");
const cmykMagentaSliderLabel = document.getElementById("cmyk-magenta-slider-value");
const cmykYellowSliderLabel = document.getElementById("cmyk-yellow-slider-value");
const cmykBlackSliderLabel = document.getElementById("cmyk-black-slider-value");

const saturationHueSlider = document.getElementById("saturation-hue-slider");
const saturationHueSliderLabel = document.getElementById("saturation-hue-slider-value");

const saturationSaturationSlider = document.getElementById("saturation-saturation-slider");
const saturationSaturationSliderLabel = document.getElementById("saturation-saturation-slider-value");


function setHslSlidersValues(hsl) {
    hslHueSlider.value = hsl.hue;
    hslSaturationSlider.value = hsl.saturation;
    hslLightnessSlider.value = hsl.lightness;

    hslHueSliderLabel.textContent = hsl.hue;
    hslSaturationSliderLabel.textContent = hsl.saturation;
    hslLightnessSliderLabel.textContent = hsl.lightness;
}

function setCmykSlidersValues(cmyk) {
    cmykCyanSlider.value = cmyk.cyan;
    cmykMagentaSlider.value = cmyk.magenta;
    cmykYellowSlider.value = cmyk.yellow;
    cmykBlackSlider.value = cmyk.black;

    cmykCyanSliderLabel.textContent = cmyk.cyan;
    cmykMagentaSliderLabel.textContent = cmyk.magenta;
    cmykYellowSliderLabel.textContent = cmyk.yellow;
    cmykBlackSliderLabel.textContent = cmyk.black;
}

saturationHueSlider.addEventListener("mouseup", () => {
    uploadImageToAfterCanvas();
});

saturationHueSlider.addEventListener("input", () => {
    saturationHueSliderLabel.textContent = saturationHueSlider.value;
});

saturationSaturationSlider.addEventListener("mouseup", () => {
    uploadImageToAfterCanvas();
});

saturationSaturationSlider.addEventListener("input", () => {
    saturationSaturationSliderLabel.textContent =
        saturationSaturationSlider.value;
});