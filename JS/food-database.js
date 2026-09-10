/* =========================================================
   FOOD-DATABASE.JS
   Mein Fortschritt
========================================================= */


/* =========================================================
   01. STORAGE CONFIGURATION
========================================================= */

const FOOD_DATABASE_STORAGE_KEY =
  "euConsigoFoodDatabase";


/* =========================================================
   02. BUILT-IN FOODS
========================================================= */

const BUILTIN_FOODS = [];


/* =========================================================
   03. DEFAULT DATABASE
========================================================= */

function createDefaultFoodDatabase() {

  return {

    version: 1,

    foods: [
      ...BUILTIN_FOODS
    ],

    createdAt: null,

    updatedAt: null

  };

}


/* =========================================================
   04. NUTRITION VALUE NORMALIZATION
========================================================= */

function normalizeFoodDatabaseValue(
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
    ) ||
    numericValue < 0
  ) {

    return null;

  }


  return numericValue;

}


/* =========================================================
   05. NUTRITION VALUES NORMALIZATION
========================================================= */

function normalizeFoodNutritionValues(
  values = {}
) {

  const safeValues =
    (
      values &&
      typeof values === "object" &&
      !Array.isArray(
        values
      )
    )
      ? values
      : {};


  return {

    calories:
      normalizeFoodDatabaseValue(
        safeValues.calories
      ),

    protein:
      normalizeFoodDatabaseValue(
        safeValues.protein
      ),

    carbohydrates:
      normalizeFoodDatabaseValue(
        safeValues.carbohydrates
      ),

    fat:
      normalizeFoodDatabaseValue(
        safeValues.fat
      ),

    fiber:
      normalizeFoodDatabaseValue(
        safeValues.fiber
      ),

    sugar:
      normalizeFoodDatabaseValue(
        safeValues.sugar
      )

  };

}


/* =========================================================
   06. NUTRITION BASIS NORMALIZATION
========================================================= */

function normalizeFoodNutritionBasis(
  basis = {}
) {

  const safeBasis =
    (
      basis &&
      typeof basis === "object" &&
      !Array.isArray(
        basis
      )
    )
      ? basis
      : {};


  const amount =
    normalizeFoodDatabaseValue(
      safeBasis.amount
    );


  return {

    amount:
      (
        amount !== null &&
        amount > 0
      )
        ? amount
        : 100,

    unit:
      typeof safeBasis.unit === "string" &&
      safeBasis.unit.trim()
        ? safeBasis.unit.trim()
        : "g"

  };

}


/* =========================================================
   07. FOOD NORMALIZATION
========================================================= */

function normalizeDatabaseFood(
  foodData = {}
) {

  const safeFood =
    (
      foodData &&
      typeof foodData === "object" &&
      !Array.isArray(
        foodData
      )
    )
      ? foodData
      : {};


  return {

    id:
      safeFood.id ?? null,

    name:
      typeof safeFood.name === "string"
        ? safeFood.name.trim()
        : "",

    brand:
      typeof safeFood.brand === "string"
        ? safeFood.brand.trim()
        : "",

    category:
      typeof safeFood.category === "string"
        ? safeFood.category.trim()
        : "",

    barcode:
      typeof safeFood.barcode === "string"
        ? safeFood.barcode.trim()
        : "",

    defaultUnit:
      typeof safeFood.defaultUnit === "string" &&
      safeFood.defaultUnit.trim()
        ? safeFood.defaultUnit.trim()
        : "g",

    nutritionBasis:
      normalizeFoodNutritionBasis(
        safeFood.nutritionBasis
      ),

    values:
      normalizeFoodNutritionValues(
        safeFood.values
      ),

    source:
      safeFood.source === "user"
        ? "user"
        : "database",

    createdAt:
      safeFood.createdAt ?? null,

    updatedAt:
      safeFood.updatedAt ?? null

  };

}


/* =========================================================
   08. DATABASE NORMALIZATION
========================================================= */

function normalizeFoodDatabase(
  databaseData = {}
) {

  const safeDatabase =
    (
      databaseData &&
      typeof databaseData === "object" &&
      !Array.isArray(
        databaseData
      )
    )
      ? databaseData
      : {};


  const storedFoods =
    Array.isArray(
      safeDatabase.foods
    )
      ? safeDatabase.foods
          .filter(
            food =>
              food &&
              typeof food === "object" &&
              !Array.isArray(
                food
              )
          )
          .map(
            food =>
              normalizeDatabaseFood(
                food
              )
          )
      : [];


  const foodMap =
    new Map();


  BUILTIN_FOODS.forEach(
    food => {

      const normalizedFood =
        normalizeDatabaseFood(
          food
        );


      if (
        normalizedFood.id
      ) {

        foodMap.set(
          normalizedFood.id,
          normalizedFood
        );

      }

    }
  );


  storedFoods.forEach(
    food => {

      if (
        food.id
      ) {

        foodMap.set(
          food.id,
          food
        );

      }

    }
  );


  return {

    version:
      Number.isInteger(
        safeDatabase.version
      ) &&
      safeDatabase.version > 0
        ? safeDatabase.version
        : 1,

    foods:
      Array.from(
        foodMap.values()
      ),

    createdAt:
      safeDatabase.createdAt ?? null,

    updatedAt:
      safeDatabase.updatedAt ?? null

  };

}


