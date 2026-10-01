/* =========================================================
   USER-DATA.JS
   Mein Fortschritt

   Camada central de dados do usuário.

   Responsabilidades deste arquivo:
   - Estrutura padrão do usuário
   - Leitura dos dados armazenados
   - Salvamento dos dados
   - Atualização dos dados
   - Cálculo central do BMI
   - Categoria do BMI
   - Peso inicial e peso atual
   - Meta de peso
   - Nível da assinatura
   - Plano nutricional profissional
   - Metas nutricionais profissionais
   - Histórico de alterações do plano nutricional

   DEPENDÊNCIAS:
   - storage.js
   - helpers.js

   ORDEM DE CARREGAMENTO:

   <script src="storage.js"></script>
   <script src="helpers.js"></script>
   <script src="user-data.js"></script>
========================================================= */


/* =========================================================
   01. STORAGE CONFIGURATION
========================================================= */

const USER_STORAGE_KEY =
  "euConsigoUser";


/* =========================================================
   02. DEFAULT MEAL GOALS
========================================================= */

function createDefaultMealGoals() {

  return [

    {
      id: "breakfast",
      type: "breakfast",
      order: 1,
      customName: null,

      goals: {
        calories: null,
        protein: null,
        carbohydrates: null,
        fat: null
      }
    },

    {
      id: "lunch",
      type: "lunch",
      order: 2,
      customName: null,

      goals: {
        calories: null,
        protein: null,
        carbohydrates: null,
        fat: null
      }
    },

    {
      id: "snack",
      type: "snack",
      order: 3,
      customName: null,

      goals: {
        calories: null,
        protein: null,
        carbohydrates: null,
        fat: null
      }
    },

    {
      id: "dinner",
      type: "dinner",
      order: 4,
      customName: null,

      goals: {
        calories: null,
        protein: null,
        carbohydrates: null,
        fat: null
      }
    }

  ];

}


/* =========================================================
   03. DEFAULT NUTRITION PLAN
========================================================= */

function createDefaultNutritionPlan() {

  return {

    /* =====================================================
       IDENTIFICAÇÃO DO PLANO
    ====================================================== */

    id: null,

    planName: "",

    version: 1,

    source: "professional",


    /* =====================================================
       PROFISSIONAL RESPONSÁVEL
    ====================================================== */

    professional: {

      id: null,

      name: "",

      role: ""

    },


    /* =====================================================
       METAS DIÁRIAS

       calories = kcal
       nutrientes = g
       water = ml
    ====================================================== */

    dailyGoals: {

      calories: null,

      protein: null,

      carbohydrates: null,

      fat: null,

      fiber: null,

      sugar: null,

      water: null

    },


    /* =====================================================
       NÚMERO DE REFEIÇÕES
    ====================================================== */

    mealsPerDay: null,


    /* =====================================================
       METAS POR REFEIÇÃO
    ====================================================== */

    mealGoals:
      createDefaultMealGoals(),


    /* =====================================================
       PLANO ALIMENTAR
    ====================================================== */

    plannedMeals: [],


    /* =====================================================
       OBSERVAÇÕES PROFISSIONAIS
    ====================================================== */

    notes: "",


    /* =====================================================
       PERÍODO DE VALIDADE
    ====================================================== */

    validFrom: null,

    validUntil: null,


    /* =====================================================
       DATAS DE CONTROLE
    ====================================================== */

    createdAt: null,

    updatedAt: null

  };

}


/* =========================================================
   04. DEFAULT NUTRITION GOALS
========================================================= */

function createDefaultNutritionGoals() {

  return {

    activePlan: null,

    history: []

  };

}


/* =========================================================
   05. DEFAULT USER
========================================================= */

const DEFAULT_USER = {

  name: "",

  height: null,

  startWeight: null,

  currentWeight: null,

  goalWeight: null,

  bmi: null,

  movementGoal: 30,

  premium: false,

  subscriptionLevel: "free",

  nutritionGoals:
    createDefaultNutritionGoals(),

  createdAt: null,

  updatedAt: null

};


/* =========================================================
   06. BMI CALCULATION
========================================================= */

function calculateBMI(
  weight,
  height
) {

  const numericWeight =
    toNumber(
      weight
    );


  const numericHeight =
    toNumber(
      height
    );


  if (
    numericWeight === null ||
    numericHeight === null ||
    numericWeight <= 0 ||
    numericHeight <= 0
  ) {

    return null;

  }


  const bmi =
    numericWeight /
    (
      numericHeight *
      numericHeight
    );


  return roundToOneDecimalHelper(
    bmi
  );

}


