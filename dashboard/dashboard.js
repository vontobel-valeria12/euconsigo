/* =========================================================
   01. STORAGE KEYS
========================================================= */

const DASHBOARD_STORAGE_KEYS = {
  water: "euConsigoWater",
  food: "euConsigoFood",
  movement: "euConsigoMovement",
  weightHistory: "euConsigoWeightHistory"
};


/* =========================================================
   02. DASHBOARD HELPERS
========================================================= */

function formatDate(dateString) {
  const parts = String(dateString).split("-");

  if (parts.length !== 3) {
    return String(dateString);
  }

  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}


function formatShortDate(dateString) {
  const parts = String(dateString).split("-");

  if (parts.length !== 3) {
    return String(dateString);
  }

  return `${parts[2]}.${parts[1]}.`;
}


function hasValidNumber(value) {
  return toNumber(value) !== null;
}


function formatWeight(value) {
  return formatWeightValue(value);
}


/* =========================================================
   03. USER DATA
========================================================= */

let user = getUser();


if (!hasBasicUserData()) {
  window.location.href = "../index.html";
}


if (
  hasBasicUserData() &&
  !hasWeightGoal()
) {
  window.location.href = "../pages/setup.html";
}


/* =========================================================
   04. DASHBOARD STATE
========================================================= */

let waterData = loadStorageData(
  DASHBOARD_STORAGE_KEYS.water,
  {
    date: getLocalToday(),
    amount: 0
  }
);


let foodData = loadStorageData(
  DASHBOARD_STORAGE_KEYS.food,
  {
    date: getLocalToday(),
    items: []
  }
);


let movementData = loadStorageData(
  DASHBOARD_STORAGE_KEYS.movement,
  {
    date: getLocalToday(),
    items: []
  }
);


let weightHistory = loadStorageData(
  DASHBOARD_STORAGE_KEYS.weightHistory,
  []
);


/* =========================================================
   05. NORMALIZE DASHBOARD DATA
========================================================= */

function normalizeDashboardData() {
  const today = getLocalToday();

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

  if (!hasValidNumber(waterData.amount)) {
    waterData.amount = 0;
  } else {
    waterData.amount = Number(waterData.amount);
  }

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

  if (!Array.isArray(foodData.items)) {
    foodData.items = [];
  }

  foodData.items =
    foodData.items.filter(
      item =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item)
    );

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

  if (!Array.isArray(movementData.items)) {
    movementData.items = [];
  }

  movementData.items =
    movementData.items.filter(
      item =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item)
    );

  if (!Array.isArray(weightHistory)) {
    weightHistory = [];
  }
}


normalizeDashboardData();


/* =========================================================
   06. DAILY RESET
========================================================= */

function checkNewDay() {
  const today = getLocalToday();

  if (waterData.date !== today) {
    waterData = {
      date: today,
      amount: 0
    };

    saveStorageData(
      DASHBOARD_STORAGE_KEYS.water,
      waterData
    );
  }

  if (foodData.date !== today) {
    foodData = {
      date: today,
      items: []
    };

    saveStorageData(
      DASHBOARD_STORAGE_KEYS.food,
      foodData
    );
  }

  if (movementData.date !== today) {
    movementData = {
      date: today,
      items: []
    };

    saveStorageData(
      DASHBOARD_STORAGE_KEYS.movement,
      movementData
    );
  }
}


checkNewDay();


/* =========================================================
   07. DOM REFERENCES
========================================================= */

const body = document.body;

const menuButton =
  document.getElementById("menu-button");

const sideMenuWrapper =
  document.getElementById("side-menu-wrapper");

const sideMenuClose =
  document.getElementById("side-menu-close");

const sideMenuBackdrop =
  document.getElementById("side-menu-backdrop");

const welcomeName =
  document.getElementById("welcome-name");

const menuUserName =
  document.getElementById("menu-user-name");

const menuAccountPlan =
  document.getElementById("menu-account-plan");

const menuAvatar =
  document.querySelector(".menu-avatar");

const premiumMainButton =
  document.getElementById("premium-main-button");

const premiumBottomButton =
  document.getElementById("premium-bottom-button");

const menuPremiumButton =
  document.getElementById("menu-premium-button");

const premiumModal =
  document.getElementById("premium-modal");

const premiumModalClose =
  document.getElementById("premium-modal-close");

const premiumModalBackdrop =
  document.getElementById("premium-modal-backdrop");

