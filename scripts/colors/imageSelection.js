let selection = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
};
let isSelecting = false;
let isSelected = false;
let hasUpdated = false;

function enableSelection() {
    beforeCanvas.addEventListener("mousedown", startSelection);
    beforeCanvas.addEventListener("mousemove", updateSelection);
    beforeCanvas.addEventListener("mouseup", endSelection);
    beforeCanvas.addEventListener("click", cancelSelection);
}

function startSelection(event) {
    console.log("start selection");

    hasUpdated = false;
    isSelecting = true;
    const rect = beforeCanvas.getBoundingClientRect();
    const scaleX = beforeCanvas.width / rect.width;
    const scaleY = beforeCanvas.height / rect.height;

    selection.startX = (event.clientX - rect.left) * scaleX;
    selection.startY = (event.clientY - rect.top) * scaleY;
}

function updateSelection(event) {
    console.log("update selection");

    if (!isSelecting) return;
    hasUpdated = true;

    const rect = beforeCanvas.getBoundingClientRect();
    const scaleX = beforeCanvas.width / rect.width;
    const scaleY = beforeCanvas.height / rect.height;

    selection.endX = (event.clientX - rect.left) * scaleX;
    selection.endY = (event.clientY - rect.top) * scaleY;

    // Clear the canvas and redraw the image
    ctx.clearRect(0, 0, beforeCanvas.width, beforeCanvas.height);
    ctx.drawImage(img, 0, 0, beforeCanvas.width, beforeCanvas.height);

    // Draw the selection rectangle
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        selection.startX,
        selection.startY,
        selection.endX - selection.startX,
        selection.endY - selection.startY
    );
}

function endSelection() {
    console.log("end selection");

    isSelecting = false;
    isSelected = true;
}

function cancelSelection() {
    console.log("mouse click");

    if (hasUpdated === false) {
        isSelected = false;
        // Clear the canvas and redraw the image
        ctx.clearRect(0, 0, beforeCanvas.width, beforeCanvas.height);
        ctx.drawImage(img, 0, 0, beforeCanvas.width, beforeCanvas.height);

        resetSelection();
    }
}

function resetSelection() {
    selection = {startX: 0, startY: 0, endX: 0, endY: 0};
}