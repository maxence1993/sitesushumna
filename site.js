/* =====================================================================
   SUSHUMNA – fonctionnement du site
   (Vous n'avez normalement pas besoin de modifier ce fichier.
   Les textes, prix et planning sont dans le dossier « mes-contenus ».)
   ===================================================================== */
(function () {
  "use strict";

  var TELEPHONE = "07 50 46 01 10";
  var WHATSAPP = "33750460110";
  var JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
  var MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

  var tarifs = window.TARIFS || [];
  var formules = window.FORMULES || [];
  var massages = window.MASSAGES || [];

  function $(sel, racine) { return (racine || document).querySelector(sel); }
  function $$(sel, racine) { return Array.prototype.slice.call((racine || document).querySelectorAll(sel)); }
  function echapper(t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icone(nom) { return '<svg class="ic" aria-hidden="true"><use href="images/icones.svg#' + nom + '"/></svg>'; }
  function identifiant(nom) {
    return String(nom).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function prix(n) { return n + " €"; }
  function lienWhatsapp(texte) { return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texte); }

  /* ---------- Menu sur téléphone ---------- */
  var boutonMenu = $(".menu-bouton");
  var menu = $("#menu");
  if (boutonMenu && menu) {
    boutonMenu.addEventListener("click", function () {
      var ouvert = menu.classList.toggle("ouvert");
      boutonMenu.setAttribute("aria-expanded", ouvert ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("ouvert")) {
        menu.classList.remove("ouvert");
        boutonMenu.setAttribute("aria-expanded", "false");
        boutonMenu.focus();
      }
    });
  }

  /* ---------- Photos : image de remplacement tant qu'il n'y a pas de photo ---------- */
  function surveillerPhotos(racine) {
    $$(".photo img", racine).forEach(function (img) {
      var cadre = img.parentNode;
      cadre.setAttribute("data-fichier", (img.getAttribute("src") || "").replace(/^.*\//, "photos/"));
      function absente() { cadre.classList.add("photo--absente"); }
      if (img.complete && img.naturalWidth === 0) absente();
      img.addEventListener("error", absente);
      img.addEventListener("load", function () { cadre.classList.remove("photo--absente"); });
    });
  }

  /* ---------- Textes calculés à partir des tarifs ---------- */
  function texteDuree() {
    if (!tarifs.length) return "";
    if (tarifs.length === 1) return tarifs[0].duree;
    return "De " + tarifs[0].duree + " à " + tarifs[tarifs.length - 1].duree;
  }
  function prixMin() {
    return tarifs.reduce(function (min, t) { return Math.min(min, t.prix); }, Infinity);
  }
  $$("[data-prix-min]").forEach(function (el) { if (tarifs.length) el.textContent = prix(prixMin()); });
  $$("[data-durees]").forEach(function (el) { el.textContent = texteDuree().toLowerCase(); });

  /* ---------- Cartes des massages (page d'accueil) ---------- */
  var resume = $("#resume-massages");
  if (resume) {
    resume.innerHTML = massages.map(function (m) {
      return '<article class="carte">' +
        '<div class="carte__photo photo"><img src="photos/' + echapper(m.photo) + '" alt="" loading="lazy"></div>' +
        '<div class="carte__corps"><h3>' + echapper(m.nom) + '</h3>' +
        '<p class="carte__accroche">' + echapper(m.accroche) + '</p>' +
        '<a class="carte__lien" href="massages.html#' + identifiant(m.nom) + '">Découvrir ce massage<span class="cache"> : ' + echapper(m.nom) + '</span> →</a></div>' +
        '</article>';
    }).join("");
  }

  /* ---------- Page « Mes massages » ---------- */
  var sommaire = $("#sommaire-massages");
  if (sommaire) {
    sommaire.innerHTML = massages.map(function (m) {
      return '<li><a href="#' + identifiant(m.nom) + '">' + echapper(m.nom) + '</a></li>';
    }).join("");
  }
  var liste = $("#liste-massages");
  if (liste) {
    liste.innerHTML = massages.map(function (m) {
      var apporte = (m.apporte || []).map(function (a) { return "<li>" + echapper(a) + "</li>"; }).join("");
      return '<article class="massage" id="' + identifiant(m.nom) + '">' +
        '<div class="massage__photo photo"><img src="photos/' + echapper(m.photo) + '" alt="Photo : ' + echapper(m.nom) + '" loading="lazy"></div>' +
        '<div class="massage__texte">' +
          '<h2>' + echapper(m.nom) + '</h2>' +
          '<p class="massage__accroche">' + echapper(m.accroche) + '</p>' +
          '<ul class="infos">' +
            '<li>' + icone("horloge") + texteDuree() + '</li>' +
            '<li>' + icone("euro") + 'À partir de ' + prix(prixMin()) + '</li>' +
            '<li>' + icone("lieu") + '4 cours Victor Hugo, Orléans</li>' +
          '</ul>' +
          '<h3>En quoi ça consiste ?</h3><p>' + echapper(m.consiste) + '</p>' +
          '<h3>Pour qui ?</h3><p>' + echapper(m.pourQui) + '</p>' +
          (apporte ? '<h3>Ce qu\'il peut vous apporter</h3><ul class="liste-check">' + apporte + '</ul>' : '') +
          (m.bonASavoir ? '<p class="bon-a-savoir"><strong>Bon à savoir :</strong> ' + echapper(m.bonASavoir) + '</p>' : '') +
          '<p><a class="bouton bouton--or" href="contact.html?massage=' + encodeURIComponent(m.nom) + '#rendez-vous">' + icone("calendrier") + 'Réserver ce massage</a></p>' +
        '</div></article>';
    }).join("");
  }

  /* ---------- Page « Tarifs » ---------- */
  var cartesPrix = $("#cartes-prix");
  if (cartesPrix) {
    var cartesFormules = $("#cartes-formules");   // page Tarifs : les formules ont leur propre rangée
    function carteFormule(f) {
      return '<div class="prix-carte prix-carte--forfait">' +
        (f.avantage ? '<span class="etiquette">' + echapper(f.avantage) + '</span>' : '') +
        '<div class="prix-carte__duree">' + echapper(f.nom) + '</div>' +
        '<div class="prix-carte__prix">' + prix(f.prix) + '</div><div>' + echapper(f.detail) + '</div>' +
        (f.reglement ? '<p class="prix-carte__reglement"><strong>' + echapper(f.reglement) + '</strong></p>' : '') + '</div>';
    }
    cartesPrix.innerHTML = tarifs.map(function (t) {
      return '<div class="prix-carte"><div class="prix-carte__duree">' + echapper(t.duree) + '</div>' +
        '<div class="prix-carte__prix">' + prix(t.prix) + '</div><div>Tous les massages</div></div>';
    }).join("") + (cartesFormules ? "" : formules.map(carteFormule).join(""));
    if (cartesFormules) cartesFormules.innerHTML = formules.map(carteFormule).join("");
  }
  var tableau = $("#tableau-tarifs");
  if (tableau) {
    var entete = "<tr><th scope=\"col\">Massage</th>" + tarifs.map(function (t) {
      return '<th scope="col">' + echapper(t.duree) + "</th>";
    }).join("") + "</tr>";
    var lignes = massages.map(function (m) {
      return '<tr><th scope="row"><a href="massages.html#' + identifiant(m.nom) + '">' + echapper(m.nom) + "</a></th>" +
        tarifs.map(function (t) { return '<td class="prix">' + prix(t.prix) + "</td>"; }).join("") + "</tr>";
    }).join("");
    tableau.querySelector("thead").innerHTML = entete;
    tableau.querySelector("tbody").innerHTML = lignes;
  }
  var tableauFormules = $("#tableau-formules");
  if (tableauFormules) {
    tableauFormules.querySelector("tbody").innerHTML = formules.map(function (f) {
      return '<tr><th scope="row">' + echapper(f.nom) + "</th><td>" + echapper(f.detail) + (f.reglement ? "<br><strong>" + echapper(f.reglement) + "</strong>" : "") + '</td><td class="prix">' + prix(f.prix) + "</td></tr>";
    }).join("");
  }

  /* ---------- Page « Disponibilités » : réservation en ligne ---------- */
  function lireDate(texte) {
    var m = String(texte || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
    if (!m) return null;
    var annee = +m[3] < 100 ? 2000 + +m[3] : +m[3];
    return new Date(annee, +m[2] - 1, +m[1]);
  }
  function cleJour(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function memeJour(a, b) { return cleJour(a) === cleJour(b); }
  function jourMois(d) { return (d.getDate() === 1 ? "1er" : d.getDate()) + " " + MOIS[d.getMonth()]; }
  function nomJour(d) { return JOURS[(d.getDay() + 6) % 7]; }
  // « 13h45 » → 825 minutes après minuit
  function lireHeure(texte) {
    var m = String(texte || "").trim().match(/^(\d{1,2})\s*[h:]\s*(\d{0,2})$/i);
    if (!m) return null;
    return +m[1] * 60 + (m[2] ? +(m[2].length === 1 ? m[2] + "0" : m[2]) : 0);
  }
  function ecrireHeure(min) { var h = Math.floor(min / 60), m = min % 60; return h + "h" + (m < 10 ? "0" : "") + m; }
  // « 1h30 », « 1h », « 90 » → minutes
  function lireDuree(texte) {
    texte = String(texte || "").trim().toLowerCase();
    var m = texte.match(/^(\d+)\s*h\s*(\d{0,2})/);
    if (m) return +m[1] * 60 + (m[2] ? +m[2] : 0);
    m = texte.match(/^(\d+)\s*(min)?$/);
    return m ? +m[1] : null;
  }
  // « 12h30-18h00, 21h00 » → [{debut, fin}] ; fin = null pour un horaire de début seul
  function lirePlages(texte) {
    texte = String(texte || "").trim();
    if (!texte || /^ferm/i.test(texte)) return [];
    return texte.split(/[,;]+/).map(function (morceau) {
      var parts = morceau.split(/\s*(?:-|–|à)\s*/);
      var debut = lireHeure(parts[0]);
      if (debut == null) return null;
      var fin = parts.length > 1 ? lireHeure(parts[1]) : null;
      return { debut: debut, fin: fin };
    }).filter(Boolean);
  }
  function lireListe(nom) { var v = window[nom]; return Array.isArray(v) ? v : []; }

  var choisirCreneau = null, oublierCreneau = null;   // renseignés par le formulaire (page « Prendre rendez-vous »)
  var zonePlanning = $("#planning");
  if (zonePlanning) {
    var pause = +window.PAUSE_APRES_MASSAGE || 0;
    var pas = +window.PRECISION_DES_CRENEAUX || 15;
    var delai = (window.DELAI_MINIMUM == null ? 2 : +window.DELAI_MINIMUM) * 60;
    var nbSemaines = +window.NOMBRE_DE_SEMAINES || 2;
    var habituels = window.HORAIRES_HABITUELS || {};

    var particuliers = {};
    lireListe("JOURS_PARTICULIERS").forEach(function (ligne) {
      var m = String(ligne).match(/^\s*([\d\/.\-]+)\s*:?\s*(.*)$/);
      var d = m && lireDate(m[1]);
      if (d) particuliers[cleJour(d)] = m[2];
    });
    var reserves = {};
    lireListe("MASSAGES_RESERVES").forEach(function (ligne) {
      var m = String(ligne).trim().split(/\s+/);
      var d = lireDate(m[0]), debut = lireHeure(m[1]), duree = lireDuree(m.slice(2).join(""));
      if (!d || debut == null || !duree) return;
      (reserves[cleJour(d)] = reserves[cleJour(d)] || []).push({ debut: debut, fin: debut + duree });
    });

    // tous les horaires de début possibles pour un jour et une durée donnés
    function creneauxDuJour(date, duree, maintenant) {
      var cle = cleJour(date);
      var plages = lirePlages(cle in particuliers ? particuliers[cle] : habituels[nomJour(date)]);
      var pris = reserves[cle] || [];
      var minimum = -Infinity;
      if (memeJour(date, maintenant)) minimum = maintenant.getHours() * 60 + maintenant.getMinutes() + delai;
      else if (date < maintenant) return null;
      else {
        var ecart = (date - new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate())) / 60000;
        minimum = maintenant.getHours() * 60 + maintenant.getMinutes() + delai - ecart;
      }
      var resultat = [];
      plages.forEach(function (p) {
        var fin = p.fin == null ? p.debut : p.fin - duree;   // dernier début possible
        for (var t = p.debut; t <= fin; t += pas) {
          if (t < minimum) continue;
          var libre = pris.every(function (r) { return t + duree + pause <= r.debut || t >= r.fin + pause; });
          if (libre && resultat.indexOf(t) < 0) resultat.push(t);
        }
      });
      return { ouvert: plages.length > 0, debuts: resultat.sort(function (a, b) { return a - b; }) };
    }

    var zoneDurees = $("#choix-duree");
    var params = new URLSearchParams(location.search);
    var dureeChoisie = 0;   // durée de départ : minutes (« 60 ») ou libellé (« 1h ») venant de l'adresse
    (function () {
      var demande = params.get("duree") || "";
      if (+demande) dureeChoisie = +demande;
      else tarifs.forEach(function (t) { if (t.duree === demande) dureeChoisie = t.minutes || 0; });
    })();

    zoneDurees.innerHTML = tarifs.map(function (t) {
      var min = t.minutes || lireDuree(t.duree.replace(/heures?/, "h"));
      return '<button type="button" class="duree" data-minutes="' + min + '" aria-pressed="false">' +
        '<span class="duree__temps">' + echapper(t.duree) + '</span><span class="duree__prix">' + prix(t.prix) + '</span></button>';
    }).join("");

    function afficher(duree) {
      $$(".duree", zoneDurees).forEach(function (b) { b.setAttribute("aria-pressed", +b.getAttribute("data-minutes") === duree ? "true" : "false"); });
      var etape2 = $("#etape-creneau");
      if (!duree) { etape2.hidden = true; return; }
      etape2.hidden = false;
      var tarif = tarifs.filter(function (t) { return (t.minutes || 0) === duree; })[0];
      var libelle = tarif ? tarif.duree : ecrireHeure(duree).replace(/h00$/, "h");
      $("#duree-rappel").textContent = libelle + (tarif ? " (" + prix(tarif.prix) + ")" : "");

      var maintenant = new Date();
      var lundi = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
      lundi.setDate(lundi.getDate() - ((lundi.getDay() + 6) % 7));
      var html = "";
      for (var s = 0; s < nbSemaines; s++) {
        var debutSem = new Date(lundi); debutSem.setDate(lundi.getDate() + 7 * s);
        var finSem = new Date(debutSem); finSem.setDate(debutSem.getDate() + 6);
        var total = 0, lignes = "";
        for (var j = 0; j < 7; j++) {
          var date = new Date(debutSem); date.setDate(debutSem.getDate() + j);
          var c = creneauxDuJour(date, duree, maintenant);
          if (c === null) continue; // jour passé
          var titre = '<h3 class="jour-ligne__nom">' + nomJour(date).charAt(0).toUpperCase() + nomJour(date).slice(1) +
            ' <span>' + jourMois(date) + (memeJour(date, maintenant) ? " · aujourd'hui" : "") + '</span></h3>';
          var contenu;
          if (!c.ouvert) contenu = '<p class="jour-ligne__info">Fermé</p>';
          else if (!c.debuts.length) contenu = '<p class="jour-ligne__info">Complet pour cette durée</p>';
          else {
            total += c.debuts.length;
            contenu = '<ul class="heures">' + c.debuts.map(function (t) {
              var quand = nomJour(date) + " " + jourMois(date) + " à " + ecrireHeure(t);
              return '<li><a class="heure" data-quand="' + echapper(quand) + '" data-duree="' + echapper(libelle) + '" href="contact.html?creneau=' + encodeURIComponent(quand + " (" + libelle + ")") +
                '&duree=' + encodeURIComponent(libelle) + '#formulaire" aria-label="Réserver le ' + quand + ', fin à ' + ecrireHeure(t + duree) + '">' +
                ecrireHeure(t) + '</a></li>';
            }).join("") + '</ul>';
          }
          lignes += '<div class="jour-ligne' + (!c.ouvert || !c.debuts.length ? " jour-ligne--vide" : "") + '">' + titre + contenu + '</div>';
        }
        var badge = s === 0 ? "Cette semaine" : s === 1 ? "Semaine prochaine" : "";
        html += '<section class="semaine"><div class="semaine__titre"><h2>Semaine du ' + jourMois(debutSem) + ' au ' + jourMois(finSem) + '</h2>' +
          (badge ? '<span class="semaine__badge">' + badge + '</span>' : '') + '</div>' +
          '<p class="semaine__resume">' + (total ? "<strong>" + total + " horaire" + (total > 1 ? "s" : "") + " possible" + (total > 1 ? "s" : "") + "</strong> pour un massage de " + libelle.toLowerCase() + "." :
            "Plus de place cette semaine-là pour cette durée. Essayez une durée plus courte, ou appelez-moi : un créneau se libère parfois.") + '</p>' +
          (lignes || '<p class="jour-ligne__info">Cette semaine est terminée.</p>') + '</section>';
      }
      zonePlanning.innerHTML = html;
    }

    zonePlanning.addEventListener("click", function (e) {
      var lien = e.target.closest ? e.target.closest("a.heure") : null;
      if (!lien || !choisirCreneau) return;        // sur la page Disponibilités : le lien mène au formulaire
      e.preventDefault();
      $$("a.heure.heure--choisie", zonePlanning).forEach(function (a) { a.classList.remove("heure--choisie"); });
      lien.classList.add("heure--choisie");
      choisirCreneau(lien.getAttribute("data-quand"), lien.getAttribute("data-duree"));
    });
    zoneDurees.addEventListener("click", function (e) {
      var bouton = e.target.closest(".duree");
      if (!bouton) return;
      dureeChoisie = +bouton.getAttribute("data-minutes");
      if (oublierCreneau) oublierCreneau(dureeChoisie);
      afficher(dureeChoisie);
      try { history.replaceState(null, "", "?duree=" + dureeChoisie); } catch (err) { /* rien */ }
      $("#etape-creneau").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    afficher(dureeChoisie);

    var maj = $("#planning-maj");
    if (maj && window.PLANNING_MIS_A_JOUR_LE) {
      var dm = lireDate(window.PLANNING_MIS_A_JOUR_LE);
      maj.textContent = "Planning mis à jour le " + (dm ? jourMois(dm) + " " + dm.getFullYear() : window.PLANNING_MIS_A_JOUR_LE) + ".";
    }
  }

  /* ---------- Avis clients (page d'accueil) ---------- */
  var sectionAvis = $("#avis");
  if (sectionAvis) {
    var avis = window.AVIS || [];
    var lienVoir = window.LIEN_VOIR_AVIS || "";
    var lienDeposer = window.LIEN_DEPOSER_AVIS || "";
    if (avis.length || lienVoir || lienDeposer) {
      sectionAvis.hidden = false;
      if (!avis.length) $("#avis-note").textContent = "Découvrez ce que mes clients pensent de leurs massages, directement sur Google.";
      $("#liste-avis").innerHTML = avis.map(function (a) {
        var n = Math.max(0, Math.min(5, a.etoiles == null ? 5 : a.etoiles));
        return '<figure class="avis"><p class="avis__etoiles" role="img" aria-label="' + n + ' étoiles sur 5">' +
          "★★★★★".slice(0, n) + '</p><blockquote class="replie">« ' + echapper(a.texte) + ' »</blockquote>' +
          '<button type="button" class="avis__suite" aria-expanded="false" hidden>Lire la suite</button><span class="avis__espace"></span>' +
          '<figcaption>' + echapper(a.nom) + ' · avis Google</figcaption></figure>';
      }).join("");
      // « Lire la suite » seulement pour les avis trop longs
      $$("#liste-avis .avis").forEach(function (carte) {
        var texte = $("blockquote", carte), bouton = $(".avis__suite", carte);
        if (texte.scrollHeight > texte.clientHeight + 4) {
          bouton.hidden = false;
          bouton.addEventListener("click", function () {
            var ouvert = texte.classList.toggle("replie") === false;
            bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
            bouton.textContent = ouvert ? "Réduire" : "Lire la suite";
          });
        } else {
          texte.classList.remove("replie");
        }
      });
      $("#liens-avis").innerHTML =
        (lienVoir ? '<a class="bouton" href="' + echapper(lienVoir) + '" target="_blank" rel="noopener">Voir tous les avis Google</a>' : "") +
        (lienDeposer ? '<a class="bouton bouton--or" href="' + echapper(lienDeposer) + '" target="_blank" rel="noopener">Laisser un avis</a>' : "");
    }
  }

  /* ---------- Page « Contact » : formulaire ---------- */
  var formulaire = $("#formulaire-rdv");
  if (formulaire) {
    var choixMassage = $("#massage", formulaire);
    massages.forEach(function (m) {
      var opt = document.createElement("option"); opt.value = m.nom; opt.textContent = m.nom;
      choixMassage.appendChild(opt);
    });
    var choixDuree = $("#duree", formulaire);
    tarifs.forEach(function (t) {
      var opt = document.createElement("option"); opt.value = t.duree + " – " + prix(t.prix); opt.textContent = t.duree + " (" + prix(t.prix) + ")";
      choixDuree.appendChild(opt);
    });
    formules.forEach(function (f) {
      var opt = document.createElement("option"); opt.value = f.nom + " – " + prix(f.prix); opt.textContent = f.nom + " (" + prix(f.prix) + ")";
      choixDuree.appendChild(opt);
    });

    var creneauAffiche = $("#creneau-choisi");
    function afficherCreneau(quand) {
      $("#creneau", formulaire).value = quand;
      if (creneauAffiche) {
        $("[data-creneau-texte]", creneauAffiche).textContent = quand;
        $("[data-creneau-whatsapp]", creneauAffiche).href = lienWhatsapp("Bonjour Maxence, je souhaiterais réserver le créneau du " + quand + ".");
        creneauAffiche.classList.add("visible");
      }
    }
    function choisirDuree(libelle) {
      Array.prototype.forEach.call(choixDuree.options, function (o) {
        if (o.value.indexOf(libelle + " –") === 0) choixDuree.value = o.value;
      });
      if (typeof majNoteFormule === "function") majNoteFormule();
    }
    // clic sur un horaire du planning, sur cette même page
    choisirCreneau = function (quand, libelle) {
      afficherCreneau(quand + " (" + libelle + ")");
      choisirDuree(libelle);
      var cible = $("#formulaire");
      if (cible) cible.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    // le client change la durée : l'ancien créneau n'a plus de sens
    oublierCreneau = function (minutes) {
      var tarif = tarifs.filter(function (t) { return (t.minutes || 0) === minutes; })[0];
      if (tarif) choisirDuree(tarif.duree);
      $("#creneau", formulaire).value = "";
      if (creneauAffiche) creneauAffiche.classList.remove("visible");
    };

    // une formule est choisie : on précise comment se prennent les rendez-vous
    var noteFormule = $("#note-formule");
    function majNoteFormule() {
      if (noteFormule) noteFormule.hidden = choixDuree.value.indexOf("Formule") !== 0;
    }
    choixDuree.addEventListener("change", majNoteFormule);

    var params = new URLSearchParams(location.search);
    if (params.get("cadeau")) {
      var zoneMessage = $("#message", formulaire);
      if (zoneMessage && !zoneMessage.value) zoneMessage.value = "Bonjour, je souhaiterais offrir une carte cadeau.\n\nMassage ou durée souhaités : ";
    }
    if (params.get("massage")) choixMassage.value = params.get("massage");
    if (params.get("duree")) choisirDuree(params.get("duree"));
    if (params.get("creneau")) afficherCreneau(params.get("creneau"));
    majNoteFormule();
    // ---- vérification et envoi du formulaire (le client reste sur le site) ----
    var boiteErreur = $("#form-erreur", formulaire);
    var boutonEnvoi = $("button[type=submit]", formulaire);
    var boutonWhatsapp = $("#envoi-whatsapp", formulaire);
    var ADRESSE_ENVOI = "https://formsubmit.co/ajax/maxence.vaz@outlook.fr";
    var DELAI_MESSAGE = 5000;   // après 5 secondes, on propose une solution de secours
    var DELAI_MAXIMUM = 30000;  // on arrête d'attendre la réponse après 30 secondes

    function montrerInfo(html) {
      boiteErreur.innerHTML = html;
      boiteErreur.hidden = false;
      boiteErreur.classList.add("form-erreur--info");
    }
    function montrerErreur(html, champ) {
      boiteErreur.innerHTML = html;
      boiteErreur.classList.remove("form-erreur--info");
      boiteErreur.hidden = false;
      boiteErreur.scrollIntoView({ behavior: "smooth", block: "center" });
      if (champ) champ.focus({ preventScroll: true });
    }
    function chiffres(texte) { return String(texte).replace(/\D/g, ""); }

    // vérifie les champs obligatoires ; renvoie true si tout est bon
    function verifier() {
      boiteErreur.hidden = true;
      $$(".champ--erreur", formulaire).forEach(function (c) { c.classList.remove("champ--erreur"); });
      var prenom = $("#prenom", formulaire), nom = $("#nom", formulaire), tel = $("#telephone", formulaire);
      var accord = $("input[name=Accord]", formulaire), mail = $("#email", formulaire);
      var manques = [], premier = null;
      function probleme(champ, texte) {
        manques.push(texte);
        if (champ.closest(".champ")) champ.closest(".champ").classList.add("champ--erreur");
        if (!premier) premier = champ;
      }
      if (!prenom.value.trim()) probleme(prenom, "votre <strong>prénom</strong>");
      if (!nom.value.trim()) probleme(nom, "votre <strong>nom</strong>");
      var nbChiffres = chiffres(tel.value).length;
      if (!tel.value.trim()) probleme(tel, "votre <strong>numéro de téléphone</strong>");
      else if (nbChiffres < 9 || nbChiffres > 15) probleme(tel, "un <strong>numéro de téléphone valide</strong> (par exemple 06 12 34 56 78)");
      if (!accord.checked) probleme(accord, "la <strong>case d'accord</strong> en bas du formulaire");
      if (mail.value.trim() && !/^\S+@\S+\.\S+$/.test(mail.value.trim())) probleme(mail, "une <strong>adresse e-mail valide</strong> (ou laissez ce champ vide)");
      if (manques.length) {
        montrerErreur("<strong>Il manque encore :</strong> " + manques.join(", ") + ".", premier);
        return false;
      }
      return true;
    }

    // la demande écrite en texte simple (pour WhatsApp et l'e-mail)
    function texteDemande() {
      var v = function (id) { return $(id, formulaire).value.trim(); };
      var lignes = ["Bonjour Maxence, je souhaiterais prendre rendez-vous.", "",
        "Prénom : " + v("#prenom"), "Nom : " + v("#nom"), "Téléphone : " + v("#telephone")];
      if (v("#email")) lignes.push("E-mail : " + v("#email"));
      lignes.push("Massage : " + v("#massage"), "Durée : " + v("#duree"));
      if (v("#creneau")) lignes.push("Créneau souhaité : " + v("#creneau"));
      if (v("#message")) lignes.push("", "Message : " + v("#message"));
      return lignes.join("\n");
    }
    function liensSecours() {
      var texte = texteDemande();
      return '<a href="' + lienWhatsapp(texte) + '" target="_blank" rel="noopener">envoyer votre demande par WhatsApp</a>, ' +
        '<a href="mailto:maxence.vaz@outlook.fr?subject=' + encodeURIComponent("Demande de rendez-vous") + "&body=" + encodeURIComponent(texte) + '">par e-mail</a>' +
        ' ou appeler le <a href="tel:+33750460110">07 50 46 01 10</a>';
    }

    // bouton « envoyer par WhatsApp » : ne dépend d'aucun service extérieur
    if (boutonWhatsapp) {
      boutonWhatsapp.addEventListener("click", function () {
        if (!verifier()) return;
        window.open(lienWhatsapp(texteDemande()), "_blank", "noopener");
      });
    }

    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!verifier()) return;
      if ($("input[name=_honey]", formulaire).value) return; // champ piège rempli : c'est un robot

      var prenom = $("#prenom", formulaire).value.trim(), nom = $("#nom", formulaire).value.trim();
      var morceaux = [prenom + " " + nom, $("#telephone", formulaire).value.trim(), $("#creneau", formulaire).value.trim()].filter(Boolean);
      var objet = $("input[name=_subject]", formulaire);
      if (objet) objet.value = "Demande de rendez-vous – " + morceaux.join(" – ");

      var texteBouton = boutonEnvoi.textContent;
      boutonEnvoi.disabled = true;
      boutonEnvoi.textContent = "Envoi en cours…";
      montrerInfo("Envoi en cours, cela peut prendre quelques secondes. Merci de ne pas fermer la page.");

      var donnees = new FormData(formulaire);
      donnees.delete("_next");
      donnees.delete("_honey");

      var termine = false;
      function echec() {
        if (termine) return;
        termine = true;
        clearTimeout(minuteurMessage); clearTimeout(minuteur);
        boutonEnvoi.disabled = false;
        boutonEnvoi.textContent = texteBouton;
        montrerErreur("<strong>Je n'ai pas pu confirmer l'envoi de votre demande.</strong> Pour être sûr que je la reçoive, vous pouvez " + liensSecours() + ".");
      }
      function reussite() {
        if (termine) return;
        termine = true;
        clearTimeout(minuteurMessage); clearTimeout(minuteur);
        window.location.href = "merci.html";
      }
      // au bout de 5 secondes : on propose une solution de secours, sans interrompre l'envoi
      var minuteurMessage = setTimeout(function () {
        if (termine) return;
        montrerInfo("<strong>L'envoi prend plus de temps que prévu.</strong> Vous pouvez patienter encore un instant, ou, pour être sûr que je reçoive votre demande, " + liensSecours() + ".");
      }, DELAI_MESSAGE);
      var controle = window.AbortController ? new AbortController() : null;
      var minuteur = setTimeout(function () { if (controle) controle.abort(); echec(); }, DELAI_MAXIMUM);
      fetch(ADRESSE_ENVOI, { method: "POST", headers: { Accept: "application/json" }, body: donnees, signal: controle ? controle.signal : undefined })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, json: j }; }); })
        .then(function (res) {
          if (res.ok && (res.json.success === true || res.json.success === "true")) reussite(); else echec();
        })
        .catch(echec);
    });

    var suite = $("input[name=_next]", formulaire);
    if (suite) suite.value = new URL("merci.html", location.href).href;
  }

  $$("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  surveillerPhotos(document);
})();
