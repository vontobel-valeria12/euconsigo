/* =========================================================
   ERNAEHRUNG.JS
   Mein Fortschritt
========================================================= */


/* =========================================================
   01. STATE
========================================================= */

let selectedFood =
  null;

let selectedMealType =
  "breakfast";


/* =========================================================
   02. ELEMENTS
========================================================= */

const currentDateElement =
  document.getElementById(
    "currentDate"
  );


const caloriesConsumedElement =
  document.getElementById(
    "caloriesConsumed"
  );

const proteinConsumedElement =
  document.getElementById(
    "proteinConsumed"
  );

const carbohydratesConsumedElement =
  document.getElementById(
    "carbohydratesConsumed"
  );

const fatConsumedElement =
  document.getElementById(
    "fatConsumed"
  );

const fiberConsumedElement =
  document.getElementById(
    "fiberConsumed"
  );

const sugarConsumedElement =
  document.getElementById(
    "sugarConsumed"
  );


const caloriesGoalArea =
  document.getElementById(
    "caloriesGoalArea"
  );

const caloriesGoalElement =
  document.getElementById(
    "caloriesGoal"
  );

const caloriesRemainingElement =
  document.getElementById(
    "caloriesRemaining"
  );

const caloriesProgressElement =
  document.getElementById(
    "caloriesProgress"
  );


const proteinGoalElement =
  document.getElementById(
    "proteinGoal"
  );

const carbohydratesGoalElement =
  document.getElementById(
    "carbohydratesGoal"
  );

const fatGoalElement =
  document.getElementById(
    "fatGoal"
  );

const fiberGoalElement =
  document.getElementById(
    "fiberGoal"
  );

const sugarGoalElement =
  document.getElementById(
    "sugarGoal"
  );


const professionalPlanSection =
  document.getElementById(
    "professionalPlanSection"
  );

const nutritionPlanName =
  document.getElementById(
    "nutritionPlanName"
  );

const nutritionProfessionalName =
  document.getElementById(
    "nutritionProfessionalName"
  );

const nutritionProfessionalRole =
  document.getElementById(
    "nutritionProfessionalRole"
  );

const nutritionPlanStart =
  document.getElementById(
    "nutritionPlanStart"
  );

const nutritionPlanEnd =
  document.getElementById(
    "nutritionPlanEnd"
  );

const nutritionPlanNotes =
  document.getElementById(
    "nutritionPlanNotes"
  );


const openFoodButton =
  document.getElementById(
    "openFoodButton"
  );

const foodModal =
  document.getElementById(
    "foodModal"
  );

const foodModalBackdrop =
  document.getElementById(
    "foodModalBackdrop"
  );

const closeFoodModalButton =
  document.getElementById(
    "closeFoodModalButton"
  );


const foodSearchView =
  document.getElementById(
    "foodSearchView"
  );

const foodSearchInput =
  document.getElementById(
    "foodSearchInput"
  );

const foodSearchResults =
  document.getElementById(
    "foodSearchResults"
  );

const foodNotFound =
  document.getElementById(
    "foodNotFound"
  );

const openCustomFoodButton =
  document.getElementById(
    "openCustomFoodButton"
  );


const selectedFoodForm =
  document.getElementById(
    "selectedFoodForm"
  );

const selectedFoodName =
  document.getElementById(
    "selectedFoodName"
  );

const selectedFoodBrand =
  document.getElementById(
    "selectedFoodBrand"
  );

const selectedFoodQuantity =
  document.getElementById(
    "selectedFoodQuantity"
  );

const selectedFoodUnit =
  document.getElementById(
    "selectedFoodUnit"
  );

const selectedFoodMeal =
  document.getElementById(
    "selectedFoodMeal"
  );

const selectedFoodTime =
  document.getElementById(
    "selectedFoodTime"
  );

const changeSelectedFoodButton =
  document.getElementById(
    "changeSelectedFoodButton"
  );


const selectedCalories =
  document.getElementById(
    "selectedCalories"
  );

const selectedProtein =
  document.getElementById(
    "selectedProtein"
  );

const selectedCarbohydrates =
  document.getElementById(
    "selectedCarbohydrates"
  );

const selectedFat =
  document.getElementById(
    "selectedFat"
  );

const selectedFiber =
  document.getElementById(
    "selectedFiber"
  );

