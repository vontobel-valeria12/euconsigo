/* =========================================================
   DASHBOARD.JS
   Mein Fortschritt
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const STORAGE_KEYS = {
  user: "euConsigoUser",
  water: "euConsigoWater",
  food: "euConsigoFood",
  movement: "euConsigoMovement",
  weightHistory: "euConsigoWeightHistory"
};


/*
  DADOS INICIAIS DE TESTE

  Mais tarde estes dados virão do cadastro/login.
*/

const DEFAULT_USER = {
  name: "Valeria",
  height: 1.67,
  startWeight: 88,
  currentWeight: 87,
  goalWeight: 70,
  calorieGoal: 1800,
  waterGoal: 2000,
  movementGoal: 30
};


/* =========================================================
   FUNÇÕES DE STORAGE
========================================================= */

function loadData(key, fallback) {

  try {

    const saved = localStorage.getItem(key);

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

  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

}


/* =========================================================
   DATA DE HOJE
========================================================= */

function getToday() {

  const now = new Date();

  const year =
    now.getFullYear();

  const month =
    String(now.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(now.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;

}


/* =========================================================
   ESTADO DO APLICATIVO
========================================================= */

let user = loadData(
  STORAGE_KEYS.user,
  { ...DEFAULT_USER }
);


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


/* =========================================================
   GARANTIR DADOS DO USUÁRIO
========================================================= */

user = {
  ...DEFAULT_USER,
  ...user
};

saveData(
  STORAGE_KEYS.user,
  user
);


/* =========================================================
   NOVO DIA
========================================================= */

function checkNewDay() {

  const today = getToday();


  /* ÁGUA */

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


  /* ALIMENTAÇÃO */

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


  /* MOVIMENTO */

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
   ELEMENTOS DO DASHBOARD
========================================================= */

const welcomeName =
  document.getElementById("welcome-name");


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


const goalWeightCard =
  document.getElementById(
    "goal-weight-card"
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


/* =========================================================
   SAUDAÇÃO
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


function renderGreeting() {

  if (!welcomeName) {
    return;
  }

  welcomeName.textContent =
    `${getGreeting()}, ${user.name}.`;

}


/* =========================================================
   BMI
========================================================= */

function calculateBMI(weight) {

  if (
    !user.height ||
    user.height <= 0
  ) {
    return 0;
  }

  return (
    weight /
    (user.height * user.height)
  );

}


/* =========================================================
   CLASSIFICAÇÃO BMI
========================================================= */

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
   PROGRESSO DO PESO
========================================================= */

function calculateProgress() {

  const start =
    Number(user.startWeight);

  const current =
    Number(user.currentWeight);

  const goal =
    Number(user.goalWeight);


  const totalDifference =
    Math.abs(start - goal);


  if (totalDifference === 0) {
    return 100;
  }


  const completed =
    Math.abs(start - current);


  let progress =
    (completed / totalDifference) * 100;


  /*
    Evita barra menor que zero
    ou maior que 100%.
  */

  progress =
    Math.max(
      0,
      Math.min(100, progress)
    );


  return progress;

}


/* =========================================================
   RENDER PESO
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


  if (goalWeightCard) {

    goalWeightCard.textContent =
      `${goal.toFixed(1)} kg`;

  }


  /* BMI */

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


  /* BARRA */

  if (goalFill) {

    goalFill.style.width =
      `${calculateProgress()}%`;

  }

}


/* =========================================================
   FORMULÁRIO DE PESO
========================================================= */

const weightForm =
  document.getElementById(
    "weight-form"
  );


const newWeightInput =
  document.getElementById(
    "new-weight"
  );


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


      /* PRIMEIRO REGISTRO */

      if (
        !user.startWeight
      ) {

        user.startWeight =
          newWeight;

      }


      user.currentWeight =
        newWeight;


      saveData(
        STORAGE_KEYS.user,
        user
      );


      /* HISTÓRICO */

      weightHistory.push({

        date: getToday(),

        weight: newWeight

      });


      saveData(
        STORAGE_KEYS.weightHistory,
        weightHistory
      );


      newWeightInput.value =
        "";


      renderWeight();

      renderWeightHistory();


      alert(
        "Gewicht gespeichert! 🐱"
      );

    }
  );

}


/* =========================================================
   HISTÓRICO DE PESO
========================================================= */

const weightChart =
  document.getElementById(
    "weight-chart"
  );


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
          Trage dein Gewicht einmal pro Woche ein.
        </span>

      </div>
    `;

    return;

  }


  const recent =
    weightHistory.slice(-6);


  weightChart.innerHTML = "";


  recent.forEach(entry => {

    const row =
      document.createElement("div");


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


    weightChart.appendChild(row);

  });

}


/* =========================================================
   FORMATAR DATA
========================================================= */

function formatDate(dateString) {

  const parts =
    dateString.split("-");


  if (parts.length !== 3) {
    return dateString;
  }


  return (
    `${parts[2]}.${parts[1]}.${parts[0]}`
  );

}


/* =========================================================
   ÁGUA
========================================================= */

const waterCurrent =
  document.getElementById(
    "water-current"
  );


const addWaterButton =
  document.getElementById(
    "add-water-button"
  );


function renderWater() {

  if (!waterCurrent) {
    return;
  }


  const liters =
    waterData.amount / 1000;


  waterCurrent.textContent =
    liters.toFixed(2);

}


/* + 250 ML */

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


      /*
        O gatinho poderá ler estes mesmos
        dados quando integrarmos as páginas.
      */

    }
  );

}


/* =========================================================
   CALORIAS
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


const caloriesRemaining =
  document.getElementById(
    "calories-remaining"
  );


const calorieGoal =
  document.getElementById(
    "calorie-goal"
  );


const foodList =
  document.getElementById(
    "food-list"
  );


/* =========================================================
   SOMAR CALORIAS
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


/* =========================================================
   RENDER CALORIAS
========================================================= */

function renderCalories() {

  const consumed =
    getConsumedCalories();


  const goal =
    Number(user.calorieGoal);


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
   ADICIONAR ALIMENTO
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
        foodNameInput.value.trim();


      const calories =
        Number(
          foodCaloriesInput.value
        );


      if (
        !name ||
        !calories ||
        calories < 0
      ) {

        alert(
          "Bitte Lebensmittel und Kalorien eingeben."
        );

        return;

      }


      const item = {

        id: Date.now(),

        name: name,

        calories: calories

      };


      foodData.items.push(item);


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
   LISTA DE ALIMENTOS
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
      document.createElement("div");


    row.className =
      "food-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <span>
          ${item.calories} kcal
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


    foodList.appendChild(row);

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


          deleteFood(id);

        }
      );

    });

}


/* =========================================================
   APAGAR ALIMENTO
========================================================= */

function deleteFood(id) {

  foodData.items =
    foodData.items.filter(
      item => item.id !== id
    );


  saveData(
    STORAGE_KEYS.food,
    foodData
  );


  renderCalories();

}


/* =========================================================
   SEGURANÇA PARA TEXTO
========================================================= */

function escapeHTML(text) {

  const element =
    document.createElement("div");


  element.textContent =
    text;


  return element.innerHTML;

}


/* =========================================================
   MOVIMENTO
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
   TOTAL DE MOVIMENTO
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


/* =========================================================
   ADICIONAR MOVIMENTO
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
        activityNameInput.value.trim();


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
   RENDER MOVIMENTO
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
      document.createElement("div");


    row.className =
      "activity-item";


    row.innerHTML = `

      <div>

        <strong>
          ${escapeHTML(item.name)}
        </strong>

        <span>
          ${item.minutes} Min.
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


    activityList.appendChild(row);

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


          deleteActivity(id);

        }
      );

    });

}


