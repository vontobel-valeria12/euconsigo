/* =========================================================
   01. KATZE - CONFIGURATION
========================================================= */

const CAT_STORAGE_KEY =
  "euConsigoCat";

const DASHBOARD_WATER_STORAGE_KEY =
  "euConsigoWater";

const DAILY_WATER_GOAL =
  2000;

const ACTION_DURATION =
  3000;

const SLEEP_START_HOUR =
  22;

const SLEEP_END_HOUR =
  6;



/* =========================================================
   02. KATZE - MIAU IMAGES
========================================================= */

const MIAU_IMAGES = {

  normal:
    "img/miau-normal.png",

  hungry:
    "img/miau-fome.png",

  thirsty:
    "img/miau-sede.png",

  drinking:
    "img/miau-agua.png",

  eating:
    "img/miau-comendo.png",

  exercise:
    "img/miau-exercicio.png",

  sleeping:
    "img/miau-dormindo.png",

  happy:
    "img/miau-feliz.png",

  mirror:
    "img/miau-espelho.png"

};



/* =========================================================
   03. KATZE - DOM ELEMENTS
========================================================= */

const petStatusBadge =
  document.getElementById(
    "petStatusBadge"
  );


const speechText =
  document.getElementById(
    "speechText"
  );


const miauImage =
  document.getElementById(
    "miauImage"
  );


const activityEffect =
  document.getElementById(
    "activityEffect"
  );


const dailyMessage =
  document.getElementById(
    "dailyMessage"
  );


const userWeight =
  document.getElementById(
    "userWeight"
  );


const waterToday =
  document.getElementById(
    "waterToday"
  );


const miauMood =
  document.getElementById(
    "miauMood"
  );


const habitButtons =
  document.querySelectorAll(
    ".habit-button"
  );


const waterPanel =
  document.getElementById(
    "waterPanel"
  );


const foodPanel =
  document.getElementById(
    "foodPanel"
  );


const movementPanel =
  document.getElementById(
    "movementPanel"
  );


const weightPanel =
  document.getElementById(
    "weightPanel"
  );


const waterQuickButtons =
  document.querySelectorAll(
    "[data-water]"
  );


const waterPanelValue =
  document.getElementById(
    "waterPanelValue"
  );


const waterProgressFill =
  document.getElementById(
    "waterProgressFill"
  );


const healthyMealButton =
  document.getElementById(
    "healthyMealButton"
  );


const movementButtons =
  document.querySelectorAll(
    "[data-movement]"
  );


const newWeightInput =
  document.getElementById(
    "newWeightInput"
  );


const saveWeightButton =
  document.getElementById(
    "saveWeightButton"
  );


const waterGoalItem =
  document.getElementById(
    "waterGoalItem"
  );


const waterGoalStatus =
  document.getElementById(
    "waterGoalStatus"
  );


const foodGoalItem =
  document.getElementById(
    "foodGoalItem"
  );


const foodGoalStatus =
  document.getElementById(
    "foodGoalStatus"
  );


const movementGoalItem =
  document.getElementById(
    "movementGoalItem"
  );


const movementGoalStatus =
  document.getElementById(
    "movementGoalStatus"
  );



/* =========================================================
   04. KATZE - DEFAULT STATE
========================================================= */

function createDefaultCatState() {

  return {

    date:
      getLocalToday(),

    waterToday:
      0,

    healthyMealLogged:
      false,

    movementLogged:
      false,

    movementType:
      "",

    lastWeight:
      null,

    lastNeed:
      "",

    updatedAt:
      new Date().toISOString()

  };

}



/* =========================================================
   05. KATZE - LOAD STATE
========================================================= */

function loadCatState() {

  const savedState =
    loadStorageData(
      CAT_STORAGE_KEY,
      null
    );


  if (!savedState) {

    return createDefaultCatState();

  }


  const today =
    getLocalToday();


  if (
    savedState.date !== today
  ) {

    return createDefaultCatState();

  }


  return {

    ...createDefaultCatState(),

    ...savedState

  };

}



