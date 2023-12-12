const zoomSliderLabel = document.getElementById("zoom-slider-value");
const iterationSliderLabel = document.getElementById("iteration-slider-value");
const hueSliderLabel = document.getElementById("hue-slider-value");
const zoomSlider = document.getElementById("zoom-slider");
const iterationSlider = document.getElementById("iteration-slider");
const hueSlider = document.getElementById("hue-slider");
const clearButton = document.getElementById("clear-button");
const chooseFractalTypeSelect = document.getElementById("choose-fractal-type");
const loading = document.getElementById("loading");


const ChZSlidersConfig = {
    zoomSliderDefaultValue: 1,
    zoomSliderMaxValue: 100,

    iterationSliderDefaultValue: 100,
    iterationSliderMaxValue: 100,

    hueSliderDefaultValue: 180,
}

const sinZCosZSlidersConfig = {
    zoomSliderDefaultValue: 1,
    zoomSliderMaxValue: 1000,

    iterationSliderDefaultValue: 100,
    iterationSliderMaxValue: 100,

    hueSliderDefaultValue: 180,
}

const CutSlidersConfig = {
    zoomSliderDefaultValue: 1,
    zoomSliderMaxValue: 10,

    iterationSliderDefaultValue: 6,
    iterationSliderMaxValue: 6,

    hueSliderDefaultValue: 230
}

const DefaultSlidersConfig = {
    zoomSliderDefaultValue: 1,
    zoomSliderMaxValue: 10,

    iterationSliderDefaultValue: 0,
    iterationSliderMaxValue: 100,

    hueSliderDefaultValue: 0
}

function setFractalParametersToLocalStorage() {
    localStorage.setItem("iteration", iterationSliderLabel.textContent)
    localStorage.setItem("zoom", zoomSliderLabel.textContent)
    localStorage.setItem("hue", hueSliderLabel.textContent)
}

function watchAnyObject(
    object = {},
    methods = [],
    callbackBefore = function () {
    },
    callbackAfter = function () {
    },
) {
    for (let method of methods) {
        const original = object[method].bind(object);
        const newMethod = function (...args) {
            callbackBefore(method, ...args);
            const result = original.apply(null, args);
            callbackAfter(method, ...args);
            return result;
        };
        object[method] = newMethod.bind(object);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem("choosedFractalType", "none");
    setFractalParametersToLocalStorage();

    watchAnyObject(window.localStorage, ['setItem'], (method, key, ...args) => {
        if (key == "hue") {
            console.log("check fractal type");

            const fractalType = localStorage.getItem("choosedFractalType");
            console.log("chosed fractal type: " + fractalType);

            switch (fractalType) {
                case "Cut":
                    console.log("draw cut type");

                    loading.style.display = "block";
                    setTimeout(function() {
                        drawCezaroFractal(
                            localStorage.getItem("zoom"),
                            localStorage.getItem("iteration"),
                            args[0]
                        );

                        loading.style.display = 'none';
                    }, 500);
                    break;

                case "sinz + cosz":
                    console.log("draw sinz + cosz")

                    loading.style.display = "block";
                    setTimeout(function() {
                        drawSinCosFractal(
                            localStorage.getItem("zoom"),
                            localStorage.getItem("iteration"),
                            args[0]);

                        loading.style.display = 'none';
                    }, 500);

                    break;

                case "Ch z":
                    console.log("draw Ch z")

                    loading.style.display = "block";
                    setTimeout(function() {
                        drawChFractal(
                            localStorage.getItem("zoom"),
                            localStorage.getItem("iteration"),
                            args[0]);

                        loading.style.display = 'none';
                    }, 500);
                    break;
                case "none":
                    break;
            }
        }
    },);
});

function updateSliderValueLabel(slider, label) {
    label.textContent = slider.value;
}

zoomSlider.addEventListener("mouseup", function () {
    updateSliderValueLabel(zoomSlider, zoomSliderLabel);
    setFractalParametersToLocalStorage();
});

iterationSlider.addEventListener("mouseup", function () {
    updateSliderValueLabel(iterationSlider, iterationSliderLabel);
    setFractalParametersToLocalStorage();
});

hueSlider.addEventListener("mouseup", function () {
    updateSliderValueLabel(hueSlider, hueSliderLabel);


    setFractalParametersToLocalStorage();
});

zoomSlider.addEventListener("input", function () {
    updateSliderValueLabel(zoomSlider, zoomSliderLabel);
});

iterationSlider.addEventListener("input", function () {
    updateSliderValueLabel(iterationSlider, iterationSliderLabel);
});

hueSlider.addEventListener("input", function () {
    updateSliderValueLabel(hueSlider, hueSliderLabel);
});

chooseFractalTypeSelect.addEventListener("change", function () {
    const selectedOption = chooseFractalTypeSelect.value;


    switch (selectedOption) {
        case "Cut":
            setValuesOfSlidersFromConfig(CutSlidersConfig)
            break;

        case "sinz + cosz":
            setValuesOfSlidersFromConfig(sinZCosZSlidersConfig)
            break;

        case "Ch z":
            setValuesOfSlidersFromConfig(ChZSlidersConfig)
            break;
    }

    localStorage.setItem("choosedFractalType", selectedOption);

    setFractalParametersToLocalStorage();
})

clearButton.addEventListener("click", () => {
    const fractalType = localStorage.getItem("choosedFractalType");

    switch (fractalType) {
        case "Cut":
            setValuesOfSlidersFromConfig(CutSlidersConfig)
            break;

        case "sinz + cosz":
            setValuesOfSlidersFromConfig(sinZCosZSlidersConfig)
            break;

        case "Ch z":
            setValuesOfSlidersFromConfig(ChZSlidersConfig)
            break;

        case "none":
            setValuesOfSlidersFromConfig(DefaultSlidersConfig);
            break;
    }
    setFractalParametersToLocalStorage();
});

function setValuesOfSlidersFromConfig(config) {
    iterationSliderLabel.textContent = config.iterationSliderDefaultValue;
    iterationSlider.value = config.iterationSliderDefaultValue;
    iterationSlider.max = config.iterationSliderMaxValue;

    zoomSliderLabel.textContent = config.zoomSliderDefaultValue;
    zoomSlider.value = config.zoomSliderDefaultValue;
    zoomSlider.max = config.zoomSliderMaxValue;

    hueSliderLabel.textContent = config.hueSliderDefaultValue;
    hueSlider.value = config.hueSliderDefaultValue;
}