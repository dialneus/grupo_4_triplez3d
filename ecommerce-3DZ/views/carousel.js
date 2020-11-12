const carousel = document.querySelector('.carousel'),
      slides = document.querySelector('.slides'),
      allSlides = document.querySelectorAll('.slide');

let slideWidth,
    slideEnd,
    slidePosition = 0;

function nav(i){
  slideWidth = window.getComputedStyle(allSlides[0]).getPropertyValue('width').replace('px', ''),
  visibleSlides = carousel.offsetWidth / slideWidth;
  slideWidthPc =  100 / visibleSlides;
  slidePosition = slidePosition + i * slideWidthPc;
  slideEnd = (allSlides.length * -slideWidthPc) + (slideWidthPc * visibleSlides);
  if(slidePosition < slideEnd){
    slidePosition = 0;
    slides.style.left = slidePosition + '%';
  } else if(slidePosition > 0) {
    slidePosition = slideEnd;
    slides.style.left = slidePosition + '%';
  } else {
    slides.style.left = slidePosition + '%';
  }
}
