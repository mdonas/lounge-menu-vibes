// Datos de la carta de Luna Lounge

export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  tag?: string;
}

export interface Flavor {
  name: string;
  icon: string;
}

export interface MenuSection {
  title: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface DrinkCategory {
  title: string;
  items: MenuItem[];
}

// Sabores disponibles
export const flavors: Flavor[] = [
  { name: "Menta", icon: "🌿" },
  { name: "Sandía", icon: "🍉" },
  { name: "Melocotón", icon: "🍑" },
  { name: "Uva", icon: "🍇" },
  { name: "Mango", icon: "🥭" },
  { name: "Limón", icon: "🍋" },
  { name: "Fresa", icon: "🍓" },
  { name: "Manzana", icon: "🍏" },
  { name: "Arándano", icon: "🫐" },
  { name: "Coco", icon: "🥥" },
  { name: "Piña", icon: "🍍" },
  { name: "Cereza", icon: "🍒" },
];

// Cachimbas clásicas
export const cachimbasClasicas: MenuSection = {
  title: "Cachimbas Clásicas",
  subtitle: "Selección tradicional de sabores puros",
  items: [
    {
      name: "Individual",
      description: "Un sabor a elegir de nuestra selección",
      price: "15€",
    },
    {
      name: "Dúo",
      description: "Mezcla de dos sabores a tu gusto",
      price: "17€",
    },
    {
      name: "Trío",
      description: "Combinación de tres sabores",
      price: "19€",
    },
  ],
};

// Cachimbas premium
export const cachimbasPremium: MenuSection = {
  title: "Cachimbas Premium",
  subtitle: "Experiencias exclusivas con tabaco de alta gama",
  items: [
    {
      name: "Frozen Mist",
      description: "Menta glacial con eucalipto y hielo",
      price: "22€",
      tag: "Favorito",
    },
    {
      name: "Tropical Sunset",
      description: "Mango, maracuyá y un toque de coco",
      price: "22€",
    },
    {
      name: "Berry Dreams",
      description: "Arándanos, frambuesa y mora silvestre",
      price: "22€",
      tag: "Nuevo",
    },
    {
      name: "Golden Rose",
      description: "Pétalos de rosa con miel y vainilla",
      price: "24€",
      tag: "Premium",
    },
  ],
};

// Mezclas de la casa
export const mezclasCasa: MenuSection = {
  title: "Mezclas de la Casa",
  subtitle: "Creaciones exclusivas de nuestros maestros",
  items: [
    {
      name: "Luna Night",
      description: "Nuestra firma: uva negra, menta suave y un toque misterioso",
      price: "25€",
      tag: "Signature",
    },
    {
      name: "Arabian Nights",
      description: "Mezcla tradicional de frutas del desierto con especias",
      price: "24€",
    },
    {
      name: "Purple Haze",
      description: "Arándanos, lavanda y un susurro de limón",
      price: "24€",
    },
    {
      name: "Summer Breeze",
      description: "Sandía fresca, pepino y menta",
      price: "23€",
    },
  ],
};

// Bebidas sin alcohol
export const bebidasSinAlcohol: DrinkCategory = {
  title: "Sin Alcohol",
  items: [
    { name: "Agua mineral", price: "2€" },
    { name: "Refresco", description: "Coca-Cola, Fanta, Sprite", price: "3€" },
    { name: "Zumo natural", description: "Naranja, manzana o piña", price: "4€" },
    { name: "Té frío", description: "Melocotón o limón", price: "3.50€" },
  ],
};

// Bebidas especiales
export const bebidasEspeciales: DrinkCategory = {
  title: "Especiales del Lounge",
  items: [
    {
      name: "Luna Lemonade",
      description: "Limonada con lavanda y miel",
      price: "5€",
    },
    {
      name: "Mint Mojito",
      description: "Mocktail de menta, lima y azúcar de caña",
      price: "6€",
    },
    {
      name: "Berry Sensation",
      description: "Frutos rojos, naranja y jengibre",
      price: "6€",
    },
    {
      name: "Golden Hour",
      description: "Mango, maracuyá y agua de coco",
      price: "6€",
      tag: "Favorito",
    },
  ],
};

// Información del local
export const localInfo = {
  name: "Luna Lounge",
  tagline: "Shisha Lounge · Cocktails · Chill",
  address: {
    street: "Calle Juan de Austria, 6",
    city: "45221 Esquivias, Toledo",
  },
  hours: [
    { days: "Lunes - Jueves", time: "18:00 - 02:00" },
    { days: "Viernes - Sábado", time: "18:00 - 04:00" },
    { days: "Domingo", time: "17:00 - 01:00" },
  ],
  social: {
    instagram: "https://www.instagram.com/lunalounge_esquivias/"
  },
};
