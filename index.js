/* =========================================================
   INDEX.JS
   Mein Fortschritt

   Lógica exclusiva da página inicial.

   Responsabilidades deste arquivo:
   - Referências ao DOM
   - Mensagens de BMI
   - Leitura dos campos
   - Validação
   - Salvamento dos dados iniciais
   - Exibição do resultado
   - Carregamento de dados existentes

   DEPENDÊNCIA:
   js/user-data.js

   user-data.js precisa ser carregado antes deste arquivo.
========================================================= */


/* =========================================================
   01. DOM REFERENCES
========================================================= */

const bmiForm =
  document.getElementById(
    "bmi-form"
  );


const weightInput =
  document.getElementById(
    "weight"
  );


const heightInput =
  document.getElementById(
    "height"
  );


const result =
  document.getElementById(
    "result"
  );


const bmiValue =
  document.getElementById(
    "bmi-value"
  );


const bmiCategory =
  document.getElementById(
    "bmi-category"
  );


const bmiMessage =
  document.getElementById(
    "bmi-message"
  );



/* =========================================================
   02. BMI MESSAGE
   Retorna a mensagem correspondente ao valor do BMI
========================================================= */

function getBMIMessage(
  bmi
) {

  if (
    bmi < 18.5
  ) {

    return (
      "Dein BMI liegt unter dem üblichen Orientierungsbereich. " +
      "Dein Ergebnis ist ein Ausgangspunkt, um deine Entwicklung " +
      "bewusster zu verfolgen."
    );

  }


  if (
    bmi < 25
  ) {

    return (
      "Dein BMI liegt im üblichen Orientierungsbereich. " +
      "Behalte deine Entwicklung im Blick und finde heraus, " +
      "welche Gewohnheiten dir langfristig guttun."
    );

  }


  if (
    bmi < 30
  ) {

    return (
      "Dein BMI liegt über dem üblichen Orientierungsbereich. " +
      "Das ist nur dein Ausgangspunkt – kleine, konsequente " +
      "Veränderungen können einen Unterschied machen."
    );

  }


  if (
    bmi < 35
  ) {

    return (
      "Dein BMI liegt deutlich über dem üblichen Orientierungsbereich. " +
      "Ein strukturierter Weg und realistische Ziele können dir helfen, " +
      "deine Entwicklung Schritt für Schritt zu verfolgen."
    );

  }


  if (
    bmi < 40
  ) {

    return (
      "Dein BMI liegt deutlich über dem üblichen Orientierungsbereich. " +
      "Eine persönliche fachliche Begleitung kann dir dabei helfen, " +
      "passende und realistische nächste Schritte zu planen."
    );

  }


  return (
    "Dein BMI liegt stark über dem üblichen Orientierungsbereich. " +
    "Eine individuelle fachliche Begleitung ist für die Planung " +
    "der nächsten Schritte besonders sinnvoll."
  );

}



/* =========================================================
   03. FORM VALIDATION
========================================================= */

function isValidBMIInput(
  weight,
  heightCm
) {

  return (
    Number.isFinite(weight) &&
    Number.isFinite(heightCm) &&
    weight >= 20 &&
    weight <= 350 &&
    heightCm >= 100 &&
    heightCm <= 250
  );

}



/* =========================================================
   04. RESULT RENDERING
========================================================= */

function renderBMIResult(
  bmi,
  category,
  message
) {

  bmiValue.textContent =
    bmi.toFixed(1);


  bmiCategory.textContent =
    category;


  bmiMessage.textContent =
    message;


  result.hidden =
    false;

}



/* =========================================================
   05. RESULT SCROLL
========================================================= */

function scrollToBMIResult() {

  setTimeout(
    function () {

      result.scrollIntoView({

        behavior:
          "smooth",

        block:
          "nearest"

      });

    },
    100
  );

}



/* =========================================================
   06. BMI FORM SUBMIT
========================================================= */

function handleBMISubmit(
  event
) {

  event.preventDefault();



  /* =======================================================
     INPUT VALUES
  ======================================================== */

  const weight =
    Number(
      weightInput.value
    );


  const heightCm =
    Number(
      heightInput.value
    );



  /* =======================================================
     VALIDATION
  ======================================================== */

  if (
    !isValidBMIInput(
      weight,
      heightCm
    )
  ) {

    return;

  }



  /* =======================================================
     HEIGHT CONVERSION
     user-data.js utiliza metros
  ======================================================== */

  const heightM =
    heightCm / 100;



  /* =======================================================
     USER DATA STORAGE
  ======================================================== */

  setUserHeight(
    heightM
  );


  const user =
    setInitialWeight(
      weight
    );



  /* =======================================================
     BMI DATA
  ======================================================== */

  const bmi =
    user.bmi;


  const category =
    getBMICategory(
      bmi
    );


  const message =
    getBMIMessage(
      bmi
    );



  /* =======================================================
     RESULT DISPLAY
  ======================================================== */

  renderBMIResult(
    bmi,
    category,
    message
  );


  scrollToBMIResult();

}



/* =========================================================
   07. LOAD EXISTING USER DATA

   Se a pessoa voltar ao Index:
   - mostra o peso atual
   - mostra a altura atual
   - não altera automaticamente o peso inicial
========================================================= */

function loadExistingUserData() {

  const user =
    getUser();



  /* =======================================================
     CURRENT WEIGHT
  ======================================================== */

  if (
    typeof user.currentWeight ===
    "number"
  ) {

    weightInput.value =
      user.currentWeight;

  }



  /* =======================================================
     USER HEIGHT
  ======================================================== */

  if (
    typeof user.height ===
    "number"
  ) {

    heightInput.value =
      Math.round(
        user.height * 100
      );

  }

}



/* =========================================================
   08. EVENT LISTENERS
========================================================= */

bmiForm.addEventListener(
  "submit",
  handleBMISubmit
);



/* =========================================================
   09. INITIALIZATION
========================================================= */

function initIndex() {

  loadExistingUserData();

}


initIndex();