/* =========================================================
   06. KATZE - SAVE STATE
========================================================= */

function saveCatState() {

  catState.updatedAt =
    new Date().toISOString();


  saveStorageData(
    CAT_STORAGE_KEY,
    catState
  );

}



/* =========================================================
   07. KATZE - CURRENT STATE
========================================================= */

let catState =
  loadCatState();


let actionTimer =
  null;


let effectTimer =
  null;



/* =========================================================
   08. KATZE - SLEEP TIME
========================================================= */

function isSleepTime() {

  const currentHour =
    new Date().getHours();


  return (
    currentHour >=
      SLEEP_START_HOUR ||
    currentHour <
      SLEEP_END_HOUR
  );

}



/* =========================================================
   09. KATZE - LOAD DASHBOARD WATER
========================================================= */

function loadDashboardWater() {

  const savedWater =
    loadStorageData(
      DASHBOARD_WATER_STORAGE_KEY,
      null
    );


  if (!savedWater) {

    return;

  }


  const waterAmount =
    toNumber(
      savedWater.amount
    );


  if (
    savedWater.date ===
      getLocalToday() &&
    isFiniteNumber(
      waterAmount
    )
  ) {

    catState.waterToday =
      Math.max(
        catState.waterToday,
        waterAmount
      );

  }

}



/* =========================================================
   10. KATZE - SAVE DASHBOARD WATER
========================================================= */

function saveDashboardWater() {

  saveStorageData(
    DASHBOARD_WATER_STORAGE_KEY,
    {

      date:
        getLocalToday(),

      amount:
        catState.waterToday,

      updatedAt:
        new Date().toISOString()

    }
  );

}



/* =========================================================
   11. KATZE - SET MIAU IMAGE
========================================================= */

function setMiauImage(state) {

  if (!miauImage) {

    return;

  }


  const source =
    MIAU_IMAGES[state];


  if (!source) {

    return;

  }


  if (
    miauImage.getAttribute(
      "src"
    ) === source
  ) {

    return;

  }


  miauImage.classList.add(
    "is-changing"
  );


  window.setTimeout(
    () => {

      miauImage.src =
        source;


      miauImage.classList.remove(
        "is-changing"
      );


      miauImage.classList.add(
        "is-active"
      );

    },
    160
  );

}



/* =========================================================
   12. KATZE - SPEECH
========================================================= */

function setSpeech(message) {

  if (!speechText) {

    return;

  }


  speechText.textContent =
    message;

}



/* =========================================================
   13. KATZE - STATUS BADGE
========================================================= */

function setStatusBadge(message) {

  if (!petStatusBadge) {

    return;

  }


  petStatusBadge.textContent =
    message;

}



/* =========================================================
   14. KATZE - ACTIVITY EFFECT
========================================================= */

function showActivityEffect(symbol) {

  if (!activityEffect) {

    return;

  }


  if (effectTimer) {

    window.clearTimeout(
      effectTimer
    );

  }


  activityEffect.classList.remove(
    "active"
  );


  void activityEffect.offsetWidth;


  activityEffect.textContent =
    symbol;


  activityEffect.classList.add(
    "active"
  );


  effectTimer =
    window.setTimeout(
      () => {

        activityEffect.classList.remove(
          "active"
        );


        activityEffect.textContent =
          "";

      },
      1300
    );

}



/* =========================================================
   15. KATZE - TEMPORARY ACTION
========================================================= */

function showTemporaryAction(
  state,
  message,
  symbol
) {

  if (actionTimer) {

    window.clearTimeout(
      actionTimer
    );

  }


  setMiauImage(
    state
  );


  setSpeech(
    message
  );


  showActivityEffect(
    symbol
  );


  actionTimer =
    window.setTimeout(
      () => {

        updateMiauMainState();

      },
      ACTION_DURATION
    );

}



