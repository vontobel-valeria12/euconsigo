/* =========================================================
   KATZE.JS
   Eu Consigo - Begleiter
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const STORAGE_KEY = "euConsigoPet";


/*
  Estes são dados de teste.

  Depois vamos substituir pelos dados
  reais do cadastro do usuário.
*/

const DEFAULT_USER = {
  height: 1.67,
  startWeight: 86,
  currentWeight: 86,
  goalWeight: 70
};


/* =========================================================
   ELEMENTOS
========================================================= */

const cat =
  document.getElementById("cat");

const speechBubble =
  document.getElementById("speechBubble");

const phaseBadge =
  document.getElementById("phaseBadge");

const firstWeekArea =
  document.getElementById("firstWeekArea");

const dietArea =
  document.getElementById("dietArea");

const burgerButton =
  document.getElementById("burgerButton");

const saladButton =
  document.getElementById("saladButton");

const burgerCountElement =
  document.getElementById("burgerCount");

const userWeightElement =
  document.getElementById("userWeight");

const catProgressElement =
  document.getElementById("catProgress");

const weightStatusElement =
  document.getElementById("weightStatus");

const activityAnimation =
  document.getElementById("activityAnimation");

const waterTodayElement =
  document.getElementById("waterToday");

const newWeightInput =
  document.getElementById("newWeightInput");

const saveWeightButton =
  document.getElementById("saveWeightButton");

const healthyMealButton =
  document.getElementById("healthyMealButton");

const simulateWeekButton =
  document.getElementById("simulateWeekButton");

const resetGameButton =
  document.getElementById("resetGameButton");


/* =========================================================
   ESTADO
========================================================= */

let game = loadGame();


/* =========================================================
   CRIAR JOGO
========================================================= */

function createGame() {

  return {

    registrationDate:
      new Date().toISOString(),

    phase:
      "intro",

    burgers:
      0,

    waterToday:
      0,

    lastWaterDate:
      getToday(),

    user: {
      ...DEFAULT_USER
    }

  };

}


/* =========================================================
   LOAD / SAVE
========================================================= */

function loadGame() {

  const saved =
    localStorage.getItem(STORAGE_KEY);

  if (!saved) {

    const newGame = createGame();

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newGame)
    );

    return newGame;

  }

  return JSON.parse(saved);

}


function saveGame() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(game)
  );

}


/* =========================================================
   DATA
========================================================= */

function getToday() {

  return new Date()
    .toISOString()
    .split("T")[0];

}


/* =========================================================
   DIAS DESDE CADASTRO
========================================================= */

function getDaysSinceRegistration() {

  const start =
    new Date(game.registrationDate);

  const now =
    new Date();

  const difference =
    now - start;

  return Math.floor(
    difference /
    (1000 * 60 * 60 * 24)
  );

}


/* =========================================================
   BMI
========================================================= */

function calculateBMI(weight) {

  const height =
    game.user.height;

  return weight /
    (height * height);

}


/* =========================================================
   CLASSIFICAÇÃO
========================================================= */

function getWeightStage(weight) {

  const bmi =
    calculateBMI(weight);

  if (bmi < 18.5) {
    return {
      stage: 0,
      label: "Untergewicht"
    };
  }

  if (bmi < 25) {
    return {
      stage: 1,
      label: "Normalbereich"
    };
  }

  if (bmi < 30) {
    return {
      stage: 2,
      label: "Übergewicht"
    };
  }

  if (bmi < 35) {
    return {
      stage: 3,
      label: "Adipositas I"
    };
  }

  if (bmi < 40) {
    return {
      stage: 4,
      label: "Adipositas II"
    };
  }

  return {
    stage: 5,
    label: "Adipositas III"
  };

}


/* =========================================================
   ESTÁGIO VISUAL NA PRIMEIRA SEMANA
========================================================= */

function getIntroStage() {

  const initialStage =
    getWeightStage(
      game.user.startWeight
    ).stage;

  const days =
    Math.min(
      getDaysSinceRegistration(),
      6
    );

  /*
    Durante a primeira semana
    Miau fica progressivamente
    mais gordinho.

    Ele nunca passa do stage 5.
  */

  const extra =
    Math.floor(days / 2);

  return Math.min(
    5,
    initialStage + extra
  );

}


/* =========================================================
   APLICAR APARÊNCIA
========================================================= */