/* =========================================================
   07. BMI CATEGORY
========================================================= */

function getBMICategory(
  bmi
) {

  const numericBMI =
    toNumber(
      bmi
    );


  if (
    numericBMI === null ||
    numericBMI <= 0
  ) {

    return "";

  }


  if (
    numericBMI < 18.5
  ) {

    return "Untergewicht";

  }


  if (
    numericBMI < 25
  ) {

    return "Normalgewicht";

  }


  if (
    numericBMI < 30
  ) {

    return "Übergewicht";

  }


  if (
    numericBMI < 35
  ) {

    return "Adipositas Grad I";

  }


  if (
    numericBMI < 40
  ) {

    return "Adipositas Grad II";

  }


  return "Adipositas Grad III";

}


/* =========================================================
   08. NUTRITION VALUE NORMALIZATION
========================================================= */

function normalizeNutritionValue(
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
    toNumber(
      value
    );


  if (
    numericValue === null ||
    numericValue < 0
  ) {

    return null;

  }


  return numericValue;

}


/* =========================================================
   09. DAILY GOALS NORMALIZATION
========================================================= */

function normalizeDailyGoals(
  dailyGoals = {}
) {

  const safeGoals =
    (
      dailyGoals &&
      typeof dailyGoals === "object" &&
      !Array.isArray(
        dailyGoals
      )
    )
      ? dailyGoals
      : {};


  return {

    calories:
      normalizeNutritionValue(
        safeGoals.calories
      ),

    protein:
      normalizeNutritionValue(
        safeGoals.protein
      ),

    carbohydrates:
      normalizeNutritionValue(
        safeGoals.carbohydrates
      ),

    fat:
      normalizeNutritionValue(
        safeGoals.fat
      ),

    fiber:
      normalizeNutritionValue(
        safeGoals.fiber
      ),

    sugar:
      normalizeNutritionValue(
        safeGoals.sugar
      ),

    water:
      normalizeNutritionValue(
        safeGoals.water
      )

  };

}


/* =========================================================
   10. PROFESSIONAL NORMALIZATION
========================================================= */

function normalizeNutritionProfessional(
  professional = {}
) {

  const safeProfessional =
    (
      professional &&
      typeof professional === "object" &&
      !Array.isArray(
        professional
      )
    )
      ? professional
      : {};


  return {

    id:
      safeProfessional.id ?? null,

    name:
      typeof safeProfessional.name === "string"
        ? safeProfessional.name.trim()
        : "",

    role:
      typeof safeProfessional.role === "string"
        ? safeProfessional.role.trim()
        : ""

  };

}


/* =========================================================
   11. MEAL GOALS NORMALIZATION
========================================================= */

function normalizeMealGoals(
  mealGoals
) {

  if (
    !Array.isArray(
      mealGoals
    )
  ) {

    return createDefaultMealGoals();

  }


  return mealGoals.map(
    (
      meal,
      index
    ) => {

      const safeMeal =
        (
          meal &&
          typeof meal === "object" &&
          !Array.isArray(
            meal
          )
        )
          ? meal
          : {};


      const safeGoals =
        (
          safeMeal.goals &&
          typeof safeMeal.goals === "object" &&
          !Array.isArray(
            safeMeal.goals
          )
        )
          ? safeMeal.goals
          : {};


      return {

        id:
          safeMeal.id ??
          `meal-${index + 1}`,

        type:
          typeof safeMeal.type === "string"
            ? safeMeal.type
            : "custom",

        order:
          Number.isInteger(
            safeMeal.order
          )
            ? safeMeal.order
            : index + 1,

        customName:
          typeof safeMeal.customName === "string"
            ? safeMeal.customName.trim()
            : null,

        goals: {

          calories:
            normalizeNutritionValue(
              safeGoals.calories
            ),

          protein:
            normalizeNutritionValue(
              safeGoals.protein
            ),

          carbohydrates:
            normalizeNutritionValue(
              safeGoals.carbohydrates
            ),

          fat:
            normalizeNutritionValue(
              safeGoals.fat
            )

        }

      };

    }
  );

}


/* =========================================================
   12. NUTRITION PLAN NORMALIZATION
========================================================= */