/* =========================================================
   16. KATZE - USER WEIGHT
========================================================= */

function renderUserWeight() {

  const user =
    getUser();


  const weight =
    toNumber(
      user.currentWeight
    );


  if (
    !isFiniteNumber(
      weight
    )
  ) {

    if (userWeight) {

      userWeight.textContent =
        "-- kg";

    }

    return;

  }


  if (userWeight) {

    userWeight.textContent =
      `${formatWeightValue(weight)} kg`;

  }


  if (newWeightInput) {

    newWeightInput.value =
      weight;

  }

}



/* =========================================================
   17. KATZE - WATER
========================================================= */

function renderWater() {

  const amount =
    Math.max(
      0,
      toNumber(
        catState.waterToday
      ) || 0
    );


  const percentage =
    clampPercentage(
      (
        amount /
        DAILY_WATER_GOAL
      ) * 100
    );


  if (waterToday) {

    waterToday.textContent =
      `${Math.round(amount)} ml`;

  }


  if (waterPanelValue) {

    waterPanelValue.textContent =
      `${Math.round(amount)} ml`;

  }


  if (waterProgressFill) {

    waterProgressFill.style.width =
      `${percentage}%`;

  }

}



/* =========================================================
   18. KATZE - WATER GOAL
========================================================= */

function renderWaterGoal() {

  const completed =
    catState.waterToday >=
    DAILY_WATER_GOAL;


  if (waterGoalItem) {

    waterGoalItem.classList.toggle(
      "completed",
      completed
    );

  }


  if (waterGoalStatus) {

    waterGoalStatus.textContent =
      completed
        ? "Erledigt"
        : "Offen";

  }

}



/* =========================================================
   19. KATZE - FOOD GOAL
========================================================= */

function renderFoodGoal() {

  const completed =
    catState.healthyMealLogged;


  if (foodGoalItem) {

    foodGoalItem.classList.toggle(
      "completed",
      completed
    );

  }


  if (foodGoalStatus) {

    foodGoalStatus.textContent =
      completed
        ? "Erledigt"
        : "Offen";

  }

}



/* =========================================================
   20. KATZE - MOVEMENT GOAL
========================================================= */

function renderMovementGoal() {

  const completed =
    catState.movementLogged;


  if (movementGoalItem) {

    movementGoalItem.classList.toggle(
      "completed",
      completed
    );

  }


  if (movementGoalStatus) {

    movementGoalStatus.textContent =
      completed
        ? "Erledigt"
        : "Offen";

  }

}



/* =========================================================
   21. KATZE - MOOD
========================================================= */

function renderMiauMood() {

  if (!miauMood) {

    return;

  }


  if (isSleepTime()) {

    miauMood.textContent =
      "Müde";

    return;

  }


  const allBalanced =
    catState.waterToday >=
      DAILY_WATER_GOAL &&
    catState.healthyMealLogged &&
    catState.movementLogged;


  if (allBalanced) {

    miauMood.textContent =
      "Ausgeglichen";

    return;

  }


  miauMood.textContent =
    "Motiviert";

}



/* =========================================================
   22. KATZE - DAILY MESSAGE
========================================================= */

function renderDailyMessage() {

  if (!dailyMessage) {

    return;

  }


  const completedGoals =
    [

      catState.waterToday >=
        DAILY_WATER_GOAL,

      catState.healthyMealLogged,

      catState.movementLogged

    ]
      .filter(Boolean)
      .length;


  if (
    completedGoals === 3
  ) {

    dailyMessage.innerHTML =
      "<span aria-hidden=\"true\">🌿</span><span>Heute ist alles im Gleichgewicht.</span>";

    return;

  }


  if (
    completedGoals === 2
  ) {

    dailyMessage.innerHTML =
      "<span aria-hidden=\"true\">🐾</span><span>Nur noch eine Sache fehlt heute.</span>";

    return;

  }


  if (
    completedGoals === 1
  ) {

    dailyMessage.innerHTML =
      "<span aria-hidden=\"true\">❤️</span><span>Wir sind auf einem guten Weg.</span>";

    return;

  }


  dailyMessage.innerHTML =
    "<span aria-hidden=\"true\">🐾</span><span>Gemeinsam Schritt für Schritt.</span>";

}



