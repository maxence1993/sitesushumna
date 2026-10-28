/* =====================================================================
   RÉSERVATION EN LIGNE (relié à mon Google Agenda)
   ---------------------------------------------------------------------
   Les deux lignes ci-dessous sont les seules à remplir.
   - API_URL : l'adresse de mon API « agenda-api » sur Cloudflare,
     par exemple "https://agenda-api.mon-sous-domaine.workers.dev"
   - TURNSTILE_SITE_KEY : la « clé de site » Turnstile (elle est
     publique, ce n'est PAS la clé secrète).

   Tant que API_URL est vide (""), le site fonctionne comme avant :
   planning de « mes-contenus/planning.js » et demande par formulaire.

   ⚠️ Ne mettez JAMAIS ici un identifiant Google ni une clé secrète :
   ce fichier est visible par tout le monde.
   ===================================================================== */
var API_URL = "https://agenda-api.maxence-vaz1993.workers.dev";
var TURNSTILE_SITE_KEY = "0x4AAAAAAFpUgrZfgnT3DfJD";


/* ---------- Fonctionnement (pas besoin de modifier la suite) ---------- */
(function () {
  "use strict";
  if (!API_URL) return;

  var base = String(API_URL).replace(/\/+$/, "");
  var DELAI_MAXIMUM = 20000;   // on arrête d'attendre l'API après 20 secondes

  // appel à l'API → promesse de { statut, donnees } (statut 0 = réseau injoignable)
  function appel(chemin, options) {
    options = options || {};
    var controle = window.AbortController ? new AbortController() : null;
    var minuteur = setTimeout(function () { if (controle) controle.abort(); }, DELAI_MAXIMUM);
    return fetch(base + chemin, {
      method: options.method || "GET",
      headers: options.corps ? { "Content-Type": "application/json" } : {},
      body: options.corps ? JSON.stringify(options.corps) : undefined,
      signal: controle ? controle.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) { return { statut: r.status, donnees: j }; });
    }).catch(function () {
      return { statut: 0, donnees: {} };
    }).then(function (res) {
      clearTimeout(minuteur);
      return res;
    });
  }

  // chargement du script Turnstile, une seule fois
  var turnstilePret = null;
  function chargerTurnstile() {
    if (turnstilePret) return turnstilePret;
    turnstilePret = new Promise(function (ok, ko) {
      if (window.turnstile) return ok(window.turnstile);
      var s = document.createElement("script");
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.onload = function () { ok(window.turnstile); };
      s.onerror = function () { turnstilePret = null; ko(new Error("Turnstile")); };
      document.head.appendChild(s);
    });
    return turnstilePret;
  }

  window.ReservationEnLigne = {
    /* créneaux libres : date "2026-11-03", nombre de jours (14 max), durée en minutes */
    disponibilites: function (date, jours, minutes) {
      return appel("/availability?date=" + encodeURIComponent(date) + "&days=" + jours + "&duration=" + minutes);
    },

    /* réservation : { firstName, lastName, phone, email, message, massage, formula, start, duration, turnstileToken } */
    reserver: function (donnees) {
      return appel("/bookings", { method: "POST", corps: donnees });
    },

    /* affiche la case anti-robot dans `conteneur` → promesse de { jeton(), reinitialiser() } */
    antiRobot: function (conteneur) {
      return chargerTurnstile().then(function (turnstile) {
        var jeton = "";
        var id = turnstile.render(conteneur, {
          sitekey: TURNSTILE_SITE_KEY,
          language: "fr",
          callback: function (t) { jeton = t; },
          "expired-callback": function () { jeton = ""; },
          "error-callback": function () { jeton = ""; }
        });
        return {
          jeton: function () { return jeton; },
          reinitialiser: function () { jeton = ""; turnstile.reset(id); }
        };
      });
    }
  };
})();
