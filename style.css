const bmiForm = document.getElementById("imc-form");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

const bmiResult = document.getElementById("imc-result");
const bmiValue = document.getElementById("imc-value");
const bmiCategory = document.getElementById("imc-category");
const bmiMessage = document.getElementById("imc-message");

const foodSearchInput = document.getElementById("food-search");
const foodSearchButton = document.getElementById("food-search-button");
const foodTableBody = document.getElementById("food-table-body");
const foodEmptyState = document.getElementById("food-empty-state");


/* --------------------------------------------------
   BMI RECHNER
-------------------------------------------------- */

bmiForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const weight = parseFloat(weightInput.value);
  const heightCm = parseFloat(heightInput.value);

  if (!weight || !heightCm) {
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);

  let category = "";
  let message = "";

  if (bmi < 18.5) {
    category = "Untergewicht";
    message = "Dein BMI liegt unter dem üblichen Normalbereich.";
  } else if (bmi < 25) {
    category = "Normalgewicht";
    message = "Dein BMI liegt im üblichen Normalbereich.";
  } else if (bmi < 30) {
    category = "Übergewicht";
    message = "Dein BMI liegt über dem üblichen Normalbereich.";
  } else if (bmi < 35) {
    category = "Adipositas Grad I";
    message = "Dein BMI liegt im Bereich Adipositas Grad I.";
  } else if (bmi < 40) {
    category = "Adipositas Grad II";
    message = "Dein BMI liegt im Bereich Adipositas Grad II.";
  } else {
    category = "Adipositas Grad III";
    message = "Dein BMI liegt im Bereich Adipositas Grad III.";
  }

  bmiValue.textContent = bmi.toFixed(1);
  bmiCategory.textContent = category;
  bmiMessage.textContent = message;

  bmiResult.hidden = false;

  bmiResult.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
});


/* --------------------------------------------------
   LEBENSMITTEL DATENBANK
-------------------------------------------------- */

const foods = [
  {
    name: "Banane",
    amount: "100 g",
    calories: 89,
    protein: 1.1,
    carbs: 22.8,
    fat: 0.3
  },
  {
    name: "Apfel",
    amount: "100 g",
    calories: 52,
    protein: 0.3,
    carbs: 13.8,
    fat: 0.2
  },
  {
    name: "Birne",
    amount: "100 g",
    calories: 57,
    protein: 0.4,
    carbs: 15.2,
    fat: 0.1
  },
  {
    name: "Orange",
    amount: "100 g",
    calories: 47,
    protein: 0.9,
    carbs: 11.8,
    fat: 0.1
  },
  {
    name: "Erdbeeren",
    amount: "100 g",
    calories: 32,
    protein: 0.7,
    carbs: 7.7,
    fat: 0.3
  },
  {
    name: "Avocado",
    amount: "100 g",
    calories: 160,
    protein: 2.0,
    carbs: 8.5,
    fat: 14.7
  },
  {
    name: "Ei, gekocht",
    amount: "1 Stück",
    calories: 78,
    protein: 6.3,
    carbs: 0.6,
    fat: 5.3
  },
  {
    name: "Pouletbrust, gebraten",
    amount: "100 g",
    calories: 165,
    protein: 31.0,
    carbs: 0,
    fat: 3.6
  },
  {
    name: "Rindfleisch, mager",
    amount: "100 g",
    calories: 200,
    protein: 26.0,
    carbs: 0,
    fat: 10.0
  },
  {
    name: "Lachs",
    amount: "100 g",
    calories: 208,
    protein: 20.0,
    carbs: 0,
    fat: 13.0
  },
  {
    name: "Thunfisch",
    amount: "100 g",
    calories: 132,
    protein: 29.0,
    carbs: 0,
    fat: 1.0
  },
  {
    name: "Weisser Reis, gekocht",
    amount: "100 g",
    calories: 130,
    protein: 2.7,
    carbs: 28.2,
    fat: 0.3
  },
  {
    name: "Vollkornreis, gekocht",
    amount: "100 g",
    calories: 123,
    protein: 2.7,
    carbs: 25.6,
    fat: 1.0
  },
  {
    name: "Kartoffeln, gekocht",
    amount: "100 g",
    calories: 87,
    protein: 1.9,
    carbs: 20.1,
    fat: 0.1
  },
  {
    name: "Süsskartoffel",
    amount: "100 g",
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1
  },
  {
    name: "Haferflocken",
    amount: "100 g",
    calories: 372,
    protein: 13.5,
    carbs: 58.7,
    fat: 7.0
  },
  {
    name: "Vollkornbrot",
    amount: "100 g",
    calories: 247,
    protein: 9.0,
    carbs: 41.0,
    fat: 4.2
  },
  {
    name: "Nature Joghurt",
    amount: "100 g",
    calories: 61,
    protein: 3.5,
    carbs: 4.7,
    fat: 3.3
  },
  {
    name: "Magerquark",
    amount: "100 g",
    calories: 67,
    protein: 12.0,
    carbs: 4.0,
    fat: 0.2
  },
  {
    name: "Milch, 1.5 %",
    amount: "100 ml",
    calories: 47,
    protein: 3.4,
    carbs: 4.9,
    fat: 1.5
  },
  {
    name: "Mandeln",
    amount: "100 g",
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9
  },
  {
    name: "Brokkoli",
    amount: "100 g",
    calories: 34,
    protein: 2.8,
    carbs: 6.6,
    fat: 0.4
  },
  {
    name: "Karotten",
    amount: "100 g",
    calories: 41,
    protein: 0.9,
    carbs: 9.6,
    fat: 0.2
  },
  {
    name: "Tomaten",
    amount: "100 g",
    calories: 18,
    protein: 0.9,
    carbs: 3.9,
    fat: 0.2
  },
  {
    name: "Gurke",
    amount: "100 g",
    calories: 15,
    protein: 0.7,
    carbs: 3.6,
    fat: 0.1
  }
];


/* --------------------------------------------------
   TABELLE ERSTELLEN
-------------------------------------------------- */

function renderFoods(foodList) {
  foodTableBody.innerHTML = "";

  if (foodList.length === 0) {
    foodEmptyState.hidden = false;
    return;
  }

  foodEmptyState.hidden = true;

  foodList.forEach(function (food) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${food.name}</td>
      <td>${food.amount}</td>
      <td><strong>${food.calories} kcal</strong></td>
      <td>${formatNumber(food.protein)} g</td>
      <td>${formatNumber(food.carbs)} g</td>
      <td>${formatNumber(food.fat)} g</td>
    `;

    foodTableBody.appendChild(row);
  });
}


/* --------------------------------------------------
   LEBENSMITTEL SUCHEN
-------------------------------------------------- */

function searchFoods() {
  const query = normalizeText(foodSearchInput.value.trim());

  if (!query) {
    renderFoods(foods);
    return;
  }

  const results = foods.filter(function (food) {
    return normalizeText(food.name).includes(query);
  });

  renderFoods(results);
}


foodSearchButton.addEventListener("click", searchFoods);


foodSearchInput.addEventListener("input", function () {
  searchFoods();
});


foodSearchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchFoods();
  }
});


/* --------------------------------------------------
   HILFSFUNKTIONEN
-------------------------------------------------- */

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}


function formatNumber(number) {
  return number.toLocaleString("de-CH", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  });
}


/* --------------------------------------------------
   START
-------------------------------------------------- */

renderFoods(foods);