/* =========================================================
   23. KATZE - OPEN NEEDS
========================================================= */

function getOpenNeeds() {

  const needs =
    [];


  if (
    catState.waterToday <
    DAILY_WATER_GOAL
  ) {

    needs.push(
      "thirsty"
    );

  }


  if (
    !catState.healthyMealLogged
  ) {

    needs.push(
      "hungry"
    );

  }


  if (
    !catState.movementLogged
  ) {

    needs.push(
      "exercise"
    );

  }


  return needs;

}



/* =========================================================
   24. KATZE - SELECT NEXT NEED
========================================================= */

function selectNextNeed() {

  const needs =
    getOpenNeeds();


  if (
    needs.length === 0
  ) {

    catState.lastNeed =
      "";


    saveCatState();


    return "normal";

  }


  let selectedIndex =
    0;


  const previousIndex =
    needs.indexOf(
      catState.lastNeed
    );


  if (
    previousIndex !== -1
  ) {

    selectedIndex =
      (
        previousIndex + 1
      ) %
      needs.length;

  }


  const selectedNeed =
    needs[selectedIndex];


  catState.lastNeed =
    selectedNeed;


  saveCatState();


  return selectedNeed;

}



/* =========================================================
   25. KATZE - HUNGRY STATE
========================================================= */

function showHungryState() {

  setMiauImage(
    "hungry"
  );


  setSpeech(
    "Ich habe Hunger. Essen wir etwas Gesundes?"
  );


  setStatusBadge(
    "Zeit zum Essen"
  );

}



/* =========================================================
   26. KATZE - THIRSTY STATE
========================================================= */

function showThirstyState() {

  setMiauImage(
    "thirsty"
  );


  setSpeech(
    "Ich habe Durst. Trinken wir etwas Wasser? 💧"
  );


  setStatusBadge(
    "Zeit für Wasser"
  );

}



/* =========================================================
   27. KATZE - EXERCISE STATE
========================================================= */

function showExerciseState() {

  setMiauImage(
    "exercise"
  );


  setSpeech(
    "Zeit für ein bisschen Bewegung. Kommst du mit? 🐾"
  );


  setStatusBadge(
    "Zeit für Bewegung"
  );

}



/* =========================================================
   28. KATZE - SLEEPING STATE
========================================================= */

function showSleepingState() {

  setMiauImage(
    "sleeping"
  );


  setSpeech(
    "Jetzt ist Zeit zum Ausruhen. 😴"
  );


  setStatusBadge(
    "Ruhezeit"
  );

}



/* =========================================================
   29. KATZE - NORMAL STATE
========================================================= */

function showNormalState() {

  setMiauImage(
    "normal"
  );


  setSpeech(
    "Alles ist im Gleichgewicht. 🐾"
  );


  setStatusBadge(
    "Alles im Gleichgewicht"
  );

}



/* =========================================================
   30. KATZE - MAIN STATE
========================================================= */

function updateMiauMainState() {

  if (isSleepTime()) {

    showSleepingState();

    renderMiauMood();

    return;

  }


  const nextNeed =
    selectNextNeed();


  if (
    nextNeed === "thirsty"
  ) {

    showThirstyState();

    return;

  }


  if (
    nextNeed === "hungry"
  ) {

    showHungryState();

    return;

  }


  if (
    nextNeed === "exercise"
  ) {

    showExerciseState();

    return;

  }


  showNormalState();

}



/* =========================================================
   31. KATZE - RENDER PAGE
========================================================= */

function renderCatPage() {

  renderUserWeight();

  renderWater();

  renderWaterGoal();

  renderFoodGoal();

  renderMovementGoal();

  renderMiauMood();

  renderDailyMessage();

}