/* =========================================================
   09. GET DATABASE
========================================================= */

function getFoodDatabase() {

  const storedDatabase =
    loadStorageData(
      FOOD_DATABASE_STORAGE_KEY,
      null
    );


  if (
    !storedDatabase ||
    typeof storedDatabase !== "object" ||
    Array.isArray(
      storedDatabase
    )
  ) {

    return createDefaultFoodDatabase();

  }


  return normalizeFoodDatabase(
    storedDatabase
  );

}


/* =========================================================
   10. SAVE DATABASE
========================================================= */

function saveFoodDatabase(
  databaseData = {}
) {

  const currentDatabase =
    getFoodDatabase();


  const now =
    new Date()
      .toISOString();


  const database =
    normalizeFoodDatabase(
      databaseData
    );


  if (
    !database.createdAt
  ) {

    database.createdAt =
      currentDatabase.createdAt ??
      now;

  }


  database.updatedAt =
    now;


  saveStorageData(
    FOOD_DATABASE_STORAGE_KEY,
    database
  );


  return database;

}


/* =========================================================
   11. FOOD ID
========================================================= */

function createFoodDatabaseId() {

  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {

    return `food-${crypto.randomUUID()}`;

  }


  return `food-${Date.now()}`;

}


/* =========================================================
   12. SEARCH TEXT NORMALIZATION
========================================================= */

function normalizeFoodSearchText(
  value
) {

  return String(
    value ?? ""
  )
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .trim()
    .toLowerCase();

}


/* =========================================================
   13. SEARCH FOODS
========================================================= */

function searchFoods(
  query
) {

  const database =
    getFoodDatabase();


  const searchTerm =
    normalizeFoodSearchText(
      query
    );


  if (
    !searchTerm
  ) {

    return [

      ...database.foods

    ];

  }


  return database.foods.filter(
    food => {

      const searchableText =
        normalizeFoodSearchText(
          [
            food.name,
            food.brand,
            food.category,
            food.barcode
          ]
            .filter(
              Boolean
            )
            .join(
              " "
            )
        );


      return searchableText.includes(
        searchTerm
      );

    }
  );

}


/* =========================================================
   14. GET FOOD BY ID
========================================================= */

function getFoodById(
  foodId
) {

  if (
    !foodId
  ) {

    return null;

  }


  const database =
    getFoodDatabase();


  return database.foods.find(
    food =>
      food.id === foodId
  ) ?? null;

}


/* =========================================================
   15. GET FOOD BY BARCODE
========================================================= */

function getFoodByBarcode(
  barcode
) {

  const cleanBarcode =
    String(
      barcode ?? ""
    )
      .trim();


  if (
    !cleanBarcode
  ) {

    return null;

  }


  const database =
    getFoodDatabase();


  return database.foods.find(
    food =>
      food.barcode === cleanBarcode
  ) ?? null;

}


/* =========================================================
   16. ADD CUSTOM FOOD
========================================================= */

function addCustomFood(
  foodData = {}
) {

  const normalizedFood =
    normalizeDatabaseFood(
      foodData
    );


  if (
    !normalizedFood.name
  ) {

    return null;

  }


  const database =
    getFoodDatabase();


  const now =
    new Date()
      .toISOString();


  normalizedFood.id =
    createFoodDatabaseId();


  normalizedFood.source =
    "user";


  normalizedFood.createdAt =
    now;


  normalizedFood.updatedAt =
    now;


  database.foods.push(
    normalizedFood
  );


  saveFoodDatabase(
    database
  );


  return normalizedFood;

}


/* =========================================================
   17. UPDATE CUSTOM FOOD
========================================================= */

