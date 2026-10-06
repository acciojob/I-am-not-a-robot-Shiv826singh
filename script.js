//your code here
const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const heading = document.getElementById("h");
const paragraph = document.getElementById("para");

// Five unique images
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

// Store the six images
let images = [];

// Store the currently selected images
let selectedImages = [];

// Randomly choose one image to duplicate
const duplicateIndex = Math.floor(Math.random() * imageClasses.length);

// Create six images
images = [...imageClasses, imageClasses[duplicateIndex]];

// Shuffle the six images randomly
images.sort(() => Math.random() - 0.5);

// Display images
function displayImages() {
  imageContainer.innerHTML = "";

  images.forEach((imageClass, index) => {
    const img = document.createElement("img");

    img.classList.add(imageClass);

    // Give every image a unique ID
    img.dataset.index = index;

    img.addEventListener("click", selectImage);

    imageContainer.appendChild(img);
  });
}

// Handle image selection
function selectImage(event) {
  const clickedImage = event.currentTarget;

  // Don't allow the same image to be selected twice
  if (selectedImages.includes(clickedImage)) {
    return;
  }

  // Don't allow more than two images
  if (selectedImages.length >= 2) {
    return;
  }

  selectedImages.push(clickedImage);

  clickedImage.classList.add("selected");

  // Show Reset after first selection
  resetButton.style.display = "inline-block";

  // Show Verify only after exactly two different images are selected
  if (selectedImages.length === 2) {
    verifyButton.style.display = "inline-block";
  }
}

// Reset everything
function reset() {
  selectedImages = [];

  const allImages = document.querySelectorAll("img");

  allImages.forEach((img) => {
    img.classList.remove("selected");
  });

  resetButton.style.display = "none";
  verifyButton.style.display = "none";

  paragraph.textContent = "";

  heading.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
}

// Verify selected images
function verify() {
  if (selectedImages.length !== 2) {
    return;
  }

  const firstImage = selectedImages[0];
  const secondImage = selectedImages[1];

  // Compare the image classes
  const firstClass = firstImage.classList[0];
  const secondClass = secondImage.classList[0];

  if (firstClass === secondClass) {
    paragraph.textContent = "You are a human. Congratulations!";
  } else {
    paragraph.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide Verify after verification
  verifyButton.style.display = "none";
}

// Button events
resetButton.addEventListener("click", reset);
verifyButton.addEventListener("click", verify);

// Initial setup
displayImages();
