<!DOCTYPE html>
<html lang="de-CH">

<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <meta
    name="description"
    content="Verfolge Gewicht, Ziele, Kalorien, Wasser und Bewegung und entdecke zusätzliche Premium-Funktionen."
  >

  <title>Mein Fortschritt | Dashboard</title>

  <link rel="stylesheet" href="dashboard.css">
</head>


<body>

  <!-- =====================================================
       HEADER
  ====================================================== -->

  <header class="app-header">

    <div class="top-header">

      <a
        href="dashboard.html"
        class="brand"
        aria-label="Mein Fortschritt"
      >

        <span class="brand-mark">
          M
        </span>

        <span class="brand-name">
          Mein Fortschritt
        </span>

      </a>


      <button
        class="profile-button"
        id="profile-button"
        type="button"
        aria-label="Profil öffnen"
      >
        V
      </button>

    </div>



    <!-- =================================================
         MENU HORIZONTAL
    ================================================== -->

    <nav
      class="function-menu"
      aria-label="Funktionen"
    >


      <!-- BEGLEITUNG -->

      <button
        class="function-item premium-function"
        type="button"
        data-premium="true"
        data-feature="Begleitung"
      >

        <div class="function-circle premium-circle">
          ♡
        </div>

        <span class="function-name">
          Begleitung
        </span>

        <small class="premium-badge">
          👑 Premium
        </small>

      </button>



      <!-- SHOP -->

      <a
        href="shop.html"
        class="function-item"
      >

        <div class="function-circle">
          ◇
        </div>

        <span class="function-name">
          Shop
        </span>

      </a>



      <!-- KALORIEN -->

      <a
        href="#kalorien"
        class="function-item"
      >

        <div class="function-circle">
          +
        </div>

        <span class="function-name">
          Kalorien
        </span>

      </a>



      <!-- WASSER -->

      <a
        href="#wasser"
        class="function-item"
      >

        <div class="function-circle">
          ◉
        </div>

        <span class="function-name">
          Wasser
        </span>

      </a>



      <!-- BEWEGUNG -->

      <a
        href="#bewegung"
        class="function-item"
      >

        <div class="function-circle">
          ↗
        </div>

        <span class="function-name">
          Bewegung
        </span>

      </a>



      <!-- GEWICHT -->

      <a
        href="#gewicht"
        class="function-item"
      >

        <div class="function-circle">
          ↓
        </div>

        <span class="function-name">
          Gewicht
        </span>

      </a>



      <!-- ZIELE -->

      <a
        href="#ziele"
        class="function-item"
      >

        <div class="function-circle">
          ✓
        </div>

        <span class="function-name">
          Ziele
        </span>

      </a>



      <!-- WOCHENANALYSE -->

      <button
        class="function-item premium-function"
        type="button"
        data-premium="true"
        data-feature="Wochenanalyse"
      >

        <div class="function-circle premium-circle">
          ◫
        </div>

        <span class="function-name">
          Wochenanalyse
        </span>

        <small class="premium-badge">
          👑 Premium
        </small>

      </button>



      <!-- STRATEGIE -->

      <button
        class="function-item premium-function"
        type="button"
        data-premium="true"
        data-feature="Strategie"
      >

        <div class="function-circle premium-circle">
          ✦
        </div>

        <span class="function-name">
          Strategie
        </span>

        <small class="premium-badge">
          👑 Premium
        </small>

      </button>



      <!-- ERNÄHRUNGSPLAN -->

      <button
        class="function-item premium-function"
        type="button"
        data-premium="true"
        data-feature="Ernährungsplan"
      >

        <div class="function-circle premium-circle">
          ≋
        </div>

        <span class="function-name">
          Ernährungsplan
        </span>

        <small class="premium-badge">
          👑 Premium
        </small>

      </button>



      <!-- ANALYSE -->

      <button
        class="function-item premium-function"
        type="button"
        data-premium="true"
        data-feature="Analyse"
      >

        <div class="function-circle premium-circle">
          ◎
        </div>

        <span class="function-name">
          Analyse
        </span>

        <small class="premium-badge">
          👑 Premium
        </small>

      </button>

    </nav>

  </header>



  <!-- =====================================================
       MAIN
  ====================================================== -->

  <main class="dashboard-main">

    <div class="dashboard-container">


      <!-- =================================================
           WELCOME
      ================================================== -->

      <section
        class="welcome-section"
        id="uebersicht"
      >

        <div class="welcome-copy">

          <span class="section-kicker">
            Dein Fortschritt
          </span>

          <h1 id="welcome-name">
            Guten Morgen, Valeria.
          </h1>

          <p>
            Heute ist ein neuer Schritt in Richtung deines Ziels.
          </p>

        </div>

      </section>



      <!-- =================================================
           PRINCIPAL PROGRESS CARD
      ================================================== -->

      <section class="main-progress-card">

        <div class="progress-copy">

          <span class="section-kicker">
            Dein Ziel
          </span>

          <h2 id="current-weight-main">
            87 kg
          </h2>

          <p>
            Zielgewicht:
            <strong id="goal-weight-main">
              70 kg
            </strong>
          </p>

        </div>


        <div class="progress-visual">

          <div class="goal-track">

            <div
              class="goal-fill"
              id="goal-fill"
              style="width: 6%;"
            ></div>

          </div>


          <div class="goal-numbers">

            <span id="start-weight-text">
              Start 88 kg
            </span>

            <span id="current-weight-text">
              Aktuell 87 kg
            </span>

            <span id="goal-weight-text">
              Ziel 70 kg
            </span>

          </div>

        </div>

      </section>



      <!-- =================================================
           MEIN BEGLEITER
      ================================================== -->

      <section class="pet-dashboard-section">

        <a
          href="katze/katze.html"
          class="pet-card-link"
        >
          🐱 Mein Begleiter
        </a>

      </section>



      <!-- =================================================
           QUICK OVERVIEW
      ================================================== -->

      <section class="quick-grid">


        <!-- BMI -->

        <article class="quick-card">

          <span class="quick-label">
            BMI
          </span>

          <strong id="current-bmi">
            31.2
          </strong>

          <span
            class="quick-text"
            id="bmi-status"
          >
            Adipositas Grad I
          </span>

        </article>



        <!-- WASSER -->