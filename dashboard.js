/* =========================================================
   DASHBOARD.JS
   Mein Fortschritt

   IMPORTANTE:
   user-data.js deve ser carregado ANTES deste arquivo.

   Ordem correta no dashboard.html:

   <script src="user-data.js"></script>
   <script src="dashboard.js"></script>
========================================================= */


/* =========================================================
   01. STORAGE KEYS
   Dados específicos do Dashboard
========================================================= */

const DASHBOARD_STORAGE_KEYS = {
  water: "euConsigoWater",
  food: "euConsigoFood",
  movement: "euConsigoMovement",
  weightHistory: "euConsigoWeightHistory"
};


/* =========================================================
   02. GENERAL HELPERS
========================================================= */

/**
 * Carrega dados do localStorage.
 * Se não houver dados válidos, retorna o fallback.
 */
function loadDashboardData(key, fallback) {

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


/**
 * Salva dados específicos do Dashboard.
 */
function saveDashboardData(key, value) {

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


/**
 * Retorna a data local no formato:
 * YYYY-MM-DD
 */
function getToday() {

  const now =
    new Date();


  const year =
    now.getFullYear();


  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");


  const day =
    String(
      now.getDate()
    ).padStart(2, "0");


  return `${year}-${month}-${day}`;

}


/**
 * Converte:
 * 2026-09-03
 *
 * para:
 * 03.09.2026
 */
function formatDate(dateString) {

  const parts =
    String(dateString).split("-");


  if (
    parts.length !== 3
  ) {
    return String(dateString);
  }


  return `${parts[2]}.${parts[1]}.${parts[0]}`;

}


/**
 * Converte:
 * 2026-09-03
 *
 * para:
 * 03.09.
 */
function formatShortDate(dateString) {

  const parts =
    String(dateString).split("-");


  if (
    parts.length !== 3
  ) {
    return String(dateString);
  }


  return `${parts[2]}.${parts[1]}.`;

}


/**
 * Protege textos adicionados ao HTML
 * contra caracteres interpretados como código.
 */
function escapeHTML(text) {

  const element =
    document.createElement("div");


  element.textContent =
    String(text ?? "");


  return element.innerHTML;

}


/**
 * Verifica se realmente existe
 * um número utilizável.
 *
 * Importante:
 * Number(null) seria 0.
 * Por isso verificamos null e vazio antes.
 */
function hasValidNumber(value) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return false;
  }


  return Number.isFinite(
    Number(value)
  );

}


/**
 * Formata peso para exibição.
 *
 * Exemplo:
 * 87 -> 87.0 kg
 */
function formatWeight(value) {

  if (
    !hasValidNumber(value)
  ) {
    return "—";
  }


  return `${Number(value).toFixed(1)} kg`;

}


/**
 * Garante que uma porcentagem
 * fique sempre entre 0 e 100.
 */
function clampPercentage(value) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {
    return 0;
  }


  return Math.max(
    0,
    Math.min(
      100,
      number
    )
  );

}


/* =========================================================
   03. USER DATA
   Fonte única: user-data.js
========================================================= */

let user =
  getUser();


/**
 * O Dashboard precisa dos dados básicos
 * criados anteriormente no Index.
 */
if (
  !hasBasicUserData()
) {

  window.location.href =
    "index.html";

}


/**
 * O objetivo de peso é preenchido no Setup.
 *
 * Se a pessoa possui os dados básicos,
 * mas ainda não possui objetivo,
 * ela deve terminar o Setup.
 */
if (
  hasBasicUserData() &&
  !hasWeightGoal()
) {

  window.location.href =
    "setup.html";

}


/* =========================================================
   04. DASHBOARD STATE
   Água / Alimentação / Movimento / Histórico
========================================================= */

let waterData =
  loadDashboardData(
    DASHBOARD_STORAGE_KEYS.water,
    {
      date: getToday(),
      amount: 0
    }
  );


let foodData =
  loadDashboardData(
    DASHBOARD_STORAGE_KEYS.food,
    {
      date: getToday(),
      items: []
    }
  );


let movementData =
  loadDashboardData(
    DASHBOARD_STORAGE_KEYS.movement,
    {
      date: getToday(),
      items: []
    }
  );


