/* =========================================================
   MEIN FORTSCHRITT
   Dashboard Prototype
========================================================= */


/* =========================================================
   DADOS DO USUÁRIO
========================================================= */

const user = {
  name: "Valeria",

  startWeight: 88,
  currentWeight: 87,
  goalWeight: 70,

  height: 1.67,

  water: 1.45,
  waterGoal: 2.0,

  movementMinutes: 0,
  movementGoal: 30,

  caloriesConsumed: 0,
  calorieGoal: 1800,

  weightHistory: [],

  foods: [],

  activities: []
};


/* =========================================================
   LOCAL STORAGE
========================================================= */

const STORAGE_KEY = "meinFortschrittDashboardV2";


function saveUserData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );
}


function loadUserData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return;
  }

  try {
    const data = JSON.parse(savedData);

    Object.assign(user, data);
  } catch (error) {
    console.error(
      "Gespeicherte Daten konnten nicht geladen werden.",
      error
    );
  }
}


/* =========================================================
   BMI
========================================================= */

function calculateBMI() {
  const bmi =
    user.currentWeight /
    (user.height * user.height);

  return Number(
    bmi.toFixed(1)
  );
}


function getBMICategory(bmi) {
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
   PROGRESSO DA META
========================================================= */

function calculateGoalProgress() {
  const totalDifference =
    user.startWeight - user.goalWeight;

  const currentDifference =
    user.startWeight - user.currentWeight;

  if (totalDifference <= 0) {
    return 0;
  }

  let progress =
    (currentDifference / totalDifference) * 100;

  progress = Math.max(
    0,
    Math.min(100, progress)
  );

  return Math.round(progress);
}


/* =========================================================
   ATUALIZAR PAINEL
========================================================= */

function updateDashboard() {
  /* -------------------------
     BMI
  ------------------------- */

  const bmi = calculateBMI();

  const bmiElement =
    document.getElementById("current-bmi");

  if (bmiElement) {
    bmiElement.textContent =
      bmi.toFixed(1);
  }


  /* -------------------------
     PROGRESSO
  ------------------------- */

  const goalFill =
    document.getElementById("goal-fill");

  if (goalFill) {
    const progress =
      calculateGoalProgress();

    goalFill.style.width =
      `${progress}%`;
  }


  /* -------------------------
     ÁGUA
  ------------------------- */

  const waterCurrent =
    document.getElementById("water-current");

  if (waterCurrent) {
    waterCurrent.textContent =
      formatDecimal(user.water);
  }


  /* -------------------------
     MOVIMENTO
  ------------------------- */

  const movementMinutes =
    document.getElementById(
      "movement-minutes"
    );

  if (movementMinutes) {
    movementMinutes.textContent =
      user.movementMinutes;
  }


  /* -------------------------
     CALORIAS
  ------------------------- */

  const caloriesConsumed =
    document.getElementById(
      "calories-consumed"
    );

  const caloriesRemaining =
    document.getElementById(
      "calories-remaining"
    );

  if (caloriesConsumed) {
    caloriesConsumed.textContent =
      user.caloriesConsumed;
  }

  if (caloriesRemaining) {
    const remaining =
      user.calorieGoal -
      user.caloriesConsumed;

    caloriesRemaining.textContent =
      Math.max(0, remaining);
  }
}


/* =========================================================
   ÁGUA
========================================================= */

const addWaterButton =
  document.getElementById(
    "add-water-button"
  );


if (addWaterButton) {
  addWaterButton.addEventListener(
    "click",
    function () {
      user.water += 0.25;

      user.water =
        Number(
          user.water.toFixed(2)
        );

      saveUserData();

      updateDashboard();
    }
  );
}


/* =========================================================
   PESO
========================================================= */

const weightForm =
  document.getElementById(
    "weight-form"
  );


if (weightForm) {
  weightForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const input =
        document.getElementById(
          "new-weight"
        );

      const weight =
        Number(input.value);

      if (
        !weight ||
        weight < 30 ||
        weight > 300
      ) {
        alert(
          "Bitte gib ein gültiges Gewicht ein."
        );

        return;
      }

      user.currentWeight =
        weight;

      user.weightHistory.push({
        weight: weight,
        date: new Date().toISOString()
      });

      if (
        user.weightHistory.length > 12
      ) {
        user.weightHistory =
          user.weightHistory.slice(-12);
      }

      input.value = "";

      saveUserData();

      updateDashboard();

      renderWeightChart();
    }
  );
}


/* =========================================================
   GRÁFICO DE PESO
========================================================= */

