const saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", saveCanvasImage);

function saveCanvasImage() {
  let canvas = document.getElementById("fractalCanvas");

  if (!canvas) return;

  const dataURL = canvas.toDataURL(); // Convert canvas content to data URL

  // Create a download link
  const downloadLink = document.createElement("a");
  downloadLink.href = dataURL;
  downloadLink.download = "canvas_image.png"; // Specify the download file name
  downloadLink.click(); // Simulate a click on the download link
}
