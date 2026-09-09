/* =========================================================
   HELPERS.JS

   Responsabilidade:
   - Centralizar pequenas funções reutilizáveis
   - Formatar valores exibidos na interface
   - Trabalhar com datas simples
   - Validar números
   - Limitar valores
   - Calcular porcentagens
   - Proteger textos inseridos no HTML

   IMPORTANTE:
   Este arquivo NÃO contém regras de negócio.

   Exemplos de regras que NÃO pertencem aqui:
   - Meta de peso
   - Cálculo específico do progresso do usuário
   - Regras do Miau
   - Controle Premium
   - Meta diária de água
   - Histórico de alimentação

   Essas regras permanecem nos arquivos
   responsáveis por cada parte da aplicação.
========================================================= */


/* =========================================================
   01. VALID NUMBER
========================================================= */

/**
 * Verifica se um valor é um número
 * finito e utilizável.
 */
function isFiniteNumber(
  value
) {

  return (
    typeof value === "number" &&
    Number.isFinite(
      value
    )
  );

}


/* =========================================================
   02. NUMBER CONVERSION
========================================================= */

/**
 * Converte um valor para número.
 *
 * Retorna null quando o valor
 * não puder ser convertido.
 */
function toNumber(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return null;

  }


  const number =
    Number(
      value
    );


  if (
    !Number.isFinite(
      number
    )
  ) {

    return null;

  }


  return number;

}


/* =========================================================
   03. ROUND TO ONE DECIMAL
========================================================= */

/**
 * Arredonda um número
 * para uma casa decimal.
 */
function roundToOneDecimalHelper(
  value
) {

  const number =
    toNumber(
      value
    );


  if (
    number === null
  ) {

    return null;

  }


  return Math.round(
    number * 10
  ) / 10;

}


/* =========================================================
   04. CLAMP NUMBER
========================================================= */

/**
 * Mantém um número dentro
 * de um intervalo definido.
 */
function clampNumber(
  value,
  minimum,
  maximum
) {

  const number =
    toNumber(
      value
    );

  const min =
    toNumber(
      minimum
    );

  const max =
    toNumber(
      maximum
    );


  if (
    number === null ||
    min === null ||
    max === null
  ) {

    return null;

  }


  return Math.min(
    Math.max(
      number,
      min
    ),
    max
  );

}


/* =========================================================
   05. PERCENTAGE
========================================================= */

/**
 * Calcula uma porcentagem simples.
 *
 * Exemplo:
 * calculatePercentage(50, 100)
 * retorna 50.
 */
function calculatePercentage(
  value,
  total
) {

  const numericValue =
    toNumber(
      value
    );

  const numericTotal =
    toNumber(
      total
    );


  if (
    numericValue === null ||
    numericTotal === null ||
    numericTotal === 0
  ) {

    return 0;

  }


  return (
    numericValue /
    numericTotal
  ) * 100;

}


/* =========================================================
   06. CLAMP PERCENTAGE
========================================================= */

/**
 * Garante que uma porcentagem
 * permaneça entre 0 e 100.
 */
function clampPercentage(
  value
) {

  const percentage =
    clampNumber(
      value,
      0,
      100
    );


  return (
    percentage === null
      ? 0
      : percentage
  );

}


/* =========================================================
   07. FORMAT WEIGHT
========================================================= */

/**
 * Formata peso para exibição.
 *
 * Exemplo:
 * 82.5 -> "82.5 kg"
 */
function formatWeightValue(
  weight
) {

  const number =
    toNumber(
      weight
    );


  if (
    number === null
  ) {

    return "—";
  }


  return `${number.toFixed(1)} kg`;

}


/* =========================================================
   08. FORMAT HEIGHT
========================================================= */

/**
 * Formata altura armazenada
 * em metros para centímetros.
 *
 * Exemplo:
 * 1.67 -> "167 cm"
 */
function formatHeightValue(
  height
) {

  const number =
    toNumber(
      height
    );


  if (
    number === null
  ) {

    return "—";
  }


  return `${Math.round(number * 100)} cm`;

}


/* =========================================================
   09. FORMAT BMI
========================================================= */

/**
 * Formata BMI para uma
 * casa decimal.
 */
function formatBMIValue(
  bmi
) {

  const number =
    toNumber(
      bmi
    );


  if (
    number === null
  ) {

    return "—";
  }


  return number.toFixed(
    1
  );

}


