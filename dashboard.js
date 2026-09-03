/* =========================================================
   DASHBOARD.JS
   Mein Fortschritt
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEYS = {
  user: "euConsigoUser",
  water: "euConsigoWater",
  food: "euConsigoFood",
  movement: "euConsigoMovement",
  weightHistory: "euConsigoWeightHistory"
};


/* =========================================================
   DEFAULT USER
========================================================= */

const DEFAULT_USER = {
  name: "Valeria",
  height: 1.67,
  startWeight: 88,
  currentWeight: 87,
  goalWeight: 70,
  calorieGoal: 1800,
  waterGoal: 2000,
  movementGoal: 30,
  premium: false
};


/* =========================================================
   HELPERS
========================================================= */

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    return JSON.parse(saved);

  } catch (error) {
    console.error("Fehler beim Laden:", key, error);

    return fallback;
  }
}


function saveData(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}


function getToday() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatDate(dateString) {
  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}


function escapeHTML(text) {
  const element =
    document.createElement("div");

  element.textContent = text;

  return element.innerHTML;
}


/* =========================================================
   APP STATE
========================================================= */

let user = loadData(
  STORAGE_KEYS.user,
  { ...DEFAULT_USER }
);


user = {
  ...DEFAULT_USER,
  ...user
};


let waterData = loadData(
  STORAGE_KEYS.water,
  {
    date: getToday(),
    amount: 0
  }
);


let foodData = loadData(
  STORAGE_KEYS.food,
  {
    date: getToday(),
    items: []
  }
);


let movementData = loadData(
  STORAGE_KEYS.movement,
  {
    date: getToday(),
    items: []
  }
);


let weightHistory = loadData(
  STORAGE_KEYS.weightHistory,
  []
);


saveData(
  STORAGE_KEYS.user,
  user
);


/* =========================================================
   DAILY RESET
========================================================= */

function checkNewDay() {
  const today = getToday();


  if (waterData.date !== today) {
    waterData = {
      date: today,
      amount: 0
    };

    saveData(
      STORAGE_KEYS.water,
      waterData
    );
  }


  if (foodData.date !== today) {
    foodData = {
      date: today,
      items: []
    };

    saveData(
      STORAGE_KEYS.food,
      foodData
    );
  }


  if (movementData.date !== today) {
    movementData = {
      date: today,
      items: []
    };

    saveData(
      STORAGE_KEYS.movement,
      movementData
    );
  }
}


checkNewDay();


/* =========================================================
   DOM
========================================================= */

const body =
  document.body;


/* HEADER / MENU */

const menuButton =
  document.getElementById(
    "menu-button"
  );

const sideMenuWrapper =
  document.getElementById(
    "side-menu-wrapper"
  );

const sideMenuClose =
  document.getElementById(
    "side-menu-close"
  );

const sideMenuBackdrop =
  document.getElementById(
    "side-menu-backdrop"
  );


/* USER */

const welcomeName =
  document.getElementById(
    "welcome-name"
  );

const menuUserName =
  document.getElementById(
    "menu-user-name"
  );


/* PREMIUM */

const premiumMainButton =
  document.getElementById(
    "premium-main-button"
  );

const premiumBottomButton =
  document.getElementById(
    "premium-bottom-button"
  );

const menuPremiumButton =
  document.getElementById(
    "menu-premium-button"
  );

const premiumModal =
  document.getElementById(
    "premium-modal"
  );

const premiumModalClose =
  document.getElementById(
    "premium-modal-close"
  );

const premiumModalBackdrop =
  document.getElementById(
    "premium-modal-backdrop"
  );


/* SHARE */

const shareAppButton =
  document.getElementById(
    "share-app-button"
  );

const inviteFriendButton =
  document.getElementById(
    "invite-friend-button"
  );

const shareModal =
  document.getElementById(
    "share-modal"
  );

const shareModalClose =
  document.getElementById(
    "share-modal-close"
  );

const shareModalBackdrop =
  document.getElementById(
    "share-modal-backdrop"
  );

const nativeShareButton =
  document.getElementById(
    "native-share-button"
  );

const copyLinkButton =
  document.getElementById(
    "copy-link-button"
  );

const shareMessage =
  document.getElementById(
    "share-message"
  );


/* SETTINGS / ACCOUNT / LOGOUT */

const settingsButton =
  document.getElementById(
    "settings-button"
  );

const accountButton =
  document.getElementById(
    "account-button"
  );

const logoutButton =
  document.getElementById(
    "logout-button"
  );


/* WEIGHT */

