import {FlashcardDeck, type Flashcard} from "./FlashcardDeck";

const deck: Flashcard[] = [
    {word: "la madrugada", partOfSpeech: "noun", meaning: "the early hours of the morning", example: "Llegamos a casa de madrugada."},
    {word: "aprovechar", partOfSpeech: "verb", meaning: "to make the most of", example: "Hay que aprovechar el buen tiempo."},
    {word: "la sobremesa", partOfSpeech: "noun", meaning: "time spent talking at the table after a meal", example: "La sobremesa duró dos horas."},
    {word: "estrenar", partOfSpeech: "verb", meaning: "to use or wear something for the first time", example: "Hoy estreno zapatos."},
    {word: "la vergüenza ajena", partOfSpeech: "noun", meaning: "embarrassment felt on behalf of someone else", example: "Sentí vergüenza ajena en la reunión."},
    {word: "trasnochar", partOfSpeech: "verb", meaning: "to stay up late", example: "No me gusta trasnochar entre semana."},
];

const FlashcardDeckExample = () => <FlashcardDeck cards={deck} label="Spanish vocabulary flashcards"/>;

export default FlashcardDeckExample;