/* =========================================================
   10. FORMAT PERCENTAGE
========================================================= */

/**
 * Formata uma porcentagem
 * para exibição.
 */
function formatPercentageValue(
  percentage
) {

  const number =
    toNumber(
      percentage
    );


  if (
    number === null
  ) {

    return "0%";
  }


  return `${Math.round(number)}%`;

}


/* =========================================================
   11. FORMAT WATER
========================================================= */

/**
 * Formata uma quantidade de água.
 *
 * Abaixo de 1000 ml:
 * 750 -> "750 ml"
 *
 * A partir de 1000 ml:
 * 1500 -> "1.50 L"
 */
function formatWaterValue(
  milliliters
) {

  const amount =
    toNumber(
      milliliters
    );


  if (
    amount === null
  ) {

    return "0 ml";
  }


  if (
    amount >= 1000
  ) {

    return `${(
      amount / 1000
    ).toFixed(2)} L`;

  }


  return `${Math.round(amount)} ml`;

}


/* =========================================================
   12. FORMAT MINUTES
========================================================= */

/**
 * Formata minutos para exibição.
 */
function formatMinutesValue(
  minutes
) {

  const number =
    toNumber(
      minutes
    );


  if (
    number === null
  ) {

    return "0 min";
  }


  return `${Math.round(number)} min`;

}


/* =========================================================
   13. FORMAT CALORIES
========================================================= */

/**
 * Formata calorias para exibição.
 */
function formatCaloriesValue(
  calories
) {

  const number =
    toNumber(
      calories
    );


  if (
    number === null
  ) {

    return "0 kcal";
  }


  return `${Math.round(number)} kcal`;

}


/* =========================================================
   14. TODAY
========================================================= */

/**
 * Retorna a data local atual
 * no formato YYYY-MM-DD.
 *
 * Não utiliza toISOString(),
 * evitando diferenças causadas
 * pelo fuso horário.
 */
function getLocalToday() {

  const today =
    new Date();


  const year =
    today.getFullYear();


  const month =
    String(
      today.getMonth() + 1
    ).padStart(
      2,
      "0"
    );


  const day =
    String(
      today.getDate()
    ).padStart(
      2,
      "0"
    );


  return `${year}-${month}-${day}`;

}


/* =========================================================
   15. VALID DATE
========================================================= */

/**
 * Verifica se um valor pode
 * representar uma data válida.
 */
function isValidDate(
  value
) {

  if (
    !value
  ) {

    return false;

  }


  const date =
    new Date(
      value
    );


  return !Number.isNaN(
    date.getTime()
  );

}


/* =========================================================
   16. DAYS BETWEEN DATES
========================================================= */

/**
 * Calcula a quantidade de dias
 * completos entre duas datas.
 */
function getDaysBetween(
  startDate,
  endDate = new Date()
) {

  if (
    !isValidDate(
      startDate
    ) ||
    !isValidDate(
      endDate
    )
  ) {

    return 0;

  }


  const start =
    new Date(
      startDate
    );


  const end =
    new Date(
      endDate
    );


  const difference =
    end.getTime() -
    start.getTime();


  return Math.floor(
    difference /
    (
      1000 *
      60 *
      60 *
      24
    )
  );

}


/* =========================================================
   17. SAFE TEXT
========================================================= */

/**
 * Converte qualquer valor
 * para texto seguro.
 */
function getSafeText(
  value
) {

  if (
    value === null ||
    value === undefined
  ) {

    return "";
  }


  return String(
    value
  );

}


/* =========================================================
   18. ESCAPE HTML
========================================================= */

/**
 * Escapa caracteres HTML.
 *
 * Deve ser utilizada quando um texto
 * fornecido pelo usuário for inserido
 * através de innerHTML.
 */
function escapeHTML(
  value
) {

  const text =
    getSafeText(
      value
    );


  return text
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );

}


/* =========================================================
   19. NORMALIZE TEXT
========================================================= */

/**
 * Remove espaços extras
 * no início e no final.
 */
function normalizeText(
  value
) {

  return getSafeText(
    value
  ).trim();

}


/* =========================================================
   20. EMPTY TEXT
========================================================= */

/**
 * Verifica se um texto
 * está vazio.
 */
function isEmptyText(
  value
) {

  return (
    normalizeText(
      value
    ).length === 0
  );

}


/* =========================================================
   21. FILE END
========================================================= */