function updateCustomFood(
  foodId,
  changes = {}
) {

  const database =
    getFoodDatabase();


  const foodIndex =
    database.foods.findIndex(
      food =>
        food.id === foodId
    );


  if (
    foodIndex === -1
  ) {

    return null;

  }


  const currentFood =
    database.foods[
      foodIndex
    ];


  if (
    currentFood.source !== "user"
  ) {

    return null;

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


  const nutritionBasis =
    {

      ...currentFood.nutritionBasis,

      ...(
        safeChanges.nutritionBasis &&
        typeof safeChanges.nutritionBasis === "object" &&
        !Array.isArray(
          safeChanges.nutritionBasis
        )
          ? safeChanges.nutritionBasis
          : {}
      )

    };


  const values =
    {

      ...currentFood.values,

      ...(
        safeChanges.values &&
        typeof safeChanges.values === "object" &&
        !Array.isArray(
          safeChanges.values
        )
          ? safeChanges.values
          : {}
      )

    };


  const updatedFood =
    normalizeDatabaseFood({

      ...currentFood,

      ...safeChanges,

      id:
        currentFood.id,

      source:
        "user",

      nutritionBasis:
        nutritionBasis,

      values:
        values,

      createdAt:
        currentFood.createdAt,

      updatedAt:
        new Date()
          .toISOString()

    });


  database.foods[
    foodIndex
  ] =
    updatedFood;


  saveFoodDatabase(
    database
  );


  return updatedFood;

}


/* =========================================================
   18. DELETE CUSTOM FOOD
========================================================= */

function deleteCustomFood(
  foodId
) {

  const database =
    getFoodDatabase();


  const food =
    database.foods.find(
      item =>
        item.id === foodId
    );


  if (
    !food ||
    food.source !== "user"
  ) {

    return false;

  }


  database.foods =
    database.foods.filter(
      item =>
        item.id !== foodId
    );


  saveFoodDatabase(
    database
  );


  return true;

}


/* =========================================================
   19. CALCULATE FOOD VALUES
========================================================= */

function calculateFoodValues(
  food,
  quantity
) {

  if (
    !food ||
    typeof food !== "object"
  ) {

    return null;

  }


  const numericQuantity =
    normalizeFoodDatabaseValue(
      quantity
    );


  const basisAmount =
    normalizeFoodDatabaseValue(
      food.nutritionBasis?.amount
    );


  if (
    numericQuantity === null ||
    basisAmount === null ||
    basisAmount <= 0
  ) {

    return null;

  }


  const factor =
    numericQuantity /
    basisAmount;


  const calculatedValues =
    {};


  Object.keys(
    food.values
  )
    .forEach(
      key => {

        const value =
          normalizeFoodDatabaseValue(
            food.values[key]
          );


        calculatedValues[key] =
          value === null
            ? null
            : Number(
                (
                  value *
                  factor
                )
                  .toFixed(
                    2
                  )
              );

      }
    );


  return calculatedValues;

}


/* =========================================================
   20. CREATE CONSUMED FOOD ITEM
========================================================= */

function createConsumedFoodItem(
  foodId,
  quantity,
  time = ""
) {

  const food =
    getFoodById(
      foodId
    );


  if (
    !food
  ) {

    return null;

  }


  const numericQuantity =
    normalizeFoodDatabaseValue(
      quantity
    );


  if (
    numericQuantity === null ||
    numericQuantity <= 0
  ) {

    return null;

  }


  const calculatedValues =
    calculateFoodValues(
      food,
      numericQuantity
    );


  if (
    !calculatedValues
  ) {

    return null;

  }


  const now =
    new Date()
      .toISOString();


  return {

    id:
      `food-entry-${Date.now()}`,

    foodId:
      food.id,

    name:
      food.name,

    brand:
      food.brand,

    quantity:
      numericQuantity,

    unit:
      food.nutritionBasis.unit,

    calories:
      calculatedValues.calories,

    protein:
      calculatedValues.protein,

    carbohydrates:
      calculatedValues.carbohydrates,

    fat:
      calculatedValues.fat,

    fiber:
      calculatedValues.fiber,

    sugar:
      calculatedValues.sugar,

    time:
      typeof time === "string"
        ? time
        : "",

    createdAt:
      now,

    updatedAt:
      now

  };

}


/* =========================================================
   21. GET USER FOODS
========================================================= */

function getCustomFoods() {

  const database =
    getFoodDatabase();


  return database.foods.filter(
    food =>
      food.source === "user"
  );

}


/* =========================================================
   22. GET DATABASE FOODS
========================================================= */

function getBuiltInFoods() {

  const database =
    getFoodDatabase();


  return database.foods.filter(
    food =>
      food.source === "database"
  );

}


/* =========================================================
   23. DEVELOPMENT RESET
========================================================= */

function resetFoodDatabase() {

  removeStorageData(
    FOOD_DATABASE_STORAGE_KEY
  );


  return createDefaultFoodDatabase();

}


/* =========================================================
   24. FILE END
========================================================= */