/* ==================================================
   ONBOARDING SLIDER
================================================== */

const slidesContainer = document.getElementById("slides");
const slides = document.querySelectorAll(".slide");

const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");

const dots = document.querySelectorAll(".slider-dot");

let currentSlide = 0;


/* ==================================================
   MOSTRAR SLIDE
================================================== */

function showSlide(index) {

  if (index < 0) {
    index = slides.length - 1;
  }

  if (index >= slides.length) {
    index = 0;
  }

  currentSlide = index;

  slidesContainer.style.transform =
    `translateX(-${currentSlide * 100}%)`;


  /* Atualizar bolinhas */

  dots.forEach((dot, dotIndex) => {

    if (dotIndex === currentSlide) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }

  });


  /* Atualizar slides */

  slides.forEach((slide, slideIndex) => {

    if (slideIndex === currentSlide) {

      slide.classList.add("active");

      slide.setAttribute(
        "aria-hidden",
        "false"
      );

    } else {

      slide.classList.remove("active");

      slide.setAttribute(
        "aria-hidden",
        "true"
      );

    }

  });

}


/* ==================================================
   PRÓXIMO
================================================== */

function nextSlide() {
  showSlide(currentSlide + 1);
}


/* ==================================================
   ANTERIOR
================================================== */

function previousSlide() {
  showSlide(currentSlide - 1);
}


/* ==================================================
   BOTÕES
================================================== */

nextButton.addEventListener(
  "click",
  nextSlide
);


previousButton.addEventListener(
  "click",
  previousSlide
);


/* ==================================================
   DOTS
================================================== */

dots.forEach((dot) => {

  dot.addEventListener(
    "click",
    function () {

      const slideIndex =
        Number(this.dataset.slide);

      showSlide(slideIndex);

    }
  );

});


/* ==================================================
   TECLADO
================================================== */

document.addEventListener(
  "keydown",
  function (event) {

    if (event.key === "ArrowRight") {
      nextSlide();
    }

    if (event.key === "ArrowLeft") {
      previousSlide();
    }

  }
);


/* ==================================================
   SWIPE / TOUCH
================================================== */

let touchStartX = 0;
let touchEndX = 0;


slidesContainer.addEventListener(
  "touchstart",
  function (event) {

    touchStartX =
      event.changedTouches[0].screenX;

  },
  {
    passive: true
  }
);


slidesContainer.addEventListener(
  "touchend",
  function (event) {

    touchEndX =
      event.changedTouches[0].screenX;

    handleSwipe();

  },
  {
    passive: true
  }
);


function handleSwipe() {

  const swipeDistance =
    touchStartX - touchEndX;


  const minimumSwipeDistance = 50;


  /*
    Movimento para esquerda
  */

  if (
    swipeDistance >
    minimumSwipeDistance
  ) {

    nextSlide();

  }


  /*
    Movimento para direita
  */

  if (
    swipeDistance <
    -minimumSwipeDistance
  ) {

    previousSlide();

  }

}


/* ==================================================
   MOUSE DRAG
================================================== */

let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;


slidesContainer.addEventListener(
  "mousedown",
  function (event) {

    isDragging = true;

    mouseStartX =
      event.clientX;

  }
);


slidesContainer.addEventListener(
  "mouseup",
  function (event) {

    if (!isDragging) {
      return;
    }

    mouseEndX =
      event.clientX;

    isDragging = false;

    handleMouseDrag();

  }
);


slidesContainer.addEventListener(
  "mouseleave",
  function () {

    isDragging = false;

  }
);


function handleMouseDrag() {

  const dragDistance =
    mouseStartX - mouseEndX;


  const minimumDragDistance = 70;


  if (
    dragDistance >
    minimumDragDistance
  ) {

    nextSlide();

  }


  if (
    dragDistance <
    -minimumDragDistance
  ) {

    previousSlide();

  }

}


/* ==================================================
   IMPEDIR ARRASTAR IMAGENS
================================================== */

const images =
  document.querySelectorAll(
    ".slide img"
  );


images.forEach((image) => {

  image.setAttribute(
    "draggable",
    "false"
  );

});


/* ==================================================
   INICIAR
================================================== */

showSlide(0);