function renderWeightChart() {
  const chart =
    document.getElementById(
      "weight-chart"
    );

  if (!chart) {
    return;
  }

  if (
    user.weightHistory.length === 0
  ) {
    chart.innerHTML = `

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

  const values =
    user.weightHistory.map(
      entry => entry.weight
    );

  const max =
    Math.max(...values);

  const min =
    Math.min(...values);

  const difference =
    max - min || 1;

  let points = "";

  user.weightHistory.forEach(
    function (entry, index) {
      const x =
        user.weightHistory.length === 1
          ? 50
          : (
              index /
              (
                user.weightHistory.length - 1
              )
            ) * 100;

      const y =
        80 -
        (
          (
            entry.weight - min
          ) /
          difference
        ) * 60;

      points +=
        `${x},${y} `;
    }
  );

  chart.innerHTML = `

    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style="
        width: 100%;
        height: 190px;
        display: block;
      "
      aria-hidden="true"
    >

      <polyline
        points="${points}"
        fill="none"
        stroke="#7fa889"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      ></polyline>

    </svg>

    <div
      style="
        display:flex;
        justify-content:space-between;
        margin-top:8px;
        color:#7b7771;
        font-size:11px;
      "
    >

      <span>
        ${formatNumber(values[0])} kg
      </span>

      <span>
        ${formatNumber(
          values[values.length - 1]
        )} kg
      </span>

    </div>

  `;
}


/* =========================================================
   ALIMENTOS / CALORIAS
========================================================= */

const foodForm =
  document.getElementById(
    "food-form"
  );


if (foodForm) {
  foodForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const nameInput =
        document.getElementById(
          "food-name"
        );

      const caloriesInput =
        document.getElementById(
          "food-calories"
        );

      const name =
        nameInput.value.trim();

      const calories =
        Number(
          caloriesInput.value
        );

      if (
        name === "" ||
        !Number.isFinite(calories) ||
        calories < 0
      ) {
        alert(
          "Bitte Lebensmittel und Kalorien eintragen."
        );

        return;
      }

      user.foods.push({
        id: Date.now(),
        name: name,
        calories: calories
      });

      calculateCalories();

      nameInput.value = "";
      caloriesInput.value = "";

      saveUserData();

      updateDashboard();

      renderFoodList();
    }
  );
}


/* =========================================================
   CALCULAR CALORIAS
========================================================= */

function calculateCalories() {
  user.caloriesConsumed =
    user.foods.reduce(
      function (total, food) {
        return total +
          Number(food.calories);
      },
      0
    );
}


/* =========================================================
   LISTA DE ALIMENTOS
========================================================= */

function renderFoodList() {
  const list =
    document.getElementById(
      "food-list"
    );

  if (!list) {
    return;
  }

  if (
    user.foods.length === 0
  ) {
    list.innerHTML = `

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

  list.innerHTML = "";

  user.foods.forEach(
    function (food) {
      const item =
        document.createElement("div");

      item.className =
        "food-item";

      item.innerHTML = `

        <div>

          <strong>
            ${escapeHTML(food.name)}
          </strong>

          <span>
            ${food.calories} kcal
          </span>

        </div>

        <button
          type="button"
          class="remove-item"
          aria-label="Lebensmittel entfernen"
        >
          ×
        </button>

      `;

      const removeButton =
        item.querySelector(
          ".remove-item"
        );

      removeButton.addEventListener(
        "click",
        function () {
          removeFood(
            food.id
          );
        }
      );

      list.appendChild(item);
    }
  );
}


/* =========================================================
   REMOVER ALIMENTO
========================================================= */

function removeFood(id) {
  user.foods =
    user.foods.filter(
      food =>
        food.id !== id
    );

  calculateCalories();

  saveUserData();

  updateDashboard();

  renderFoodList();
}


/* =========================================================
   MOVIMENTO
========================================================= */

const movementForm =
  document.getElementById(
    "movement-form"
  );


if (movementForm) {
  movementForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const activityInput =
        document.getElementById(
          "activity-name"
        );

      const minutesInput =
        document.getElementById(
          "activity-minutes"
        );

      const activity =
        activityInput.value.trim();

      const minutes =
        Number(
          minutesInput.value
        );

      if (
        activity === "" ||
        !minutes ||
        minutes <= 0
      ) {
        alert(
          "Bitte Aktivität und Dauer eintragen."
        );

        return;
      }

      user.activities.push({
        id: Date.now(),
        name: activity,
        minutes: minutes
      });

      calculateMovement();

      activityInput.value = "";
      minutesInput.value = "";

      saveUserData();

      updateDashboard();

      renderActivityList();
    }
  );
}


/* =========================================================
   CALCULAR MOVIMENTO
========================================================= */

function calculateMovement() {
  user.movementMinutes =
    user.activities.reduce(
      function (
        total,
        activity
      ) {
        return total +
          Number(
            activity.minutes
          );
      },
      0
    );
}


/* =========================================================
   LISTA DE ATIVIDADES
========================================================= */

