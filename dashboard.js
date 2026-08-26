/* =========================================================
   MEIN FORTSCHRITT
   Dashboard - Protótipo
========================================================= */


/* =========================================================
   DADOS INICIAIS DO USUÁRIO
========================================================= */

const user = {
  name: "Valeria",

  startWeight: 88,
  currentWeight: 88,
  goalWeight: 70,

  height: 1.67,

  water: 1.2,
  waterGoal: 2,

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

   No protótipo, os dados ficam salvos no navegador.
   Depois isso será substituído pelo Firebase.
========================================================= */

const STORAGE_KEY = "meinFortschrittDashboard";


function saveData() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(user)
  );

}


function loadData() {

  const savedData =
    localStorage.getItem(STORAGE_KEY);


  if (!savedData) {
    return;
  }


  try {

    const data =
      JSON.parse(savedData);


    Object.assign(user, data);

  }

  catch (error) {

    console.error(
      "Gespeicherte Daten konnten nicht geladen werden.",
      error
    );

  }

}



/* =========================================================
   DATA DE HOJE
========================================================= */

function updateDate() {

  const dateElement =
    document.getElementById("today-date");


  if (!dateElement) {
    return;
  }


  const today =
    new Date();


  const formattedDate =
    new Intl.DateTimeFormat(
      "de-CH",
      {
        day: "numeric",
        month: "long"
      }
    ).format(today);


  dateElement.textContent =
    formattedDate;

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
   PROGRESSO DO PESO
========================================================= */

function calculateGoalProgress() {

  const total =
    user.startWeight -
    user.goalWeight;


  const lost =
    user.startWeight -
    user.currentWeight;


  if (total <= 0) {
    return 0;
  }


  let progress =
    (lost / total) * 100;


  progress =
    Math.max(
      0,
      Math.min(100, progress)
    );


  return Math.round(progress);

}



/* =========================================================
   ATUALIZAR DASHBOARD
========================================================= */

function updateDashboard() {

  /* -------------------------
     PESO
  ------------------------- */

  const currentWeightElement =
    document.getElementById("current-weight");

  const goalCurrentWeight =
    document.getElementById(
      "goal-current-weight"
    );


  if (currentWeightElement) {

    currentWeightElement.textContent =
      formatNumber(user.currentWeight);

  }


  if (goalCurrentWeight) {

    goalCurrentWeight.textContent =
      `${formatNumber(user.currentWeight)} kg`;

  }


  /* -------------------------
     BMI
  ------------------------- */

  const bmi =
    calculateBMI();


  const bmiElement =
    document.getElementById("current-bmi");

  const bmiCategory =
    document.getElementById("bmi-category");


  if (bmiElement) {

    bmiElement.textContent =
      bmi.toFixed(1);

  }


  if (bmiCategory) {

    bmiCategory.textContent =
      getBMICategory(bmi);

  }


  /* -------------------------
     META
  ------------------------- */

  const progress =
    calculateGoalProgress();


  const percentage =
    document.getElementById(
      "goal-percentage"
    );


  const progressBar =
    document.getElementById(
      "goal-fill"
    );


  if (percentage) {

    percentage.textContent =
      `${progress} %`;

  }


  if (progressBar) {

    progressBar.style.width =
      `${progress}%`;

  }


  /* -------------------------
     ÁGUA
  ------------------------- */

  const waterCurrent =
    document.getElementById(
      "water-current"
    );


  const waterProgress =
    document.getElementById(
      "water-progress"
    );


  if (waterCurrent) {

    waterCurrent.textContent =
      user.water.toFixed(2)
        .replace(".", ",");

  }


  if (waterProgress) {

    const waterPercentage =
      Math.min(
        100,
        (user.water / user.waterGoal) * 100
      );


    waterProgress.style.width =
      `${waterPercentage}%`;

  }


  /* -------------------------
     MOVIMENTO
  ------------------------- */

  const movement =
    document.getElementById(
      "movement-minutes"
    );


  if (movement) {

    movement.textContent =
      user.movementMinutes;

  }


  /* -------------------------
     CALORIAS
  ------------------------- */

  const consumed =
    document.getElementById(
      "calories-consumed"
    );


  const remaining =
    document.getElementById(
      "calories-remaining"
    );


  const calorieGoal =
    document.getElementById(
      "calorie-goal"
    );


  if (consumed) {

    consumed.textContent =
      user.caloriesConsumed;

  }


  if (remaining) {

    const caloriesLeft =
      user.calorieGoal -
      user.caloriesConsumed;


    remaining.textContent =
      Math.max(0, caloriesLeft);

  }


  if (calorieGoal) {

    calorieGoal.textContent =
      user.calorieGoal;

  }

}



/* =========================================================
   ADICIONAR ÁGUA
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


      /*
        Evita números como:
        1.500000000002
      */

      user.water =
        Number(
          user.water.toFixed(2)
        );


      saveData();

      updateDashboard();

    }
  );

}



