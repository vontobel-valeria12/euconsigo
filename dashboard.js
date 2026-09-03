/* =========================================================
   DASHBOARD.JS
   Mein Fortschritt

   IMPORTANTE:
   user-data.js deve ser carregado ANTES deste arquivo.
========================================================= */


/* =========================================================
   STORAGE
   Dados específicos do Dashboard
========================================================= */

const STORAGE_KEYS = {
  water: "euConsigoWater",
  food: "euConsigoFood",
  movement: "euConsigoMovement",
  weightHistory: "euConsigoWeightHistory"
};


/* =========================================================
   HELPERS
========================================================= */

function loadData(key, fallback) {

  try {

    const saved =
      localStorage.getItem(key);


    if (!saved) {
      return fallback;
    }


    return JSON.parse(saved);

  } catch (error) {

    console.error(
      "Fehler beim Laden:",
      key,
      error
    );


    return fallback;

  }

}


function saveData(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  } catch (error) {

    console.error(
      "Fehler beim Speichern:",
      key,
      error
    );

  }

}


function getToday() {

  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      now.getDate()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}`
  );

}


function formatDate(dateString) {

  const parts =
    String(dateString).split("-");


  if (
    parts.length !== 3
  ) {

    return dateString;

  }


  return (
    `${parts[2]}.${parts[1]}.${parts[0]}`
  );

}


function escapeHTML(text) {

  const element =
    document.createElement("div");


  element.textContent =
    String(text);


  return element.innerHTML;

}


function formatWeight(value) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return "—";

  }


  return (
    `${number.toFixed(1)} kg`
  );

}


/* =========================================================
   USER
   Fonte única: user-data.js
========================================================= */

let user =
  getUser();


/*
  O Dashboard depende dos dados criados
  no Index + Setup.

  Se alguém acessar diretamente
  sem ter os dados necessários,
  retorna ao início.
*/

if (
  !hasBasicUserData()
) {

  window.location.href =
    "index.html";

}


/* =========================================================
   APP STATE
   Água / alimentos / movimento / histórico
========================================================= */

let waterData =
  loadData(
    STORAGE_KEYS.water,
    {
      date: getToday(),
      amount: 0
    }
  );


let foodData =
  loadData(
    STORAGE_KEYS.food,
    {
      date: getToday(),
      items: []
    }
  );


let movementData =
  loadData(
    STORAGE_KEYS.movement,
    {
      date: getToday(),
      items: []
    }
  );


let weightHistory =
  loadData(
    STORAGE_KEYS.weightHistory,
    []
  );


/* =========================================================
   NORMALIZE DAILY DATA
========================================================= */

function normalizeDailyData() {

  if (
    !waterData ||
    typeof waterData !== "object"
  ) {

    waterData = {
      date: getToday(),
      amount: 0
    };

  }


  if (
    !Number.isFinite(
      Number(waterData.amount)
    )
  ) {

    waterData.amount = 0;

  }


  if (
    !foodData ||
    typeof foodData !== "object"
  ) {

    foodData = {
      date: getToday(),
      items: []
    };

  }


  if (
    !Array.isArray(foodData.items)
  ) {

    foodData.items = [];

  }


  if (
    !movementData ||
    typeof movementData !== "object"
  ) {

    movementData = {
      date: getToday(),
      items: []
    };

  }


  if (
    !Array.isArray(movementData.items)
  ) {

    movementData.items = [];

  }


  if (
    !Array.isArray(weightHistory)
  ) {

    weightHistory = [];

  }

}


normalizeDailyData();


/* =========================================================
   DAILY RESET
========================================================= */

function checkNewDay() {

  const today =
    getToday();


  if (
    waterData.date !== today
  ) {

    waterData = {
      date: today,
      amount: 0
    };


    saveData(
      STORAGE_KEYS.water,
      waterData
    );

  }


  if (
    foodData.date !== today
  ) {

    foodData = {
      date: today,
      items: []
    };


    saveData(
      STORAGE_KEYS.food,
      foodData
    );

  }


  if (
    movementData.date !== today
  ) {

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


/* =========================================================
   MENU
========================================================= */

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


/* =========================================================
   USER
========================================================= */

const welcomeName =
  document.getElementById(
    "welcome-name"
  );


const menuUserName =
  document.getElementById(
    "menu-user-name"
  );


const menuAvatar =
  document.querySelector(
    ".menu-avatar"
  );


/* =========================================================
   PREMIUM
========================================================= */

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


/* =========================================================
   SHARE
========================================================= */

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


/* =========================================================
   SETTINGS / ACCOUNT / LOGOUT
========================================================= */

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


/* =========================================================
   WEIGHT
========================================================= */

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


/* =========================================================
   WATER
========================================================= */

const waterCurrent =
  document.getElementById(
    "water-current"
  );


const addWaterButton =
  document.getElementById(
    "add-water-button"
  );


/* =========================================================
   FOOD
========================================================= */

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


const calorieGoalElement =
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


/* =========================================================
   MOVEMENT
========================================================= */

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
   HAMBURGER MENU
========================================================= */

function openMenu() {

  if (!sideMenuWrapper) {
    return;
  }


  sideMenuWrapper.hidden =
    false;


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


  sideMenuWrapper.hidden =
    true;


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
   ACCORDION
========================================================= */

const compactSectionButtons =
  document.querySelectorAll(
    "[data-toggle-section]"
  );


compactSectionButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      function () {

        const targetId =
          button.dataset.toggleSection;


        const target =
          document.getElementById(
            targetId
          );


        if (!target) {
          return;
        }


        const isOpen =
          !target.hidden;


        /*
          Fecha todas as outras seções.
        */

        compactSectionButtons.forEach(
          otherButton => {

            const otherTargetId =
              otherButton.dataset.toggleSection;


            const otherTarget =
              document.getElementById(
                otherTargetId
              );


            if (
              otherButton !== button &&
              otherTarget
            ) {

              otherTarget.hidden =
                true;


              otherButton.classList.remove(
                "active"
              );

            }

          }
        );


        /*
          Abre ou fecha a selecionada.
        */

        target.hidden =
          isOpen;


        button.classList.toggle(
          "active",
          !isOpen
        );


        if (!isOpen) {

          setTimeout(
            () => {

              button.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              });

            },
            100
          );

        }

      }
    );

  }
);


/* =========================================================
   GREETING
========================================================= */

function getGreeting() {

  const hour =
    new Date().getHours();


  if (
    hour < 12
  ) {

    return "Guten Morgen";

  }


  if (
    hour < 18
  ) {

    return "Guten Tag";

  }


  return "Guten Abend";

}


/* =========================================================
   RENDER USER
========================================================= */

function renderUser() {

  /*
    Atualiza a referência do usuário.
    Assim qualquer alteração feita por
    user-data.js aparece no Dashboard.
  */

  user =
    getUser();


  const displayName =
    user.name
      ? user.name
      : "Hallo";


  if (welcomeName) {

    if (user.name) {

      welcomeName.textContent =
        `${getGreeting()}, ${user.name}.`;

    } else {

      welcomeName.textContent =
        `${getGreeting()}.`;

    }

  }


  if (menuUserName) {

    menuUserName.textContent =
      displayName;

  }


  /*
    Avatar temporário:
    usa apenas a primeira letra do nome.
  */

  if (
    menuAvatar &&
    user.name
  ) {

    menuAvatar.textContent =
      user.name
        .charAt(0)
        .toUpperCase();

  }

}


/* =========================================================
   PREMIUM
========================================================= */

function openPremiumModal() {

  closeMenu();


  if (!premiumModal) {
    return;
  }


  premiumModal.hidden =
    false;


  body.classList.add(
    "modal-open"
  );

}


function closePremiumModal() {

  if (!premiumModal) {
    return;
  }


  premiumModal.hidden =
    true;


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
   SHARE
========================================================= */

function openShareModal() {

  closeMenu();


  if (!shareModal) {
    return;
  }


  shareModal.hidden =
    false;


  body.classList.add(
    "modal-open"
  );


  if (shareMessage) {

    shareMessage.textContent =
      "";

  }

}


function closeShareModal() {

  if (!shareModal) {
    return;
  }


  shareModal.hidden =
    true;


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
   SHARE DATA
========================================================= */

function getShareData() {

  const appURL =
    new URL(
      "index.html",
      window.location.href
    ).href;


  return {

    title:
      "Mein Fortschritt",

    text:
      "Zusammen ist es leichter. Starte deinen Weg mit mir bei Mein Fortschritt.",

    url:
      appURL

  };

}


/* =========================================================
   NATIVE SHARE
========================================================= */

if (nativeShareButton) {

  nativeShareButton.addEventListener(
    "click",
    async function () {

      const shareData =
        getShareData();


      if (
        navigator.share
      ) {

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


/* =========================================================
   COPY LINK
========================================================= */

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
   SETTINGS
========================================================= */

if (settingsButton) {

  settingsButton.addEventListener(
    "click",
    function () {

      closeMenu();


      alert(
        "Einstellungen werden später eingerichtet."
      );

    }
  );

}


/* =========================================================
   ACCOUNT
========================================================= */

if (accountButton) {

  accountButton.addEventListener(
    "click",
    function () {

      closeMenu();


      alert(
        "Dein Konto wird später eingerichtet."
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
        Ainda não existe Firebase Auth.

        Portanto não apagamos o perfil
        nem os dados locais.

        Quando o login real existir,
        aqui será feito somente logout
        da sessão.
      */

      closeMenu();


      window.location.href =
        "index.html";

    }
  );

}


/* =========================================================
   RENDER WEIGHT
========================================================= */

function renderWeight() {

  /*
    Sempre buscamos a versão atualizada
    do usuário.
  */

  user =
    getUser();


  const current =
    Number(
      user.currentWeight
    );


  const start =
    Number(
      user.startWeight
    );


  const goal =
    Number(
      user.goalWeight
    );


  /* CURRENT */

  if (currentWeightMain) {

    currentWeightMain.textContent =
      formatWeight(
        user.currentWeight
      );

  }


  /* GOAL */

  if (goalWeightMain) {

    goalWeightMain.textContent =
      formatWeight(
        user.goalWeight
      );

  }


  /* START TEXT */

  if (startWeightText) {

    startWeightText.textContent =
      Number.isFinite(start)
        ? `Start ${start.toFixed(1)} kg`
        : "Start —";

  }


  /* CURRENT TEXT */

  if (currentWeightText) {

    currentWeightText.textContent =
      Number.isFinite(current)
        ? `Aktuell ${current.toFixed(1)} kg`
        : "Aktuell —";

  }


  /* GOAL TEXT */

  if (goalWeightText) {

    goalWeightText.textContent =
      Number.isFinite(goal)
        ? `Ziel ${goal.toFixed(1)} kg`
        : "Ziel —";

  }


  /* =====================================================
     BMI
  ====================================================== */

  const bmi =
    Number(
      user.bmi
    );


  if (currentBMI) {

    currentBMI.textContent =
      Number.isFinite(bmi)
        ? bmi.toFixed(1)
        : "—";

  }


  if (bmiStatus) {

    bmiStatus.textContent =
      Number.isFinite(bmi)
        ? getBMICategory(bmi)
        : "Noch keine Daten";

  }


  /* =====================================================
     PROGRESS
  ====================================================== */

  const progress =
    getUserWeightProgress();


  if (goalFill) {

    goalFill.style.width =
      `${progress}%`;

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
        !Number.isFinite(newWeight) ||
        newWeight < 30 ||
        newWeight > 300
      ) {

        alert(
          "Bitte gib ein gültiges Gewicht ein."
        );


        return;

      }


      /*
        IMPORTANTE:

        Não salvamos mais diretamente
        no euConsigoUser.

        user-data.js faz isso.
      */

      user =
        setCurrentWeight(
          newWeight
        );


      /*
        Histórico é uma informação
        separada do perfil principal.
      */

      saveWeightHistory(
        newWeight
      );


      newWeightInput.value =
        "";


      /*
        Atualizamos os componentes
        dependentes do peso.
      */

      renderWeight();

      renderWeightHistory();

      renderUser();

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


  /*
    Se o usuário registrar novamente
    no mesmo dia, atualiza o peso
    daquele dia em vez de duplicar.
  */

  if (existingEntry) {

    existingEntry.weight =
      Number(weight);

  } else {

    weightHistory.push({
      date: today,
      weight: Number(weight)
    });

  }


  weightHistory.sort(
    (a, b) =>
      String(a.date).localeCompare(
        String(b.date)
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
    !Array.isArray(weightHistory) ||
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
    weightHistory
      .filter(
        entry =>
          entry &&
          entry.date &&
          Number.isFinite(
            Number(entry.weight)
          )
      )
      .slice(-7);


  if (
    recent.length === 0
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


  weightChart.innerHTML =
    "";


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


  const amount =
    Number(
      waterData.amount
    ) || 0;


  waterCurrent.textContent =
    (
      amount / 1000
    ).toFixed(2);

}


if (addWaterButton) {

  addWaterButton.addEventListener(
    "click",
    function () {

      checkNewDay();


      const currentAmount =
        Number(
          waterData.amount
        ) || 0;


      waterData.amount =
        currentAmount + 250;


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

      const calories =
        Number(
          item.calories
        );


      if (
        !Number.isFinite(calories)
      ) {

        return total;

      }


      return (
        total + calories
      );

    },
    0
  );

}


/* =========================================================
   RENDER CALORIES
========================================================= */

function renderCalories() {

  user =
    getUser();


  const consumed =
    getConsumedCalories();


  const goal =
    Number(
      user.calorieGoal
    );


  if (caloriesConsumed) {

    caloriesConsumed.textContent =
      consumed.toLocaleString(
        "de-CH"
      );

  }


  /*
    Ainda não definimos como calcular
    a meta de calorias.

    Portanto, se calorieGoal for null,
    não inventamos 1800 kcal.
  */

  if (
    !Number.isFinite(goal) ||
    goal <= 0
  ) {

    if (calorieGoalElement) {

      calorieGoalElement.textContent =
        "—";

    }


    if (caloriesRemaining) {

      caloriesRemaining.textContent =
        "—";

    }


    renderFoodList();


    return;

  }


  const remaining =
    Math.max(
      0,
      goal - consumed
    );


  if (calorieGoalElement) {

    calorieGoalElement.textContent =
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
        !Number.isFinite(calories) ||
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
    !foodData.items.length
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


  foodList.innerHTML =
    "";


  foodData.items.forEach(
    item => {

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

    }
  );


  foodList
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
                Number(item.id) !== id
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

      const minutes =
        Number(
          item.minutes
        );


      if (
        !Number.isFinite(minutes)
      ) {

        return total;

      }


      return (
        total + minutes
      );

    },
    0
  );

}


/* =========================================================
   RENDER MOVEMENT
========================================================= */

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
    !movementData.items.length
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


  activityList.innerHTML =
    "";


  movementData.items.forEach(
    item => {

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

    }
  );


  activityList
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
                Number(item.id) !== id
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
        !Number.isFinite(minutes) ||
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
   RENDER DASHBOARD
========================================================= */

function renderDashboard() {

  checkNewDay();


  /*
    Sempre pega os dados mais recentes
    do perfil central.
  */

  user =
    getUser();


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