/* =========================================================
   32. KATZE - CLOSE PANELS
========================================================= */

function closeHabitPanels() {

  const panels =
    [

      waterPanel,

      foodPanel,

      movementPanel,

      weightPanel

    ];


  panels.forEach(
    (panel) => {

      if (panel) {

        panel.classList.add(
          "hidden"
        );

      }

    }
  );


  habitButtons.forEach(
    (button) => {

      button.classList.remove(
        "active"
      );

    }
  );

}



/* =========================================================
   33. KATZE - OPEN PANEL
========================================================= */

function openHabitPanel(habit) {

  closeHabitPanels();


  const selectedButton =
    document.querySelector(
      `.habit-button[data-habit="${habit}"]`
    );


  if (selectedButton) {

    selectedButton.classList.add(
      "active"
    );

  }


  if (
    habit === "water" &&
    waterPanel
  ) {

    waterPanel.classList.remove(
      "hidden"
    );


    if (
      catState.waterToday <
      DAILY_WATER_GOAL
    ) {

      showThirstyState();

    } else {

      setMiauImage(
        "normal"
      );


      setSpeech(
        "Unser Wasserziel ist heute schon geschafft. 💧"
      );

    }

  }


  if (
    habit === "food" &&
    foodPanel
  ) {

    foodPanel.classList.remove(
      "hidden"
    );


    if (
      !catState.healthyMealLogged
    ) {

      showHungryState();

    } else {

      setMiauImage(
        "normal"
      );


      setSpeech(
        "Unsere Mahlzeit ist heute schon eingetragen. 🌿"
      );

    }

  }


  if (
    habit === "movement" &&
    movementPanel
  ) {

    movementPanel.classList.remove(
      "hidden"
    );


    if (
      !catState.movementLogged
    ) {

      showExerciseState();

    } else {

      setMiauImage(
        "normal"
      );


      setSpeech(
        "Wir waren heute schon aktiv. 🐾"
      );

    }

  }


  if (
    habit === "weight" &&
    weightPanel
  ) {

    weightPanel.classList.remove(
      "hidden"
    );


    setMiauImage(
      "normal"
    );


    setSpeech(
      "Wie sieht dein Gewicht heute aus?"
    );

  }

}



/* =========================================================
   34. KATZE - HABIT BUTTONS
========================================================= */

habitButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        openHabitPanel(
          button.dataset.habit
        );

      }
    );

  }
);



/* =========================================================
   35. KATZE - ADD WATER
========================================================= */

function addWater(amount) {

  const waterAmount =
    toNumber(amount);


  if (
    !isFiniteNumber(
      waterAmount
    ) ||
    waterAmount <= 0
  ) {

    return;

  }


  catState.waterToday +=
    waterAmount;


  saveCatState();

  saveDashboardWater();

  renderCatPage();


  showTemporaryAction(
    "drinking",
    "Sehr gut! Wir trinken zusammen Wasser. 💧",
    "💧"
  );

}



/* =========================================================
   36. KATZE - WATER BUTTONS
========================================================= */

waterQuickButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        addWater(
          button.dataset.water
        );

      }
    );

  }
);



/* =========================================================
   37. KATZE - HEALTHY MEAL
========================================================= */

function registerHealthyMeal() {

  catState.healthyMealLogged =
    true;


  saveCatState();

  renderCatPage();


  showTemporaryAction(
    "eating",
    "Mmmh! Gemeinsam gesund essen. 🌿",
    "🥗"
  );

}



/* =========================================================
   38. KATZE - HEALTHY MEAL BUTTON
========================================================= */

if (healthyMealButton) {

  healthyMealButton.addEventListener(
    "click",
    registerHealthyMeal
  );

}



/* =========================================================
   39. KATZE - MOVEMENT
========================================================= */