function setCatStage(stage) {

  cat.classList.remove(
    "stage-0",
    "stage-1",
    "stage-2",
    "stage-3",
    "stage-4",
    "stage-5"
  );

  cat.classList.add(
    `stage-${stage}`
  );

}


/* =========================================================
   VERIFICAR FASE
========================================================= */

function checkPhase() {

  const days =
    getDaysSinceRegistration();

  if (
    days >= 7 &&
    game.phase === "intro"
  ) {

    game.phase = "diet";

    saveGame();

    startDietStory();

  }

}


/* =========================================================
   HISTÓRIA DA DIETA
========================================================= */

function startDietStory() {

  speechBubble.textContent =
    "Oh je... ich fühle mich ganz schön rund. 😿 Hilfst du mir? Ich helfe dir auch!";

  cat.classList.add("happy");

  setTimeout(() => {

    cat.classList.remove("happy");

  }, 700);

}


/* =========================================================
   BURGER
========================================================= */

burgerButton.addEventListener(
  "click",
  () => {

    if (game.phase !== "intro") {

      speechBubble.textContent =
        "Burger-Woche ist vorbei. 😹 Jetzt machen wir das zusammen!";

      return;

    }

    game.burgers++;

    burgerCountElement.textContent =
      game.burgers;

    speechBubble.textContent =
      "Mmmh! Noch einen! 😻🍔";

    activityAnimation.textContent =
      "🍔";

    cat.classList.add("happy");

    setTimeout(() => {

      cat.classList.remove("happy");

      activityAnimation.textContent =
        "";

    }, 700);

    saveGame();

  }
);


/* =========================================================
   SALADA PRIMEIRA SEMANA
========================================================= */

saladButton.addEventListener(
  "click",
  () => {

    if (game.phase === "intro") {

      speechBubble.textContent =
        "Salat?! 😾 Nein! Ich will einen Burger! 🍔";

      activityAnimation.textContent =
        "🥬❌";

      setTimeout(() => {

        activityAnimation.textContent =
          "";

      }, 1000);

      return;

    }

  }
);


/* =========================================================
   HABIT BUTTONS
========================================================= */

document
  .querySelectorAll(".habit-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const habit =
          button.dataset.habit;

        openHabitPanel(habit);

      }
    );

  });


function openHabitPanel(habit) {

  document
    .querySelectorAll(".habit-panel")
    .forEach(panel => {

      panel.classList.add("hidden");

    });


  const panel =
    document.getElementById(
      `${habit}Panel`
    );

  if (panel) {

    panel.classList.remove(
      "hidden"
    );

  }

}


/* =========================================================
   WATER
========================================================= */

document
  .querySelectorAll("[data-water]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        resetWaterIfNewDay();

        const amount =
          Number(
            button.dataset.water
          );

        game.waterToday +=
          amount;

        waterTodayElement.textContent =
          `${game.waterToday} ml`;

        speechBubble.textContent =
          "Danke! 💧 Dann trinke ich auch!";

        activityAnimation.textContent =
          "💧";

        cat.classList.add(
          "drinking"
        );

        setTimeout(() => {

          cat.classList.remove(
            "drinking"
          );

          activityAnimation.textContent =
            "";

        }, 1600);

        saveGame();

      }
    );

  });


function resetWaterIfNewDay() {

  const today =
    getToday();

  if (
    game.lastWaterDate !== today
  ) {

    game.waterToday = 0;

    game.lastWaterDate =
      today;

  }

}


/* =========================================================
   HEALTHY FOOD
========================================================= */

healthyMealButton.addEventListener(
  "click",
  () => {

    speechBubble.textContent =
      "Mmmh! 🥗 Heute essen wir zusammen.";

    activityAnimation.textContent =
      "🥗";

    cat.classList.add(
      "happy"
    );

    setTimeout(() => {

      cat.classList.remove(
        "happy"
      );

      activityAnimation.textContent =
        "";

    }, 1000);

  }
);


/* =========================================================
   SPORT
========================================================= */

