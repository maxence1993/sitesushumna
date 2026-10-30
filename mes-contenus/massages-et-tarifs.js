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


/* ---------- 1. LES PRIX ----------
   « minutes » sert au planning en ligne : c'est le temps BLOQUÉ dans
   l'agenda (la pause de 15 minutes est ajoutée automatiquement après).
   Une ligne avec « massage » est réservée à CE massage uniquement : quand le
   client la choisit, il n'a que ce massage possible (et ce massage n'est
   plus proposé avec les autres durées). */
var TARIFS = [
  { duree: "1h",    minutes: 60,  prix: 70  },
  { duree: "1h30",  minutes: 90,  prix: 100 },
  { duree: "2h",    minutes: 120, prix: 130 },
  { duree: "1h10",  minutes: 75,  prix: 90,  massage: "Massage réconfort" }   // 1h10 de massage, 1h15 bloquées
];


/* ---------- 2. LES FORMULES ET CARTES DE SÉANCES ---------- */
var FORMULES = [
  {
    nom: "Formule 4 massages d'1h",
    minutes: 60,    // durée de chaque massage (sert au planning pour le premier rendez-vous)
    detail: "4 massages d'1h, à utiliser sur 2 mois (soit 4h en tout). Vous pouvez choisir un massage différent à chaque séance. Les 3 autres rendez-vous sont pris ensemble lors du premier rendez-vous.",
    reglement: "Règlement en une fois, au premier massage.",
    prix: 200,
    avantage: "80 € d'économie"
  },
  {
    nom: "Formule 4 massages de 2h",
    minutes: 120,
    detail: "4 massages de 2h, à utiliser sur 2 mois (soit 8h en tout). Vous pouvez choisir un massage différent à chaque séance. Les 3 autres rendez-vous sont pris ensemble lors du premier rendez-vous.",
    reglement: "Règlement en une fois, ou en deux fois : 200 € au premier massage et 200 € au deuxième. Tout doit être réglé au deuxième massage.",
    prix: 400,
    avantage: "120 € d'économie"
  }
];


/* ---------- 3. LES MASSAGES ----------
   Pour chaque massage :
   - nom        : le nom affiché
   - accroche   : une petite phrase sous le nom
   - page       : la page dédiée du massage (créée avec Claude ; ne pas modifier)
   - photo      : le nom du fichier photo, à déposer dans le dossier « photos »
   - consiste   : en quoi consiste le massage
   - pourQui    : à qui il s'adresse
   - apporte    : ce qu'il peut apporter (une ligne par élément)
   - bonASavoir : une précaution ou une info utile (laissez "" si rien)
*/
var MASSAGES = [
  {
    nom: "Massage sur mesure",
    page: "massage-sur-mesure-orleans.html",   // sa page dédiée (créée avec Claude)
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
    nom: "Massage sportif",
    page: "massage-sportif-orleans.html",   // sa page dédiée (créée avec Claude)
    accroche: "Pour des muscles qui travaillent, et qui ont besoin de souffler",
    photo: "massage-sportif.jpg",
    consiste: "Un massage plus tonique et plus appuyé, avec des gestes profonds, des pétrissages et des étirements doux. Il s'adapte à votre pratique, à vos muscles sollicités et à votre sensibilité : la pression est toujours réglée avec vous.",
    pourQui: "Pour vous si vous faites du sport, avez un travail physique, ou si vous aimez les massages fermes qui font du bien aux muscles. Il convient aussi bien aux sportifs réguliers qu'aux débutants. Il est idéal avant ou après une compétition.",
    apporte: [
      "Des muscles plus souples, une sensation de relâchement",
      "Un moment agréable pour se préparer avant une compétition ou se remettre d'un effort après",
      "Une vraie détente après une période chargée"
    ],
    bonASavoir: "Ce massage est un moment de bien-être, pas un acte médical ni de la kinésithérapie. En cas de blessure, de douleur persistante ou de problème de santé, demandez d'abord l'avis de votre médecin."
  },
  {
    nom: "Massage relaxant",
    page: "massage-relaxant-orleans.html",   // sa page dédiée (créée avec Claude)
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
    nom: "Massage réconfort",
    page: "massage-reconfort-orleans.html",   // sa page dédiée (créée avec Claude)
    accroche: "Un moment de tendresse, comme un câlin",
    photo: "massage-reconfort.jpg",
    consiste: "Un massage à l'huile, lent et très enveloppant, qui laisse une grande place au contact. Les mains, les avant-bras et le buste accompagnent votre corps dans des gestes amples, continus et rassurants, un peu comme une longue étreinte. Rien n'est brusque : le rythme et la pression s'adaptent à vous, et nous prenons le temps d'en parler avant la séance.",
    pourQui: "Pour vous si vous avez besoin de tendresse, de réconfort et de douceur : une période de fatigue, de solitude, de séparation ou de doute, ou simplement l'envie de vous sentir enveloppé et accompagné. Vous n'avez pas besoin d'une raison particulière.",
    apporte: [
      "Une sensation de chaleur, de réconfort et de sécurité",
      "Un lâcher-prise profond du corps et de l'esprit",
      "Se sentir accueilli, écouté et respecté",
      "Un moment de tendresse et de douceur, rien que pour vous"
    ],
    bonASavoir: "C'est un massage de bien-être, tendre et respectueux : il reste strictement non sexuel et ne comporte aucun geste à connotation sexuelle. Le contact avec le buste est expliqué avant la séance et se fait uniquement avec votre accord. Vous êtes toujours recouvert(e) d'une serviette, et vous pouvez me demander à tout moment d'adapter ou d'arrêter un geste. Ce n'est ni un acte médical, ni un accompagnement psychologique."
  },
  {
    nom: "Massage ayurvédique (indien)",
    page: "massage-ayurvedique-orleans.html",   // sa page dédiée (créée avec Claude)
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
    nom: "Massage Chong Mai (chinois)",
    page: "massage-chong-mai-orleans.html",   // sa page dédiée (créée avec Claude)
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
    page: "massage-bol-tibetain-orleans.html",   // sa page dédiée (créée avec Claude)
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
    page: "reflexologie-abdominale-orleans.html",   // sa page dédiée (créée avec Claude)
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