const selectedSugar =
  document.getElementById(
    "selectedSugar"
  );


const customFoodForm =
  document.getElementById(
    "customFoodForm"
  );

const backToFoodSearchButton =
  document.getElementById(
    "backToFoodSearchButton"
  );

const customFoodName =
  document.getElementById(
    "customFoodName"
  );

const customFoodBrand =
  document.getElementById(
    "customFoodBrand"
  );

const customFoodBasisAmount =
  document.getElementById(
    "customFoodBasisAmount"
  );

const customFoodBasisUnit =
  document.getElementById(
    "customFoodBasisUnit"
  );

const customFoodCalories =
  document.getElementById(
    "customFoodCalories"
  );

const customFoodProtein =
  document.getElementById(
    "customFoodProtein"
  );

const customFoodCarbohydrates =
  document.getElementById(
    "customFoodCarbohydrates"
  );

const customFoodFat =
  document.getElementById(
    "customFoodFat"
  );

const customFoodFiber =
  document.getElementById(
    "customFoodFiber"
  );

const customFoodSugar =
  document.getElementById(
    "customFoodSugar"
  );

const customFoodMeal =
  document.getElementById(
    "customFoodMeal"
  );

const customFoodTime =
  document.getElementById(
    "customFoodTime"
  );


/* =========================================================
   03. FORMATTERS
========================================================= */

function formatNutritionNumber(
  value
) {

  const numericValue =
    Number(
      value
    );


  if (
    !Number.isFinite(
      numericValue
    )
  ) {

    return "0";

  }


  return new Intl.NumberFormat(
    "de-CH",
    {
      maximumFractionDigits: 2
    }
  )
    .format(
      numericValue
    );

}


function formatNullableNutritionNumber(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return "—";

  }


  return formatNutritionNumber(
    value
  );

}


function formatPageDate(
  date = new Date()
) {

  return new Intl.DateTimeFormat(
    "de-CH",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }
  )
    .format(
      date
    );

}


function formatPlanDate(
  value
) {

  if (
    !value
  ) {

    return "—";

  }


  const dateKey =
    String(
      value
    )
      .slice(
        0,
        10
      );


  const parts =
    dateKey.split(
      "-"
    );


  if (
    parts.length !== 3
  ) {

    return "—";

  }


  const date =
    new Date(
      Number(
        parts[0]
      ),
      Number(
        parts[1]
      ) - 1,
      Number(
        parts[2]
      )
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return "—";

  }


  return new Intl.DateTimeFormat(
    "de-CH"
  )
    .format(
      date
    );

}


function getCurrentTimeValue() {

  const now =
    new Date();


  const hours =
    String(
      now.getHours()
    )
      .padStart(
        2,
        "0"
      );


  const minutes =
    String(
      now.getMinutes()
    )
      .padStart(
        2,
        "0"
      );


  return `${hours}:${minutes}`;

}


/* =========================================================
   04. DAILY SUMMARY
========================================================= */