const currentWeightMain =
  document.getElementById(
    "current-weight-main"
  );

const goalWeightMain =
  document.getElementById(
    "goal-weight-main"
  );

const startWeightText =
  document.getElementById(
    "start-weight-text"
  );

const currentWeightText =
  document.getElementById(
    "current-weight-text"
  );

const goalWeightText =
  document.getElementById(
    "goal-weight-text"
  );

const goalFill =
  document.getElementById(
    "goal-fill"
  );

const currentBMI =
  document.getElementById(
    "current-bmi"
  );

const bmiStatus =
  document.getElementById(
    "bmi-status"
  );

const weightForm =
  document.getElementById(
    "weight-form"
  );

const newWeightInput =
  document.getElementById(
    "new-weight"
  );

const weightChart =
  document.getElementById(
    "weight-chart"
  );


/* WATER */

const waterCurrent =
  document.getElementById(
    "water-current"
  );

const addWaterButton =
  document.getElementById(
    "add-water-button"
  );


/* FOOD */

const foodForm =
  document.getElementById(
    "food-form"
  );

const foodNameInput =
  document.getElementById(
    "food-name"
  );

const foodCaloriesInput =
  document.getElementById(
    "food-calories"
  );

const caloriesConsumed =
  document.getElementById(
    "calories-consumed"
  );

const calorieGoal =
  document.getElementById(
    "calorie-goal"
  );

const caloriesRemaining =
  document.getElementById(
    "calories-remaining"
  );

const foodList =
  document.getElementById(
    "food-list"
  );


/* MOVEMENT */

const movementForm =
  document.getElementById(
    "movement-form"
  );

const activityNameInput =
  document.getElementById(
    "activity-name"
  );

const activityMinutesInput =
  document.getElementById(
    "activity-minutes"
  );

const movementMinutes =
  document.getElementById(
    "movement-minutes"
  );

const activityList =
  document.getElementById(
    "activity-list"
  );


/* =========================================================
   MENU
========================================================= */

function openMenu() {
  if (!sideMenuWrapper) {
    return;
  }

  sideMenuWrapper.hidden = false;

  body.classList.add(
    "menu-open"
  );

  if (menuButton) {
    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );
  }
}


