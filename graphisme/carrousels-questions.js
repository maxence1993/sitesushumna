/* =====================================================================
   CARROUSELS INSTA « QUESTIONS FRÉQUENTES » (30 thèmes)
   ---------------------------------------------------------------------
   Chaque carrousel : une couverture (question), deux slides de contenu
   (points courts), puis la slide de contact (ajoutée automatiquement).
   Les informations viennent de questions.html et des autres pages du site.
   Pour ajouter ou modifier un carrousel, éditez ce fichier puis lancez
   node graphisme/generer.js.
   ===================================================================== */

module.exports = [
  {
    slug: 'premiere-fois',
    titre: 'Un massage pour la première fois : est-ce pour moi ?',
    sous: 'Pas besoin d’expérience. Voici ce qu’il faut savoir.',
    slides: [
      { titre: 'Pour une première fois', points: [
        'Le massage relaxant ou le massage sur mesure sont parfaits pour commencer.',
        'Je vous explique tout au fil de la séance, et le massage s’adapte à vous.',
        'Vous pouvez me dire à tout moment si quelque chose ne vous convient pas.',
      ] },
      { titre: 'Vous hésitez encore ?', points: [
        'Le massage sur mesure est construit avec vous, selon vos besoins du jour.',
        'Une séance de 1h suffit pour un premier moment de détente.',
      ] },
    ],
  },
  {
    slug: 'premier-rendez-vous',
    titre: 'Comment se passe le premier rendez-vous ?',
    sous: 'Du bon accueil jusqu’au moment de vous relever.',
    slides: [
      { titre: 'Avant le massage', points: [
        'Je vous accueille au cabinet, 4 cours Victor Hugo à Orléans.',
        'Nous prenons quelques minutes pour échanger : vos envies, vos zones de tension, votre état de santé.',
        'Merci d’arriver 5 minutes avant l’heure du rendez-vous.',
      ] },
      { titre: 'Pendant et après', points: [
        'Vous vous installez tranquillement, puis le massage commence.',
        'Pression, température, position : dites-le-moi à tout moment.',
        'Après la séance, relevez-vous doucement et buvez un verre d’eau.',
      ] },
    ],
  },
  {
    slug: 'tenue',
    titre: 'Comment dois-je m’habiller ?',
    sous: 'Venez comme vous êtes à l’aise.',
    slides: [
      { titre: 'Aucune tenue particulière', points: [
        'Aucune tenue particulière n’est demandée.',
        'Pour un massage à l’huile, vous pouvez être nu(e) ou garder vos sous-vêtements : c’est vous qui choisissez.',
        'Vous êtes toujours recouvert(e) d’une serviette : seule la partie massée est découverte.',
      ] },
      { titre: 'Une précision', points: [
        'Pour certains massages, une tenue souple (type yoga) peut suffire.',
        'Je vous le précise au moment de la réservation.',
        'Votre pudeur est toujours respectée.',
      ] },
    ],
  },
  {
    slug: 'duree',
    titre: 'Quelle durée choisir ?',
    sous: '1h, 1h30 ou 2h : chacune a son intérêt.',
    slides: [
      { titre: 'Les trois durées', points: [
        '1h : idéal pour une première fois, ou pour un moment de détente ciblé.',
        '1h30 : le temps de travailler tout le corps sans se presser.',
        '2h : une vraie parenthèse, pour une détente profonde.',
      ] },
      { titre: 'Le prix', points: [
        '1h : 70 €',
        '1h30 : 100 €',
        '2h : 130 €',
        'Tous les massages sont au même prix : seule la durée change.',
      ] },
    ],
  },
  {
    slug: 'duree-seance',
    titre: 'Combien de temps dure une séance ?',
    sous: 'Le temps d’échange est compris dans la séance.',
    slides: [
      { titre: 'La durée de la séance', points: [
        'Vous choisissez 1h, 1h30 ou 2h.',
        'Le temps d’échange avant le massage est compris dans la séance.',
      ] },
      { titre: 'Pour bien s’organiser', points: [
        'Arrivez 5 minutes avant l’heure du rendez-vous.',
        'En cas d’empêchement, prévenez-moi au moins 24h à l’avance.',
      ] },
    ],
  },
  {
    slug: 'reserver-en-ligne',
    titre: 'Réserver en ligne : comment ça marche ?',
    sous: 'En deux étapes, sur le site.',
    slides: [
      { titre: 'En deux étapes', points: [
        'Choisissez la durée de votre massage.',
        'Choisissez un horaire libre : les horaires affichés sont ceux réellement libres.',
      ] },
      { titre: 'Ensuite', points: [
        'Votre rendez-vous est enregistré tout de suite.',
        'Pour une question ou un rendez-vous de dernière minute, écrivez-moi sur WhatsApp ou appelez-moi.',
      ] },
    ],
  },
  {
    slug: 'annuler',
    titre: 'Comment annuler ou déplacer un rendez-vous ?',
    sous: 'Prévenez-moi à temps, c’est sans frais.',
    slides: [
      { titre: 'Prévenez-moi au moins 24h à l’avance', points: [
        'Par téléphone, SMS ou WhatsApp au 07 50 46 01 10.',
        'Le rendez-vous est alors déplacé ou annulé sans frais.',
      ] },
      { titre: 'En cas d’annulation tardive', points: [
        'Une annulation tardive ou un rendez-vous non honoré peut être facturé.',
      ] },
    ],
  },
  {
    slug: 'paiement',
    titre: 'Comment puis-je payer ?',
    sous: 'Le paiement se fait sur place.',
    slides: [
      { titre: 'Le paiement', points: [
        'Il se fait à la fin de la séance, uniquement en espèces.',
        'Pensez à prévoir l’appoint si possible.',
      ] },
      { titre: 'Pour les formules', points: [
        'Les formules 4 massages se règlent en une fois, au premier massage.',
        'La formule 4 massages de 2h peut aussi se régler en deux fois.',
      ] },
    ],
  },
  {
    slug: 'formules',
    titre: 'Comment fonctionnent les formules 4 massages ?',
    sous: 'Quatre massages à utiliser sur deux mois.',
    slides: [
      { titre: 'Ce qui est compris', points: [
        '4 massages d’1h : 200 € (80 € d’économie).',
        '4 massages de 2h : 400 € (120 € d’économie).',
        'À utiliser sur 2 mois.',
      ] },
      { titre: 'Comment ça se passe', points: [
        'Vous pouvez choisir un massage différent à chaque séance.',
        'Les 3 autres rendez-vous sont pris ensemble, lors du premier rendez-vous.',
      ] },
    ],
  },
  {
    slug: 'formule-deux-fois',
    titre: 'Formule 4 massages de 2h : payer en deux fois ?',
    sous: 'Les deux options possibles.',
    slides: [
      { titre: 'Les deux options', points: [
        'En une fois, au premier massage.',
        'Ou 200 € au premier massage, puis 200 € au deuxième.',
      ] },
      { titre: 'À savoir', points: [
        'Tout doit être réglé au deuxième massage.',
        'Le paiement se fait en espèces, sur place.',
      ] },
    ],
  },
  {
    slug: 'carte-cadeau-fonctionnement',
    titre: 'Carte cadeau : comment ça marche ?',
    sous: 'Offrir un massage, en quatre étapes.',
    slides: [
      { titre: 'En quatre étapes', points: [
        'Vous choisissez un massage précis, ou vous laissez la personne choisir.',
        'Vous me contactez par téléphone, WhatsApp ou formulaire.',
        'Vous remettez la carte : la date de validité y est écrite.',
      ] },
      { titre: 'Ensuite', points: [
        'La personne me contacte pour choisir son créneau.',
        'Le règlement se fait uniquement en espèces.',
      ] },
    ],
  },
  {
    slug: 'carte-cadeau-prix',
    titre: 'Carte cadeau : combien ça coûte ?',
    sous: 'Le prix de la carte est celui du massage offert.',
    slides: [
      { titre: 'Les séances', points: [
        '1h : 70 €',
        '1h30 : 100 €',
        '2h : 130 €',
      ] },
      { titre: 'Les formules', points: [
        'Formule 4 massages d’1h : 200 €',
        'Formule 4 massages de 2h : 400 €',
      ] },
    ],
  },
  {
    slug: 'offrir',
    titre: 'Offrir un massage : une bonne idée ?',
    sous: 'Anniversaire, fête, remerciement ou simple attention.',
    slides: [
      { titre: 'Une idée cadeau', points: [
        'Anniversaire, fête, remerciement ou simple attention.',
        'La carte cadeau permet d’offrir un massage à quelqu’un que vous aimez.',
      ] },
      { titre: 'Pour bien choisir', points: [
        'Vous pouvez laisser la personne choisir son massage.',
        'Tous les massages sont au même prix : seule la durée change.',
      ] },
    ],
  },
  {
    slug: 'contre-indications',
    titre: 'Y a-t-il des contre-indications ?',
    sous: 'Par sécurité, certaines situations ne permettent pas le massage.',
    slides: [
      { titre: 'Le massage n’est pas pratiqué en cas de', points: [
        'Fièvre, rhume, grippe ou maladie contagieuse.',
        'Phlébite ou problème de circulation sanguine.',
        'Blessure, fracture ou opération récente.',
        'Problème de peau sur la zone à masser (plaie, brûlure, infection).',
      ] },
      { titre: 'Dans tous les cas', points: [
        'Parlez-moi de votre état de santé au début de la séance.',
        'Je pourrai adapter le massage.',
      ] },
    ],
  },
  {
    slug: 'avis-medecin',
    titre: 'Quand demander l’avis de son médecin ?',
    sous: 'Avant de réserver, dans ces situations.',
    slides: [
      { titre: 'Demandez l’avis de votre médecin si', points: [
        'Vous êtes enceinte.',
        'Vous suivez un traitement médical.',
        'Vous avez une maladie chronique ou un problème de santé important.',
      ] },
      { titre: 'Bon à savoir', points: [
        'Un massage bien-être ne remplace pas un avis ou un traitement médical.',
        'En cas de doute sur votre santé, demandez conseil à votre médecin.',
      ] },
    ],
  },
  {
    slug: 'bien-etre-medical',
    titre: 'Massage bien-être ou soin médical ?',
    sous: 'Une question importante à bien comprendre.',
    slides: [
      { titre: 'Ce que c’est', points: [
        'Un soin de détente et de relaxation.',
        'Ce n’est ni un acte médical, ni un massage thérapeutique.',
      ] },
      { titre: 'Ce que ce n’est pas', points: [
        'Il ne permet pas de soigner une maladie.',
        'Il ne remplace ni un avis médical, ni un traitement, ni un suivi psychologique.',
      ] },
    ],
  },
  {
    slug: 'relaxant',
    titre: 'Massage relaxant : pour qui ?',
    sous: 'Relâche et apaise.',
    slides: [
      { titre: 'Le massage relaxant', points: [
        'Un massage doux et enveloppant, avec des gestes lents et fluides.',
        'Il invite le corps à relâcher ses tensions, et l’esprit à ralentir.',
      ] },
      { titre: 'Idéal pour', points: [
        'Une période de stress ou de fatigue.',
        'Un très bon choix pour un tout premier massage.',
      ] },
    ],
  },
  {
    slug: 'sportif',
    titre: 'Massage sportif : avant ou après l’effort ?',
    sous: 'Pour des muscles qui travaillent.',
    slides: [
      { titre: 'Le massage sportif', points: [
        'Plus tonique et plus appuyé, avec des gestes profonds et des étirements doux.',
        'La pression est toujours réglée avec vous.',
      ] },
      { titre: 'Bon à savoir', points: [
        'Il est idéal avant ou après une compétition.',
        'Ce n’est ni un acte médical ni de la kinésithérapie. En cas de blessure ou de douleur persistante, demandez l’avis de votre médecin.',
      ] },
    ],
  },
  {
    slug: 'sur-mesure',
    titre: 'Massage sur mesure : construit avec vous',
    sous: 'Quand vous hésitez entre plusieurs massages.',
    slides: [
      { titre: 'Comment ça se passe', points: [
        'Nous prenons le temps d’échanger : vos envies, vos zones de tension, votre état du moment.',
        'Je compose un massage qui peut mêler plusieurs techniques.',
      ] },
      { titre: 'Pour qui', points: [
        'Si vous hésitez entre plusieurs massages.',
        'Si vous souhaitez un moment entièrement personnalisé.',
      ] },
    ],
  },
  {
    slug: 'reconfort',
    titre: 'Massage réconfort : une bulle de douceur',
    sous: 'Un moment de tendresse, comme un câlin.',
    slides: [
      { titre: 'Ce que c’est', points: [
        'Un massage à l’huile, lent et très enveloppant.',
        'Il laisse une grande place au contact, comme une longue étreinte.',
      ] },
      { titre: 'Important', points: [
        'Il reste strictement non sexuel. Le contact avec le buste est expliqué avant la séance, et se fait avec votre accord.',
        'Vous pouvez me demander d’adapter ou d’arrêter un geste à tout moment.',
      ] },
    ],
  },
  {
    slug: 'ayurvedique',
    titre: 'Massage ayurvédique : tonique et énergisant',
    sous: 'Inspiré de la tradition indienne.',
    slides: [
      { titre: 'Le massage ayurvédique', points: [
        'Un massage à l’huile chaude, qui alterne gestes enveloppants et mouvements plus dynamiques.',
        'Les huiles sont choisies selon votre peau et vos envies.',
      ] },
      { titre: 'Pour qui', points: [
        'Si vous vous sentez fatigué, « lourd » ou en manque d’énergie.',
        'Si vous aimez les massages plutôt toniques.',
      ] },
    ],
  },
  {
    slug: 'chong-mai',
    titre: 'Massage Chong Mai : retrouver son axe',
    sous: 'Issu de la tradition chinoise.',
    slides: [
      { titre: 'Le massage Chong Mai', points: [
        'Un massage énergétique qui suit l’axe central du corps.',
        'Des pressions, des étirements doux et des gestes lents.',
      ] },
      { titre: 'Pour qui', points: [
        'Une période de changement ou de doute.',
        'Un moment difficile, ou un manque de confiance en soi.',
        'Ce n’est pas un accompagnement psychologique.',
      ] },
    ],
  },
  {
    slug: 'bol-tibetain',
    titre: 'Massage au bol tibétain : se laisser porter',
    sous: 'Les vibrations du son.',
    slides: [
      { titre: 'Comment ça se passe', points: [
        'Des bols chantants sont posés sur le corps ou autour de vous, puis frappés doucement.',
        'Leurs vibrations se diffusent dans tout le corps, avec des gestes doux.',
      ] },
      { titre: 'Pour qui', points: [
        'Si vous avez du mal à « lâcher prise ».',
        'Si votre esprit tourne en boucle, ou si vous voulez une expérience nouvelle.',
      ] },
    ],
  },
  {
    slug: 'reflexologie',
    titre: 'Réflexologie abdominale : bien s’y préparer',
    sous: 'Libérer les maux… et les mots.',
    slides: [
      { titre: 'Le ventre garde souvent le stress', points: [
        'Par des gestes doux et précis sur l’abdomen, la technique relie le corps, le mental et les émotions.',
        'Idéale si vous vous sentez « noué ».',
      ] },
      { titre: 'Avant la séance', points: [
        'Évitez un repas copieux juste avant.',
        'Elle n’est pas pratiquée pendant la grossesse.',
      ] },
    ],
  },
  {
    slug: 'moment-pour-soi',
    titre: 'Prendre un moment pour soi',
    sous: 'Une parenthèse dans le quotidien.',
    slides: [
      { titre: 'Pourquoi y penser', points: [
        'Une parenthèse pour relâcher les tensions du quotidien.',
        'Un massage adapté à vos besoins du jour.',
      ] },
      { titre: 'Ce que vous pouvez en attendre', points: [
        'Un corps plus détendu, et un esprit qui ralentit.',
        'Une sensation de légèreté et d’apaisement.',
      ] },
    ],
  },
  {
    slug: 'dire-ce-qui-ne-convient-pas',
    titre: 'Pendant le massage, je peux tout vous dire',
    sous: 'Vous gardez la main sur votre confort.',
    slides: [
      { titre: 'À tout moment', points: [
        'Pression, température, position : dites-le-moi.',
        'Je peux adapter ou arrêter un geste.',
      ] },
      { titre: 'Avant de commencer', points: [
        'Parlez-moi de votre état de santé.',
        'Je pourrai adapter le massage à votre état du moment.',
      ] },
    ],
  },
  {
    slug: 'ou-se-trouve',
    titre: 'Où se trouve le cabinet ?',
    sous: 'Au Studio Sushumna, à Orléans.',
    slides: [
      { titre: 'L’adresse', points: [
        '4 cours Victor Hugo, 45100 Orléans.',
        'Les massages se prennent sur rendez-vous.',
      ] },
      { titre: 'Vous venez de ?', points: [
        'Orléans et les communes voisines : Olivet, Saint-Jean-le-Blanc, Saint-Jean-de-Braye, Saint-Jean-de-la-Ruelle, Fleury-les-Aubrais, Saran ou La Chapelle-Saint-Mesmin.',
      ] },
    ],
  },
  {
    slug: 'horaires',
    titre: 'Quand puis-je venir ?',
    sous: 'Les horaires se choisissent en ligne.',
    slides: [
      { titre: 'Les horaires', points: [
        'Les massages se prennent sur rendez-vous, selon les horaires affichés sur le site.',
        'Les horaires affichés sont ceux réellement libres dans mon agenda.',
      ] },
      { titre: 'Pour me joindre', points: [
        'Je réponds tous les jours entre 9h et 21h.',
        'Pour un rendez-vous de dernière minute, le plus rapide est WhatsApp ou téléphone.',
      ] },
    ],
  },
  {
    slug: 'me-contacter',
    titre: 'Comment me contacter ?',
    sous: 'Plusieurs façons de me joindre.',
    slides: [
      { titre: 'Par téléphone, WhatsApp ou Instagram', points: [
        'Téléphone et WhatsApp : 07 50 46 01 10.',
        'Instagram : @massage_sushumna_orleans.',
      ] },
      { titre: 'Sur le site', points: [
        'Le formulaire de la page Contact.',
        'La réservation en ligne, pour choisir un horaire libre.',
      ] },
    ],
  },
  {
    slug: 'apres-le-massage',
    titre: 'Après le massage : bien récupérer',
    sous: 'Quelques bons gestes.',
    slides: [
      { titre: 'Les bons gestes', points: [
        'Relevez-vous doucement.',
        'Buvez un verre d’eau.',
      ] },
      { titre: 'Ensuite', points: [
        'Prenez le temps de rester un peu calme.',
        'En cas de doute sur votre santé, demandez l’avis de votre médecin.',
      ] },
    ],
  },
];
