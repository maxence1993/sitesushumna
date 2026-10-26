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
    cartesPrix.innerHTML = tarifs.map(function (t) {
      return '<div class="prix-carte"><div class="prix-carte__duree">' + echapper(t.duree) + '</div>' +
        '<div class="prix-carte__prix">' + prix(t.prix) + '</div><div>Tous les massages</div></div>';
    }).join("") + formules.map(function (f) {
      return '<div class="prix-carte prix-carte--forfait">' +
        (f.avantage ? '<span class="etiquette">' + echapper(f.avantage) + '</span>' : '') +
        '<div class="prix-carte__duree">' + echapper(f.nom) + '</div>' +
        '<div class="prix-carte__prix">' + prix(f.prix) + '</div><div>' + echapper(f.detail) + '</div></div>';
    }).join("");
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
      return '<tr><th scope="row">' + echapper(f.nom) + "</th><td>" + echapper(f.detail) + '</td><td class="prix">' + prix(f.prix) + "</td></tr>";
    }).join("");
  }

  /* ---------- Page « Disponibilités » ---------- */
  function lireDate(texte) {
    var m = String(texte || "").trim().match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})$/);
    if (!m) return null;
    var annee = +m[3] < 100 ? 2000 + +m[3] : +m[3];
    var d = new Date(annee, +m[2] - 1, +m[1]);
    // on se cale toujours sur le lundi de la semaine
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return d;
  }
  function memeJour(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
  function jourMois(d) { return (d.getDate() === 1 ? "1er" : d.getDate()) + " " + MOIS[d.getMonth()]; }
  function lireCreneaux(texte) {
    texte = String(texte || "").trim();
    if (!texte || /^ferm/i.test(texte)) return null;
    return texte.split(/[,;\n]+/).map(function (morceau) {
      var m = morceau.trim().match(/^(\d{1,2})\s*[h:]\s*(\d{0,2})\s*(.*)$/i);
      if (!m) return null;
      var minutes = m[2] ? (m[2].length === 1 ? m[2] + "0" : m[2]) : "00";
      var libre = /libre|dispo/i.test(m[3]);
      return { heure: +m[1] + "h" + minutes, h: +m[1], min: +minutes, libre: libre };
    }).filter(Boolean);
  }

  var zonePlanning = $("#planning");
  if (zonePlanning) {
    var maintenant = new Date();
    var aujourdhui = new Date(maintenant.getFullYear(), maintenant.getMonth(), maintenant.getDate());
    var lundiCourant = new Date(aujourdhui); lundiCourant.setDate(aujourdhui.getDate() - ((aujourdhui.getDay() + 6) % 7));
    var lundiSuivant = new Date(lundiCourant); lundiSuivant.setDate(lundiCourant.getDate() + 7);

    var semaines = (window.PLANNING || []).map(function (s) {
      return { debut: lireDate(s.semaine), donnees: s };
    }).filter(function (s) {
      if (!s.debut) return false;
      var fin = new Date(s.debut); fin.setDate(fin.getDate() + 7);
      return fin > aujourdhui;
    }).sort(function (a, b) { return a.debut - b.debut; }).slice(0, 2);

    if (!semaines.length) {
      zonePlanning.innerHTML = '<div class="encadre encadre--info"><h2>Le planning est en cours de mise à jour</h2>' +
        '<p>Appelez-moi au <a href="tel:+33750460110">' + TELEPHONE + '</a> ou écrivez-moi sur <a href="' + lienWhatsapp("Bonjour Maxence, je souhaiterais prendre rendez-vous.") + '">WhatsApp</a> : je vous donne mes disponibilités avec plaisir.</p></div>';
    } else {
      zonePlanning.innerHTML = semaines.map(function (s) {
        var fin = new Date(s.debut); fin.setDate(fin.getDate() + 6);
        var badge = memeJour(s.debut, lundiCourant) ? "Cette semaine" : memeJour(s.debut, lundiSuivant) ? "Semaine prochaine" : "";
        var nbLibres = 0;
        var jours = JOURS.map(function (nomJour, i) {
          var date = new Date(s.debut); date.setDate(s.debut.getDate() + i);
          var creneaux = lireCreneaux(s.donnees[nomJour]);
          var estAujourdhui = memeJour(date, aujourdhui);
          var contenu;
          if (!creneaux || !creneaux.length) {
            contenu = '<p class="jour__ferme">Fermé</p>';
          } else {
            contenu = '<ul class="creneaux">' + creneaux.map(function (c) {
              var debut = new Date(date); debut.setHours(c.h, c.min);
              var quand = nomJour + " " + jourMois(date) + " à " + c.heure;
              if (debut < maintenant) {
                return '<li><span class="creneau creneau--passe"><span class="creneau__heure">' + c.heure + '</span><span class="creneau__etat">Passé</span></span></li>';
              }
              if (c.libre) {
                nbLibres++;
                return '<li><a class="creneau creneau--libre" href="contact.html?creneau=' + encodeURIComponent(quand) + '#rendez-vous" aria-label="Réserver le ' + quand + ' (libre)">' +
                  '<span class="creneau__heure">' + c.heure + '</span><span class="creneau__etat">' + icone("check") + 'Libre</span></a></li>';
              }
              return '<li><span class="creneau creneau--pris" aria-label="' + quand + ' : déjà pris"><span class="creneau__heure">' + c.heure + '</span><span class="creneau__etat">Pris</span></span></li>';
            }).join("") + "</ul>";
          }
          return '<div class="jour' + (estAujourdhui ? " jour--aujourdhui" : "") + '"><h3>' +
            nomJour.charAt(0).toUpperCase() + nomJour.slice(1) + '<span>' + jourMois(date) + (estAujourdhui ? " · aujourd'hui" : "") + "</span></h3>" + contenu + "</div>";
        }).join("");
        return '<section class="semaine" aria-labelledby="sem-' + s.debut.getTime() + '">' +
          '<div class="semaine__titre"><h2 id="sem-' + s.debut.getTime() + '">Semaine du ' + jourMois(s.debut) + " au " + jourMois(fin) + "</h2>" +
          (badge ? '<span class="semaine__badge">' + badge + "</span>" : "") + "</div>" +
          '<p class="semaine__resume">' + (nbLibres ? "<strong>" + nbLibres + " créneau" + (nbLibres > 1 ? "x" : "") + " libre" + (nbLibres > 1 ? "s" : "") + "</strong> — touchez un créneau vert pour le réserver." : "Plus de créneau libre cette semaine-là. N'hésitez pas à m'appeler : un créneau se libère parfois.") + "</p>" +
          '<div class="jours">' + jours + "</div></section>";
      }).join("");
    }
    var maj = $("#planning-maj");
    if (maj && window.PLANNING_MIS_A_JOUR_LE) {
      var d = String(window.PLANNING_MIS_A_JOUR_LE).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
      maj.textContent = "Planning mis à jour le " + (d ? jourMois(new Date(+d[3], +d[2] - 1, +d[1])) + " " + d[3] : window.PLANNING_MIS_A_JOUR_LE) + ".";
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

    var params = new URLSearchParams(location.search);
    if (params.get("cadeau")) {
      var zoneMessage = $("#message", formulaire);
      if (zoneMessage && !zoneMessage.value) zoneMessage.value = "Bonjour, je souhaiterais offrir une carte cadeau.\n\nMassage ou durée souhaités : ";
    }
    if (params.get("massage")) choixMassage.value = params.get("massage");
    var creneau = params.get("creneau");
    if (creneau) {
      $("#creneau", formulaire).value = creneau;
      var bandeau = $("#creneau-choisi");
      if (bandeau) {
        $("[data-creneau-texte]", bandeau).textContent = creneau;
        $("[data-creneau-whatsapp]", bandeau).href = lienWhatsapp("Bonjour Maxence, je souhaiterais réserver le créneau du " + creneau + ".");
        bandeau.classList.add("visible");
      }
    }
    var suite = $("input[name=_next]", formulaire);
    if (suite) suite.value = new URL("merci.html", location.href).href;
  }

  $$("[data-annee]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  surveillerPhotos(document);
})();
