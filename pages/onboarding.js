/* =========================================================
   ONBOARDING.JS
   Mein Fortschritt

   Lógica exclusiva da página de onboarding.

   Responsabilidades deste arquivo:
   - Controle do slider
   - Navegação anterior e próxima
   - Navegação pelos dots
   - Navegação por teclado
   - Swipe em dispositivos touch
   - Drag com mouse
   - Atualização dos estados visuais
   - Atualização dos atributos de acessibilidade
   - Inicialização do onboarding

   Estrutura relacionada:
   onboarding.html

   Estilos relacionados:
   onboarding.css
========================================================= */



/* =========================================================
   01. DOM REFERENCES
   Referências principais da página
========================================================= */

const slidesContainer =
  document.getElementById(
    "slides"
  );


const slides =
  document.querySelectorAll(
    ".slide"
  );


const previousButton =
  document.getElementById(
    "previous-slide"
  );


const nextButton =
  document.getElementById(
    "next-slide"
  );


const dots =
  document.querySelectorAll(
    ".slider-dot"
  );



/* =========================================================
   02. SLIDER STATE
   Estado atual do slider
========================================================= */

let currentSlide =
  0;



/* =========================================================
   03. SHOW SLIDE
   Exibe o slide correspondente ao índice informado
========================================================= */

function showSlide(
  index
) {

  /* =======================================================
     INDEX LOOP
     Volta ao último ou primeiro slide quando necessário
  ======================================================== */

  if (
    index < 0
  ) {

    index =
      slides.length - 1;

  }


  if (
    index >= slides.length
  ) {

    index =
      0;

  }



  /* =======================================================
     CURRENT SLIDE
  ======================================================== */

  currentSlide =
    index;



  /* =======================================================
     SLIDER POSITION
  ======================================================== */

  slidesContainer.style.transform =
    `translateX(-${currentSlide * 100}%)`;



  /* =======================================================
     UPDATE DOTS
  ======================================================== */

  dots.forEach(
    function (
      dot,
      dotIndex
    ) {

      const isActive =
        dotIndex ===
        currentSlide;


      dot.classList.toggle(
        "active",
        isActive
      );


      if (
        isActive
      ) {

        dot.setAttribute(
          "aria-current",
          "true"
        );

      }

      else {

        dot.removeAttribute(
          "aria-current"
        );

      }

    }
  );



  /* =======================================================
     UPDATE SLIDES
  ======================================================== */

  slides.forEach(
    function (
      slide,
      slideIndex
    ) {

      const isActive =
        slideIndex ===
        currentSlide;


      slide.classList.toggle(
        "active",
        isActive
      );


      slide.setAttribute(
        "aria-hidden",
        String(
          !isActive
        )
      );

    }
  );

}



/* =========================================================
   04. NEXT SLIDE
   Avança para o próximo slide
========================================================= */

function nextSlide() {

  showSlide(
    currentSlide + 1
  );

}



/* =========================================================
   05. PREVIOUS SLIDE
   Retorna ao slide anterior
========================================================= */

function previousSlide() {

  showSlide(
    currentSlide - 1
  );

}



/* =========================================================
   06. ARROW BUTTONS
   Eventos dos botões anterior e próximo
========================================================= */

nextButton.addEventListener(
  "click",
  nextSlide
);


previousButton.addEventListener(
  "click",
  previousSlide
);



/* =========================================================
   07. SLIDER DOTS
   Navegação direta entre slides
========================================================= */

dots.forEach(
  function (
    dot
  ) {

    dot.addEventListener(
      "click",
      function () {

        const slideIndex =
          Number(
            this.dataset.slide
          );


        showSlide(
          slideIndex
        );

      }
    );

  }
);



/* =========================================================
   08. KEYBOARD NAVIGATION
   Navegação usando as setas do teclado
========================================================= */

