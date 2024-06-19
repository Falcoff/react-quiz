import Question from "../../core/models/Question";

export const questions: Question[] = [
  {
    question: "Quel est l'ordre des épisodes 1, 2 et 3 ?",
    answers: {
      A: "Un Nouvel espoir, L’Empire contre-attaque, Le Retour du Jedi",
      B: "La Menace fantôme, L'Empire contre-attaque, La Revanche des Sith",
      C: "La Menace fantôme, L’Attaque des clones, La Revanche des Sith",
      D: "Star Wars I, Star Wars II, Star Wars III",
    },
    goodAnswer: "C",
  },
  {
    question: "Quel est le vaisseau mythique piloté par Han Solo ?",
    answers: {
      A: "Le Destroyer Impérial",
      B: "Le Titanic",
      C: "Le Faucon Millénium",
      D: "Le Razor Crest",
    },
    goodAnswer: "C",
  },

  {
    question:
      "Sur quelle planète Luke Skywalker rencontre-t-il Yoda pour la première fois ?",
    answers: {
      A: "Coruscant",
      B: "Dagobah",
      C: "Yavin IV",
      D: "Tataouine",
    },
    goodAnswer: "B",
  },

  {
    question: "Les sabres lasers fonctionnent grâce à ?",
    answers: {
      A: "Un Diamant",
      B: "La Force",
      C: "4 Piles AA",
      D: "Un Cristal",
    },
    goodAnswer: "D",
  },

  {
    question: "Quel est l'ordre 66 ?",
    answers: {
      A: "L'ordre qui vient après l'ordre 65",
      B: "L’ordre donné aux clones de tuer tous les Jedi",
      C: "L’ordre donné aux rebelles de détruire l’Étoile Noire",
      D: "L’ordre donné aux clones de libérer Anakin et Padmé sur la planète Géonosis",
    },
    goodAnswer: "B",
  },
];

// C C B D B

// question: "Quel est l'ordre des épisodes 1, 2 et 3 ?",
// answers: {
//     A: "Un Nouvel espoir, L’Empire contre-attaque, Le Retour du Jedi",
//     B: "La Menace fantôme, L'Empire contre-attaque, La Revanche des Sith",
//     C: "La Menace fantôme, L’Attaque des clones, La Revanche des Sith",
//     D: "Star Wars I, Star Wars II, Star Wars III"
// },
// goodAnswer: 'C'