let weightHistory =
  loadDashboardData(
    DASHBOARD_STORAGE_KEYS.weightHistory,
    []
  );


/* =========================================================
   05. NORMALIZE DASHBOARD DATA
========================================================= */

/**
 * Corrige estruturas inválidas ou antigas
 * antes de o Dashboard começar a trabalhar.
 */
function normalizeDashboardData() {

  const today =
    getToday();


  /* WATER */

  if (
    !waterData ||
    typeof waterData !== "object" ||
    Array.isArray(waterData)
  ) {

    waterData = {
      date: today,
      amount: 0
    };

  }


  if (
    !hasValidNumber(waterData.amount)
  ) {

    waterData.amount = 0;

  } else {

    waterData.amount =
      Number(waterData.amount);

  }


  /* FOOD */

  if (
    !foodData ||
    typeof foodData !== "object" ||
    Array.isArray(foodData)
  ) {

    foodData = {
      date: today,
      items: []
    };

  }


  if (
    !Array.isArray(foodData.items)
  ) {

    foodData.items = [];

  }


  /* MOVEMENT */

  if (
    !movementData ||
    typeof movementData !== "object" ||
    Array.isArray(movementData)
  ) {

    movementData = {
      date: today,
      items: []
    };

  }


  if (
    !Array.isArray(movementData.items)
  ) {

    movementData.items = [];

  }


  /* WEIGHT HISTORY */

  if (
    !Array.isArray(weightHistory)
  ) {

    weightHistory = [];

  }

}


normalizeDashboardData();


/* =========================================================
   06. DAILY RESET
   Água / Alimentação / Movimento
========================================================= */

/**
 * Água, alimentação e movimento
 * são registros diários.
 *
 * Ao mudar o dia, os três são reiniciados.
 *
 * Histórico de peso NÃO é apagado.
 */
function checkNewDay() {

  const today =
    getToday();


  /* WATER */

  if (
    waterData.date !== today
  ) {

    waterData = {
      date: today,
      amount: 0
    };


    saveDashboardData(
      DASHBOARD_STORAGE_KEYS.water,
      waterData
    );

  }


  /* FOOD */

  if (
    foodData.date !== today
  ) {

    foodData = {
      date: today,
      items: []
    };


    saveDashboardData(
      DASHBOARD_STORAGE_KEYS.food,
      foodData
    );

  }


  /* MOVEMENT */

  if (
    movementData.date !== today
  ) {

    movementData = {
      date: today,
      items: []
    };


    saveDashboardData(
      DASHBOARD_STORAGE_KEYS.movement,
      movementData
    );

  }

}


checkNewDay();


/* =========================================================
   07. DOM REFERENCES
========================================================= */

const body =
  document.body;


/* =========================================================
   07.1 MENU DOM
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
   07.2 USER DOM
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
   07.3 PREMIUM DOM
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
   07.4 SHARE DOM
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
   07.5 SETTINGS / ACCOUNT / LOGOUT DOM
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
   07.6 WEIGHT DOM
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
   07.7 WATER DOM
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
   07.8 FOOD DOM
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
   07.9 MOVEMENT DOM
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
   08. HAMBURGER MENU
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
   09. ACCORDION SECTIONS
   Gewicht / Ernährung / Bewegung
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
          Abre ou fecha a seção selecionada.
        */

        target.hidden =
          isOpen;


        button.classList.toggle(
          "active",
          !isOpen
        );


        /*
          Faz uma rolagem suave
          quando a seção é aberta.
        */

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
   10. USER GREETING
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
   11. RENDER USER
========================================================= */

function renderUser() {

  user =
    getUser();


  const userName =
    String(
      user.name || ""
    ).trim();


  if (welcomeName) {

    welcomeName.textContent =
      userName
        ? `${getGreeting()}, ${userName}.`
        : `${getGreeting()}.`;

  }


  if (menuUserName) {

    menuUserName.textContent =
      userName || "Mein Konto";

  }


  /*
    Avatar temporário:
    mostra a primeira letra do nome.

    Futuramente será substituído
    pela foto real do perfil.
  */

  if (menuAvatar) {

    menuAvatar.textContent =
      userName
        ? userName
            .charAt(0)
            .toUpperCase()
        : "♥";

  }

}