function closeMenu() {
  if (!sideMenuWrapper) {
    return;
  }

  sideMenuWrapper.hidden = true;

  body.classList.remove(
    "menu-open"
  );

  if (menuButton) {
    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


if (menuButton) {
  menuButton.addEventListener(
    "click",
    openMenu
  );
}


if (sideMenuClose) {
  sideMenuClose.addEventListener(
    "click",
    closeMenu
  );
}


if (sideMenuBackdrop) {
  sideMenuBackdrop.addEventListener(
    "click",
    closeMenu
  );
}


document
  .querySelectorAll(
    ".side-menu-link[href^='#']"
  )
  .forEach(link => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


/* =========================================================
   GREETING
========================================================= */

function getGreeting() {
  const hour =
    new Date().getHours();


  if (hour < 12) {
    return "Guten Morgen";
  }


  if (hour < 18) {
    return "Guten Tag";
  }


  return "Guten Abend";
}


function renderUser() {
  if (welcomeName) {
    welcomeName.textContent =
      `${getGreeting()}, ${user.name}.`;
  }


  if (menuUserName) {
    menuUserName.textContent =
      user.name;
  }
}


/* =========================================================
   PREMIUM MODAL
========================================================= */

function openPremiumModal() {
  closeMenu();

  if (!premiumModal) {
    return;
  }

  premiumModal.hidden = false;

  body.classList.add(
    "modal-open"
  );
}


function closePremiumModal() {
  if (!premiumModal) {
    return;
  }

  premiumModal.hidden = true;

  body.classList.remove(
    "modal-open"
  );
}


[
  premiumMainButton,
  premiumBottomButton,
  menuPremiumButton
].forEach(button => {
  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    openPremiumModal
  );
});


if (premiumModalClose) {
  premiumModalClose.addEventListener(
    "click",
    closePremiumModal
  );
}


if (premiumModalBackdrop) {
  premiumModalBackdrop.addEventListener(
    "click",
    closePremiumModal
  );
}


/* =========================================================
   SHARE MODAL
========================================================= */

function openShareModal() {
  closeMenu();

  if (!shareModal) {
    return;
  }

  shareModal.hidden = false;

  body.classList.add(
    "modal-open"
  );


  if (shareMessage) {
    shareMessage.textContent = "";
  }
}


function closeShareModal() {
  if (!shareModal) {
    return;
  }

  shareModal.hidden = true;

  body.classList.remove(
    "modal-open"
  );
}


[
  shareAppButton,
  inviteFriendButton
].forEach(button => {
  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    openShareModal
  );
});


if (shareModalClose) {
  shareModalClose.addEventListener(
    "click",
    closeShareModal
  );
}


if (shareModalBackdrop) {
  shareModalBackdrop.addEventListener(
    "click",
    closeShareModal
  );
}


/* =========================================================
   SHARE APP
========================================================= */

function getShareData() {
  return {
    title: "Mein Fortschritt",

    text:
      "Gemeinsam ist es leichter. Starte deinen Weg mit mir bei Mein Fortschritt.",

    url:
      window.location.origin +
      window.location.pathname
  };
}


if (nativeShareButton) {
  nativeShareButton.addEventListener(
    "click",
    async function () {

      const shareData =
        getShareData();


      if (navigator.share) {

        try {
          await navigator.share(
            shareData
          );

          if (shareMessage) {
            shareMessage.textContent =
              "Danke fürs Teilen 💚";
          }

        } catch (error) {
          console.log(
            "Teilen abgebrochen."
          );
        }

      } else {

        copyShareLink();

      }

    }
  );
}


async function copyShareLink() {
  const shareData =
    getShareData();


  try {

    await navigator.clipboard.writeText(
      shareData.url
    );


    if (shareMessage) {
      shareMessage.textContent =
        "Link kopiert ✓";
    }

  } catch (error) {

    console.error(
      "Link konnte nicht kopiert werden.",
      error
    );


    if (shareMessage) {
      shareMessage.textContent =
        "Link konnte nicht kopiert werden.";
    }

  }
}


if (copyLinkButton) {
  copyLinkButton.addEventListener(
    "click",
    copyShareLink
  );
}


/* =========================================================
   SETTINGS / ACCOUNT
========================================================= */

if (settingsButton) {
  settingsButton.addEventListener(
    "click",
    function () {

      closeMenu();

      alert(
        "Einstellungen werden als Nächstes eingerichtet."
      );

    }
  );
}


if (accountButton) {
  accountButton.addEventListener(
    "click",
    function () {

      closeMenu();

      alert(
        "Dein Konto wird als Nächstes eingerichtet."
      );

    }
  );
}


/* =========================================================
   LOGOUT
========================================================= */

if (logoutButton) {
  logoutButton.addEventListener(
    "click",
    function () {

      const confirmed =
        window.confirm(
          "Möchtest du dich wirklich abmelden?"
        );


      if (!confirmed) {
        return;
      }


      /*
        IMPORTANTE:
        por enquanto NÃO apagamos
        peso, água, refeições etc.

        Quando conectarmos o login real,
        aqui vamos apagar somente
        a sessão de autenticação.
      */


      closeMenu();


      window.location.href =
        "index.html";

    }
  );
}


/* =========================================================
   BMI
========================================================= */

function calculateBMI(weight) {
  const height =
    Number(user.height);


  if (
    !height ||
    height <= 0
  ) {
    return 0;
  }


  return (
    Number(weight) /
    (height * height)
  );
}


function getBMIStatus(bmi) {
  if (bmi < 18.5) {
    return "Untergewicht";
  }

  if (bmi < 25) {
    return "Normalgewicht";
  }

  if (bmi < 30) {
    return "Übergewicht";
  }

  if (bmi < 35) {
    return "Adipositas Grad I";
  }

  if (bmi < 40) {
    return "Adipositas Grad II";
  }

  return "Adipositas Grad III";
}


/* =========================================================
   WEIGHT PROGRESS
========================================================= */

function calculateWeightProgress() {
  const start =
    Number(user.startWeight);

  const current =
    Number(user.currentWeight);

  const goal =
    Number(user.goalWeight);


  const total =
    start - goal;


  if (total <= 0) {
    return 0;
  }


  const lost =
    start - current;


  const progress =
    (lost / total) * 100;


  return Math.max(
    0,
    Math.min(
      100,
      progress
    )
  );
}


/* =========================================================
   RENDER WEIGHT
========================================================= */

function renderWeight() {
  const current =
    Number(user.currentWeight);

  const start =
    Number(user.startWeight);

  const goal =
    Number(user.goalWeight);


  if (currentWeightMain) {
    currentWeightMain.textContent =
      `${current.toFixed(1)} kg`;
  }


  if (goalWeightMain) {
    goalWeightMain.textContent =
      `${goal.toFixed(1)} kg`;
  }


  if (startWeightText) {
    startWeightText.textContent =
      `Start ${start.toFixed(1)} kg`;
  }


  if (currentWeightText) {
    currentWeightText.textContent =
      `Aktuell ${current.toFixed(1)} kg`;
  }


  if (goalWeightText) {
    goalWeightText.textContent =
      `Ziel ${goal.toFixed(1)} kg`;
  }


  const bmi =
    calculateBMI(current);


  if (currentBMI) {
    currentBMI.textContent =
      bmi.toFixed(1);
  }


  if (bmiStatus) {
    bmiStatus.textContent =
      getBMIStatus(bmi);
  }


  if (goalFill) {
    goalFill.style.width =
      `${calculateWeightProgress()}%`;
  }
}


/* =========================================================
   SAVE WEIGHT
========================================================= */

if (
  weightForm &&
  newWeightInput
) {

  weightForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();


      const newWeight =
        Number(
          newWeightInput.value
        );


      if (
        !newWeight ||
        newWeight < 30 ||
        newWeight > 300
      ) {

        alert(
          "Bitte gib ein gültiges Gewicht ein."
        );

        return;
      }


      user.currentWeight =
        newWeight;


      saveData(
        STORAGE_KEYS.user,
        user
      );


      saveWeightHistory(
        newWeight
      );


      newWeightInput.value =
        "";


      renderWeight();

      renderWeightHistory();

    }
  );

}


