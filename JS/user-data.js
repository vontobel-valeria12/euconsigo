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
   - Meta de calorias
   - Status Premium
   - Cálculo do progresso de peso
   - Validação do perfil básico

   DEPENDÊNCIAS:
   - storage.js
   - helpers.js

   ORDEM DE CARREGAMENTO:

   <script src="storage.js"></script>
   <script src="helpers.js"></script>
   <script src="user-data.js"></script>

   IMPORTANTE:
   As páginas da aplicação devem utilizar estas funções
   para acessar ou modificar os dados centrais do usuário.

   Nenhuma página deve criar uma segunda estrutura
   independente para os mesmos dados.
========================================================= */


/* =========================================================
   01. STORAGE CONFIGURATION
   Configuração do armazenamento central
========================================================= */

const USER_STORAGE_KEY =
  "euConsigoUser";


/* =========================================================
   02. DEFAULT USER
   Estrutura padrão dos dados do usuário
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
   03. BMI CALCULATION
   Calcula o BMI usando peso em kg e altura em metros
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
   04. BMI CATEGORY
   Retorna a categoria correspondente ao BMI
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
   05. USER NORMALIZATION
   Garante que todos os campos padrão existam
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


  return {

    ...DEFAULT_USER,
    ...safeUserData

  };

}


/* =========================================================
   06. GET USER
   Obtém os dados atuais armazenados
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

    return {
      ...DEFAULT_USER
    };

  }


  return normalizeUser(
    storedUser
  );

}


/* =========================================================
   07. SAVE USER
   Salva os dados centrais do usuário
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
      ...safeUserData

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

     O BMI é recalculado sempre que:
     - currentWeight existir
     - height existir
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
   08. UPDATE USER
   Atualiza somente os campos informados
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
   09. INITIAL WEIGHT
   Registra o primeiro peso do usuário
========================================================= */

function setInitialWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  /* =======================================================
     VALIDATION
  ======================================================== */

  if (
    numericWeight === null ||
    numericWeight <= 0
  ) {

    return getUser();

  }


  const user =
    getUser();


  /* =======================================================
     START WEIGHT PROTECTION

     startWeight somente é criado
     se ainda não existir.

     Ao retornar ao Index,
     o peso inicial não é sobrescrito.
  ======================================================== */

  const startWeight =
    (
      isFiniteNumber(
        user.startWeight
      ) &&
      user.startWeight > 0
    )
      ? user.startWeight
      : numericWeight;


  /* =======================================================
     SAVE WEIGHT
  ======================================================== */

  return updateUser({

    startWeight:
      startWeight,

    currentWeight:
      numericWeight

  });

}


/* =========================================================
   10. CURRENT WEIGHT
   Atualiza o peso atual do usuário
========================================================= */

function setCurrentWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  /* =======================================================
     VALIDATION
  ======================================================== */

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


  /* =======================================================
     INITIAL WEIGHT FALLBACK

     Segurança para casos em que o usuário
     ainda não possui startWeight.
  ======================================================== */

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
   11. USER HEIGHT
   Atualiza a altura do usuário em metros
========================================================= */

function setUserHeight(
  height
) {

  const numericHeight =
    toNumber(
      height
    );


  /* =======================================================
     VALIDATION
  ======================================================== */

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
   12. GOAL WEIGHT
   Atualiza a meta de peso
========================================================= */

function setGoalWeight(
  weight
) {

  const numericWeight =
    toNumber(
      weight
    );


  /* =======================================================
     VALIDATION
  ======================================================== */

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
   13. USER NAME
   Atualiza o nome do usuário
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
   14. CALORIE GOAL
   Atualiza a meta diária de calorias
========================================================= */

function setCalorieGoal(
  calories
) {

  const numericCalories =
    toNumber(
      calories
    );


  /* =======================================================
     VALIDATION
  ======================================================== */

  if (
    numericCalories === null ||
    numericCalories <= 0
  ) {

    return getUser();

  }


  return updateUser({

    calorieGoal:
      Math.round(
        numericCalories
      )

  });

}


/* =========================================================
   15. PREMIUM STATUS
   Atualiza o status Premium do usuário
========================================================= */

function setPremiumStatus(
  status
) {

  return updateUser({

    premium:
      Boolean(
        status
      )

  });

}


/* =========================================================
   16. WEIGHT PROGRESS CALCULATION
   Calcula o progresso entre peso inicial e meta
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


  /* =======================================================
     VALIDATION
  ======================================================== */

  if (
    start === null ||
    current === null ||
    goal === null
  ) {

    return 0;

  }


  /* =======================================================
     GOAL ALREADY EQUAL TO START
  ======================================================== */

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


  /* =======================================================
     PROGRESS LIMIT
     Mantém o resultado entre 0% e 100%
  ======================================================== */

  return Math.round(
    clampPercentage(
      progress
    )
  );

}


/* =========================================================
   17. USER WEIGHT PROGRESS
   Calcula o progresso usando os dados atuais do usuário
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
   18. BASIC USER DATA STATUS
   Verifica se os dados básicos já foram preenchidos
========================================================= */

function hasBasicUserData() {

  const user =
    getUser();


  return Boolean(

    isFiniteNumber(
      user.height
    ) &&

    user.height > 0 &&

    isFiniteNumber(
      user.startWeight
    ) &&

    user.startWeight > 0 &&

    isFiniteNumber(
      user.currentWeight
    ) &&

    user.currentWeight > 0

  );

}


/* =========================================================
   19. WEIGHT GOAL STATUS
   Verifica se a meta de peso já foi definida
========================================================= */

function hasWeightGoal() {

  const user =
    getUser();


  return Boolean(

    isFiniteNumber(
      user.goalWeight
    ) &&

    user.goalWeight > 0

  );

}


/* =========================================================
   20. DEVELOPMENT RESET

   Ferramenta temporária para desenvolvimento.

   IMPORTANTE:
   Esta função remove somente os dados
   armazenados na chave principal do usuário.

   Ela NÃO apaga:
   - água
   - alimentação
   - movimento
   - histórico
   - dados do Miau
========================================================= */

function resetUserData() {

  removeStorageData(
    USER_STORAGE_KEY
  );


  return {
    ...DEFAULT_USER
  };

}


/* =========================================================
   21. FILE END
========================================================= */