document.addEventListener(
  "keydown",
  function (
    event
  ) {

    if (
      event.key ===
      "ArrowRight"
    ) {

      nextSlide();

    }


    if (
      event.key ===
      "ArrowLeft"
    ) {

      previousSlide();

    }

  }
);



/* =========================================================
   09. TOUCH STATE
   Dados utilizados pelo gesto de swipe
========================================================= */

let touchStartX =
  0;


let touchEndX =
  0;


const minimumSwipeDistance =
  50;



/* =========================================================
   10. TOUCH START
   Registra o ponto inicial do toque
========================================================= */

slidesContainer.addEventListener(
  "touchstart",
  function (
    event
  ) {

    touchStartX =
      event.changedTouches[0]
        .screenX;

  },
  {
    passive: true
  }
);



/* =========================================================
   11. TOUCH END
   Registra o ponto final e processa o swipe
========================================================= */

slidesContainer.addEventListener(
  "touchend",
  function (
    event
  ) {

    touchEndX =
      event.changedTouches[0]
        .screenX;


    handleSwipe();

  },
  {
    passive: true
  }
);



/* =========================================================
   12. HANDLE SWIPE
   Identifica a direção do gesto touch
========================================================= */

function handleSwipe() {

  const swipeDistance =
    touchStartX -
    touchEndX;



  /* =======================================================
     SWIPE LEFT
     Próximo slide
  ======================================================== */

  if (
    swipeDistance >
    minimumSwipeDistance
  ) {

    nextSlide();

    return;

  }



  /* =======================================================
     SWIPE RIGHT
     Slide anterior
  ======================================================== */

  if (
    swipeDistance <
    -minimumSwipeDistance
  ) {

    previousSlide();

  }

}



/* =========================================================
   13. MOUSE DRAG STATE
   Dados utilizados para arrastar com mouse
========================================================= */

let mouseStartX =
  0;


let mouseEndX =
  0;


let isDragging =
  false;


const minimumDragDistance =
  70;



/* =========================================================
   14. MOUSE DOWN
   Inicia o movimento de arrastar
========================================================= */

slidesContainer.addEventListener(
  "mousedown",
  function (
    event
  ) {

    isDragging =
      true;


    mouseStartX =
      event.clientX;

  }
);



/* =========================================================
   15. MOUSE UP
   Finaliza o movimento e verifica a direção
========================================================= */

slidesContainer.addEventListener(
  "mouseup",
  function (
    event
  ) {

    if (
      !isDragging
    ) {

      return;

    }


    mouseEndX =
      event.clientX;


    isDragging =
      false;


    handleMouseDrag();

  }
);



/* =========================================================
   16. MOUSE LEAVE
   Cancela o drag quando o mouse sai do slider
========================================================= */

slidesContainer.addEventListener(
  "mouseleave",
  function () {

    isDragging =
      false;

  }
);



/* =========================================================
   17. HANDLE MOUSE DRAG
   Identifica a direção do movimento com mouse
========================================================= */

function handleMouseDrag() {

  const dragDistance =
    mouseStartX -
    mouseEndX;



  /* =======================================================
     DRAG LEFT
     Próximo slide
  ======================================================== */

  if (
    dragDistance >
    minimumDragDistance
  ) {

    nextSlide();

    return;

  }



  /* =======================================================
     DRAG RIGHT
     Slide anterior
  ======================================================== */

  if (
    dragDistance <
    -minimumDragDistance
  ) {

    previousSlide();

  }

}



/* =========================================================
   18. IMAGE DRAG PROTECTION
   Impede o navegador de arrastar as imagens dos slides
========================================================= */

const slideImages =
  document.querySelectorAll(
    ".slide img"
  );


slideImages.forEach(
  function (
    image
  ) {

    image.setAttribute(
      "draggable",
      "false"
    );

  }
);



/* =========================================================
   19. INITIALIZATION
   Inicializa o onboarding no primeiro slide
========================================================= */

function initOnboarding() {

  showSlide(
    0
  );

}


initOnboarding();



/* =========================================================
   20. FILE END
========================================================= */