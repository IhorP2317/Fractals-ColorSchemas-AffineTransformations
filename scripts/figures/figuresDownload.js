const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", () => {
    let canvas = document.getElementById("figures-canvas");
    saveCanvasImage(canvas);
});