document.getElementById("upload-button").addEventListener("click", function () {
  document.getElementById("upload-input").click();
});

document.getElementById("upload-input").addEventListener("change", function () {
  const fileInput = this;
  const canvas = document.getElementById("before-canvas");
  const ctx = canvas.getContext("2d");

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        // Set canvas size to match the image
        canvas.width = img.width;
        canvas.height = img.height;

        // Improve image quality
        ctx.imageSmoothingEnabled = true;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});
