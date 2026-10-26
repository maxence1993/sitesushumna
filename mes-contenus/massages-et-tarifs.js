/* =====================================================================
   MES MASSAGES ET MES TARIFS
   ---------------------------------------------------------------------
   C'est ici que vous changez les prix et les textes des massages.
   Ils se mettent à jour tout seuls sur toutes les pages du site.

   Règles simples :
   - Ne modifiez que le texte ENTRE les guillemets "..." et les nombres.
   - Gardez les guillemets, les virgules et les accolades { } en place.
   - Si vous voulez écrire des guillemets dans un texte, utilisez « ».
   ===================================================================== */


/* ---------- 1. LES PRIX (identiques pour tous les massages) ----------
   « minutes » sert au planning en ligne : c'est la durée du massage. */
var TARIFS = [
  { duree: "1 heure",    minutes: 60,  prix: 70  },
  { duree: "1 heure 30", minutes: 90,  prix: 100 },
  { duree: "2 heures",   minutes: 120, prix: 130 }
];


/* ---------- 2. LES FORMULES ET CARTES DE SÉANCES ---------- */
var FORMULES = [
  {
    nom: "Formule 4 massages",
    detail: "4 massages d'1 heure, à utiliser sur 2 mois (soit 4 heures en tout). Vous pouvez choisir un massage différent à chaque séance.",
    prix: 200,
    avantage: "80 € d'économie"
  }
];


/* ---------- 3. LES MASSAGES ----------
   Pour chaque massage :
   - nom        : le nom affiché
   - accroche   : une petite phrase sous le nom
   - photo      : le nom du fichier photo, à déposer dans le dossier « photos »
   - consiste   : en quoi consiste le massage
   - pourQui    : à qui il s'adresse
   - apporte    : ce qu'il peut apporter (une ligne par élément)
   - bonASavoir : une précaution ou une info utile (laissez "" si rien)
*/
var MASSAGES = [
  {
    nom: "Massage sur mesure",
    accroche: "Construit avec vous, selon vos besoins du jour",
    photo: "massage-sur-mesure.jpg",
    consiste: "Nous prenons d'abord le temps d'échanger : vos envies, vos zones de tension, votre état du moment. Je compose ensuite un massage qui peut mêler toutes les techniques que je pratique (relaxant, ayurvédique, Chong Mai, bol tibétain, réflexologie abdominale).",
    pourQui: "Pour vous si vous hésitez entre plusieurs massages, ou si vous souhaitez un moment entièrement personnalisé.",
    apporte: [
      "Un massage pensé pour vous, du début à la fin",
      "Un rythme et une pression adaptés à ce que vous aimez",
      "Une détente du corps et de l'esprit"
    ],
    bonASavoir: ""
  },
  {
    nom: "Massage ayurvédique (indien)",
    accroche: "Tonique et énergisant",
    photo: "massage-ayurvedique.jpg",
    consiste: "Inspiré de la tradition indienne, ce massage à l'huile chaude alterne des gestes enveloppants et des mouvements plus dynamiques sur l'ensemble du corps. Les huiles sont choisies selon votre peau et vos envies.",
    pourQui: "Pour vous si vous vous sentez fatigué, « lourd » ou en manque d'énergie, et si vous aimez les massages plutôt toniques.",
    apporte: [
      "Une sensation de légèreté et de vitalité",
      "Des muscles détendus et tonifiés",
      "Une peau nourrie et douce",
      "Un moment pour se reconnecter à soi"
    ],
    bonASavoir: ""
  },
  {
    nom: "Massage relaxant",
    accroche: "Relâche et apaise",
    photo: "massage-relaxant.jpg",
    consiste: "Un massage doux et enveloppant, avec des gestes lents et fluides. Il invite le corps à relâcher ses tensions et l'esprit à ralentir.",
    pourQui: "Idéal dans une période de stress ou de fatigue. C'est aussi un très bon choix pour un tout premier massage.",
    apporte: [
      "Une détente des muscles et des articulations",
      "Un apaisement des émotions",
      "Un vrai moment de calme, rien que pour vous"
    ],
    bonASavoir: ""
  },
  {
    nom: "Massage Chong Mai (chinois)",
    accroche: "Pour retrouver son axe et son élan",
    photo: "massage-chong-mai.jpg",
    consiste: "Issu de la tradition chinoise, ce massage énergétique suit l'axe central du corps. Il associe des pressions, des étirements doux et des gestes lents pour aider à rééquilibrer les énergies.",
    pourQui: "Pour vous si vous traversez une période de changement ou de doute : une décision personnelle ou professionnelle à prendre, un moment difficile (séparation, deuil, déception), un manque de confiance en vous.",
    apporte: [
      "Se sentir plus centré et plus posé",
      "Retrouver de l'élan et de la dynamique",
      "Un accompagnement bienveillant dans une période chargée en émotions"
    ],
    bonASavoir: "Ce massage est un moment de bien-être. Il ne remplace pas un accompagnement psychologique ou médical."
  },
  {
    nom: "Massage au bol tibétain",
    accroche: "Se laisser porter par les vibrations du son",
    photo: "massage-bol-tibetain.jpg",
    consiste: "Des bols chantants sont posés sur le corps ou autour de vous, puis frappés doucement. Leurs sons et leurs vibrations se diffusent dans tout le corps, associés à des gestes de massage doux.",
    pourQui: "Pour vous si vous avez du mal à « lâcher prise », si votre esprit tourne en boucle, ou si vous avez envie de découvrir une expérience nouvelle.",
    apporte: [
      "Un relâchement profond du corps",
      "Un esprit qui se repose",
      "Une expérience douce et surprenante"
    ],
    bonASavoir: ""
  },
  {
    nom: "Réflexologie abdominale",
    accroche: "Libérer les maux… et les mots",
    photo: "reflexologie-abdominale.jpg",
    consiste: "Le ventre est une zone où l'on garde souvent le stress, les tensions et les émotions. Par des gestes doux et précis sur l'abdomen, cette technique relie le corps, le mental et les émotions.",
    pourQui: "Pour vous si vous vous sentez « noué », si le stress se loge dans votre ventre, ou si vous avez besoin de déposer ce qui vous pèse.",
    apporte: [
      "Une sensation de détente et de légèreté dans le ventre",
      "Un relâchement des tensions liées au stress",
      "Un espace pour déposer ce qui pèse"
    ],
    bonASavoir: "Pour votre confort, évitez de manger un repas copieux juste avant la séance. Elle n'est pas pratiquée pendant la grossesse."
  }
];