/* =========================================================
   SAVE WEIGHT HISTORY
========================================================= */

function saveWeightHistory(weight) {
  const today =
    getToday();


  const existingEntry =
    weightHistory.find(
      item =>
        item.date === today
    );


  if (existingEntry) {

    existingEntry.weight =
      weight;

  } else {

    weightHistory.push({
      date: today,
      weight: weight
    });

  }


  weightHistory.sort(
    (a, b) =>
      a.date.localeCompare(
        b.date
      )
  );


  saveData(
    STORAGE_KEYS.weightHistory,
    weightHistory
  );
}


/* =========================================================
   WEIGHT HISTORY
========================================================= */

function renderWeightHistory() {
  if (!weightChart) {
    return;
  }


  if (
    weightHistory.length === 0
  ) {

    weightChart.innerHTML = `
      <div class="empty-state">

        <strong>
          Dein Verlauf beginnt hier.
        </strong>

        <span>
          Trage dein Gewicht regelmässig ein.
        </span>

      </div>
    `;

    return;
  }


  const recent =
    weightHistory.slice(-7);


  weightChart.innerHTML = "";


  recent
    .slice()
    .reverse()
    .forEach(entry => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "weight-history-row";


      row.innerHTML = `
        <span>
          ${formatDate(entry.date)}
        </span>

        <strong>
          ${Number(entry.weight).toFixed(1)} kg
        </strong>
      `;


      weightChart.appendChild(
        row
      );

    });
}


/* =========================================================
   WATER
========================================================= */

function renderWater() {
  if (!waterCurrent) {
    return;
  }


  waterCurrent.textContent =
    (
      waterData.amount /
      1000
    ).toFixed(2);
}


if (addWaterButton) {
  addWaterButton.addEventListener(
    "click",
    function () {

      checkNewDay();


      waterData.amount += 250;


      saveData(
        STORAGE_KEYS.water,
        waterData
      );


      renderWater();

    }
  );
}


/* =========================================================
   CALORIES
========================================================= */

function getConsumedCalories() {
  return foodData.items.reduce(
    (total, item) => {

      return (
        total +
        Number(item.calories)
      );

    },
    0
  );
}


function renderCalories() {
  const consumed =
    getConsumedCalories();


  const goal =
    Number(
      user.calorieGoal
    );


  const remaining =
    goal - consumed;


  if (caloriesConsumed) {
    caloriesConsumed.textContent =
      consumed.toLocaleString(
        "de-CH"
      );
  }


  if (calorieGoal) {
    calorieGoal.textContent =
      goal.toLocaleString(
        "de-CH"
      );
  }


  if (caloriesRemaining) {
    caloriesRemaining.textContent =
      remaining.toLocaleString(
        "de-CH"
      );
  }


  renderFoodList();
}


/* =========================================================
   ADD FOOD
========================================================= */

if (
  foodForm &&
  foodNameInput &&
  foodCaloriesInput
) {

  foodForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      checkNewDay();


      const name =
        foodNameInput
          .value
          .trim();


      const calories =
        Number(
          foodCaloriesInput.value
        );


      if (
        !name ||
        Number.isNaN(calories) ||
        calories < 0
      ) {

        alert(
          "Bitte Lebensmittel und Kalorien eingeben."
        );

        return;
      }


      foodData.items.push({
        id: Date.now(),
        name: name,
        calories: calories
      });


      saveData(
        STORAGE_KEYS.food,
        foodData
      );


      foodNameInput.value =
        "";

      foodCaloriesInput.value =
        "";


      renderCalories();

    }
  );
}