/* =========================================================
   12. PREMIUM MODAL
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
   13. SHARE MODAL
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
   14. SHARE DATA
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
   15. NATIVE SHARE
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
   16. COPY SHARE LINK
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
   17. SETTINGS BUTTON
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
   18. ACCOUNT BUTTON
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
   19. LOGOUT
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

        Por enquanto não apagamos
        nenhum dado do usuário.

        Quando o login real for criado,
        aqui será encerrada somente
        a sessão autenticada.
      */

      closeMenu();


      window.location.href =
        "index.html";

    }
  );

}


/* =========================================================
   20. WEIGHT - ENSURE INITIAL HISTORY
========================================================= */

/**
 * Garante que o peso inicial
 * tenha uma entrada no histórico.
 *
 * Essa função roda somente quando
 * ainda não existe nenhum registro.
 */
function ensureInitialWeightHistory() {

  user =
    getUser();


  if (
    !hasValidNumber(
      user.startWeight
    )
  ) {
    return;
  }


  if (
    weightHistory.length > 0
  ) {
    return;
  }


  const startWeight =
    Number(
      user.startWeight
    );


  let startDate =
    getToday();


  /*
    Tenta usar a data de criação
    do perfil como data inicial.
  */

  if (user.createdAt) {

    const createdDate =
      new Date(
        user.createdAt
      );


    if (
      !Number.isNaN(
        createdDate.getTime()
      )
    ) {

      const year =
        createdDate.getFullYear();


      const month =
        String(
          createdDate.getMonth() + 1
        ).padStart(2, "0");


      const day =
        String(
          createdDate.getDate()
        ).padStart(2, "0");


      startDate =
        `${year}-${month}-${day}`;

    }

  }


  weightHistory.push({
    date: startDate,
    weight: startWeight
  });


  saveDashboardData(
    DASHBOARD_STORAGE_KEYS.weightHistory,
    weightHistory
  );

}


/* =========================================================
   21. WEIGHT - RENDER CURRENT DATA
========================================================= */

function renderWeight() {

  user =
    getUser();


  /* =====================================================
     CURRENT WEIGHT
  ====================================================== */

  if (currentWeightMain) {

    currentWeightMain.textContent =
      formatWeight(
        user.currentWeight
      );

  }


  /* =====================================================
     GOAL WEIGHT
  ====================================================== */

  if (goalWeightMain) {

    goalWeightMain.textContent =
      formatWeight(
        user.goalWeight
      );

  }


  /* =====================================================
     START WEIGHT TEXT
  ====================================================== */

  if (startWeightText) {

    startWeightText.textContent =
      hasValidNumber(
        user.startWeight
      )
        ? `Start ${Number(user.startWeight).toFixed(1)} kg`
        : "Start —";

  }


  /* =====================================================
     CURRENT WEIGHT TEXT
  ====================================================== */

  if (currentWeightText) {

    currentWeightText.textContent =
      hasValidNumber(
        user.currentWeight
      )
        ? `Aktuell ${Number(user.currentWeight).toFixed(1)} kg`
        : "Aktuell —";

  }


  /* =====================================================
     GOAL WEIGHT TEXT
  ====================================================== */

  if (goalWeightText) {

    goalWeightText.textContent =
      hasValidNumber(
        user.goalWeight
      )
        ? `Ziel ${Number(user.goalWeight).toFixed(1)} kg`
        : "Ziel —";

  }


  /* =====================================================
     BMI
  ====================================================== */

  if (
    currentBMI &&
    hasValidNumber(
      user.bmi
    )
  ) {

    currentBMI.textContent =
      Number(
        user.bmi
      ).toFixed(1);

  } else if (currentBMI) {

    currentBMI.textContent =
      "—";

  }


  if (
    bmiStatus &&
    hasValidNumber(
      user.bmi
    )
  ) {

    bmiStatus.textContent =
      getBMICategory(
        Number(user.bmi)
      );

  } else if (bmiStatus) {

    bmiStatus.textContent =
      "Noch keine Daten";

  }


  /* =====================================================
     WEIGHT PROGRESS
  ====================================================== */

  const progress =
    clampPercentage(
      getUserWeightProgress()
    );


  if (goalFill) {

    goalFill.style.width =
      `${progress}%`;

  }

}


