const bmiForm = document.getElementById("bmi-form");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");

const resultSection = document.getElementById("result-section");
const bmiValue = document.getElementById("bmi-value");
const bmiCategory = document.getElementById("bmi-category");
const bmiMessage = document.getElementById("bmi-message");

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
    message =
      "Dein BMI liegt unter dem üblichen Orientierungsbereich. Wenn du dein Gewicht verändern möchtest, kann eine persönliche Beratung sinnvoll sein.";
  } else if (bmi < 25) {
    category = "Normalgewicht";
    message =
      "Dein BMI liegt im üblichen Orientierungsbereich. Du kannst deine Entwicklung weiterhin im Blick behalten und deine persönlichen Ziele verfolgen.";
  } else if (bmi < 30) {
    category = "Übergewicht";
    message =
      "Dein BMI liegt über dem üblichen Orientierungsbereich. Das ist nur dein Ausgangspunkt – entscheidend ist, wie du deinen nächsten Schritt gestalten möchtest.";
  } else if (bmi < 35) {
    category = "Adipositas Grad I";
    message =
      "Dein BMI liegt deutlich über dem üblichen Orientierungsbereich. Eine strukturierte Begleitung kann dir helfen, realistische und passende Ziele festzulegen.";
  } else if (bmi < 40) {
    category = "Adipositas Grad II";
    message =
      "Dein BMI liegt deutlich über dem üblichen Orientierungsbereich. Eine persönliche fachliche Begleitung kann besonders sinnvoll sein.";
  } else {
    category = "Adipositas Grad III";
    message =
      "Dein BMI liegt stark über dem üblichen Orientierungsbereich. Für eine individuelle Einschätzung ist eine persönliche fachliche Beratung besonders wichtig.";
  }

  bmiValue.textContent = bmi.toFixed(1);
  bmiCategory.textContent = category;
  bmiMessage.textContent = message;

  resultSection.hidden = false;

  setTimeout(() => {
    resultSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
});
