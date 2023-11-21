document.addEventListener("DOMContentLoaded", () => {
  // Get references to the canvas and input elements
  const canvas = document.getElementById("hslCanvas");
  const ctx = canvas.getContext("2d");
  const uploadInput = document.getElementById("upload-input");

  // Add an event listener to the file input
  uploadInput.addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
      // Create a new FileReader
      const reader = new FileReader();

      // Set the onload callback to update the canvas when the image is loaded
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          // Clear the canvas and draw the new image
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const aspectRatio = img.width / img.height;
          const maxWidth = canvas.width;
          const maxHeight = canvas.height;

          let newWidth = maxWidth;
          let newHeight = newWidth / aspectRatio;

          if (newHeight > maxHeight) {
            newHeight = maxHeight;
            newWidth = newHeight * aspectRatio;
          }

          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  }

  /*function saveImage() {
        // Add logic to save the canvas content as an image (e.g., toDataURL, etc.)
        // This can be customized based on your requirements.
        // Example:
        const imageData = canvas.toDataURL('image/png');
        // Now imageData contains the base64 representation of the canvas image.
        // You can save it or perform further actions as needed.
        console.log('Image saved:', imageData);
    }*/
});