document
  .querySelectorAll("[data-sport]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const sport =
          button.dataset.sport;

        let emoji = "🏃";

        if (sport === "walk") {
          emoji = "🚶";
        }

        if (sport === "cycling") {
          emoji = "🚲";
        }

        speechBubble.textContent =
          "Komm! Wir bewegen uns zusammen! 🐾";

        activityAnimation.textContent =
          emoji;

        cat.classList.add(
          "exercise"
        );

        setTimeout(() => {

          cat.classList.remove(
            "exercise"
          );

          activityAnimation.textContent =
            "";

        }, 2300);

      }
    );

  });


/* =========================================================
   PESO
========================================================= */

saveWeightButton.addEventListener(
  "click",
  () => {

    const newWeight =
      Number(
        newWeightInput.value
      );

    if (
      !newWeight ||
      newWeight < 30 ||
      newWeight > 300
    ) {

      speechBubble.textContent =
        "Bitte gib ein gültiges Gewicht ein.";

      return;

    }


    const oldWeight =
      game.user.currentWeight;

    const difference =
      newWeight - oldWeight;


    game.user.currentWeight =
      newWeight;


    if (difference < 0) {

      speechBubble.textContent =
        `Wir haben ${Math.abs(difference).toFixed(1)} kg Fortschritt gemacht! 🎉🐱`;

    }

    else if (difference > 0) {

      speechBubble.textContent =
        "Unser Gewicht hat sich etwas verändert. Wir machen gemeinsam weiter. ❤️";

    }

    else {

      speechBubble.textContent =
        "Heute ist unser Gewicht gleich geblieben. 🐾";

    }


    newWeightInput.value =
      "";

    saveGame();

    render();

  }
);


/* =========================================================
   PROGRESSO DO GATO
========================================================= */

function getCatProgress() {

  const difference =
    game.user.startWeight -
    game.user.currentWeight;

  return difference;

}


/* =========================================================
   TESTE 7 DIAS
========================================================= */

simulateWeekButton.addEventListener(
  "click",
  () => {

    const date =
      new Date();

    date.setDate(
      date.getDate() - 8
    );

    game.registrationDate =
      date.toISOString();

    game.phase =
      "intro";

    saveGame();

    checkPhase();

    render();

  }
);


/* =========================================================
   RESET
========================================================= */

resetGameButton.addEventListener(
  "click",
  () => {

    localStorage.removeItem(
      STORAGE_KEY
    );

    game =
      createGame();

    saveGame();

    render();

  }
);


/* =========================================================
   RENDER
========================================================= */

function render() {

  resetWaterIfNewDay();

  checkPhase();


  const currentWeight =
    game.user.currentWeight;


  const currentStatus =
    getWeightStage(
      currentWeight
    );


  userWeightElement.textContent =
    `${currentWeight.toFixed(1)} kg`;


  weightStatusElement.textContent =
    currentStatus.label;


  const progress =
    getCatProgress();


  if (progress > 0) {

    catProgressElement.textContent =
      `-${progress.toFixed(1)} kg`;

  }

  else if (progress < 0) {

    catProgressElement.textContent =
      `+${Math.abs(progress).toFixed(1)} kg`;

  }

  else {

    catProgressElement.textContent =
      "0 kg";

  }


  burgerCountElement.textContent =
    game.burgers;


  waterTodayElement.textContent =
    `${game.waterToday} ml`;


  /* PRIMEIRA SEMANA */

  if (game.phase === "intro") {

    firstWeekArea.classList.remove(
      "hidden"
    );

    dietArea.classList.add(
      "hidden"
    );


    phaseBadge.textContent =
      "Kennenlernphase";


    const days =
      getDaysSinceRegistration();


    speechBubble.textContent =
      days === 0
        ? "Hallo! Ich bin Miau. Ich habe Hunger! 🍔"
        : "Hast du vielleicht einen Burger für mich? 😻🍔";


    setCatStage(
      getIntroStage()
    );

  }


  /* FASE DIETA */

  else {

    firstWeekArea.classList.add(
      "hidden"
    );

    dietArea.classList.remove(
      "hidden"
    );


    phaseBadge.textContent =
      "Gemeinsam gesund";


    setCatStage(
      currentStatus.stage
    );


    /*
      Mensagem inicial baseada
      no que ainda não foi registrado.
    */

    if (game.waterToday === 0) {

      speechBubble.textContent =
        "Ich habe Durst. 💧 Wie viel Wasser haben wir heute schon getrunken?";

    }

  }


  saveGame();

}


/* =========================================================
   START
========================================================= */

render();