function normalizeNutritionPlan(
  planData = {}
) {

  const safePlan =
    (
      planData &&
      typeof planData === "object" &&
      !Array.isArray(
        planData
      )
    )
      ? planData
      : {};


  const mealsPerDayNumber =
    toNumber(
      safePlan.mealsPerDay
    );


  return {

    id:
      safePlan.id ?? null,

    planName:
      typeof safePlan.planName === "string"
        ? safePlan.planName.trim()
        : "",

    version:
      Number.isInteger(
        safePlan.version
      ) &&
      safePlan.version > 0
        ? safePlan.version
        : 1,

    source:
      "professional",

    professional:
      normalizeNutritionProfessional(
        safePlan.professional
      ),

    dailyGoals:
      normalizeDailyGoals(
        safePlan.dailyGoals
      ),

    mealsPerDay:
      (
        mealsPerDayNumber !== null &&
        mealsPerDayNumber > 0
      )
        ? Math.round(
            mealsPerDayNumber
          )
        : null,

    mealGoals:
      normalizeMealGoals(
        safePlan.mealGoals
      ),

    plannedMeals:
      Array.isArray(
        safePlan.plannedMeals
      )
        ? safePlan.plannedMeals
        : [],

    notes:
      typeof safePlan.notes === "string"
        ? safePlan.notes.trim()
        : "",

    validFrom:
      safePlan.validFrom ?? null,

    validUntil:
      safePlan.validUntil ?? null,

    createdAt:
      safePlan.createdAt ?? null,

    updatedAt:
      safePlan.updatedAt ?? null

  };

}


/* =========================================================
   13. NUTRITION GOALS NORMALIZATION
========================================================= */

function normalizeNutritionGoals(
  nutritionGoals = {}
) {

  const safeNutritionGoals =
    (
      nutritionGoals &&
      typeof nutritionGoals === "object" &&
      !Array.isArray(
        nutritionGoals
      )
    )
      ? nutritionGoals
      : {};


  const activePlan =
    (
      safeNutritionGoals.activePlan &&
      typeof safeNutritionGoals.activePlan === "object" &&
      !Array.isArray(
        safeNutritionGoals.activePlan
      )
    )
      ? normalizeNutritionPlan(
          safeNutritionGoals.activePlan
        )
      : null;


  const history =
    Array.isArray(
      safeNutritionGoals.history
    )
      ? safeNutritionGoals.history
          .filter(
            plan =>
              plan &&
              typeof plan === "object" &&
              !Array.isArray(
                plan
              )
          )
          .map(
            plan =>
              normalizeNutritionPlan(
                plan
              )
          )
      : [];


  return {

    activePlan:
      activePlan,

    history:
      history

  };

}


/* =========================================================
   14. SUBSCRIPTION LEVEL NORMALIZATION
========================================================= */

function normalizeSubscriptionLevel(
  value,
  legacyPremium = false,
  legacyPremiumPlus = false
) {

  const level =
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");


  if (
    [
      "premium-plus",
      "premiumplus",
      "premium+",
      "plus"
    ].includes(level)
  ) {

    return "premium-plus";

  }


  if (
    [
      "premium",
      "premium-plan"
    ].includes(level)
  ) {

    return "premium";

  }


  if (
    [
      "free",
      "gratis",
      "basic",
      "basis",
      "public"
    ].includes(level)
  ) {

    return "free";

  }


  if (
    legacyPremiumPlus === true
  ) {

    return "premium-plus";

  }


  if (
    legacyPremium === true
  ) {

    return "premium";

  }


  return "free";

}


/* =========================================================
   15. USER NORMALIZATION
========================================================= */

function normalizeUser(
  userData = {}
) {

  const safeUserData =
    (
      userData &&
      typeof userData === "object" &&
      !Array.isArray(
        userData
      )
    )
      ? userData
      : {};


  const subscriptionLevel =
    normalizeSubscriptionLevel(

      safeUserData.subscriptionLevel ??
      safeUserData.subscriptionPlan ??
      safeUserData.plan,

      safeUserData.premium,

      safeUserData.premiumPlus

    );


  return {

    name:
      typeof safeUserData.name === "string"
        ? safeUserData.name
        : "",

    height:
      safeUserData.height ?? null,

    startWeight:
      safeUserData.startWeight ?? null,

    currentWeight:
      safeUserData.currentWeight ?? null,

    goalWeight:
      safeUserData.goalWeight ?? null,

    bmi:
      safeUserData.bmi ?? null,

    movementGoal:
      (
        isFiniteNumber(
          safeUserData.movementGoal
        ) &&
        safeUserData.movementGoal > 0
      )
        ? safeUserData.movementGoal
        : DEFAULT_USER.movementGoal,

    subscriptionLevel:
      subscriptionLevel,

    premium:
      subscriptionLevel !== "free",

    nutritionGoals:
      normalizeNutritionGoals(
        safeUserData.nutritionGoals
      ),

    createdAt:
      safeUserData.createdAt ?? null,

    updatedAt:
      safeUserData.updatedAt ?? null

  };

}


