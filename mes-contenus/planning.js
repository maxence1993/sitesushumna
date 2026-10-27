/* =====================================================================
   MON PLANNING
   ---------------------------------------------------------------------
   Le site calcule tout seul les créneaux libres des 2 prochaines
   semaines, de 15 minutes en 15 minutes, pour la durée choisie
   par le client (1h, 1h30 ou 2h).

   Vous n'avez que 3 choses à tenir à jour :
     1. vos HORAIRES HABITUELS (à changer rarement)
     2. les JOURS PARTICULIERS (vacances, horaires différents un jour précis)
     3. les MASSAGES RÉSERVÉS (à chaque nouveau rendez-vous)

   Règles d'écriture :
   - Une plage d'horaires :            "13h45-17h00"
   - Plusieurs plages le même jour :   "11h00-13h00, 15h00-21h00"
   - Un horaire de début précis seul : "21h00"   (le massage commence
     à 21h, quelle que soit sa durée)
   - Un jour sans massage :            "fermé"
   - Les dates s'écrivent jour/mois/année : 27/10/2026
   ===================================================================== */


/* ---------- 1. MES HORAIRES HABITUELS ----------
   Les heures pendant lesquelles un massage peut avoir lieu.
   Le massage doit être terminé avant la fin de la plage. */
var HORAIRES_HABITUELS = {
  lundi:    "fermé",
  mardi:    "13h45-17h30",
  mercredi: "12h30-18h00, 21h00",
  jeudi:    "fermé",
  vendredi: "11h00-21h00",
  samedi:   "fermé",
  dimanche: "12h00-20h00"
};


/* ---------- 2. LES JOURS PARTICULIERS ----------
   Pour changer les horaires d'un jour précis (vacances, journée
   exceptionnelle). Une ligne par jour, entre guillemets, suivie d'une
   virgule. Exemples (à adapter) :
     "15/12/2026 : fermé",
     "17/12/2026 : 10h00-14h00",
   Les jours qui ne sont pas dans cette liste suivent les horaires
   habituels, jours fériés compris. */
var JOURS_PARTICULIERS = [
  "27/10/2026 : 14h00-21h00",
  "28/10/2026 : 12h30-21h00",
  "01/11/2026 : 14h00-17h00",
];


/* ---------- 3. LES MASSAGES RÉSERVÉS ----------
   À chaque nouveau rendez-vous, ajoutez une ligne :
     "date  heure de début  durée",
   Exemples :
     "27/10/2026 14h00 1h30",
     "30/10/2026 11h00 1h",
   Le site bloque alors ce créneau, plus 15 minutes de pause après.
   Vous pouvez supprimer les lignes des jours passés. */
var MASSAGES_RESERVES = [
  "27/10/2026 14h00 3h",
  "30/10/2026 11h00 1h30",
  "03/11/2026 14h00 1h",
];


/* ---------- 4. RÉGLAGES (à changer rarement) ---------- */
var PAUSE_APRES_MASSAGE = 15;     // minutes bloquées après chaque massage
var PRECISION_DES_CRENEAUX = 15;  // les créneaux commencent toutes les 15 minutes
var DELAI_MINIMUM = 0;            // heures : 0 = réservation possible à la dernière minute
var NOMBRE_DE_SEMAINES = 2;       // nombre de semaines affichées