/* =========================================================
   22. WEIGHT - SAVE CURRENT WEIGHT
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
        O peso principal é salvo
        exclusivamente através de
        user-data.js.

        setCurrentWeight():
        - atualiza currentWeight
        - mantém startWeight
        - recalcula BMI
        - atualiza updatedAt
      */

      user =
        setCurrentWeight(
          newWeight
        );


      /*
        Atualiza também
        o histórico diário.
      */

      saveWeightHistory(
        newWeight
      );


      newWeightInput.value =
        "";


      /*
        Atualiza somente as áreas
        afetadas pelo novo peso.
      */

      renderUser();

      renderWeight();

      renderWeightHistory();

    }
  );

}


/* =========================================================
   23. WEIGHT - SAVE HISTORY
========================================================= */

/**
 * Salva apenas um peso por dia.
 *
 * Se a pessoa registrar novamente
 * no mesmo dia, o valor daquele dia
 * é atualizado.
 */
function saveWeightHistory(weight) {

  const numericWeight =
    Number(weight);


  if (
    !Number.isFinite(
      numericWeight
    )
  ) {
    return;
  }


  const today =
    getToday();


  const existingEntry =
    weightHistory.find(
      item =>
        item &&
        item.date === today
    );


  if (existingEntry) {

    existingEntry.weight =
      numericWeight;

  } else {

    weightHistory.push({
      date: today,
      weight: numericWeight
    });

  }


  weightHistory.sort(
    (a, b) =>
      String(a.date).localeCompare(
        String(b.date)
      )
  );


  saveDashboardData(
    DASHBOARD_STORAGE_KEYS.weightHistory,
    weightHistory
  );

}


/* =========================================================
   24. WEIGHT - PREPARE HISTORY
========================================================= */

/**
 * Retorna somente registros válidos
 * e ordenados pela data.
 */
function getValidWeightHistory() {

  if (
    !Array.isArray(weightHistory)
  ) {
    return [];
  }


  return weightHistory
    .filter(
      entry =>
        entry &&
        entry.date &&
        hasValidNumber(
          entry.weight
        )
    )
    .map(
      entry => ({
        date: String(
          entry.date
        ),
        weight: Number(
          entry.weight
        )
      })
    )
    .sort(
      (a, b) =>
        a.date.localeCompare(
          b.date
        )
    );

}


/* =========================================================
   25. WEIGHT - RENDER HISTORY AND CHART
========================================================= */

/**
 * Exibe os últimos 7 registros
 * em um gráfico simples.
 *
 * Não utiliza biblioteca externa.
 */
