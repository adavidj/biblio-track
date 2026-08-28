import {
  BookMarked,
  BookmarkCheck,
  Library,
  Search,
  type LucideIcon,
} from "lucide-react";

export const landingFeatures: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: Library,
    title: "Une seule bibliothèque",
    description: "Tous vos livres, vos genres et vos envies de lecture dans un espace qui reste clair.",
  },
  {
    icon: BookMarked,
    title: "Le fil de chaque lecture",
    description: "Conservez votre page, vos sessions et la prochaine étape sans avoir à vous souvenir de tout.",
  },
  {
    icon: Search,
    title: "Des livres en quelques secondes",
    description: "Recherchez un titre, importez ses détails ou ajoutez-le exactement comme vous le souhaitez.",
  },
  {
    icon: BookmarkCheck,
    title: "Vos repères, toujours là",
    description: "Retrouvez une page, une note ou une envie de lecture dès que vous en avez besoin.",
  },
];

export const readingSteps = [
  {
    number: "01",
    title: "Ajoutez un livre",
    description: "Importez-le depuis une recherche ou créez une fiche simple à votre manière.",
  },
  {
    number: "02",
    title: "Lisez comme vous le faites déjà",
    description: "Enregistrez une page ou une session lorsque cela a du sens pour vous.",
  },
  {
    number: "03",
    title: "Revenez sans chercher",
    description: "BiblioTrack garde votre place et révèle peu à peu votre parcours.",
  },
];

export const faqItems = [
  {
    question: "Puis-je ajouter mes livres manuellement ?",
    answer: "Oui. Vous pouvez créer une fiche simple, ou rechercher et importer les informations d'un livre quand elles sont disponibles.",
  },
  {
    question: "BiblioTrack est-il adapté à une petite bibliothèque ?",
    answer: "Absolument. L'application est aussi utile avec trois livres qu'avec plusieurs centaines : elle s'adapte à votre façon de lire.",
  },
  {
    question: "Puis-je utiliser BiblioTrack pour suivre ma progression ?",
    answer: "Oui. Chaque livre peut garder une page actuelle et des sessions de lecture pour vous aider à reprendre sans effort.",
  },
];
