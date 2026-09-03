/* =========================================================
   USER-DATA.JS
   Dados centrais do usuário
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const USER_STORAGE_KEY = "euConsigoUser";


/* =========================================================
   USUÁRIO PADRÃO
========================================================= */

const DEFAULT_USER = {
  name: "",
  height: null,

  startWeight: null,
  currentWeight: null,
  goalWeight: null,

  bmi: null,

  calorieGoal: null,

  waterGoal: 2000,
  movementGoal: 30,

  premium: false,

  createdAt: null,
  updatedAt: null
};


/* =========================================================
   UTILITÁRIOS
========================================================= */

function isValidNumber(value) {
  return (
    typeof value === "number" &&
    Number.isFinite(value)
  );
}


function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}


/* =========================================================
   BMI
========================================================= */

function calculateBMI(weight, height) {

  if (
    !isValidNumber(weight) ||
    !isValidNumber(height) ||
    weight <= 0 ||
    height <= 0
  ) {
    return null;
  }


  const bmi =
    weight /
    (height * height);


  return roundToOneDecimal(bmi);
}


/* =========================================================
   BMI CATEGORY
========================================================= */

function getBMICategory(bmi) {

  if (
    !isValidNumber(bmi) ||
    bmi <= 0
  ) {
    return "";
  }


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
   NORMALIZAR USUÁRIO
========================================================= */

function normalizeUser(userData = {}) {

  return {
    ...DEFAULT_USER,
    ...userData
  };
}


/* =========================================================
   OBTER USUÁRIO
========================================================= */

function getUser() {

  const storedUser =
    localStorage.getItem(
      USER_STORAGE_KEY
    );


  if (!storedUser) {

    return {
      ...DEFAULT_USER
    };

  }


  try {

    const parsedUser =
      JSON.parse(storedUser);


    return normalizeUser(
      parsedUser
    );

  }

  catch (error) {

    console.error(
      "Fehler beim Lesen der Benutzerdaten:",
      error
    );


    return {
      ...DEFAULT_USER
    };

  }

}


/* =========================================================
   SALVAR USUÁRIO
========================================================= */

function saveUser(userData) {

  const currentUser =
    getUser();


  const now =
    new Date().toISOString();


  const user = normalizeUser({
    ...currentUser,
    ...userData
  });


  if (!user.createdAt) {
    user.createdAt = now;
  }


  user.updatedAt = now;


  /*
    Recalcula automaticamente o BMI
    sempre que altura e peso atual existirem.
  */

  if (
    isValidNumber(user.currentWeight) &&
    isValidNumber(user.height)
  ) {

    user.bmi =
      calculateBMI(
        user.currentWeight,
        user.height
      );

  }


  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(user)
  );


  return user;
}


/* =========================================================
   ATUALIZAR USUÁRIO
========================================================= */

function updateUser(changes = {}) {

  const currentUser =
    getUser();


  return saveUser({
    ...currentUser,
    ...changes
  });

}


/* =========================================================
   PRIMEIRO REGISTRO DE PESO
========================================================= */

function setInitialWeight(weight) {

  const numericWeight =
    Number(weight);


  if (
    !isValidNumber(numericWeight) ||
    numericWeight <= 0
  ) {
    return getUser();
  }


  const user =
    getUser();


  /*
    startWeight só é definido
    se ainda não existir.
  */

  const startWeight =
    isValidNumber(user.startWeight)
      ? user.startWeight
      : numericWeight;


  return updateUser({
    startWeight: startWeight,
    currentWeight: numericWeight
  });

}


/* =========================================================
   ATUALIZAR PESO ATUAL
========================================================= */

function setCurrentWeight(weight) {

  const numericWeight =
    Number(weight);


  if (
    !isValidNumber(numericWeight) ||
    numericWeight <= 0
  ) {
    return getUser();
  }


  const user =
    getUser();


  const updates = {
    currentWeight: numericWeight
  };


  /*
    Segurança:
    se ainda não houver peso inicial,
    o primeiro peso também vira startWeight.
  */

  if (
    !isValidNumber(user.startWeight)
  ) {

    updates.startWeight =
      numericWeight;

  }


  return updateUser(
    updates
  );

}


/* =========================================================
   ATUALIZAR ALTURA
========================================================= */

function setUserHeight(height) {

  const numericHeight =
    Number(height);


  if (
    !isValidNumber(numericHeight) ||
    numericHeight <= 0
  ) {
    return getUser();
  }


  return updateUser({
    height: numericHeight
  });

}


/* =========================================================
   ATUALIZAR META DE PESO
========================================================= */

function setGoalWeight(weight) {

  const numericWeight =
    Number(weight);


  if (
    !isValidNumber(numericWeight) ||
    numericWeight <= 0
  ) {
    return getUser();
  }


  return updateUser({
    goalWeight: numericWeight
  });

}


/* =========================================================
   ATUALIZAR NOME
========================================================= */

function setUserName(name) {

  const cleanName =
    String(name || "").trim();


  return updateUser({
    name: cleanName
  });

}


/* =========================================================
   META DE CALORIAS
========================================================= */

function setCalorieGoal(calories) {

  const numericCalories =
    Number(calories);


  if (
    !isValidNumber(numericCalories) ||
    numericCalories <= 0
  ) {
    return getUser();
  }


  return updateUser({
    calorieGoal:
      Math.round(numericCalories)
  });

}


/* =========================================================
   PREMIUM
========================================================= */

function setPremiumStatus(status) {

  return updateUser({
    premium: Boolean(status)
  });

}


/* =========================================================
   PROGRESSO DO PESO
========================================================= */

function calculateWeightProgress(
  startWeight,
  currentWeight,
  goalWeight
) {

  if (
    !isValidNumber(startWeight) ||
    !isValidNumber(currentWeight) ||
    !isValidNumber(goalWeight)
  ) {
    return 0;
  }


  if (startWeight === goalWeight) {
    return 100;
  }


  let progress = 0;


  /*
    Objetivo de emagrecimento
  */

  if (goalWeight < startWeight) {

    progress =
      (
        (startWeight - currentWeight) /
        (startWeight - goalWeight)
      ) * 100;

  }


  /*
    Objetivo de ganho de peso
  */

  else {

    progress =
      (
        (currentWeight - startWeight) /
        (goalWeight - startWeight)
      ) * 100;

  }


  return Math.max(
    0,
    Math.min(
      100,
      Math.round(progress)
    )
  );

}


/* =========================================================
   PROGRESSO DO USUÁRIO
========================================================= */

function getUserWeightProgress() {

  const user =
    getUser();


  return calculateWeightProgress(
    user.startWeight,
    user.currentWeight,
    user.goalWeight
  );

}


/* =========================================================
   VERIFICAR SE O PERFIL BÁSICO ESTÁ COMPLETO
========================================================= */

function hasBasicUserData() {

  const user =
    getUser();


  return Boolean(
    isValidNumber(user.height) &&
    isValidNumber(user.startWeight) &&
    isValidNumber(user.currentWeight)
  );

}


/* =========================================================
   VERIFICAR SE A META FOI DEFINIDA
========================================================= */

function hasWeightGoal() {

  const user =
    getUser();


  return (
    isValidNumber(user.goalWeight) &&
    user.goalWeight > 0
  );

}


/* =========================================================
   RESET APENAS PARA DESENVOLVIMENTO
========================================================= */

function resetUserData() {

  localStorage.removeItem(
    USER_STORAGE_KEY
  );


  return {
    ...DEFAULT_USER
  };

}