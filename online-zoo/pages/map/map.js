const carouselItems = document.querySelectorAll('.nav-animals-item');
const nextButton = document.querySelector('#nav-animals-next-btn');
const previousButton = document.querySelector('#nav-animals-previous-btn');
const carouselLine = document.querySelector('.nav-animals-list');
const carouselItem = document.querySelector('.nav-animals-item');
const carouselItemStyle = window.getComputedStyle(carouselItem);
const active = 'nav-animals-item-selected';
let stepWidth = parseInt(carouselItemStyle.width, 10) + parseInt(carouselItemStyle.marginLeft, 10) + parseInt(carouselItemStyle.marginRight, 10);
let activeItemIndex = 1;
let displayedItems;
let sliderWidth;
const carouselRangeOutput = document.querySelector('#nav-animals-range-output');
const carouselRangeInput = document.querySelector('#nav-animals-range-input');
let previousCarouselRangeValue = carouselRangeInput.value;
let lastDisplayedImageIndex;

const calculateCarousel = () => {
  const slider = document.querySelector('.nav-animals-slider');
  displayedItems = Math.floor(slider.offsetWidth / stepWidth);
  sliderWidth = displayedItems * stepWidth + 20;
  slider.style.width = `${sliderWidth}px`;
  stepWidth = sliderWidth / displayedItems;
  rollCarousel();
}

const updateRangeValue = () => {
  carouselRangeOutput.innerHTML = `0${carouselRangeInput.value}/<span class="slider-value-total">0${carouselItems.length}</span>`
}

const rollCarousel = () => {
  if (activeItemIndex < displayedItems) {
    carouselLine.style.left = 0;
  } else {
    carouselLine.style.left = `-${(activeItemIndex + 1 - displayedItems) * stepWidth}px`;
  }
}

const handleNextInput = () => {
  const currentActiveItem = [...carouselItems].find(item => item.classList.contains(active));
  if (activeItemIndex >= carouselItems.length) {
    activeItemIndex = 0;
    rollCarousel();
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  } else if (activeItemIndex >= displayedItems) {
    rollCarousel();
    lastDisplayedImageIndex = activeItemIndex;
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  } else {
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  }
}

const handlePreviousInput = () => {
  const currentActiveItem = [...carouselItems].find(item => item.classList.contains(active));
  if (activeItemIndex < 0) {
    activeItemIndex = carouselItems.length - 1;
    rollCarousel();
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  } else if (activeItemIndex <= (lastDisplayedImageIndex - displayedItems) || activeItemIndex < (carouselItems.length - displayedItems)) {
    rollCarousel();
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  } else {
    currentActiveItem.classList.remove(active);
    carouselItems[activeItemIndex].classList.add(active);
  }
}

nextButton.addEventListener('click', () => {
  activeItemIndex++;
  handleNextInput();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
})

previousButton.addEventListener('click', () => {
  activeItemIndex--;
  handlePreviousInput();
  carouselRangeInput.value = activeItemIndex + 1;
  updateRangeValue();
})

carouselRangeInput.addEventListener('input', () => {
  const currentRangeValue = carouselRangeInput.value;
  activeItemIndex = currentRangeValue - 1;
  if (currentRangeValue > previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i < currentRangeValue; i++) {
      handleNextInput();
    }
  }
  if (currentRangeValue < previousCarouselRangeValue) {
    for (let i = previousCarouselRangeValue; i > currentRangeValue; i--) {
      handlePreviousInput();
    }
  }
  updateRangeValue();
  previousCarouselRangeValue = currentRangeValue;
})

window.addEventListener('resize', calculateCarousel);

calculateCarousel();



// Pets-in-zoo carousel

// {
//   const nextButton = document.querySelector('#pets-carousel-next');
//   const previousButton = document.querySelector('#pets-carousel-prev');
//   const carouselLine = document.querySelector('.carousel-items');
//   const carouselItems = document.querySelectorAll('.carousel-item');
//   const carouselRangeOutput = document.querySelector('#pets-carousel-range-output');
//   const carouselRangeInput = document.querySelector('#pets-carousel-range-input');
//   const displayedItems = 4;
//   let activeItemIndex = 0;
//   let previousCarouselRangeValue = carouselRangeInput.value;
//   let stepWidth;
//   let sliderWidth;
//   let lastDisplayedImageIndex;

//   const updateRangeValue = () => {
//     carouselRangeOutput.innerHTML = `0${carouselRangeInput.value}/<span class="slider-value-total">0${carouselItems.length}</span>`
//   }

//   const rollCarousel = () => {
//     if (activeItemIndex < displayedItems) {
//       carouselLine.style.left = 0;
//     } else {
//       carouselLine.style.left = `-${(activeItemIndex + 1 - displayedItems) * stepWidth}px`;
//     }
//   }

//   const calculateCarousel = () => {
//     sliderWidth = document.querySelector('.carousel-items-displayed').offsetWidth;
//     stepWidth = sliderWidth / displayedItems;
//     carouselLine.style.width = `${stepWidth * carouselItems.length}px`;
//     carouselItems.forEach(item => {
//       item.style.width = `${stepWidth * 0.92}px`;
//       item.style.height = `${stepWidth * 1.32}px`;
//     })
//     rollCarousel();
//   }

//   const handleNextInput = () => {
//     const currentActiveItem = [...carouselItems].find(item => item.classList.contains('carousel-item-active'));
//     if (activeItemIndex >= carouselItems.length) {
//       activeItemIndex = 0;
//       rollCarousel();
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     } else if (activeItemIndex >= displayedItems) {
//       rollCarousel();
//       lastDisplayedImageIndex = activeItemIndex;
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     } else {
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     }
//   }

//   const handlePreviousInput = () => {
//     const currentActiveItem = [...carouselItems].find(item => item.classList.contains('carousel-item-active'));
//     if (activeItemIndex < 0) {
//       activeItemIndex = carouselItems.length - 1;
//       rollCarousel();
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     } else if (activeItemIndex <= lastDisplayedImageIndex - displayedItems || activeItemIndex < carouselItems.length - displayedItems) {
//       rollCarousel();
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     } else {
//       currentActiveItem.classList.remove('carousel-item-active');
//       carouselItems[activeItemIndex].classList.add('carousel-item-active');
//     }
//   }

//   nextButton.addEventListener('click', () => {
//     activeItemIndex++;
//     handleNextInput();
//     carouselRangeInput.value = activeItemIndex + 1;
//     updateRangeValue();
//   })

//   previousButton.addEventListener('click', () => {
//     activeItemIndex--;
//     handlePreviousInput();
//     carouselRangeInput.value = activeItemIndex + 1;
//     updateRangeValue();
//   })

//   carouselRangeInput.addEventListener('input', () => {
//     const currentRangeValue = carouselRangeInput.value;
//     activeItemIndex = currentRangeValue - 1;
//     if (currentRangeValue > previousCarouselRangeValue) {
//       for (let i = previousCarouselRangeValue; i < currentRangeValue; i++) {
//         handleNextInput();
//       }
//     }
//     if (currentRangeValue < previousCarouselRangeValue) {
//       for (let i = previousCarouselRangeValue; i > currentRangeValue; i--) {
//         handlePreviousInput();
//       }
//     }
//     updateRangeValue();
//     previousCarouselRangeValue = currentRangeValue;
//   })

//   window.addEventListener('resize', calculateCarousel);

//   calculateCarousel();
// }
