const saveButtonAfter = document.getElementById("save-button-after");

saveButtonAfter.addEventListener("click", () => {
    let canvas = document.getElementById("after-canvas");
    saveCanvasImage(canvas);
});