/* =========================================================
   REGISTRAR PESO
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


      const entry = {

        weight: weight,

        date:
          new Date().toISOString()

      };


      user.weightHistory.push(
        entry
      );


      /*
        Mantém somente os últimos
        12 registros no protótipo.
      */

      if (
        user.weightHistory.length > 12
      ) {

        user.weightHistory =
          user.weightHistory.slice(-12);

      }


      input.value = "";


      saveData();

      updateDashboard();

      renderWeightChart();

    }
  );

}



/* =========================================================
   BOTÃO "GEWICHT EINTRAGEN"
========================================================= */

const openWeightButton =
  document.getElementById(
    "open-weight-form"
  );


if (openWeightButton) {

  openWeightButton.addEventListener(
    "click",
    function () {

      const input =
        document.getElementById(
          "new-weight"
        );


      if (!input) {
        return;
      }


      input.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });


      setTimeout(
        function () {

          input.focus();

        },
        400
      );

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


  /*
    Se ainda não houver registros,
    mantém a mensagem inicial.
  */

  if (
    user.weightHistory.length === 0
  ) {

    chart.innerHTML = `

      <div class="chart-empty">

        <strong>
          Dein Verlauf beginnt hier.
        </strong>

        <p>
          Trage dein Gewicht einmal pro Woche ein.
        </p>

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
      class="weight-svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >

      <polyline
        class="weight-line"
        points="${points}"
        fill="none"
        vector-effect="non-scaling-stroke"
      ></polyline>

    </svg>

    <div class="chart-values">

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
   ADICIONAR ALIMENTOS
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
        Number(caloriesInput.value);


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


      const food = {

        id: Date.now(),

        name: name,

        calories: calories

      };


      user.foods.push(
        food
      );


      calculateCalories();


      nameInput.value = "";
      caloriesInput.value = "";


      saveData();

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
   MOSTRAR ALIMENTOS
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


      list.appendChild(
        item
      );

    }
  );

}



/* =========================================================
   REMOVER ALIMENTO
========================================================= */

function removeFood(id) {

  user.foods =
    user.foods.filter(
      food => food.id !== id
    );


  calculateCalories();

  saveData();

  updateDashboard();

  renderFoodList();

}



/* =========================================================
   MOVIMENTO / EXERCÍCIOS
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


      const nameInput =
        document.getElementById(
          "activity-name"
        );


      const minutesInput =
        document.getElementById(
          "activity-minutes"
        );


      const name =
        nameInput.value.trim();


      const minutes =
        Number(minutesInput.value);


      if (
        name === "" ||
        !minutes ||
        minutes <= 0
      ) {

        alert(
          "Bitte Aktivität und Dauer eintragen."
        );

        return;

      }


      const activity = {

        id: Date.now(),

        name: name,

        minutes: minutes

      };


      user.activities.push(
        activity
      );


      calculateMovement();


      nameInput.value = "";
      minutesInput.value = "";


      saveData();

      updateDashboard();

      renderActivities();

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
   MOSTRAR ATIVIDADES
========================================================= */

function renderActivities() {

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


      list.appendChild(
        item
      );

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

  saveData();

  updateDashboard();

  renderActivities();

}



/* =========================================================
   MENU MOBILE
========================================================= */

const moreButton =
  document.getElementById(
    "mobile-more-button"
  );


const moreMenu =
  document.getElementById(
    "mobile-more-menu"
  );


if (
  moreButton &&
  moreMenu
) {

  moreButton.addEventListener(
    "click",
    function () {

      moreMenu.hidden =
        !moreMenu.hidden;

    }
  );


  moreMenu
    .querySelectorAll("a")
    .forEach(
      function (link) {

        link.addEventListener(
          "click",
          function () {

            moreMenu.hidden =
              true;

          }
        );

      }
    );

}



/* =========================================================
   SEGURANÇA PARA TEXTO DO USUÁRIO

   Evita inserir HTML digitado pelo usuário.
========================================================= */

function escapeHTML(value) {

  const element =
    document.createElement("div");


  element.textContent =
    value;


  return element.innerHTML;

}



/* =========================================================
   FORMATAÇÃO DE NÚMEROS
========================================================= */

function formatNumber(value) {

  return Number(value)
    .toFixed(1)
    .replace(".0", "")
    .replace(".", ",");

}



/* =========================================================
   INICIAR APLICAÇÃO
========================================================= */

function initializeDashboard() {

  loadData();

  /*
    Recalcula estes valores para garantir
    que estejam corretos mesmo depois
    de recarregar a página.
  */

  calculateCalories();

  calculateMovement();


  updateDate();

  updateDashboard();

  renderFoodList();

  renderActivities();

  renderWeightChart();

}


initializeDashboard();