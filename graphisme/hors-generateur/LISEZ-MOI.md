# Visuels hors générateur

Visuels réalisés avec des scripts à part (pas dans `generer.js`).

## livrables/
| Fichier | Contenu |
|---|---|
| `affiche-formules-et-parrainage-a4.jpg/.pdf` | Affiche A4 : formules 4 massages + parrainage |
| `parrainage-affiche-a4.jpg/.pdf`, `parrainage-publication.jpg`, `parrainage-story.jpg` | Parrainage (20 € pour le parrain et le filleul) : A4, carré, story |
| `bande-logo-claire-large.png`, `bande-logo-foncee-large.png` | Bande logo + slogan estompée, fond transparent, 1080 × 1920, à poser sur une story |
| `logo-sushumna-*-transparent.png` | Logo seul, ou avec le slogan sous « Sushumna », en couleurs ou en doré, fond transparent |
| `planning-story-*.pptx` | Plannings story modifiables (import dans Canva) |

La story « Ouvert ce dimanche » est dans `graphisme/jpeg/74-story-ouvert-ce-dimanche.jpg`.

## scripts/
Scripts Node (Playwright) et Python (python-pptx) qui produisent ces fichiers.
Les chemins de sortie pointent vers le dossier temporaire de la session : à adapter (variable `SORTIE` ou `__dirname`) pour les relancer.
Les prix des affiches sont lus dans `mes-contenus/massages-et-tarifs.js`.