const premiumPlusMainButton =
  document.getElementById("premium-plus-main-button");

const premiumPlusBottomButton =
  document.getElementById("premium-plus-bottom-button");

const menuPremiumPlusButton =
  document.getElementById("menu-premium-plus-button");

const premiumPlusModal =
  document.getElementById("premium-plus-modal");

const premiumPlusModalClose =
  document.getElementById("premium-plus-modal-close");

const premiumPlusModalBackdrop =
  document.getElementById("premium-plus-modal-backdrop");

const shareAppButton =
  document.getElementById("share-app-button");

const inviteFriendButton =
  document.getElementById("invite-friend-button");

const shareModal =
  document.getElementById("share-modal");

const shareModalClose =
  document.getElementById("share-modal-close");

const shareModalBackdrop =
  document.getElementById("share-modal-backdrop");

const nativeShareButton =
  document.getElementById("native-share-button");

const copyLinkButton =
  document.getElementById("copy-link-button");

const shareMessage =
  document.getElementById("share-message");

const settingsButton =
  document.getElementById("settings-button");

const accountButton =
  document.getElementById("account-button");

const logoutButton =
  document.getElementById("logout-button");

const currentWeightMain =
  document.getElementById("current-weight-main");

const goalWeightMain =
  document.getElementById("goal-weight-main");

const startWeightText =
  document.getElementById("start-weight-text");

const currentWeightText =
  document.getElementById("current-weight-text");

const goalWeightText =
  document.getElementById("goal-weight-text");

const goalFill =
  document.getElementById("goal-fill");

const currentBMI =
  document.getElementById("current-bmi");

const bmiStatus =
  document.getElementById("bmi-status");

const weightForm =
  document.getElementById("weight-form");

const newWeightInput =
  document.getElementById("new-weight");

const weightChart =
  document.getElementById("weight-chart");

const waterCurrent =
  document.getElementById("water-current");

const addWaterButton =
  document.getElementById("add-water-button");

const foodForm =
  document.getElementById("food-form");

const foodNameInput =
  document.getElementById("food-name");

const foodCaloriesInput =
  document.getElementById("food-calories");

const foodAmountInput =
  document.getElementById("food-amount");

const foodIdInput =
  document.getElementById("food-id");

const foodCatalogOptions =
  document.getElementById("food-catalog-options");

const caloriesConsumed =
  document.getElementById("calories-consumed");

const calorieGoalElement =
  document.getElementById("calorie-goal");

const caloriesRemaining =
  document.getElementById("calories-remaining");

const professionalCalorieGoals =
  document.getElementById("professional-calorie-goals");

const foodList =
  document.getElementById("food-list");

const premiumFoodDetails =
  document.getElementById("premium-food-details");

const premiumPlusFoodDetails =
  document.getElementById("premium-plus-food-details");

const foodProtein =
  document.getElementById("food-protein");

const foodCarbohydrates =
  document.getElementById("food-carbohydrates");

const foodFat =
  document.getElementById("food-fat");

const foodFiber =
  document.getElementById("food-fiber");

const foodHighlights =
  document.getElementById("food-highlights");

const foodCompleteNutrients =
  document.getElementById("food-complete-nutrients");

const movementForm =
  document.getElementById("movement-form");

const activityNameInput =
  document.getElementById("activity-name");

const activityMinutesInput =
  document.getElementById("activity-minutes");

const movementMinutes =
  document.getElementById("movement-minutes");

const activityList =
  document.getElementById("activity-list");


/* =========================================================
   08. HAMBURGER MENU
========================================================= */