/* =========================================================
   16. GET USER
========================================================= */

function getUser() {

  const storedUser =
    loadStorageData(
      USER_STORAGE_KEY,
      null
    );


  if (
    !storedUser ||
    typeof storedUser !== "object" ||
    Array.isArray(
      storedUser
    )
  ) {

    return normalizeUser({});

  }


  return normalizeUser(
    storedUser
  );

}


/* =========================================================
   17. SAVE USER
========================================================= */

function saveUser(
  userData = {}
) {

  const currentUser =
    getUser();


  const safeUserData =
    (
      userData &&
      typeof userData === "object" &&
      !Array.isArray(
        userData
      )
    )
      ? userData
      : {};


  const now =
    new Date()
      .toISOString();


  const user =
    normalizeUser({

      ...currentUser,

      ...safeUserData,

      nutritionGoals:
        safeUserData.nutritionGoals !== undefined
          ? safeUserData.nutritionGoals
          : currentUser.nutritionGoals

    });


  /* =======================================================
     CREATION DATE
  ======================================================== */

  if (
    !user.createdAt
  ) {

    user.createdAt =
      now;

  }


  /* =======================================================
     UPDATE DATE
  ======================================================== */

  user.updatedAt =
    now;


  /* =======================================================
     AUTOMATIC BMI UPDATE
  ======================================================== */

  if (
    isFiniteNumber(
      user.currentWeight
    ) &&
    isFiniteNumber(
      user.height
    ) &&
    user.currentWeight > 0 &&
    user.height > 0
  ) {

    user.bmi =
      calculateBMI(
        user.currentWeight,
        user.height
      );

  }

  else {

    user.bmi =
      null;

  }


  /* =======================================================
     SAVE STORAGE
  ======================================================== */

  saveStorageData(
    USER_STORAGE_KEY,
    user
  );


  return user;

}


/* =========================================================
   18. UPDATE USER
========================================================= */

function updateUser(
  changes = {}
) {

  const safeChanges =
    (
      changes &&
      typeof changes === "object" &&
      !Array.isArray(
        changes
      )
    )
      ? changes
      : {};


  return saveUser(
    safeChanges
  );

}


/* =========================================================
   19. INITIAL WEIGHT
========================================================= */

function setInitialWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  if (
    numericWeight === null ||
    numericWeight <= 0
  ) {

    return getUser();

  }


  const user =
    getUser();


  const startWeight =
    (
      isFiniteNumber(
        user.startWeight
      ) &&
      user.startWeight > 0
    )
      ? user.startWeight
      : numericWeight;


  return updateUser({

    startWeight:
      startWeight,

    currentWeight:
      numericWeight

  });

}


/* =========================================================
   20. CURRENT WEIGHT
========================================================= */

function setCurrentWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  if (
    numericWeight === null ||
    numericWeight <= 0
  ) {

    return getUser();

  }


  const user =
    getUser();


  const updates = {

    currentWeight:
      numericWeight

  };


  if (
    !isFiniteNumber(
      user.startWeight
    ) ||
    user.startWeight <= 0
  ) {

    updates.startWeight =
      numericWeight;

  }


  return updateUser(
    updates
  );

}


/* =========================================================
   21. USER HEIGHT
========================================================= */

function setUserHeight(
  height
) {

  const numericHeight =
    toNumber(
      height
    );


  if (
    numericHeight === null ||
    numericHeight <= 0
  ) {

    return getUser();

  }


  return updateUser({

    height:
      numericHeight

  });

}


/* =========================================================
   22. GOAL WEIGHT
========================================================= */

function setGoalWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  if (
    numericWeight === null ||
    numericWeight <= 0
  ) {

    return getUser();

  }


  return updateUser({

    goalWeight:
      numericWeight

  });

}


/* =========================================================
   23. USER NAME
========================================================= */

function setUserName(
  name
) {

  const cleanName =
    normalizeText(
      name
    );


  return updateUser({

    name:
      cleanName

  });

}


/* =========================================================
   24. SUBSCRIPTION LEVEL
========================================================= */

