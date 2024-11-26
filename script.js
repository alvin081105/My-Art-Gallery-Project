// script.js

const carousel = document.getElementById('carousel');
const imageUpload = document.getElementById('imageUpload');
const uploadBtn = document.getElementById('uploadBtn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Function to create a new carousel item
function createCarouselItem(imageSrc) {
  const item = document.createElement('div');
  item.classList.add('item');
  item.style.backgroundImage = `url(${imageSrc})`;

  // If this is the first item, make it active
  if (carousel.children.length === 0) {
    item.classList.add('active');
  }
  carousel.appendChild(item);
}

// Event listener for image upload
uploadBtn.addEventListener('click', () => {
  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      createCarouselItem(e.target.result);
      updateCarousel();
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please select an image to upload!');
  }
});

// Function to update carousel
function updateCarousel() {
  const items = document.querySelectorAll('.item');
  items.forEach((item, index) => {
    item.classList.remove('active', 'prev', 'next');
    if (index === currentIndex) {
      item.classList.add('active');
    } else if (index === (currentIndex - 1 + items.length) % items.length) {
      item.classList.add('prev');
    } else if (index === (currentIndex + 1) % items.length) {
      item.classList.add('next');
    }
  });
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
  const items = document.querySelectorAll('.item');
  if (items.length > 0) {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
  }
});

nextBtn.addEventListener('click', () => {
  const items = document.querySelectorAll('.item');
  if (items.length > 0) {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }
});
