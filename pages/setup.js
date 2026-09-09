/* =========================================================
   SETUP.JS
   Mein Fortschritt

   Lógica exclusiva da página de configuração inicial.

   Responsabilidades deste arquivo:
   - Carregar os dados iniciais do usuário
   - Validar a existência dos dados básicos
   - Exibir peso inicial, altura e BMI
   - Preencher dados já existentes
   - Atualizar o preview do objetivo
   - Validar o formulário
   - Salvar nome e peso-alvo
   - Redirecionar para o Dashboard

   Dependência:
   ../js/user-data.js

   Estrutura relacionada:
   setup.html

   Estilos relacionados:
   setup.css
========================================================= */



/* =========================================================
   01. DOM REFERENCES
   Referências principais da página
========================================================= */

const setupForm =
  document.getElementById(
    "setup-form"
  );


const nameInput =
  document.getElementById(
    "name"
  );


const goalWeightInput =
  document.getElementById(
    "goal-weight"
  );


const summaryStartWeight =
  document.getElementById(
    "summary-start-weight"
  );


const summaryHeight =
  document.getElementById(
    "summary-height"
  );


const summaryBMI =
  document.getElementById(
    "summary-bmi"
  );


const goalPreview =
  document.getElementById(
    "goal-preview"
  );


const goalPreviewText =
  document.getElementById(
    "goal-preview-text"
  );


const goalDifference =
  document.getElementById(
    "goal-difference"
  );


const formError =
  document.getElementById(
    "form-error"
  );



/* =========================================================
   02. SHOW ERROR
   Exibe mensagem de erro do formulário
========================================================= */

function showError(
  message
) {

  formError.textContent =
    message;


  formError.hidden =
    false;

}



/* =========================================================
   03. HIDE ERROR
   Remove a mensagem de erro atual
========================================================= */

function hideError() {

  formError.textContent =
    "";


  formError.hidden =
    true;

}



/* =========================================================
   04. FORMAT WEIGHT
   Formata o peso para exibição
========================================================= */

function formatWeight(
  value
) {

  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {

    return "—";

  }


  return (
    value.toFixed(1) +
    " kg"
  );

}



/* =========================================================
   05. FORMAT HEIGHT
   Converte altura em metros para centímetros
========================================================= */

function formatHeight(
  height
) {

  if (
    typeof height !== "number" ||
    !Number.isFinite(height)
  ) {

    return "—";

  }


  return (
    Math.round(
      height * 100
    ) +
    " cm"
  );

}



/* =========================================================
   06. FORMAT BMI
   Formata o BMI para uma casa decimal
========================================================= */

function formatBMI(
  bmi
) {

  if (
    typeof bmi !== "number" ||
    !Number.isFinite(bmi)
  ) {

    return "—";

  }


  return bmi.toFixed(1);

}



/* =========================================================
   07. LOAD SETUP DATA
   Carrega os dados já existentes do usuário
========================================================= */

function loadSetupData() {

  const user =
    getUser();



  /* =======================================================
     BASIC DATA VALIDATION

     O Setup depende dos dados coletados anteriormente
     no Index.

     Se altura e peso inicial ainda não existirem,
     o usuário retorna ao início.
  ======================================================== */

  if (
    !hasBasicUserData()
  ) {

    window.location.href =
      "../index.html";

    return;

  }



  /* =======================================================
     START WEIGHT
  ======================================================== */

  summaryStartWeight.textContent =
    formatWeight(
      user.startWeight
    );



  /* =======================================================
     HEIGHT
  ======================================================== */

  summaryHeight.textContent =
    formatHeight(
      user.height
    );



  /* =======================================================
     BMI
  ======================================================== */

  summaryBMI.textContent =
    formatBMI(
      user.bmi
    );



  /* =======================================================
     EXISTING NAME
  ======================================================== */

  if (
    user.name
  ) {

    nameInput.value =
      user.name;

  }



  /* =======================================================
     EXISTING GOAL WEIGHT
  ======================================================== */

  if (
    typeof user.goalWeight === "number" &&
    Number.isFinite(user.goalWeight)
  ) {

    goalWeightInput.value =
      user.goalWeight;


    updateGoalPreview();

  }

}



