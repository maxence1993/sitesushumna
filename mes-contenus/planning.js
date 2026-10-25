/* =====================================================================
   MON PLANNING
   ---------------------------------------------------------------------
   À mettre à jour chaque semaine.

   Pour chaque jour, écrivez les heures séparées par des virgules,
   suivies du mot  libre  ou  pris.   Exemple :
        lundi: "9h00 libre, 10h30 pris, 14h00 libre",

   - Un jour où vous ne travaillez pas :   dimanche: "fermé",
   - La date de « semaine » est celle du LUNDI (jour/mois/année).
   - Le site affiche tout seul la semaine en cours et la suivante.
     Les semaines passées disparaissent toutes seules.
   - Vous pouvez préparer plusieurs semaines à l'avance.
   ===================================================================== */

var PLANNING_MIS_A_JOUR_LE = "25/10/2026";

var PLANNING = [

  {
    semaine:  "26/10/2026",
    lundi:    "9h00 libre, 10h30 pris, 14h00 libre, 15h30 pris, 17h00 libre, 18h30 libre",
    mardi:    "9h00 pris, 10h30 pris, 14h00 libre, 15h30 libre, 17h00 pris, 18h30 libre",
    mercredi: "9h00 libre, 10h30 libre, 14h00 pris, 15h30 libre, 17h00 libre, 18h30 pris",
    jeudi:    "9h00 libre, 10h30 pris, 14h00 pris, 15h30 pris, 17h00 libre, 18h30 libre",
    vendredi: "9h00 pris, 10h30 libre, 14h00 libre, 15h30 libre, 17h00 pris, 18h30 pris",
    samedi:   "9h00 libre, 10h30 libre, 12h00 pris",
    dimanche: "fermé"
  },

  {
    semaine:  "02/11/2026",
    lundi:    "9h00 libre, 10h30 libre, 14h00 libre, 15h30 pris, 17h00 libre, 18h30 libre",
    mardi:    "9h00 libre, 10h30 pris, 14h00 libre, 15h30 libre, 17h00 libre, 18h30 pris",
    mercredi: "9h00 pris, 10h30 libre, 14h00 libre, 15h30 libre, 17h00 libre, 18h30 libre",
    jeudi:    "9h00 libre, 10h30 libre, 14h00 pris, 15h30 libre, 17h00 libre, 18h30 libre",
    vendredi: "9h00 libre, 10h30 libre, 14h00 libre, 15h30 pris, 17h00 libre, 18h30 libre",
    samedi:   "9h00 pris, 10h30 libre, 12h00 libre",
    dimanche: "fermé"
  }

];