function renderWeightHistory() {

  if (!weightChart) {
    return;
  }


  const validHistory =
    getValidWeightHistory();


  /* =====================================================
     EMPTY STATE
  ====================================================== */

  if (
    validHistory.length === 0
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


  /*
    O gráfico mostra no máximo
    os últimos 7 registros.
  */

  const recentHistory =
    validHistory.slice(-7);


  const weights =
    recentHistory.map(
      entry =>
        entry.weight
    );


  let minimumWeight =
    Math.min(
      ...weights
    );


  let maximumWeight =
    Math.max(
      ...weights
    );


  /*
    Se houver apenas um peso
    ou todos forem iguais,
    criamos uma pequena faixa
    para o gráfico continuar visível.
  */

  if (
    minimumWeight ===
    maximumWeight
  ) {

    minimumWeight -= 1;

    maximumWeight += 1;

  }


  /* =====================================================
     CHART DIMENSIONS
  ====================================================== */

  const chartWidth =
    600;


  const chartHeight =
    210;


  const paddingLeft =
    42;


  const paddingRight =
    20;


  const paddingTop =
    24;


  const paddingBottom =
    38;


  const usableWidth =
    chartWidth -
    paddingLeft -
    paddingRight;


  const usableHeight =
    chartHeight -
    paddingTop -
    paddingBottom;


  /* =====================================================
     CHART POINTS
  ====================================================== */

  const points =
    recentHistory.map(
      (entry, index) => {

        const x =
          recentHistory.length === 1
            ? paddingLeft +
              usableWidth / 2
            : paddingLeft +
              (
                index /
                (
                  recentHistory.length - 1
                )
              ) *
              usableWidth;


        const normalizedWeight =
          (
            entry.weight -
            minimumWeight
          ) /
          (
            maximumWeight -
            minimumWeight
          );


        const y =
          paddingTop +
          usableHeight -
          (
            normalizedWeight *
            usableHeight
          );


        return {
          x,
          y,
          date: entry.date,
          weight: entry.weight
        };

      }
    );


  const polylinePoints =
    points
      .map(
        point =>
          `${point.x},${point.y}`
      )
      .join(" ");


  /* =====================================================
     CHART POINT CIRCLES
  ====================================================== */

  const pointElements =
    points
      .map(
        point => `

          <circle
            cx="${point.x}"
            cy="${point.y}"
            r="5"
            fill="currentColor"
          ></circle>

        `
      )
      .join("");


  /* =====================================================
     CHART LABELS
  ====================================================== */

  const chartLabels =
    points
      .map(
        point => `

          <div class="weight-chart-label">

            <strong>
              ${point.weight.toFixed(1)}
            </strong>

            <span>
              ${formatShortDate(point.date)}
            </span>

          </div>

        `
      )
      .join("");


  /* =====================================================
     CHANGE IN DISPLAYED PERIOD
  ====================================================== */

  const firstWeight =
    recentHistory[0].weight;


  const lastWeight =
    recentHistory[
      recentHistory.length - 1
    ].weight;


  const periodDifference =
    lastWeight -
    firstWeight;


  let periodDifferenceText =
    "±0.0 kg";


  if (
    periodDifference < 0
  ) {

    periodDifferenceText =
      `${periodDifference.toFixed(1)} kg`;

  }


  if (
    periodDifference > 0
  ) {

    periodDifferenceText =
      `+${periodDifference.toFixed(1)} kg`;

  }


  /* =====================================================
     TOTAL CHANGE SINCE START
  ====================================================== */

  let totalDifferenceText =
    "—";


  if (
    hasValidNumber(
      user.startWeight
    ) &&
    hasValidNumber(
      user.currentWeight
    )
  ) {

    const totalDifference =
      Number(
        user.currentWeight
      ) -
      Number(
        user.startWeight
      );


    if (
      totalDifference === 0
    ) {

      totalDifferenceText =
        "±0.0 kg";

    } else if (
      totalDifference > 0
    ) {

      totalDifferenceText =
        `+${totalDifference.toFixed(1)} kg`;

    } else {

      totalDifferenceText =
        `${totalDifference.toFixed(1)} kg`;

    }

  }


  /* =====================================================
     RENDER CHART
  ====================================================== */

  weightChart.innerHTML = `

    <div class="weight-chart-header">

      <div>

        <span>
          Gewichtsverlauf
        </span>

        <strong>
          ${recentHistory.length}
          ${
            recentHistory.length === 1
              ? "Eintrag"
              : "Einträge"
          }
        </strong>

      </div>


      <div class="weight-chart-change">

        <span>
          Seit dem Start
        </span>

        <strong>
          ${totalDifferenceText}
        </strong>

      </div>

    </div>


    <div
      class="weight-chart-svg-wrap"
      style="
        width: 100%;
        overflow: hidden;
        margin-top: 20px;
      "
    >

      <svg
        viewBox="0 0 ${chartWidth} ${chartHeight}"
        width="100%"
        role="img"
        aria-label="Gewichtsverlauf"
        style="
          display: block;
          color: #2f8f5b;
          overflow: visible;
        "
      >

        <line
          x1="${paddingLeft}"
          y1="${paddingTop + usableHeight}"
          x2="${chartWidth - paddingRight}"
          y2="${paddingTop + usableHeight}"
          stroke="#e4e9e5"
          stroke-width="2"
        ></line>


        ${
          recentHistory.length > 1
            ? `

              <polyline
                points="${polylinePoints}"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></polyline>

            `
            : ""
        }


        ${pointElements}

      </svg>

    </div>


    <div
      class="weight-chart-labels"
      style="
        display: grid;
        grid-template-columns:
          repeat(${recentHistory.length}, 1fr);
        gap: 4px;
        margin-top: -24px;
      "
    >

      ${chartLabels}

    </div>


    ${
      recentHistory.length > 1
        ? `

          <div
            class="weight-chart-period"
            style="
              margin-top: 18px;
              font-size: 0.85rem;
              opacity: 0.72;
            "
          >
            Veränderung in diesem Verlauf:
            <strong>
              ${periodDifferenceText}
            </strong>
          </div>

        `
        : ""
    }

  `;

}


/* =========================================================
   26. WATER - RENDER
========================================================= */

function renderWater() {

  if (!waterCurrent) {
    return;
  }


  const amount =
    hasValidNumber(
      waterData.amount
    )
      ? Number(
          waterData.amount
        )
      : 0;


  waterCurrent.textContent =
    (
      amount / 1000
    ).toFixed(2);

}


/* =========================================================
   27. WATER - ADD 250 ML
========================================================= */

if (addWaterButton) {

  addWaterButton.addEventListener(
    "click",
    function () {

      checkNewDay();


      const currentAmount =
        hasValidNumber(
          waterData.amount
        )
          ? Number(
              waterData.amount
            )
          : 0;


      waterData.amount =
        currentAmount + 250;


      saveDashboardData(
        DASHBOARD_STORAGE_KEYS.water,
        waterData
      );


      renderWater();

    }
  );

}


/* =========================================================
   28. FOOD - CALCULATE CONSUMED CALORIES
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


      return total + calories;

    },
    0
  );

}


/* =========================================================
   29. FOOD - RENDER CALORIES
========================================================= */

function renderCalories() {

  user =
    getUser();


  const consumed =
    getConsumedCalories();


  if (caloriesConsumed) {

    caloriesConsumed.textContent =
      consumed.toLocaleString(
        "de-CH"
      );

  }


  /*
    Ainda não definimos oficialmente
    como a meta individual de calorias
    será calculada.

    Por isso:
    calorieGoal null = não inventar valor.
  */

  if (
    !hasValidNumber(
      user.calorieGoal
    ) ||
    Number(
      user.calorieGoal
    ) <= 0
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


  const goal =
    Number(
      user.calorieGoal
    );


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
   30. FOOD - ADD ITEM
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
        name,
        calories
      });


      saveDashboardData(
        DASHBOARD_STORAGE_KEYS.food,
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
   31. FOOD - RENDER ITEM LIST
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


          saveDashboardData(
            DASHBOARD_STORAGE_KEYS.food,
            foodData
          );


          renderCalories();

        }
      );

    });

}


/* =========================================================
   32. MOVEMENT - CALCULATE TOTAL MINUTES
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


      return total + minutes;

    },
    0
  );

}


/* =========================================================
   33. MOVEMENT - RENDER
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


          saveDashboardData(
            DASHBOARD_STORAGE_KEYS.movement,
            movementData
          );


          renderMovement();

        }
      );

    });

}


/* =========================================================
   34. MOVEMENT - ADD ACTIVITY
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
        name,
        minutes
      });


      saveDashboardData(
        DASHBOARD_STORAGE_KEYS.movement,
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
   35. ESCAPE KEY
   Fecha menu e modais
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
   36. RENDER DASHBOARD
========================================================= */

function renderDashboard() {

  /*
    Verifica se começou um novo dia.
  */

  checkNewDay();


  /*
    Busca novamente os dados atuais
    do usuário no user-data.js.
  */

  user =
    getUser();


  /*
    Garante que o peso inicial
    esteja presente no histórico.
  */

  ensureInitialWeightHistory();


  /*
    Renderiza todas as áreas.
  */

  renderUser();

  renderWeight();

  renderWeightHistory();

  renderWater();

  renderCalories();

  renderMovement();

}


/* =========================================================
   37. START DASHBOARD
========================================================= */

renderDashboard();