function renderActivityList() {
  const list =
    document.getElementById(
      "activity-list"
    );

  if (!list) {
    return;
  }

  if (
    user.activities.length === 0
  ) {
    list.innerHTML = `

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

  list.innerHTML = "";

  user.activities.forEach(
    function (activity) {
      const item =
        document.createElement("div");

      item.className =
        "activity-item";

      item.innerHTML = `

        <div>

          <strong>
            ${escapeHTML(activity.name)}
          </strong>

          <span>
            ${activity.minutes} Min.
          </span>

        </div>

        <button
          type="button"
          class="remove-item"
          aria-label="Aktivität entfernen"
        >
          ×
        </button>

      `;

      const removeButton =
        item.querySelector(
          ".remove-item"
        );

      removeButton.addEventListener(
        "click",
        function () {
          removeActivity(
            activity.id
          );
        }
      );

      list.appendChild(item);
    }
  );
}


/* =========================================================
   REMOVER ATIVIDADE
========================================================= */

function removeActivity(id) {
  user.activities =
    user.activities.filter(
      activity =>
        activity.id !== id
    );

  calculateMovement();

  saveUserData();

  updateDashboard();

  renderActivityList();
}


/* =========================================================
   PREMIUM MODAL
========================================================= */

const premiumButtons =
  document.querySelectorAll(
    ".premium-function"
  );

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


premiumButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        const feature =
          this.dataset.feature ||
          "Premium";

        openPremiumModal(
          feature
        );
      }
    );
  }
);


/* =========================================================
   ABRIR PREMIUM MODAL
========================================================= */

function openPremiumModal(
  feature
) {
  if (!premiumModal) {
    return;
  }

  premiumModalTitle.textContent =
    feature;

  premiumModalText.textContent =
    getPremiumMessage(
      feature
    );

  premiumModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}


/* =========================================================
   TEXTO PREMIUM
========================================================= */

function getPremiumMessage(
  feature
) {
  const messages = {
    Begleitung:
      "Mit Premium erhältst du persönliche Begleitung durch eine Ernährungsfachperson.",

    Wochenanalyse:
      "Deine Woche wird gemeinsam ausgewertet, damit du erkennst, was funktioniert und wo Anpassungen sinnvoll sind.",

    Strategie:
      "Erhalte eine persönliche Strategie, die zu deinem Alltag, deinen Zielen und deiner Entwicklung passt.",

    Ernährungsplan:
      "Erhalte individuelle Empfehlungen und eine strukturierte Planung für deine Ernährung.",

    Analyse:
      "Mit erweiterten Auswertungen erkennst du Entwicklungen, Muster und Veränderungen besser."
  };

  return (
    messages[feature] ||
    "Diese Funktion ist Teil des Premium-Bereichs."
  );
}


/* =========================================================
   FECHAR MODAL
========================================================= */

if (
  premiumModalClose &&
  premiumModal
) {
  premiumModalClose.addEventListener(
    "click",
    closePremiumModal
  );
}


const premiumBackdrop =
  premiumModal
    ? premiumModal.querySelector(
        ".premium-modal-backdrop"
      )
    : null;


if (premiumBackdrop) {
  premiumBackdrop.addEventListener(
    "click",
    closePremiumModal
  );
}


function closePremiumModal() {
  if (!premiumModal) {
    return;
  }

  premiumModal.hidden =
    true;

  document.body.style.overflow =
    "";
}


/* =========================================================
   ESC FECHA MODAL
========================================================= */

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
   MENU HORIZONTAL
   roda do mouse vira rolagem horizontal
========================================================= */

const functionMenu =
  document.querySelector(
    ".function-menu"
  );


if (functionMenu) {
  functionMenu.addEventListener(
    "wheel",
    function (event) {
      if (
        Math.abs(event.deltaY) >
        Math.abs(event.deltaX)
      ) {
        functionMenu.scrollLeft +=
          event.deltaY;
      }
    },
    {
      passive: true
    }
  );
}


/* =========================================================
   SEGURANÇA
========================================================= */

function escapeHTML(value) {
  const element =
    document.createElement("div");

  element.textContent =
    value;

  return element.innerHTML;
}


/* =========================================================
   FORMATAÇÃO
========================================================= */

function formatNumber(value) {
  return Number(value)
    .toFixed(1)
    .replace(".0", "")
    .replace(".", ",");
}


function formatDecimal(value) {
  return Number(value)
    .toFixed(2)
    .replace(/0$/, "")
    .replace(".", ",");
}


/* =========================================================
   INICIAR
========================================================= */

function initializeDashboard() {
  loadUserData();

  calculateCalories();

  calculateMovement();

  updateDashboard();

  renderWeightChart();

  renderFoodList();

  renderActivityList();
}


initializeDashboard();