function openMenu() {
  if (!sideMenuWrapper) {
    return;
  }

  sideMenuWrapper.hidden = false;
  body.classList.add("menu-open");

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
  body.classList.remove("menu-open");

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
  .querySelectorAll(".side-menu-link[href^='#']")
  .forEach(link => {
    link.addEventListener(
      "click",
      closeMenu
    );
  });


/* =========================================================
   09. ACCORDION SECTIONS
========================================================= */

const compactSectionButtons =
  document.querySelectorAll(
    "[data-toggle-section]"
  );


compactSectionButtons.forEach(button => {
  button.addEventListener(
    "click",
    function () {
      const targetId =
        button.dataset.toggleSection;

      const target =
        document.getElementById(targetId);

      if (!target) {
        return;
      }

      const isOpen =
        !target.hidden;

      compactSectionButtons.forEach(
        otherButton => {
          const otherTargetId =
            otherButton.dataset.toggleSection;

          const otherTarget =
            document.getElementById(otherTargetId);

          if (
            otherButton !== button &&
            otherTarget
          ) {
            otherTarget.hidden = true;
            otherButton.classList.remove("active");
          }
        }
      );

      target.hidden = isOpen;

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
});


/* =========================================================
   10. USER GREETING
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


/* =========================================================
   11. RENDER USER
========================================================= */

function getUserPlanLabel(currentUser) {
  const planName =
    String(
      currentUser.subscriptionLevel ||
      currentUser.plan ||
      currentUser.planId ||
      currentUser.subscriptionPlan ||
      currentUser.membershipPlan ||
      ""
    )
      .trim()
      .toLocaleLowerCase("de-CH");

  if (
    currentUser.premiumPlus === true ||
    planName.includes("plus")
  ) {
    return "Premium+ Konto";
  }

  if (
    currentUser.premium === true ||
    planName.includes("premium")
  ) {
    return "Premium-Konto";
  }

  return "Basis-Konto";
}


function renderUser() {
  user = getUser();

  const userName =
    String(user.name || "").trim();

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

  if (menuAccountPlan) {
    menuAccountPlan.textContent =
      getUserPlanLabel(user);
  }

  if (menuAvatar) {
    menuAvatar.textContent =
      userName
        ? userName.charAt(0).toUpperCase()
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

  closePremiumPlusModal();
  closeShareModal();

  premiumModal.hidden = false;
  body.classList.add("modal-open");
}


function closePremiumModal() {
  if (!premiumModal) {
    return;
  }

  premiumModal.hidden = true;
  body.classList.remove("modal-open");
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
   13. PREMIUM PLUS MODAL
========================================================= */

function openPremiumPlusModal() {
  closeMenu();

  if (!premiumPlusModal) {
    return;
  }

  closePremiumModal();
  closeShareModal();

  premiumPlusModal.hidden = false;
  body.classList.add("modal-open");
}


function closePremiumPlusModal() {
  if (!premiumPlusModal) {
    return;
  }

  premiumPlusModal.hidden = true;
  body.classList.remove("modal-open");
}


[
  premiumPlusMainButton,
  premiumPlusBottomButton,
  menuPremiumPlusButton
].forEach(button => {
  if (!button) {
    return;
  }

  button.addEventListener(
    "click",
    openPremiumPlusModal
  );
});


if (premiumPlusModalClose) {
  premiumPlusModalClose.addEventListener(
    "click",
    closePremiumPlusModal
  );
}


if (premiumPlusModalBackdrop) {
  premiumPlusModalBackdrop.addEventListener(
    "click",
    closePremiumPlusModal
  );
}


/* =========================================================
   14. SHARE MODAL
========================================================= */

function openShareModal() {
  closeMenu();
  closePremiumModal();
  closePremiumPlusModal();

  if (!shareModal) {
    return;
  }

  shareModal.hidden = false;
  body.classList.add("modal-open");

  if (shareMessage) {
    shareMessage.textContent = "";
  }
}


function closeShareModal() {
  if (!shareModal) {
    return;
  }

  shareModal.hidden = true;
  body.classList.remove("modal-open");
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
   15. SHARE DATA
========================================================= */

function getShareData() {
  const appURL =
    new URL(
      "../index.html",
      window.location.href
    ).href;

  return {
    title: "Mein Fortschritt",
    text:
      "Zusammen ist es leichter. Starte deinen Weg mit mir bei Mein Fortschritt.",
    url: appURL
  };
}


/* =========================================================
   16. NATIVE SHARE
========================================================= */

if (nativeShareButton) {
  nativeShareButton.addEventListener(
    "click",
    async function () {
      const shareData =
        getShareData();

      if (navigator.share) {
        try {
          await navigator.share(shareData);

          if (shareMessage) {
            shareMessage.textContent =
              "Danke fürs Teilen 💚";
          }
        } catch (error) {
          console.log("Teilen abgebrochen.");
        }
      } else {
        copyShareLink();
      }
    }
  );
}


/* =========================================================
   17. COPY SHARE LINK
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
   18. SETTINGS BUTTON
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
   19. ACCOUNT BUTTON
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
   20. LOGOUT
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

      closeMenu();

      window.location.href =
        "../index.html";
    }
  );
}


/* =========================================================
   21. WEIGHT - ENSURE INITIAL HISTORY
========================================================= */

function ensureInitialWeightHistory() {
  user = getUser();

  if (!hasValidNumber(user.startWeight)) {
    return;
  }

  if (weightHistory.length > 0) {
    return;
  }

  const startWeight =
    Number(user.startWeight);

  let startDate =
    getLocalToday();

  if (user.createdAt) {
    const createdDate =
      new Date(user.createdAt);

    if (!Number.isNaN(createdDate.getTime())) {
      const year =
        createdDate.getFullYear();

      const month =
        String(createdDate.getMonth() + 1)
          .padStart(2, "0");

      const day =
        String(createdDate.getDate())
          .padStart(2, "0");

      startDate =
        `${year}-${month}-${day}`;
    }
  }

  weightHistory.push({
    date: startDate,
    weight: startWeight
  });

  saveStorageData(
    DASHBOARD_STORAGE_KEYS.weightHistory,
    weightHistory
  );
}


/* =========================================================
   22. WEIGHT - RENDER CURRENT DATA
========================================================= */

function renderWeight() {
  user = getUser();

  if (currentWeightMain) {
    currentWeightMain.textContent =
      formatWeight(user.currentWeight);
  }

  if (goalWeightMain) {
    goalWeightMain.textContent =
      formatWeight(user.goalWeight);
  }

  if (startWeightText) {
    startWeightText.textContent =
      hasValidNumber(user.startWeight)
        ? `Start ${Number(user.startWeight).toFixed(1)} kg`
        : "Start —";
  }

  if (currentWeightText) {
    currentWeightText.textContent =
      hasValidNumber(user.currentWeight)
        ? `Aktuell ${Number(user.currentWeight).toFixed(1)} kg`
        : "Aktuell —";
  }

  if (goalWeightText) {
    goalWeightText.textContent =
      hasValidNumber(user.goalWeight)
        ? `Ziel ${Number(user.goalWeight).toFixed(1)} kg`
        : "Ziel —";
  }

  if (currentBMI && hasValidNumber(user.bmi)) {
    currentBMI.textContent =
      Number(user.bmi).toFixed(1);
  } else if (currentBMI) {
    currentBMI.textContent = "—";
  }

  if (bmiStatus && hasValidNumber(user.bmi)) {
    bmiStatus.textContent =
      getBMICategory(Number(user.bmi));
  } else if (bmiStatus) {
    bmiStatus.textContent =
      "Noch keine Daten";
  }

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
   23. WEIGHT - SAVE CURRENT WEIGHT
========================================================= */

if (weightForm && newWeightInput) {
  weightForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      const newWeight =
        Number(newWeightInput.value);

      if (
        !Number.isFinite(newWeight) ||
        newWeight < 30 ||
        newWeight > 300
      ) {
        alert("Bitte gib ein gültiges Gewicht ein.");
        return;
      }

      user =
        setCurrentWeight(newWeight);

      saveWeightHistory(newWeight);

      newWeightInput.value = "";

      renderUser();
      renderWeight();
      renderWeightHistory();
    }
  );
}


/* =========================================================
   24. WEIGHT - SAVE HISTORY
========================================================= */

function saveWeightHistory(weight) {
  const numericWeight =
    Number(weight);

  if (!Number.isFinite(numericWeight)) {
    return;
  }

  const today =
    getLocalToday();

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
      String(a.date).localeCompare(String(b.date))
  );

  saveStorageData(
    DASHBOARD_STORAGE_KEYS.weightHistory,
    weightHistory
  );
}


/* =========================================================
   25. WEIGHT - PREPARE HISTORY
========================================================= */

function getValidWeightHistory() {
  if (!Array.isArray(weightHistory)) {
    return [];
  }

  return weightHistory
    .filter(
      entry =>
        entry &&
        entry.date &&
        hasValidNumber(entry.weight)
    )
    .map(
      entry => ({
        date: String(entry.date),
        weight: Number(entry.weight)
      })
    )
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date)
    );
}


/* =========================================================
   26. WEIGHT - RENDER HISTORY AND CHART
========================================================= */

function renderWeightHistory() {
  if (!weightChart) {
    return;
  }

  const validHistory =
    getValidWeightHistory();

  if (validHistory.length === 0) {
    weightChart.innerHTML = `
      <div class="empty-state">
        <strong>Dein Verlauf beginnt hier.</strong>
        <span>Trage dein Gewicht regelmässig ein.</span>
      </div>
    `;

    return;
  }

  const recentHistory =
    validHistory.slice(-7);

  const weights =
    recentHistory.map(
      entry => entry.weight
    );

  let minimumWeight =
    Math.min(...weights);

  let maximumWeight =
    Math.max(...weights);

  if (minimumWeight === maximumWeight) {
    minimumWeight -= 1;
    maximumWeight += 1;
  }

  const chartWidth = 600;
  const chartHeight = 210;

  const paddingLeft = 42;
  const paddingRight = 20;
  const paddingTop = 24;
  const paddingBottom = 38;

  const usableWidth =
    chartWidth -
    paddingLeft -
    paddingRight;

  const usableHeight =
    chartHeight -
    paddingTop -
    paddingBottom;

  const points =
    recentHistory.map(
      (entry, index) => {
        const x =
          recentHistory.length === 1
            ? paddingLeft + usableWidth / 2
            : paddingLeft +
              (
                index /
                (recentHistory.length - 1)
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
          normalizedWeight * usableHeight;

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
      .map(point => `${point.x},${point.y}`)
      .join(" ");

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

  const chartLabels =
    points
      .map(
        point => `
          <div class="weight-chart-label">
            <strong>${point.weight.toFixed(1)}</strong>
            <span>${formatShortDate(point.date)}</span>
          </div>
        `
      )
      .join("");

  const firstWeight =
    recentHistory[0].weight;

  const lastWeight =
    recentHistory[recentHistory.length - 1].weight;

  const periodDifference =
    lastWeight - firstWeight;

  let periodDifferenceText = "±0.0 kg";

  if (periodDifference < 0) {
    periodDifferenceText =
      `${periodDifference.toFixed(1)} kg`;
  }

  if (periodDifference > 0) {
    periodDifferenceText =
      `+${periodDifference.toFixed(1)} kg`;
  }

  let totalDifferenceText = "—";

  if (
    hasValidNumber(user.startWeight) &&
    hasValidNumber(user.currentWeight)
  ) {
    const totalDifference =
      Number(user.currentWeight) -
      Number(user.startWeight);

    if (totalDifference === 0) {
      totalDifferenceText = "±0.0 kg";
    } else if (totalDifference > 0) {
      totalDifferenceText =
        `+${totalDifference.toFixed(1)} kg`;
    } else {
      totalDifferenceText =
        `${totalDifference.toFixed(1)} kg`;
    }
  }

  weightChart.innerHTML = `
    <div class="weight-chart-header">
      <div>
        <span>Gewichtsverlauf</span>
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
        <span>Seit dem Start</span>
        <strong>${totalDifferenceText}</strong>
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
            <strong>${periodDifferenceText}</strong>
          </div>
        `
        : ""
    }
  `;
}


/* =========================================================
   27. WATER - RENDER
========================================================= */

function renderWater() {
  if (!waterCurrent) {
    return;
  }

  const amount =
    hasValidNumber(waterData.amount)
      ? Number(waterData.amount)
      : 0;

  waterCurrent.textContent =
    (amount / 1000).toFixed(2);
}


/* =========================================================
   28. WATER - ADD 250 ML
========================================================= */

if (addWaterButton) {
  addWaterButton.addEventListener(
    "click",
    function () {
      checkNewDay();

      const currentAmount =
        hasValidNumber(waterData.amount)
          ? Number(waterData.amount)
          : 0;

      waterData.amount =
        currentAmount + 250;

      saveStorageData(
        DASHBOARD_STORAGE_KEYS.water,
        waterData
      );

      renderWater();
    }
  );
}


/* =========================================================
   29. FOOD - CATALOG
========================================================= */

const foodCatalog =
  Array.isArray(window.FOOD_CATALOG)
    ? window.FOOD_CATALOG
    : [
        {
          id: "banana-raw",
          name: "Banane, roh",
          aliases: [
            "Banane",
            "Banana",
            "Banana, raw"
          ],
          per100g: {
            calories: 90,
            protein: 1.1,
            carbohydrates: 19.7,
            fat: 0.2,
            fiber: 2.7,
            sugar: 15.6,
            water: 75.8
          },
          highlights: [],
          completeNutrients: []
        }
      ];


function normalizeFoodName(value) {
  return String(value || "")
    .trim()
    .toLocaleLowerCase("de-CH");
}


function findFoodByName(name) {
  const searchName =
    normalizeFoodName(name);

  return foodCatalog.find(food => {
    const names = [
      food.name,
      ...(food.aliases || [])
    ];

    return names.some(
      item =>
        normalizeFoodName(item) === searchName
    );
  });
}


function populateFoodCatalog() {
  if (!foodCatalogOptions) {
    return;
  }

  foodCatalogOptions.innerHTML = "";

  foodCatalog.forEach(food => {
    const names = [
      food.name,
      ...(food.aliases || [])
    ];

    names.forEach(name => {
      const option =
        document.createElement("option");

      option.value = name;
      foodCatalogOptions.appendChild(option);
    });
  });
}


populateFoodCatalog();


/* =========================================================
   30. FOOD - CALCULATE NUTRIENTS
========================================================= */

function calculateFoodValues(food, amountGrams) {
  const multiplier =
    amountGrams / 100;

  const values = {};

  Object.entries(food.per100g || {})
    .forEach(([key, value]) => {
      const number = Number(value);

      if (Number.isFinite(number)) {
        const calculated =
          number * multiplier;

        values[key] =
          key === "calories"
            ? Math.round(calculated)
            : Math.round(calculated * 10) / 10;
      }
    });

  return values;
}


function getFoodPlanLevel() {
  const currentUser =
    getUser();

  const planName =
    String(
      currentUser.subscriptionLevel ||
      currentUser.plan ||
      currentUser.planId ||
      currentUser.subscriptionPlan ||
      currentUser.membershipPlan ||
      ""
    )
      .trim()
      .toLocaleLowerCase("de-CH");

  if (
    currentUser.premiumPlus === true ||
    planName.includes("plus")
  ) {
    return "premium-plus";
  }

  if (
    currentUser.premium === true ||
    planName.includes("premium")
  ) {
    return "premium";
  }

  return "free";
}


function formatNutrient(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return number.toLocaleString(
    "de-CH",
    {
      maximumFractionDigits: 1
    }
  );
}


function renderFoodNutrients(food, amountGrams) {
  const planLevel =
    getFoodPlanLevel();

  const values =
    calculateFoodValues(
      food,
      amountGrams
    );

  const showPremium =
    planLevel === "premium" ||
    planLevel === "premium-plus";

  const showPremiumPlus =
    planLevel === "premium-plus";

  if (premiumFoodDetails) {
    premiumFoodDetails.hidden =
      !showPremium;
  }

  if (premiumPlusFoodDetails) {
    premiumPlusFoodDetails.hidden =
      !showPremiumPlus;
  }

  if (!showPremium) {
    return;
  }

  if (foodProtein) {
    foodProtein.textContent =
      formatNutrient(values.protein);
  }

  if (foodCarbohydrates) {
    foodCarbohydrates.textContent =
      formatNutrient(values.carbohydrates);
  }

  if (foodFat) {
    foodFat.textContent =
      formatNutrient(values.fat);
  }

  if (foodFiber) {
    foodFiber.textContent =
      formatNutrient(values.fiber);
  }

  if (foodHighlights) {
    const highlights =
      Array.isArray(food.highlights)
        ? food.highlights
        : [];

    foodHighlights.textContent =
      highlights.join(", ");

    foodHighlights.hidden =
      highlights.length === 0;
  }

  if (
    !showPremiumPlus ||
    !foodCompleteNutrients
  ) {
    return;
  }

  foodCompleteNutrients.innerHTML = "";

  const completeNutrients =
    Array.isArray(food.completeNutrients)
      ? food.completeNutrients
      : [];

  if (completeNutrients.length === 0) {
    const row =
      document.createElement("tr");

    const cell =
      document.createElement("td");

    cell.colSpan = 2;
    cell.textContent =
      "Vollständige Nährwerte werden noch geladen.";

    row.appendChild(cell);
    foodCompleteNutrients.appendChild(row);

    return;
  }

  completeNutrients.forEach(nutrient => {
    const row =
      document.createElement("tr");

    const nameCell =
      document.createElement("td");

    const valueCell =
      document.createElement("td");

    nameCell.textContent =
      nutrient.name;

    valueCell.textContent =
      `${formatNutrient(
        Number(nutrient.value) *
        amountGrams / 100
      )} ${nutrient.unit || ""}`.trim();

    row.appendChild(nameCell);
    row.appendChild(valueCell);
    foodCompleteNutrients.appendChild(row);
  });
}


/* =========================================================
   31. FOOD - UPDATE SELECTION
========================================================= */

function updateFoodSelection() {
  if (
    !foodNameInput ||
    !foodAmountInput ||
    !foodCaloriesInput
  ) {
    return;
  }

  const food =
    findFoodByName(foodNameInput.value);

  const amountGrams =
    Number(foodAmountInput.value);

  if (
    !food ||
    !Number.isFinite(amountGrams) ||
    amountGrams <= 0
  ) {
    if (foodIdInput) {
      foodIdInput.value = "";
    }

    foodCaloriesInput.value = "";

    if (premiumFoodDetails) {
      premiumFoodDetails.hidden = true;
    }

    if (premiumPlusFoodDetails) {
      premiumPlusFoodDetails.hidden = true;
    }

    return;
  }

  const values =
    calculateFoodValues(
      food,
      amountGrams
    );

  if (foodIdInput) {
    foodIdInput.value =
      food.id;
  }

  foodCaloriesInput.value =
    values.calories ?? "";

  renderFoodNutrients(
    food,
    amountGrams
  );
}


if (foodNameInput) {
  foodNameInput.addEventListener(
    "input",
    updateFoodSelection
  );
}


if (foodAmountInput) {
  foodAmountInput.addEventListener(
    "input",
    updateFoodSelection
  );
}


/* =========================================================
   32. FOOD - CALCULATE CONSUMED CALORIES
========================================================= */

function getConsumedCalories() {
  return foodData.items.reduce(
    (total, item) => {
      const calories =
        Number(item.calories);

      if (!Number.isFinite(calories)) {
        return total;
      }

      return total + calories;
    },
    0
  );
}


/* =========================================================
   33. FOOD - RENDER CALORIES
========================================================= */

function renderCalories() {
  user = getUser();

  const consumed =
    getConsumedCalories();

  if (caloriesConsumed) {
    caloriesConsumed.textContent =
      consumed.toLocaleString("de-CH");
  }

  const dailyGoals =
    typeof getActiveDailyNutritionGoals === "function"
      ? getActiveDailyNutritionGoals()
      : null;

  const goal =
    dailyGoals
      ? Number(dailyGoals.calories)
      : null;

  const hasGoal =
    Number.isFinite(goal) &&
    goal > 0;

  if (professionalCalorieGoals) {
    professionalCalorieGoals.hidden =
      !hasGoal;
  }

  if (!hasGoal) {
    if (calorieGoalElement) {
      calorieGoalElement.textContent = "—";
    }

    if (caloriesRemaining) {
      caloriesRemaining.textContent = "—";
    }

    renderFoodList();
    return;
  }

  const remaining =
    Math.max(0, goal - consumed);

  if (calorieGoalElement) {
    calorieGoalElement.textContent =
      goal.toLocaleString("de-CH");
  }

  if (caloriesRemaining) {
    caloriesRemaining.textContent =
      remaining.toLocaleString("de-CH");
  }

  renderFoodList();
}


/* =========================================================
   34. FOOD - ADD ITEM
========================================================= */

if (
  foodForm &&
  foodNameInput &&
  foodAmountInput &&
  foodCaloriesInput
) {
  foodForm.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();

      checkNewDay();

      const food =
        findFoodByName(foodNameInput.value);

      const amountGrams =
        Number(foodAmountInput.value);

      const calories =
        Number(foodCaloriesInput.value);

      if (
        !food ||
        !Number.isFinite(amountGrams) ||
        amountGrams <= 0 ||
        !Number.isFinite(calories)
      ) {
        alert(
          "Bitte ein Lebensmittel aus der Liste auswählen."
        );

        return;
      }

      const nutrients =
        calculateFoodValues(
          food,
          amountGrams
        );

      foodData.items.push({
        id: Date.now(),
        foodId: food.id,
        name: food.name,
        amountGrams,
        calories,
        nutrients
      });

      saveStorageData(
        DASHBOARD_STORAGE_KEYS.food,
        foodData
      );

      foodNameInput.value = "";
      foodAmountInput.value = "100";
      foodCaloriesInput.value = "";

      if (foodIdInput) {
        foodIdInput.value = "";
      }

      if (premiumFoodDetails) {
        premiumFoodDetails.hidden = true;
      }

      if (premiumPlusFoodDetails) {
        premiumPlusFoodDetails.hidden = true;
      }

      renderCalories();
    }
  );
}


/* =========================================================
   35. FOOD - RENDER ITEM LIST
========================================================= */

function renderFoodList() {
  if (!foodList) {
    return;
  }

  if (foodData.items.length === 0) {
    foodList.innerHTML = `
      <div class="empty-state">
        <strong>Noch nichts eingetragen.</strong>
        <span>Deine Lebensmittel erscheinen hier.</span>
      </div>
    `;

    return;
  }

  foodList.innerHTML = "";

  foodData.items.forEach(item => {
    const row =
      document.createElement("div");

    row.className = "food-item";

    const details =
      document.createElement("div");

    const name =
      document.createElement("strong");

    const amount =
      document.createElement("span");

    const calories =
      document.createElement("span");

    name.textContent =
      item.name || "Lebensmittel";

    amount.textContent =
      `${formatNutrient(item.amountGrams)} g`;

    calories.textContent =
      `${formatNutrient(item.calories)} kcal`;

    details.appendChild(name);
    details.appendChild(amount);
    details.appendChild(calories);

    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-item";
    deleteButton.dataset.foodId = item.id;
    deleteButton.setAttribute(
      "aria-label",
      "Lebensmittel löschen"
    );
    deleteButton.textContent = "×";

    row.appendChild(details);
    row.appendChild(deleteButton);
    foodList.appendChild(row);
  });

  foodList
    .querySelectorAll("[data-food-id]")
    .forEach(button => {
      button.addEventListener(
        "click",
        function () {
          const id =
            Number(button.dataset.foodId);

          foodData.items =
            foodData.items.filter(
              item =>
                Number(item.id) !== id
            );

          saveStorageData(
            DASHBOARD_STORAGE_KEYS.food,
            foodData
          );

          renderCalories();
        }
      );
    });
}


/* =========================================================
   36. MOVEMENT - CALCULATE TOTAL MINUTES
========================================================= */

function getMovementMinutes() {
  return movementData.items.reduce(
    (total, item) => {
      const minutes =
        Number(item.minutes);

      if (!Number.isFinite(minutes)) {
        return total;
      }

      return total + minutes;
    },
    0
  );
}


/* =========================================================
   37. MOVEMENT - RENDER
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

  if (movementData.items.length === 0) {
    activityList.innerHTML = `
      <div class="empty-state">
        <strong>Noch keine Aktivität.</strong>
        <span>Auch kleine Bewegungen zählen.</span>
      </div>
    `;

    return;
  }

  activityList.innerHTML = "";

  movementData.items.forEach(item => {
    const row =
      document.createElement("div");

    row.className = "activity-item";

    const details =
      document.createElement("div");

    const name =
      document.createElement("strong");

    const duration =
      document.createElement("span");

    name.textContent =
      item.name || "Aktivität";

    duration.textContent =
      `${formatNutrient(item.minutes)} Min.`;

    details.appendChild(name);
    details.appendChild(duration);

    const deleteButton =
      document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-item";
    deleteButton.dataset.activityId = item.id;
    deleteButton.setAttribute(
      "aria-label",
      "Aktivität löschen"
    );
    deleteButton.textContent = "×";

    row.appendChild(details);
    row.appendChild(deleteButton);
    activityList.appendChild(row);
  });

  activityList
    .querySelectorAll("[data-activity-id]")
    .forEach(button => {
      button.addEventListener(
        "click",
        function () {
          const id =
            Number(button.dataset.activityId);

          movementData.items =
            movementData.items.filter(
              item =>
                Number(item.id) !== id
            );

          saveStorageData(
            DASHBOARD_STORAGE_KEYS.movement,
            movementData
          );

          renderMovement();
        }
      );
    });
}


/* =========================================================
   38. MOVEMENT - ADD ACTIVITY
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
        Number(activityMinutesInput.value);

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

      saveStorageData(
        DASHBOARD_STORAGE_KEYS.movement,
        movementData
      );

      activityNameInput.value = "";
      activityMinutesInput.value = "";

      renderMovement();
    }
  );
}


/* =========================================================
   39. ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  function (event) {
    if (event.key !== "Escape") {
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
      premiumPlusModal &&
      !premiumPlusModal.hidden
    ) {
      closePremiumPlusModal();
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
   40. RENDER DASHBOARD
========================================================= */

function renderDashboard() {
  checkNewDay();

  user = getUser();

  ensureInitialWeightHistory();

  renderUser();
  renderWeight();
  renderWeightHistory();
  renderWater();
  renderCalories();
  renderMovement();
}


/* =========================================================
   41. START DASHBOARD
========================================================= */

renderDashboard();