/* =========================================================
   FOOD LIST
========================================================= */

function renderFoodList() {
  if (!foodList) {
    return;
  }


  if (
    foodData.items.length === 0
  ) {

    foodList.innerHTML = `
      <div class="empty-state">

        <strong>
          Noch nichts eingetragen.
        </strong>

        <span>
          Deine Lebensmittel erscheinen hier.
        </span>

      </div>
    `;

    return;
  }


  foodList.innerHTML = "";


  foodData.items.forEach(item => {

    const row =
      document.createElement(
        "div"
      );


    row.className =
      "food-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <span>
          ${Number(item.calories)} kcal
        </span>

      </div>


      <button
        type="button"
        class="delete-item"
        data-food-id="${item.id}"
        aria-label="Lebensmittel löschen"
      >
        ×
      </button>

    `;


    foodList.appendChild(
      row
    );

  });


  document
    .querySelectorAll(
      "[data-food-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          const id =
            Number(
              button.dataset.foodId
            );


          foodData.items =
            foodData.items.filter(
              item =>
                item.id !== id
            );


          saveData(
            STORAGE_KEYS.food,
            foodData
          );


          renderCalories();

        }
      );

    });
}


/* =========================================================
   MOVEMENT
========================================================= */

function getMovementMinutes() {
  return movementData.items.reduce(
    (total, item) => {

      return (
        total +
        Number(item.minutes)
      );

    },
    0
  );
}


function renderMovement() {
  const total =
    getMovementMinutes();


  if (movementMinutes) {
    movementMinutes.textContent =
      total;
  }


  if (!activityList) {
    return;
  }


  if (
    movementData.items.length === 0
  ) {

    activityList.innerHTML = `
      <div class="empty-state">

        <strong>
          Noch keine Aktivität.
        </strong>

        <span>
          Auch kleine Bewegungen zählen.
        </span>

      </div>
    `;

    return;
  }


  activityList.innerHTML = "";


  movementData.items.forEach(item => {

    const row =
      document.createElement(
        "div"
      );


    row.className =
      "activity-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <span>
          ${Number(item.minutes)} Min.
        </span>

      </div>


      <button
        type="button"
        class="delete-item"
        data-activity-id="${item.id}"
        aria-label="Aktivität löschen"
      >
        ×
      </button>

    `;


    activityList.appendChild(
      row
    );

  });


  document
    .querySelectorAll(
      "[data-activity-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        function () {

          const id =
            Number(
              button.dataset.activityId
            );


          movementData.items =
            movementData.items.filter(
              item =>
                item.id !== id
            );


          saveData(
            STORAGE_KEYS.movement,
            movementData
          );


          renderMovement();

        }
      );

    });
}


/* =========================================================
   ADD MOVEMENT
========================================================= */

if (
  movementForm &&
  activityNameInput &&
  activityMinutesInput
) {

  movementForm.addEventListener(
    "submit",
    function (event) {

      event.preventDefault();

      checkNewDay();


      const name =
        activityNameInput
          .value
          .trim();


      const minutes =
        Number(
          activityMinutesInput.value
        );


      if (
        !name ||
        !minutes ||
        minutes < 1
      ) {

        alert(
          "Bitte Aktivität und Dauer eingeben."
        );

        return;
      }


      movementData.items.push({
        id: Date.now(),
        name: name,
        minutes: minutes
      });


      saveData(
        STORAGE_KEYS.movement,
        movementData
      );


      activityNameInput.value =
        "";

      activityMinutesInput.value =
        "";


      renderMovement();

    }
  );
}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key !== "Escape"
    ) {
      return;
    }


    if (
      sideMenuWrapper &&
      !sideMenuWrapper.hidden
    ) {
      closeMenu();
    }


    if (
      premiumModal &&
      !premiumModal.hidden
    ) {
      closePremiumModal();
    }


    if (
      shareModal &&
      !shareModal.hidden
    ) {
      closeShareModal();
    }

  }
);


/* =========================================================
   RENDER APP
========================================================= */

function renderDashboard() {
  checkNewDay();

  renderUser();

  renderWeight();

  renderWeightHistory();

  renderWater();

  renderCalories();

  renderMovement();
}


/* =========================================================
   START
========================================================= */

renderDashboard();