/* =========================================================
   08. UPDATE GOAL PREVIEW
   Mostra a direção e diferença até o objetivo
========================================================= */

function updateGoalPreview() {

  const user =
    getUser();


  const currentWeight =
    user.currentWeight;


  const goalWeight =
    Number(
      goalWeightInput.value
    );



  /* =======================================================
     VALIDATION
  ======================================================== */

  if (
    !Number.isFinite(currentWeight) ||
    !Number.isFinite(goalWeight) ||
    goalWeight <= 0
  ) {

    goalPreview.hidden =
      true;

    return;

  }



  /* =======================================================
     WEIGHT DIFFERENCE
  ======================================================== */

  const difference =
    Math.abs(
      currentWeight -
      goalWeight
    );



  /* =======================================================
     LOSE WEIGHT
  ======================================================== */

  if (
    goalWeight <
    currentWeight
  ) {

    goalPreviewText.textContent =
      "Gewicht reduzieren";


    goalDifference.textContent =
      "−" +
      difference.toFixed(1) +
      " kg";

  }



  /* =======================================================
     GAIN WEIGHT
  ======================================================== */

  else if (
    goalWeight >
    currentWeight
  ) {

    goalPreviewText.textContent =
      "Gewicht aufbauen";


    goalDifference.textContent =
      "+" +
      difference.toFixed(1) +
      " kg";

  }



  /* =======================================================
     MAINTAIN WEIGHT
  ======================================================== */

  else {

    goalPreviewText.textContent =
      "Gewicht halten";


    goalDifference.textContent =
      "0 kg";

  }



  goalPreview.hidden =
    false;

}



/* =========================================================
   09. GOAL INPUT EVENT
   Atualiza o preview durante a digitação
========================================================= */

goalWeightInput.addEventListener(
  "input",
  function () {

    hideError();

    updateGoalPreview();

  }
);



/* =========================================================
   10. NAME INPUT EVENT
   Remove mensagens de erro durante a digitação
========================================================= */

nameInput.addEventListener(
  "input",
  hideError
);



/* =========================================================
   11. FORM SUBMIT
   Valida e salva os dados do perfil
========================================================= */

setupForm.addEventListener(
  "submit",
  function (
    event
  ) {

    event.preventDefault();


    hideError();



    /* =====================================================
       FORM VALUES
    ====================================================== */

    const name =
      nameInput.value.trim();


    const goalWeight =
      Number(
        goalWeightInput.value
      );



    /* =====================================================
       NAME VALIDATION
    ====================================================== */

    if (
      name.length <
      2
    ) {

      showError(
        "Bitte gib deinen Vornamen ein."
      );


      nameInput.focus();

      return;

    }



    /* =====================================================
       GOAL WEIGHT VALIDATION
    ====================================================== */

    if (
      !Number.isFinite(goalWeight) ||
      goalWeight < 30 ||
      goalWeight > 300
    ) {

      showError(
        "Bitte gib ein gültiges Zielgewicht ein."
      );


      goalWeightInput.focus();

      return;

    }



    /* =====================================================
       GOAL RULE

       São permitidos três objetivos:
       - perder peso
       - ganhar peso
       - manter peso

       Portanto, o objetivo não precisa ser
       obrigatoriamente menor que o peso atual.
    ====================================================== */



    /* =====================================================
       SAVE USER NAME
    ====================================================== */

    setUserName(
      name
    );



    /* =====================================================
       SAVE GOAL WEIGHT
    ====================================================== */

    setGoalWeight(
      goalWeight
    );



    /* =====================================================
       NEXT PAGE
       Abre o Dashboard após salvar o perfil
    ====================================================== */

    window.location.href =
      "../dashboard/dashboard.html";

  }
);



/* =========================================================
   12. INITIALIZATION
   Inicializa os dados da página
========================================================= */

function initSetup() {

  loadSetupData();

}


initSetup();



/* =========================================================
   13. FILE END
========================================================= */