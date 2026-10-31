/* =====================================================================
   CARROUSELS INSTA AVEC PHOTOS (4 thèmes)
   ---------------------------------------------------------------------
   Chaque carrousel : une couverture, des slides de contenu, une slide de
   contact. Les photos (1 à 8, dans assets/photos-carrousels/) sont posées
   en cercles à cheval sur deux slides pour que le carrousel se lise d'un
   seul geste. « photos » = une photo par passage d'une slide à la suivante.
   Pour modifier un texte : éditez ce fichier, puis
   ONLY=carrousels-photos node graphisme/generer.js
   ===================================================================== */

module.exports = [
  {
    slug: '01-faut-il-se-deshabiller',
    question: 'Faut-il se déshabiller ?',
    sous: 'Spoiler : c’est vous qui décidez.',
    emoji: '👕',
    photos: [3, 5, 2, 1],
    slides: [
      { titre: 'Massage à l’huile, sur table', emoji: '🧴', intro: 'Ce que je pratique : sur mesure, sportif, ayurvédique…', points: [
        'Nu(e) ou en sous-vêtements, selon votre confort.',
        'Vous êtes recouvert(e) d’une serviette.',
        'Je ne découvre que la zone massée (dos, jambe, bras) : le reste reste couvert.',
      ] },
      { titre: 'Massage habillé', emoji: '👕', intro: 'Shiatsu, thaï, massage sur chaise…', points: [
        'On garde des vêtements souples et confortables (jogging, t-shirt). Pas besoin de se dévêtir.',
        'Je ne pratique pas ces massages : je ne fais que des massages à l’huile.',
      ] },
      { titre: 'Vous gardez la main', emoji: '🤝', points: [
        'Vous pouvez toujours demander à garder plus de vêtements.',
        'Vous pouvez signaler une zone que vous ne voulez pas voir massée.',
        'Un professionnel respecte toujours cela, sans discussion.',
      ] },
    ],
  },
  {
    slug: '02-contre-indications',
    question: 'Y a-t-il des contre-indications ?',
    sous: 'Ce qu’il faut savoir avant de réserver.',
    emoji: '🩺',
    photos: [6, 4, 8, 1],
    slides: [
      { titre: 'Report impératif ou avis médical préalable', emoji: '🛑', points: [
        'Fièvre, infection, maladie contagieuse.',
        'Phlébite ou thrombose (risque de déloger un caillot).',
        'Traitement anticoagulant (risque d’hématomes).',
        'Fracture, entorse ou blessure récente.',
        'Cancer en cours de traitement (accord du médecin nécessaire).',
        'Problèmes cardiaques sévères ou hypertension non contrôlée.',
      ] },
      { titre: 'Précautions particulières', emoji: '⚠️', points: [
        'Grossesse : massage possible avec l’avis du médecin, mais pas avec moi : je n’ai pas de formation pour le massage prénatal.',
        'Problèmes de peau (eczéma, mycose, coups de soleil, plaies) : on évite la zone concernée.',
        'Varices : pas de pression directe sur les jambes.',
        'Ostéoporose, hernie discale : pression adaptée, à signaler.',
      ] },
      { titre: 'Le réflexe à avoir', emoji: '💬', points: [
        'Tout dire en début de séance : médicaments, opérations, douleurs.',
        'En cas de doute, demandez l’avis de votre médecin avant.',
      ] },
    ],
  },
  {
    slug: '03-praticien-serieux',
    question: 'Comment trouver un praticien sérieux ?',
    sous: 'Les bons réflexes pour choisir sereinement.',
    emoji: '🔍',
    photos: [6, 3, 8, 2, 5],
    slides: [
      { titre: 'La formation', emoji: '🎓', points: [
        'Demandez où il s’est formé, et depuis quand.',
        'Des certifications reconnues, ou une formation de plusieurs mois, sont bon signe.',
      ] },
      { titre: 'Le cadre', emoji: '🏡', points: [
        'Un cabinet ou un institut propre, du linge frais, une lumière douce, un accueil clair.',
        'Les tarifs et les durées sont affichés ou annoncés avant la séance.',
        'Avis clients : consultez Google, et privilégiez les avis détaillés et récents.',
      ] },
      { titre: 'L’échange initial', emoji: '💬', points: [
        'Un bon praticien pose des questions sur votre santé et vos attentes avant de commencer.',
        'Recommandations : le bouche-à-oreille reste l’un des meilleurs filtres.',
      ] },
      { titre: 'Les signaux d’alerte', emoji: '🚩', points: [
        'Un tarif étrangement bas.',
        'Une annonce ambiguë ou suggestive.',
        'Pas de questions préalables.',
        'Une pression pour prendre un forfait.',
        'Impossible de savoir qui est le praticien.',
      ] },
    ],
  },
  {
    slug: '04-effets-et-frequence',
    question: 'Quels effets attendre, et à quelle fréquence ?',
    sous: 'Avant, pendant, après : ce qui est normal.',
    emoji: '🌿',
    photos: [8, 4, 7, 1, 5, 2],
    slides: [
      { titre: 'Pendant et juste après', emoji: '😌', points: [
        'Détente profonde, parfois envie de dormir.',
        'Légère sensation de lourdeur ou de vertige : levez-vous doucement.',
        'Soif et besoin d’uriner : c’est normal.',
      ] },
      { titre: 'Dans les 24 à 48 h', emoji: '⏳', points: [
        'Courbatures possibles, surtout après un massage profond ou sportif.',
        'Fatigue passagère, parfois suivie d’un très bon sommeil.',
      ] },
      { titre: 'Les bénéfices à attendre', emoji: '🌿', points: [
        'Moins de stress et de tensions musculaires.',
        'Meilleure souplesse, meilleur sommeil.',
        'Soulagement de certaines douleurs (dos, nuque, épaules).',
      ] },
      { titre: 'La fréquence conseillée', emoji: '📅', points: [
        'Bien-être, détente : 1 fois par mois.',
        'Stress ou tensions chroniques : toutes les 2 à 3 semaines.',
        'Sportifs : avant ou après les efforts, ou 1 fois par semaine en période intense.',
        'Douleurs spécifiques : 1 séance par semaine au début, puis on espace.',
      ] },
      { titre: 'Le conseil', emoji: '💧', points: [
        'Buvez de l’eau après la séance.',
        'Évitez les efforts intenses et l’alcool dans les heures qui suivent.',
      ] },
    ],
  },
];