function setSubscriptionLevel(
  level
) {

  const subscriptionLevel =
    normalizeSubscriptionLevel(
      level
    );


  return updateUser({

    subscriptionLevel:
      subscriptionLevel,

    premium:
      subscriptionLevel !== "free"

  });

}


/* =========================================================
   25. PREMIUM STATUS
========================================================= */

function setPremiumStatus(
  status
) {

  const level =
    typeof status === "string"
      ? status
      : status === true
        ? "premium"
        : "free";


  return setSubscriptionLevel(
    level
  );

}


/* =========================================================
   26. GET NUTRITION GOALS
========================================================= */

function getNutritionGoals() {

  const user =
    getUser();


  return normalizeNutritionGoals(
    user.nutritionGoals
  );

}


/* =========================================================
   27. GET ACTIVE NUTRITION PLAN
========================================================= */

function getActiveNutritionPlan() {

  const nutritionGoals =
    getNutritionGoals();


  if (
    !nutritionGoals.activePlan
  ) {

    return null;

  }


  return normalizeNutritionPlan(
    nutritionGoals.activePlan
  );

}


/* =========================================================
   28. DATE KEY
========================================================= */

function getNutritionDateKey(
  value
) {

  if (
    !value
  ) {

    return null;

  }


  if (
    typeof value === "string"
  ) {

    const match =
      value.match(
        /^\d{4}-\d{2}-\d{2}/
      );


    if (
      match
    ) {

      return match[0];

    }

  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return null;

  }


  const year =
    date.getFullYear();


  const month =
    String(
      date.getMonth() + 1
    )
      .padStart(
        2,
        "0"
      );


  const day =
    String(
      date.getDate()
    )
      .padStart(
        2,
        "0"
      );


  return `${year}-${month}-${day}`;

}


/* =========================================================
   29. ACTIVE PLAN VALIDITY
========================================================= */

function isNutritionPlanCurrentlyValid(
  plan
) {

  if (
    !plan ||
    typeof plan !== "object" ||
    Array.isArray(
      plan
    )
  ) {

    return false;

  }


  const today =
    getNutritionDateKey(
      new Date()
    );


  const validFrom =
    getNutritionDateKey(
      plan.validFrom
    );


  const validUntil =
    getNutritionDateKey(
      plan.validUntil
    );


  if (
    validFrom &&
    today < validFrom
  ) {

    return false;

  }


  if (
    validUntil &&
    today > validUntil
  ) {

    return false;

  }


  return true;

}


/* =========================================================
   30. ACTIVE NUTRITION PLAN STATUS
========================================================= */

function hasActiveNutritionPlan() {

  const activePlan =
    getActiveNutritionPlan();


  if (
    !activePlan
  ) {

    return false;

  }


  return isNutritionPlanCurrentlyValid(
    activePlan
  );

}


/* =========================================================
   31. SET PROFESSIONAL NUTRITION PLAN
========================================================= */

function setProfessionalNutritionPlan(
  planData = {}
) {

  const user =
    getUser();


  const nutritionGoals =
    normalizeNutritionGoals(
      user.nutritionGoals
    );


  const now =
    new Date()
      .toISOString();


  const history =
    [
      ...nutritionGoals.history
    ];


  /* =======================================================
     PRESERVE CURRENT PLAN
  ======================================================== */

  if (
    nutritionGoals.activePlan
  ) {

    history.push(
      normalizeNutritionPlan(
        nutritionGoals.activePlan
      )
    );

  }


  /* =======================================================
     CREATE NEW PLAN
  ======================================================== */

  const newPlan =
    normalizeNutritionPlan(
      planData
    );


  newPlan.version =
    1;


  newPlan.source =
    "professional";


  newPlan.createdAt =
    now;


  newPlan.updatedAt =
    now;


  return updateUser({

    nutritionGoals: {

      activePlan:
        newPlan,

      history:
        history

    }

  });

}


/* =========================================================
   32. UPDATE PROFESSIONAL NUTRITION PLAN
========================================================= */

