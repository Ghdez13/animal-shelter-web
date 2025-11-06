// This file contains all animals available for adoption.
// Each animal object includes its type (dog, cat, other), images (desktop and mobile), and details in three languages (en, es, fr).

export const animalsCandidates = [
  // ===== Dogs =====
  {
    name: "Bimbo",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Bimbo.webp",
        "/dogImages/Bimbo1.webp",
        "/dogImages/Bimbo2.webp",
      ],
      mobile: [
        "/dogImages/BimboMobile.webp",
        "/dogImages/Bimbo1Mobile.webp",
        "/dogImages/Bimbo2Mobile.webp",
      ],
    },
    age: { en: "11 months", es: "11 meses", fr: "11 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Friendly and playful",
      es: "Amigable y juguetón",
      fr: "Amical et joueur",
    },
  },
  {
    name: "Bolillo",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Bolillo.webp",
        "/dogImages/Bolillo1.webp",
        "/dogImages/Bolillo2.webp",
        "/dogImages/Bolillo3.webp",
      ],
      mobile: [
        "/dogImages/BolilloMobile.webp",
        "/dogImages/Bolillo1Mobile.webp",
        "/dogImages/Bolillo2Mobile.webp",
        "/dogImages/Bolillo3Mobile.webp",
      ],
    },
    age: { en: "4 months", es: "4 meses", fr: "4 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Calm and affectionate",
      es: "Tranquilo y cariñoso",
      fr: "Calme et affectueux",
    },
  },
  {
    name: "Bonnie",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Bonnie.webp",
        "/dogImages/Bonnie1.webp",
        "/dogImages/Bonnie2.webp",
      ],
      mobile: [
        "/dogImages/BonnieMobile.webp",
        "/dogImages/Bonnie1Mobile.webp",
        "/dogImages/Bonnie2Mobile.webp",
      ],
    },
    age: { en: "9 months", es: "9 meses", fr: "9 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Playful and sweet",
      es: "Juguetona y dulce",
      fr: "Joueuse et douce",
    },
  },
  {
    name: "Chilindrina",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Chilindrina.webp",
        "/dogImages/Chilindrina1.webp",
        "/dogImages/Chilindrina2.webp",
      ],
      mobile: [
        "/dogImages/ChilindrinaMobile.webp",
        "/dogImages/Chilindrina1Mobile.webp",
        "/dogImages/Chilindrina2Mobile.webp",
      ],
    },
    age: { en: "1 year", es: "1 año", fr: "1 an" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Calm and obedient",
      es: "Calmada y obediente",
      fr: "Calme et obéissante",
    },
  },
  {
    name: "Elektra",
    type: "dog",
    images: {
      desktop: ["/dogImages/Elektra.webp", "/dogImages/Elektra1.webp"],
      mobile: [
        "/dogImages/ElektraMobile.webp",
        "/dogImages/Elektra1Mobile.webp",
      ],
    },
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Large", es: "Grande", fr: "Grande" },
    personality: {
      en: "Energetic and protective",
      es: "Enérgica y protectora",
      fr: "Énergique et protectrice",
    },
  },
  {
    name: "Judy & Jimmi",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Judy&Jimmi.webp",
        "/dogImages/Judy&Jimmi1.webp",
        "/dogImages/Judy&Jimmi2.webp",
        "/dogImages/Judy&Jimmi3.webp",
      ],
      mobile: [
        "/dogImages/Judy&JimmiMobile.webp",
        "/dogImages/Judy&Jimmi1Mobile.webp",
        "/dogImages/Judy&Jimmi2Mobile.webp",
        "/dogImages/Judy&Jimmi3Mobile.webp",
      ],
    },
    age: {
      en: "2 years & 5 months",
      es: "2 años y 5 meses",
      fr: "2 ans & 5 mois",
    },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female & male", es: "Hembra y macho", fr: "Femelle & Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Friendly and sociable. Adoption together",
      es: "Amigables y sociables. Adopción juntos",
      fr: "Amicaux et sociables. Adoption ensemble",
    },
  },
  {
    name: "Kaliman & Solin",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Kaliman&Solin.webp",
        "/dogImages/Kaliman&Solin1.webp",
        "/dogImages/Kaliman&Solin2.webp",
        "/dogImages/Kaliman&Solin3.webp",
        "/dogImages/Kaliman&Solin4.webp",
      ],
      mobile: [
        "/dogImages/Kaliman&SolinMobile.webp",
        "/dogImages/Kaliman&Solin1Mobile.webp",
        "/dogImages/Kaliman&Solin2Mobile.webp",
        "/dogImages/Kaliman&Solin3Mobile.webp",
        "/dogImages/Kaliman&Solin4Mobile.webp",
      ],
    },
    age: {
      en: "3 months & 4 months",
      es: "3 meses & 4 meses",
      fr: "3 mois & 4 mois",
    },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Males", es: "Machos", fr: "Mâles" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Playful and protective",
      es: "Juguetones y guardianes",
      fr: "Joueurs et protecteurs",
    },
  },
  {
    name: "Odin",
    type: "dog",
    images: {
      desktop: ["/dogImages/Odin.webp", "/dogImages/Odin1.webp"],
      mobile: ["/dogImages/OdinMobile.webp", "/dogImages/Odin1Mobile.webp"],
    },
    age: { en: "2 years", es: "2 años", fr: "2 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Large", es: "Grande", fr: "Grande" },
    personality: {
      en: "Serious but affectionate",
      es: "Serio pero cariñoso",
      fr: "Sérieux mais affectueux",
    },
  },
  {
    name: "Panzas",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Panzas.webp",
        "/dogImages/Panzas1.webp",
        "/dogImages/Panzas2.webp",
      ],
      mobile: [
        "/dogImages/PanzasMobile.webp",
        "/dogImages/Panzas1Mobile.webp",
        "/dogImages/Panzas2Mobile.webp",
      ],
    },
    age: { en: "6 months", es: "6 meses", fr: "6 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Calm and playful",
      es: "Tranquilo y juguetón",
      fr: "Calme et joueur",
    },
  },
  {
    name: "Princesa",
    type: "dog",
    images: {
      desktop: [
        "/dogImages/Princesa.webp",
        "/dogImages/Princesa1.webp",
        "/dogImages/Princesa2.webp",
      ],
      mobile: [
        "/dogImages/PrincesaMobile.webp",
        "/dogImages/Princesa1Mobile.webp",
        "/dogImages/Princesa2Mobile.webp",
      ],
    },
    age: { en: "3 years", es: "3 años", fr: "3 ans" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female", es: "Hembra", fr: "Femelle" },
    size: { en: "Medium", es: "Mediano", fr: "Moyen" },
    personality: {
      en: "Affectionate and active",
      es: "Cariñosa y activa",
      fr: "Affectueuse et active",
    },
  },

  // ===== Cats =====
  {
    name: "Gatitos",
    type: "cat",
    images: {
      desktop: ["/catImages/Gatitos.webp"],
      mobile: ["/catImages/GatitosMobile.webp"],
    },
    age: { en: "5 months", es: "5 meses", fr: "5 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Female & male", es: "Hembra & macho", fr: "Femelle & Mâle" },
    size: { en: "Small", es: "Pequeños", fr: "Petits" },
    personality: {
      en: "Playful and curious",
      es: "Juguetones y curiosos",
      fr: "Joueurs et curieux",
    },
  },
  {
    name: "Porthos",
    type: "cat",
    images: {
      desktop: [
        "/catImages/Porthos.webp",
        "/catImages/Porthos1.webp",
        "/catImages/Porthos2.webp",
      ],
      mobile: [
        "/catImages/PorthosMobile.webp",
        "/catImages/Porthos1Mobile.webp",
        "/catImages/Porthos2Mobile.webp",
      ],
    },
    age: { en: "4 months", es: "4 meses", fr: "4 mois" },
    sterilized: { en: "Yes", es: "Sí", fr: "Oui" },
    sex: { en: "Male", es: "Macho", fr: "Mâle" },
    size: { en: "Small", es: "Pequeño", fr: "Petit" },
    personality: {
      en: "Sociable and playful",
      es: "Sociable y juguetón",
      fr: "Sociable et joueur",
    },
  },
];

export default animalsCandidates;