/* =========================================================
   APAGAR ATIVIDADE
========================================================= */

function deleteActivity(id) {

  movementData.items =
    movementData.items.filter(
      item => item.id !== id
    );


  saveData(
    STORAGE_KEYS.movement,
    movementData
  );


  renderMovement();

}


/* =========================================================
   PREMIUM MODAL
========================================================= */

const premiumModal =
  document.getElementById(
    "premium-modal"
  );


const premiumModalClose =
  document.getElementById(
    "premium-modal-close"
  );


const premiumModalTitle =
  document.getElementById(
    "premium-modal-title"
  );


const premiumModalText =
  document.getElementById(
    "premium-modal-text"
  );


/* TEXTOS PREMIUM */

const premiumTexts = {

  Begleitung: {
    title: "Persönliche Begleitung",
    text:
      "Mit Premium erhältst du zusätzliche persönliche Unterstützung auf deinem Weg."
  },

  Wochenanalyse: {
    title: "Deine Wochenanalyse",
    text:
      "Sieh, wie sich Gewicht, Ernährung, Wasser und Bewegung in deiner Woche entwickelt haben."
  },

  Strategie: {
    title: "Deine persönliche Strategie",
    text:
      "Premium hilft dir dabei, deine nächsten Schritte passend zu deinem Fortschritt zu planen."
  },

  Ernährungsplan: {
    title: "Dein Ernährungsplan",
    text:
      "Erhalte zusätzliche Werkzeuge für die Planung deiner Ernährung."
  },

  Analyse: {
    title: "Deine Analyse",
    text:
      "Erkenne langfristige Entwicklungen und Zusammenhänge in deinen Daten."
  }

};


/* ABRIR PREMIUM */

document
  .querySelectorAll(
    ".premium-function"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      function () {

        const feature =
          button.dataset.feature;


        const information =
          premiumTexts[feature];


        if (information) {

          if (premiumModalTitle) {

            premiumModalTitle.textContent =
              information.title;

          }


          if (premiumModalText) {

            premiumModalText.textContent =
              information.text;

          }

        }


        if (premiumModal) {

          premiumModal.hidden =
            false;

          document.body.style.overflow =
            "hidden";

        }

      }
    );

  });


/* =========================================================
   FECHAR PREMIUM
========================================================= */

function closePremiumModal() {

  if (!premiumModal) {
    return;
  }


  premiumModal.hidden =
    true;


  document.body.style.overflow =
    "";

}


if (premiumModalClose) {

  premiumModalClose.addEventListener(
    "click",
    closePremiumModal
  );

}


/* BACKDROP */

const premiumBackdrop =
  document.querySelector(
    ".premium-modal-backdrop"
  );


if (premiumBackdrop) {

  premiumBackdrop.addEventListener(
    "click",
    closePremiumModal
  );

}


/* ESC */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      premiumModal &&
      !premiumModal.hidden
    ) {

      closePremiumModal();

    }

  }
);


/* =========================================================
   PROFILE BUTTON
========================================================= */

const profileButton =
  document.getElementById(
    "profile-button"
  );


if (profileButton) {

  profileButton.addEventListener(
    "click",
    function () {

      /*
        Temporário.

        Depois criaremos a página
        completa do perfil.
      */

      alert(
        "Das Profil wird als Nächstes eingerichtet."
      );

    }
  );

}


/* =========================================================
   RENDER GERAL
========================================================= */

function renderDashboard() {

  checkNewDay();

  renderGreeting();

  renderWeight();

  renderWeightHistory();

  renderWater();

  renderCalories();

  renderMovement();

}


/* =========================================================
   INICIAR DASHBOARD
========================================================= */

renderDashboard();