function updateProfessionalNutritionPlan(
  changes = {}
) {

  const user =
    getUser();


  const nutritionGoals =
    normalizeNutritionGoals(
      user.nutritionGoals
    );


  const currentPlan =
    nutritionGoals.activePlan;


  if (
    !currentPlan
  ) {

    return user;

  }


  const safeChanges =
    (
      changes &&
      typeof changes === "object" &&
      !Array.isArray(
        changes
      )
    )
      ? changes
      : {};


  const now =
    new Date()
      .toISOString();


  /* =======================================================
     SAVE PREVIOUS VERSION
  ======================================================== */

  const history =
    [
      ...nutritionGoals.history,

      normalizeNutritionPlan(
        currentPlan
      )
    ];


  /* =======================================================
     NESTED PROFESSIONAL UPDATE
  ======================================================== */

  const professional =
    {

      ...currentPlan.professional,

      ...(
        safeChanges.professional &&
        typeof safeChanges.professional === "object" &&
        !Array.isArray(
          safeChanges.professional
        )
          ? safeChanges.professional
          : {}
      )

    };


  /* =======================================================
     NESTED DAILY GOALS UPDATE
  ======================================================== */

  const dailyGoals =
    {

      ...currentPlan.dailyGoals,

      ...(
        safeChanges.dailyGoals &&
        typeof safeChanges.dailyGoals === "object" &&
        !Array.isArray(
          safeChanges.dailyGoals
        )
          ? safeChanges.dailyGoals
          : {}
      )

    };


  /* =======================================================
     CREATE UPDATED PLAN
  ======================================================== */

  const updatedPlan =
    normalizeNutritionPlan({

      ...currentPlan,

      ...safeChanges,

      professional:
        professional,

      dailyGoals:
        dailyGoals,

      mealGoals:
        safeChanges.mealGoals !== undefined
          ? safeChanges.mealGoals
          : currentPlan.mealGoals,

      plannedMeals:
        safeChanges.plannedMeals !== undefined
          ? safeChanges.plannedMeals
          : currentPlan.plannedMeals,

      version:
        currentPlan.version + 1,

      createdAt:
        currentPlan.createdAt,

      updatedAt:
        now

    });


  return updateUser({

    nutritionGoals: {

      activePlan:
        updatedPlan,

      history:
        history

    }

  });

}


/* =========================================================
   33. ARCHIVE ACTIVE NUTRITION PLAN
========================================================= */

function archiveActiveNutritionPlan() {

  const user =
    getUser();


  const nutritionGoals =
    normalizeNutritionGoals(
      user.nutritionGoals
    );


  if (
    !nutritionGoals.activePlan
  ) {

    return user;

  }


  const history =
    [

      ...nutritionGoals.history,

      normalizeNutritionPlan(
        nutritionGoals.activePlan
      )

    ];


  return updateUser({

    nutritionGoals: {

      activePlan:
        null,

      history:
        history

    }

  });

}


/* =========================================================
   34. NUTRITION PLAN HISTORY
========================================================= */

function getNutritionPlanHistory() {

  const nutritionGoals =
    getNutritionGoals();


  return [

    ...nutritionGoals.history

  ];

}


/* =========================================================
   35. DAILY NUTRITION GOALS
========================================================= */

function getActiveDailyNutritionGoals() {

  if (
    !hasActiveNutritionPlan()
  ) {

    return null;

  }


  const activePlan =
    getActiveNutritionPlan();


  return {

    ...activePlan.dailyGoals

  };

}


/* =========================================================
   36. MEAL NUTRITION GOALS
========================================================= */

function getActiveMealNutritionGoals() {

  if (
    !hasActiveNutritionPlan()
  ) {

    return [];

  }


  const activePlan =
    getActiveNutritionPlan();


  return activePlan.mealGoals.map(
    meal => ({

      ...meal,

      goals: {
        ...meal.goals
      }

    })
  );

}


/* =========================================================
   37. WEIGHT PROGRESS CALCULATION
========================================================= */

function calculateWeightProgress(
  startWeight,
  currentWeight,
  goalWeight
) {

  const start =
    toNumber(
      startWeight
    );


  const current =
    toNumber(
      currentWeight
    );


  const goal =
    toNumber(
      goalWeight
    );


  if (
    start === null ||
    current === null ||
    goal === null
  ) {

    return 0;

  }


  if (
    start === goal
  ) {

    return 100;

  }


  let progress =
    0;


  /* =======================================================
     WEIGHT LOSS GOAL
  ======================================================== */

  if (
    goal < start
  ) {

    progress =
      (
        (
          start -
          current
        ) /
        (
          start -
          goal
        )
      ) *
      100;

  }


  /* =======================================================
     WEIGHT GAIN GOAL
  ======================================================== */

  else {

    progress =
      (
        (
          current -
          start
        ) /
        (
          goal -
          start
        )
      ) *
      100;

  }


  return Math.round(
    clampPercentage(
      progress
    )
  );

}


/* =========================================================
   38. USER WEIGHT PROGRESS
========================================================= */

function getUserWeightProgress() {

  const user