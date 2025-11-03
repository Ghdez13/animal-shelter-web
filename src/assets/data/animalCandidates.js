// src/assets/data/animalsCandidates.js

// This file contains all animals available for adoption.
// Each animal object includes its type (dog, cat, other), images, and details in three languages (en, es, fr).

export const animalsCandidates = [
  // ===== Dogs =====
 {
    name: "Bimbo",
    type: "dog",
    images: ["/dogImages/Bimbo.webp"],
    age: { en: "3 years", es: "3 años", fr: "3 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Friendly and playful", es: "Amigable y juguetón", fr: "Amical et joueur" }
  },
  {
    name: "Bolillo",
    type: "dog",
    images: ["/dogImages/Bolillo.webp"],
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "No", es: "No", fr: "Non" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Small", es: "Pequeño", fr: "Petit" },
    personality: { en: "Calm and affectionate", es: "Tranquilo y cariñoso", fr: "Calme et affectueux" }
  },
  {
    name: "Bonnie",
    type: "dog",
    images: ["/dogImages/Bonnie.webp"],
    age: { en: "1 year", es: "1 año", fr: "1 an" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Small", es: "Pequeño", fr: "Petit" },
    personality: { en: "Playful and sweet", es: "Juguetona y dulce", fr: "Joyeuse et douce" }
  },
  {
    name: "Chilindrina",
    type: "dog",
    images: ["/dogImages/Chilindrina.webp"],
    age: { en: "4 years", es: "4 años", fr: "4 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Calm and obedient", es: "Calmada y obediente", fr: "Calme et obéissante" }
  },
  {
    name: "Elektra",
    type: "dog",
    images: ["/dogImages/Elektra.webp"],
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Large", es: "Grande", fr: "Grande" },
    personality: { en: "Energetic and protective", es: "Enérgica y protectora", fr: "Énergique et protectrice" }
  },
  {
    name: "Judy&Jimmi",
    type: "dog",
    images: ["/dogImages/Judy&Jimmi.webp", "/dogImages/Judy&Jimmi1.webp"],
    age: { en: "3 years", es: "3 años", fr: "3 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male and Female", es: "Macho y Hembra", fr: "Mâle et Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Friendly and sociable", es: "Amigables y sociables", fr: "Amicaux et sociables" }
  },
  {
    name: "Kaliman&Solin",
    type: "dog",
    images: ["/dogImages/Kaliman&Solin.webp", "/dogImages/Kaliman&Solin1.webp"],
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "No", es: "No", fr: "Non" },
    sex: { en: "Male and Female", es: "Macho y Hembra", fr: "Mâle et Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Playful and calm", es: "Juguetones y tranquilos", fr: "Joueurs et calmes" }
  },
  {
    name: "Odin",
    type: "dog",
    images: ["/dogImages/Odin.webp"],
    age: { en: "5 years", es: "5 años", fr: "5 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Large", es: "Grande", fr: "Grande" },
    personality: { en: "Serious but affectionate", es: "Serio pero cariñoso", fr: "Sérieux mais affectueux" }
  },
  {
    name: "Panzas",
    type: "dog",
    images: ["/dogImages/Panzas.webp"],
    age: { en: "1 year", es: "1 año", fr: "1 an" },
    sterilized: { en: "No", es: "No", fr: "Non" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Calm and playful", es: "Tranquilo y juguetón", fr: "Calme et joueur" }
  },
  {
    name: "Princesa",
    type: "dog",
    images: ["/dogImages/Princesa.webp"],
    age: { en: "3 years", es: "3 años", fr: "3 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Affectionate and active", es: "Cariñosa y activa", fr: "Affectueuse et active" }
  },
  

  // ===== Cats =====
  {
    name: "Gatitos",
    type: "cat",
    images: ["/catImages/Gatitos.webp"], // Single image for this cat
    age: { en: "1 year", es: "1 año", fr: "1 an" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Small", es: "Pequeño", fr: "Petit" },
    personality: { en: "Gentle and friendly", es: "Gentil y amigable", fr: "Gentil et amical" }
  },
  {
    name: "Porthos",
    type: "cat",
    images: ["/catImages/Porthos.webp", "/catImages/Porthos1.webp", "/catImages/Porthos2.webp"], // Multiple images for this cat
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "No", es: "No", fr: "Non" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: { en: "Playful and curious", es: "Juguetón y curioso", fr: "Joueur et curieux" }
  }
];

export default animalsCandidates;