function renderDailySummary(
  day
) {

  const totals =
    day?.totals ?? {};


  caloriesConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.calories
    )} kcal`;


  proteinConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.protein
    )} g`;


  carbohydratesConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.carbohydrates
    )} g`;


  fatConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.fat
    )} g`;


  fiberConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.fiber
    )} g`;


  sugarConsumedElement.textContent =
    `${formatNutritionNumber(
      totals.sugar
    )} g`;


  renderNutritionGoals(
    totals
  );

}


/* =========================================================
   05. NUTRITION GOALS
========================================================= */

function renderNutritionGoals(
  totals
) {

  if (
    !hasActiveNutritionPlan()
  ) {

    caloriesGoalArea.hidden =
      true;

    proteinGoalElement.hidden =
      true;

    carbohydratesGoalElement.hidden =
      true;

    fatGoalElement.hidden =
      true;

    fiberGoalElement.hidden =
      true;

    sugarGoalElement.hidden =
      true;

    return;

  }


  const plan =
    getActiveNutritionPlan();


  const goals =
    plan?.dailyGoals ?? {};


  renderCaloriesGoal(
    totals.calories,
    goals.calories
  );


  renderNutrientGoal(
    proteinGoalElement,
    goals.protein
  );


  renderNutrientGoal(
    carbohydratesGoalElement,
    goals.carbohydrates
  );


  renderNutrientGoal(
    fatGoalElement,
    goals.fat
  );


  renderNutrientGoal(
    fiberGoalElement,
    goals.fiber
  );


  renderNutrientGoal(
    sugarGoalElement,
    goals.sugar
  );

}


/* =========================================================
   06. CALORIES GOAL
========================================================= */

function renderCaloriesGoal(
  consumed,
  goal
) {

  const numericGoal =
    Number(
      goal
    );


  if (
    goal === null ||
    goal === undefined ||
    !Number.isFinite(
      numericGoal
    ) ||
    numericGoal <= 0
  ) {

    caloriesGoalArea.hidden =
      true;

    return;

  }


  const numericConsumed =
    Number(
      consumed
    ) || 0;


  const remaining =
    numericGoal -
    numericConsumed;


  const progress =
    Math.min(
      100,
      Math.max(
        0,
        (
          numericConsumed /
          numericGoal
        ) *
        100
      )
    );


  caloriesGoalElement.textContent =
    `${formatNutritionNumber(
      numericGoal
    )} kcal`;


  caloriesRemainingElement.textContent =
    `${formatNutritionNumber(
      remaining
    )} kcal`;


  caloriesProgressElement.style.width =
    `${progress}%`;


  caloriesGoalArea.hidden =
    false;

}


/* =========================================================
   07. NUTRIENT GOAL
========================================================= */

function renderNutrientGoal(
  element,
  goal
) {

  const numericGoal =
    Number(
      goal
    );


  if (
    goal === null ||
    goal === undefined ||
    !Number.isFinite(
      numericGoal
    )
  ) {

    element.hidden =
      true;

    return;

  }


  element.textContent =
    `Ziel: ${formatNutritionNumber(
      numericGoal
    )} g`;


  element.hidden =
    false;

}


/* =========================================================
   08. PROFESSIONAL PLAN
========================================================= */

function renderProfessionalPlan() {

  if (
    !hasActiveNutritionPlan()
  ) {

    professionalPlanSection.hidden =
      true;

    return;

  }


  const plan =
    getActiveNutritionPlan();


  nutritionPlanName.textContent =
    plan.planName ||
    "Aktiver Ernährungsplan";


  nutritionProfessionalName.textContent =
    plan.professional?.name ||
    "—";


  nutritionProfessionalRole.textContent =
    plan.professional?.role ||
    "—";


  nutritionPlanStart.textContent =
    formatPlanDate(
      plan.validFrom
    );


  nutritionPlanEnd.textContent =
    formatPlanDate(
      plan.validUntil
    );


  if (
    plan.notes
  ) {

    nutritionPlanNotes.textContent =
      plan.notes;

    nutritionPlanNotes.hidden =
      false;

  }

  else {

    nutritionPlanNotes.textContent =
      "";

    nutritionPlanNotes.hidden =
      true;

  }


  professionalPlanSection.hidden =
    false;

}


/* =========================================================
   09. MEALS
========================================================= */

function renderMeals(
  day
) {

  renderMeal(
    day,
    "breakfast",
    "breakfastItems",
    "breakfastCalories"
  );


  renderMeal(
    day,
    "lunch",
    "lunchItems",
    "lunchCalories"
  );


  renderMeal(
    day,
    "snack",
    "snackItems",
    "snackCalories"
  );


  renderMeal(
    day,
    "dinner",
    "dinnerItems",
    "dinnerCalories"
  );

}


/* =========================================================
   10. MEAL
========================================================= */

function renderMeal(
  day,
  mealType,
  itemsElementId,
  caloriesElementId
) {

  const itemsElement =
    document.getElementById(
      itemsElementId
    );


  const caloriesElement =
    document.getElementById(
      caloriesElementId
    );


  const meal =
    day.meals.find(
      item =>
        item.type === mealType
    );


  if (
    !meal
  ) {

    itemsElement.replaceChildren();

    caloriesElement.textContent =
      "0 kcal";

    return;

  }


  caloriesElement.textContent =
    `${formatNutritionNumber(
      meal.totals?.calories
    )} kcal`;


  renderMealItems(
    itemsElement,
    meal
  );

}


/* =========================================================
   11. MEAL ITEMS
========================================================= */

function renderMealItems(
  container,
  meal
) {

  container.replaceChildren();


  if (
    !Array.isArray(
      meal.items
    ) ||
    meal.items.length === 0
  ) {

    const emptyText =
      document.createElement(
        "p"
      );


    emptyText.className =
      "empty-meal";


    emptyText.textContent =
      "Noch nichts eingetragen.";


    container.appendChild(
      emptyText
    );


    return;

  }


  meal.items.forEach(
    item => {

      container.appendChild(
        createFoodEntryElement(
          item,
          meal.type
        )
      );

    }
  );

}


/* =========================================================
   12. FOOD ENTRY
========================================================= */

function createFoodEntryElement(
  item,
  mealType
) {

  const entry =
    document.createElement(
      "div"
    );


  entry.className =
    "food-entry";


  const main =
    document.createElement(
      "div"
    );


  main.className =
    "food-entry-main";


  const name =
    document.createElement(
      "strong"
    );


  name.className =
    "food-entry-name";


  name.textContent =
    item.name ||
    "Lebensmittel";


  const meta =
    document.createElement(
      "span"
    );


  meta.className =
    "food-entry-meta";


  const metaParts =
    [
      `${formatNutritionNumber(
        item.quantity
      )} ${item.unit || ""}`
    ];


  if (
    item.time
  ) {

    metaParts.push(
      item.time
    );

  }


  meta.textContent =
    metaParts.join(
      " · "
    );


  main.append(
    name,
    meta
  );


  const values =
    document.createElement(
      "div"
    );


  values.className =
    "food-entry-values";


  const calories =
    document.createElement(
      "span"
    );


  calories.className =
    "food-entry-calories";


  calories.textContent =
    `${formatNutritionNumber(
      item.calories
    )} kcal`;


  const deleteButton =
    document.createElement(
      "button"
    );


  deleteButton.type =
    "button";


  deleteButton.className =
    "food-entry-delete";


  deleteButton.textContent =
    "×";


  deleteButton.setAttribute(
    "aria-label",
    `${item.name || "Lebensmittel"} löschen`
  );


  deleteButton.addEventListener(
    "click",
    () => {

      deleteFoodEntry(
        mealType,
        item.id
      );

    }
  );


  values.append(
    calories,
    deleteButton
  );


  entry.append(
    main,
    values
  );


  return entry;

}


/* =========================================================
   13. DELETE FOOD ENTRY
========================================================= */

function deleteFoodEntry(
  mealType,
  itemId
) {

  const day =
    getCurrentFoodDay();


  const meal =
    day.meals.find(
      item =>
        item.type === mealType
    );


  if (
    !meal
  ) {

    return;

  }


  meal.items =
    meal.items.filter(
      item =>
        item.id !== itemId
    );


  saveFoodDay(
    day
  );


  renderNutritionPage();

}


/* =========================================================
   14. MODAL
========================================================= */

function openFoodModal(
  mealType = "breakfast"
) {

  selectedFood =
    null;


  selectedMealType =
    mealType;


  foodModal.hidden =
    false;


  document.body.style.overflow =
    "hidden";


  showFoodSearchView();


  foodSearchInput.value =
    "";


  selectedFoodMeal.value =
    selectedMealType;


  customFoodMeal.value =
    selectedMealType;


  selectedFoodTime.value =
    getCurrentTimeValue();


  customFoodTime.value =
    getCurrentTimeValue();


  renderFoodSearchResults(
    ""
  );


  window.setTimeout(
    () => {

      foodSearchInput.focus();

    },
    0
  );

}


function closeFoodModal() {

  foodModal.hidden =
    true;


  document.body.style.overflow =
    "";


  selectedFood =
    null;


  selectedFoodForm.reset();


  customFoodForm.reset();


  customFoodBasisAmount.value =
    "100";


  customFoodBasisUnit.value =
    "g";

}


/* =========================================================
   15. MODAL VIEWS
========================================================= */

function showFoodSearchView() {

  foodSearchView.hidden =
    false;

  selectedFoodForm.hidden =
    true;

  customFoodForm.hidden =
    true;

}


function showSelectedFoodView() {

  foodSearchView.hidden =
    true;

  selectedFoodForm.hidden =
    false;

  customFoodForm.hidden =
    true;

}


function showCustomFoodView() {

  foodSearchView.hidden =
    true;

  selectedFoodForm.hidden =
    true;

  customFoodForm.hidden =
    false;


  customFoodMeal.value =
    selectedMealType;


  customFoodTime.value =
    getCurrentTimeValue();


  customFoodName.focus();

}


/* =========================================================
   16. FOOD SEARCH
========================================================= */

function renderFoodSearchResults(
  query
) {

  const foods =
    searchFoods(
      query
    );


  foodSearchResults.replaceChildren();


  if (
    foods.length === 0
  ) {

    foodNotFound.hidden =
      false;

    return;

  }


  foodNotFound.hidden =
    false;


  foods.forEach(
    food => {

      foodSearchResults.appendChild(
        createFoodSearchResult(
          food
        )
      );

    }
  );

}


/* =========================================================
   17. FOOD SEARCH RESULT
========================================================= */

function createFoodSearchResult(
  food
) {

  const button =
    document.createElement(
      "button"
    );


  button.type =
    "button";


  button.className =
    "food-result-item";


  const info =
    document.createElement(
      "div"
    );


  info.className =
    "food-result-info";


  const name =
    document.createElement(
      "strong"
    );


  name.className =
    "food-result-name";


  name.textContent =
    food.name;


  info.appendChild(
    name
  );


  if (
    food.brand
  ) {

    const brand =
      document.createElement(
        "span"
      );


    brand.className =
      "food-result-brand";


    brand.textContent =
      food.brand;


    info.appendChild(
      brand
    );

  }


  const nutrition =
    document.createElement(
      "span"
    );


  nutrition.className =
    "food-result-nutrition";


  const calories =
    food.values?.calories;


  const amount =
    food.nutritionBasis?.amount ??
    100;


  const unit =
    food.nutritionBasis?.unit ??
    "g";


  nutrition.textContent =
    calories === null ||
    calories === undefined
      ? `${amount} ${unit}`
      : `${formatNutritionNumber(
          calories
        )} kcal / ${formatNutritionNumber(
          amount
        )} ${unit}`;


  button.append(
    info,
    nutrition
  );


  button.addEventListener(
    "click",
    () => {

      selectFood(
        food
      );

    }
  );


  return button;

}


/* =========================================================
   18. SELECT FOOD
========================================================= */

function selectFood(
  food
) {

  selectedFood =
    food;


  selectedFoodName.textContent =
    food.name;


  selectedFoodBrand.textContent =
    food.brand ||
    "";


  selectedFoodUnit.value =
    food.nutritionBasis?.unit ??
    food.defaultUnit ??
    "g";


  selectedFoodQuantity.value =
    food.nutritionBasis?.amount ??
    100;


  selectedFoodMeal.value =
    selectedMealType;


  selectedFoodTime.value =
    selectedFoodTime.value ||
    getCurrentTimeValue();


  updateSelectedFoodValues();


  showSelectedFoodView();

}


/* =========================================================
   19. SELECTED FOOD VALUES
========================================================= */

function updateSelectedFoodValues() {

  if (
    !selectedFood
  ) {

    return;

  }


  const quantity =
    Number(
      selectedFoodQuantity.value
    );


  const values =
    calculateFoodValues(
      selectedFood,
      quantity
    );


  if (
    !values
  ) {

    selectedCalories.textContent =
      "—";

    selectedProtein.textContent =
      "—";

    selectedCarbohydrates.textContent =
      "—";

    selectedFat.textContent =
      "—";

    selectedFiber.textContent =
      "—";

    selectedSugar.textContent =
      "—";

    return;

  }


  selectedCalories.textContent =
    `${formatNullableNutritionNumber(
      values.calories
    )} kcal`;


  selectedProtein.textContent =
    `${formatNullableNutritionNumber(
      values.protein
    )} g`;


  selectedCarbohydrates.textContent =
    `${formatNullableNutritionNumber(
      values.carbohydrates
    )} g`;


  selectedFat.textContent =
    `${formatNullableNutritionNumber(
      values.fat
    )} g`;


  selectedFiber.textContent =
    `${formatNullableNutritionNumber(
      values.fiber
    )} g`;


  selectedSugar.textContent =
    `${formatNullableNutritionNumber(
      values.sugar
    )} g`;

}


/* =========================================================
   20. ADD SELECTED FOOD
========================================================= */

function addSelectedFoodToMeal() {

  if (
    !selectedFood
  ) {

    return;

  }


  const quantity =
    Number(
      selectedFoodQuantity.value
    );


  if (
    !Number.isFinite(
      quantity
    ) ||
    quantity <= 0
  ) {

    return;

  }


  const mealType =
    selectedFoodMeal.value;


  const consumedItem =
    createConsumedFoodItem(
      selectedFood.id,
      quantity,
      selectedFoodTime.value
    );


  if (
    !consumedItem
  ) {

    return;

  }


  const day =
    getCurrentFoodDay();


  const meal =
    day.meals.find(
      item =>
        item.type === mealType
    );


  if (
    !meal
  ) {

    return;

  }


  meal.items.push(
    consumedItem
  );


  saveFoodDay(
    day
  );


  closeFoodModal();


  renderNutritionPage();

}


/* =========================================================
   21. CUSTOM FOOD
========================================================= */

function saveCustomFood() {

  const food =
    addCustomFood({

      name:
        customFoodName.value,

      brand:
        customFoodBrand.value,

      defaultUnit:
        customFoodBasisUnit.value,

      nutritionBasis: {

        amount:
          Number(
            customFoodBasisAmount.value
          ),

        unit:
          customFoodBasisUnit.value

      },

      values: {

        calories:
          getOptionalNumber(
            customFoodCalories.value
          ),

        protein:
          getOptionalNumber(
            customFoodProtein.value
          ),

        carbohydrates:
          getOptionalNumber(
            customFoodCarbohydrates.value
          ),

        fat:
          getOptionalNumber(
            customFoodFat.value
          ),

        fiber:
          getOptionalNumber(
            customFoodFiber.value
          ),

        sugar:
          getOptionalNumber(
            customFoodSugar.value
          )

      }

    });


  if (
    !food
  ) {

    return;

  }


  selectedMealType =
    customFoodMeal.value;


  const savedTime =
    customFoodTime.value;


  selectFood(
    food
  );


  selectedFoodMeal.value =
    selectedMealType;


  selectedFoodTime.value =
    savedTime;


  customFoodForm.reset();


  customFoodBasisAmount.value =
    "100";


  customFoodBasisUnit.value =
    "g";

}


/* =========================================================
   22. OPTIONAL NUMBER
========================================================= */

function getOptionalNumber(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return null;

  }


  const numericValue =
    Number(
      value
    );


  if (
    !Number.isFinite(
      numericValue
    )
  ) {

    return null;

  }


  return numericValue;

}


/* =========================================================
   23. PAGE RENDER
========================================================= */

function renderNutritionPage() {

  const day =
    getCurrentFoodDay();


  currentDateElement.textContent =
    formatPageDate();


  renderDailySummary(
    day
  );


  renderProfessionalPlan();


  renderMeals(
    day
  );

}


/* =========================================================
   24. EVENT LISTENERS
========================================================= */

openFoodButton.addEventListener(
  "click",
  () => {

    openFoodModal();

  }
);


document
  .querySelectorAll(
    "[data-add-meal]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openFoodModal(
            button.dataset.addMeal
          );

        }
      );

    }
  );


closeFoodModalButton.addEventListener(
  "click",
  closeFoodModal
);


foodModalBackdrop.addEventListener(
  "click",
  closeFoodModal
);


foodSearchInput.addEventListener(
  "input",
  () => {

    renderFoodSearchResults(
      foodSearchInput.value
    );

  }
);


openCustomFoodButton.addEventListener(
  "click",
  showCustomFoodView
);


backToFoodSearchButton.addEventListener(
  "click",
  showFoodSearchView
);


changeSelectedFoodButton.addEventListener(
  "click",
  () => {

    selectedFood =
      null;

    showFoodSearchView();

    foodSearchInput.focus();

  }
);


selectedFoodQuantity.addEventListener(
  "input",
  updateSelectedFoodValues
);


selectedFoodMeal.addEventListener(
  "change",
  () => {

    selectedMealType =
      selectedFoodMeal.value;

  }
);


selectedFoodForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    addSelectedFoodToMeal();

  }
);


customFoodForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    saveCustomFood();

  }
);


document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !foodModal.hidden
    ) {

      closeFoodModal();

    }

  }
);


/* =========================================================
   25. INITIALIZATION
========================================================= */

function initializeNutritionPage() {

  renderNutritionPage();

}


/* =========================================================
   26. START
========================================================= */

initializeNutritionPage();


/* =========================================================
   27. FILE END
========================================================= */