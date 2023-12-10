function rgbToHsl(rgb) {
    // Normalize RGB values to the range [0, 1]
    const r = rgb.red / 255;
    const g = rgb.green / 255;
    const b = rgb.blue / 255;

    // Find the maximum and minimum values among R, G, and B
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    // Calculate lightness (L)
    let l = (max + min) / 2;

    // Calculate saturation (S)
    let s = 0;
    if (max !== min) {
        s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);
    }

    // Calculate hue (H)
    let h = 0;
    if (max === min) {
        h = 0; // Achromatic (grayscale)
    } else {
        switch (max) {
            case r:
                h = ((g - b) / (max - min) + 6) % 6;
                break;
            case g:
                h = (b - r) / (max - min) + 2;
                break;
            case b:
                h = (r - g) / (max - min) + 4;
                break;
        }
        h *= 60;
    }

    // Round the values to make them more user-friendly
    h = Math.round(h);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return {hue: h, saturation: s, lightness: l};
}

function hslToRgb(hsl, isInRange) {
    let hue = hsl.hue;
    let saturation = hsl.saturation;
    let lightness = hsl.lightness;

    let saturationHueSliderValue = saturationHueSlider.value;

    // Ensure hue is in the range [0, 360]
    hue = ((hue % 360) + 360) % 360;

    // Check if the hue is within a certain range
    if ((Math.abs(hue - saturationHueSliderValue) < 20 ||
            Math.abs(hue - saturationHueSliderValue + 360) < 20 ||
            Math.abs(hue - saturationHueSliderValue - 360) < 20) &&
        isInRange === true) {
        // Adjust saturation if hue is within the specified range
        saturation = saturationSaturationSlider.value;
    }

    // Normalize saturation and lightness to the range [0, 1]
    saturation = Math.max(0, Math.min(100, saturation)) / 100;
    lightness = Math.max(0, Math.min(100, lightness)) / 100;

    // Calculate chroma
    let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

    // Calculate hue' (hue prime)
    let huePrime = hue / 60;

    // Calculate second largest component (X)
    let X = chroma * (1 - Math.abs((huePrime % 2) - 1));

    // Initialize RGB values to 0
    let r = 0;
    let g = 0;
    let b = 0;

    // Determine the initial RGB values based on the hue prime
    if (0 <= huePrime && huePrime < 1) {
        r = chroma;
        g = X;
    } else if (1 <= huePrime && huePrime < 2) {
        r = X;
        g = chroma;
    } else if (2 <= huePrime && huePrime < 3) {
        g = chroma;
        b = X;
    } else if (3 <= huePrime && huePrime < 4) {
        g = X;
        b = chroma;
    } else if (4 <= huePrime && huePrime < 5) {
        r = X;
        b = chroma;
    } else if (5 <= huePrime && huePrime < 6) {
        r = chroma;
        b = X;
    }

    // Calculate lightness adjustment
    let lightnessAdjustment = lightness - chroma / 2;

    // Add the lightness adjustment to all RGB components
    r += lightnessAdjustment;
    g += lightnessAdjustment;
    b += lightnessAdjustment;

    // Scale RGB values to the range [0, 255] and round
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return {red: r, green: g, blue: b};
}

function rgbToCmyk(rgb) {
    const red = rgb.red;
    const green = rgb.green;
    const blue = rgb.blue;

    let black = 1 - Math.max(red / 255, green / 255, blue / 255);
    let cyan;
    let magenta;
    let yellow;

    if (black < 1) {
        cyan = (1 - red / 255 - black) / (1 - black);
        magenta = (1 - green / 255 - black) / (1 - black);
        yellow = (1 - blue / 255 - black) / (1 - black);

        cyan = Math.round(cyan * 100);
        magenta = Math.round(magenta * 100);
        yellow = Math.round(yellow * 100);
        black = Math.round(black * 100);
    } else {
        return {cyan: 0, magenta: 0, yellow: 0, black: 100};
    }

    return {cyan, magenta, yellow, black};
}

function cmykToRgb(cmyk) {
    const cyan = cmyk.cyan;
    const magenta = cmyk.magenta;
    const yellow = cmyk.yellow;
    const black = cmyk.black;

    // Normalize CMYK values to the range [0, 1]
    let c = cyan / 100;
    let m = magenta / 100;
    let y = yellow / 100;
    let k = black / 100;

    // Calculate RGB values
    let r = Math.round(255 * (1 - c) * (1 - k));
    let g = Math.round(255 * (1 - m) * (1 - k));
    let b = Math.round(255 * (1 - y) * (1 - k));

    return {red: r, green: g, blue: b};
}