function registerMovement(type) {

  catState.movementLogged =
    true;


  catState.movementType =
    type;


  saveCatState();

  renderCatPage();


  let message =
    "Los geht's! Wir bewegen uns zusammen. 🐾";


  if (
    type === "walk"
  ) {

    message =
      "Los geht's! Wir gehen zusammen spazieren. 🚶";

  }


  if (
    type === "training"
  ) {

    message =
      "Los geht's! Wir trainieren zusammen. 🏃";

  }


  if (
    type === "cycling"
  ) {

    message =
      "Los geht's! Wir sind mit dem Fahrrad unterwegs. 🚲";

  }


  showTemporaryAction(
    "exercise",
    message,
    "✨"
  );

}



/* =========================================================
   40. KATZE - MOVEMENT BUTTONS
========================================================= */

movementButtons.forEach(
  (button) => {

    button.addEventListener(
      "click",
      () => {

        registerMovement(
          button.dataset.movement
        );

      }
    );

  }
);



/* =========================================================
   41. KATZE - SAVE WEIGHT
========================================================= */

function saveNewWeight() {

  if (!newWeightInput) {

    return;

  }


  const newWeight =
    toNumber(
      newWeightInput.value
    );


  if (
    !isFiniteNumber(
      newWeight
    ) ||
    newWeight < 30 ||
    newWeight > 300
  ) {

    setSpeech(
      "Bitte gib ein gültiges Gewicht ein."
    );


    newWeightInput.focus();

    return;

  }


  const userBefore =
    getUser();


  const previousWeight =
    toNumber(
      userBefore.currentWeight
    );


  setCurrentWeight(
    newWeight
  );


  catState.lastWeight =
    newWeight;


  saveCatState();

  renderCatPage();


  if (
    isFiniteNumber(
      previousWeight
    ) &&
    newWeight >
      previousWeight
  ) {

    showTemporaryAction(
      "happy",
      "Ein bisschen mehr heute. Miau freut sich trotzdem mit dir. 🐾",
      "❤️"
    );

    return;

  }


  if (
    isFiniteNumber(
      previousWeight
    ) &&
    newWeight <
      previousWeight
  ) {

    showTemporaryAction(
      "mirror",
      "Wow! Schau mal in den Spiegel. Wir machen Fortschritte! ✨",
      "✨"
    );

    return;

  }


  showTemporaryAction(
    "normal",
    "Das Gewicht ist gleich geblieben. Wir machen weiter. 🐾",
    "⚖️"
  );

}



/* =========================================================
   42. KATZE - WEIGHT BUTTON
========================================================= */

if (saveWeightButton) {

  saveWeightButton.addEventListener(
    "click",
    saveNewWeight
  );

}



/* =========================================================
   43. KATZE - WEIGHT ENTER
========================================================= */

if (newWeightInput) {

  newWeightInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key ===
        "Enter"
      ) {

        saveNewWeight();

      }

    }
  );

}



/* =========================================================
   44. KATZE - IMAGE FALLBACK
========================================================= */

if (miauImage) {

  miauImage.addEventListener(
    "error",
    () => {

      const currentSource =
        miauImage.getAttribute(
          "src"
        );


      if (
        currentSource !==
        MIAU_IMAGES.normal
      ) {

        miauImage.src =
          MIAU_IMAGES.normal;

      }

    }
  );

}



/* =========================================================
   45. KATZE - VALIDATE USER
========================================================= */

function validateUser() {

  const user =
    getUser();


  const weight =
    toNumber(
      user.currentWeight
    );


  if (
    !isFiniteNumber(
      weight
    )
  ) {

    window.location.href =
      "../index.html";


    return false;

  }


  return true;

}



/* =========================================================
   46. KATZE - INITIALIZE
========================================================= */

function initializeCatPage() {

  if (
    !validateUser()
  ) {

    return;

  }


  loadDashboardWater();

  saveCatState();

  renderCatPage();

  updateMiauMainState();

}



/* =========================================================
   47. KATZE - START
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initializeCatPage
);



/* =========================================================
   48. FILE END
========================================================= */