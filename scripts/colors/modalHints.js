const hslHintModal = document.getElementById("hsl-hint-modal");
const cmykHintModal = document.getElementById("cmyk-hint-modal");
const saturationHintModal = document.getElementById("saturation-hint-modal");

const hslHint = document.getElementById("hsl-hint");
const cmykHint = document.getElementById("cmyk-hint");
const saturationHint = document.getElementById("saturation-hint");


hslHint.addEventListener("click", () => {
    hslHintModal.style.display = "block";
})

cmykHint.addEventListener("click", () => {
    cmykHintModal.style.display = "block";
})

saturationHint.addEventListener("click", () => {
    saturationHintModal.style.display = "block";
})

function closeModal() {
    hslHintModal.style.display = "none";
    cmykHintModal.style.display = "none";
    saturationHintModal.style.display = "none";
}

