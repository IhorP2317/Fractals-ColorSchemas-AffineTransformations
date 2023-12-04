const activityLink = document.getElementById("activity-link");
const activityDropdownBody = document.getElementById("activities-dropdown-body");

activityLink.addEventListener("click", function () {
    // Toggle the 'active' class to show/hide the dropdown
    activityDropdownBody.classList.toggle("active");
});

function saveCanvasImage(canvas) {
    if (!canvas) return;

    const dataURL = canvas.toDataURL(); // Convert canvas content to data URL

    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "canvas_image.png"; // Specify the download file name
    downloadLink.click(); // Simulate a click on the download link
}
