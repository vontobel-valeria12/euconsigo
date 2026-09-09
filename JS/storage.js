/* =========================================================
   STORAGE.JS

   Responsabilidade:
   - Centralizar o acesso ao localStorage
   - Ler dados com segurança
   - Salvar dados em formato JSON
   - Remover dados
   - Verificar se uma chave existe
   - Evitar repetição de JSON.parse e JSON.stringify
   - Tratar erros de armazenamento

   IMPORTANTE:
   Este arquivo NÃO contém regras de negócio.

   Exemplos de regras que NÃO pertencem aqui:
   - Peso do usuário
   - BMI
   - Água
   - Alimentação
   - Movimento
   - Estado do Miau

   Essas regras pertencem aos arquivos responsáveis
   por cada parte da aplicação.
========================================================= */


/* =========================================================
   01. STORAGE TEST KEY
========================================================= */

const STORAGE_TEST_KEY =
  "__meinFortschrittStorageTest__";


/* =========================================================
   02. STORAGE AVAILABILITY
========================================================= */

/**
 * Verifica se o localStorage está disponível
 * no navegador atual.
 */
function isStorageAvailable() {

  try {

    localStorage.setItem(
      STORAGE_TEST_KEY,
      STORAGE_TEST_KEY
    );


    localStorage.removeItem(
      STORAGE_TEST_KEY
    );


    return true;

  } catch (error) {

    console.error(
      "localStorage ist nicht verfügbar.",
      error
    );


    return false;

  }

}


/* =========================================================
   03. VALID STORAGE KEY
========================================================= */

/**
 * Verifica se uma chave de armazenamento
 * pode ser utilizada.
 */
function isValidStorageKey(
  key
) {

  return (
    typeof key === "string" &&
    key.trim().length > 0
  );

}


/* =========================================================
   04. READ STORAGE DATA
========================================================= */

/**
 * Lê uma chave do localStorage.
 *
 * O conteúdo salvo deve estar em JSON.
 *
 * Se a chave não existir ou houver erro,
 * retorna o valor fallback.
 */
function loadStorageData(
  key,
  fallback = null
) {

  if (
    !isValidStorageKey(
      key
    )
  ) {

    console.error(
      "Ungültiger Storage-Schlüssel."
    );


    return fallback;

  }


  if (
    !isStorageAvailable()
  ) {

    return fallback;

  }


  try {

    const savedData =
      localStorage.getItem(
        key
      );


    if (
      savedData === null
    ) {

      return fallback;

    }


    return JSON.parse(
      savedData
    );

  } catch (error) {

    console.error(
      `Daten konnten nicht geladen werden: ${key}`,
      error
    );


    return fallback;

  }

}


/* =========================================================
   05. SAVE STORAGE DATA
========================================================= */

/**
 * Salva um valor no localStorage
 * utilizando JSON.stringify.
 *
 * Retorna true quando o salvamento
 * foi concluído com sucesso.
 */
function saveStorageData(
  key,
  value
) {

  if (
    !isValidStorageKey(
      key
    )
  ) {

    console.error(
      "Ungültiger Storage-Schlüssel."
    );


    return false;

  }


  if (
    !isStorageAvailable()
  ) {

    return false;

  }


  try {

    localStorage.setItem(
      key,
      JSON.stringify(
        value
      )
    );


    return true;

  } catch (error) {

    console.error(
      `Daten konnten nicht gespeichert werden: ${key}`,
      error
    );


    return false;

  }

}


/* =========================================================
   06. REMOVE STORAGE DATA
========================================================= */

/**
 * Remove uma única chave
 * do localStorage.
 */
function removeStorageData(
  key
) {

  if (
    !isValidStorageKey(
      key
    )
  ) {

    console.error(
      "Ungültiger Storage-Schlüssel."
    );


    return false;

  }


  if (
    !isStorageAvailable()
  ) {

    return false;

  }


  try {

    localStorage.removeItem(
      key
    );


    return true;

  } catch (error) {

    console.error(
      `Daten konnten nicht entfernt werden: ${key}`,
      error
    );


    return false;

  }

}


/* =========================================================
   07. STORAGE KEY EXISTS
========================================================= */

/**
 * Verifica se uma determinada chave
 * já existe no localStorage.
 */
function hasStorageData(
  key
) {

  if (
    !isValidStorageKey(
      key
    )
  ) {

    return false;

  }


  if (
    !isStorageAvailable()
  ) {

    return false;

  }


  try {

    return (
      localStorage.getItem(
        key
      ) !== null
    );

  } catch (error) {

    console.error(
      `Storage-Schlüssel konnte nicht geprüft werden: ${key}`,
      error
    );


    return false;

  }

}


/* =========================================================
   08. UPDATE STORAGE DATA
========================================================= */

/**
 * Atualiza parcialmente um objeto salvo.
 *
 * Exemplo:
 *
 * updateStorageData(
 *   "meineDaten",
 *   {
 *     water: 500
 *   }
 * );
 *
 * Dados existentes são preservados.
 */
function updateStorageData(
  key,
  changes = {}
) {

  if (
    !changes ||
    typeof changes !== "object" ||
    Array.isArray(
      changes
    )
  ) {

    console.error(
      "Storage-Änderungen müssen ein Objekt sein."
    );


    return null;

  }


  const currentData =
    loadStorageData(
      key,
      {}
    );


  const safeCurrentData =
    (
      currentData &&
      typeof currentData === "object" &&
      !Array.isArray(
        currentData
      )
    )
      ? currentData
      : {};


  const updatedData = {
    ...safeCurrentData,
    ...changes
  };


  const saved =
    saveStorageData(
      key,
      updatedData
    );


  if (
    !saved
  ) {

    return null;

  }


  return updatedData;

}


/* =========================================================
   09. CLEAR SELECTED STORAGE KEYS
========================================================= */

/**
 * Remove apenas as chaves informadas.
 *
 * NÃO utiliza localStorage.clear(),
 * porque isso poderia apagar dados
 * de outras aplicações do mesmo domínio.
 */
function clearStorageKeys(
  keys = []
) {

  if (
    !Array.isArray(
      keys
    )
  ) {

    console.error(
      "Storage-Schlüssel müssen als Array übergeben werden."
    );


    return false;

  }


  let success =
    true;


  keys.forEach(
    function (key) {

      const removed =
        removeStorageData(
          key
        );


      if (
        !removed
      ) {

        success =
          false;

      }

    }
  );


  return success;

}


/* =========================================================
   10. FILE END
========================================================= */