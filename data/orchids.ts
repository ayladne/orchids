
export interface Orchid {
  id: string;
  name: string;
  scientificName: string;
  family: string;
  origin: string;
  description: string;
  careLevel: 'Facile' | 'Modéré' | 'Difficile';
  bloomingSeason: string;
  colors: string[];
  size: string;
  lightRequirement: string;
  waterRequirement: string;
  temperature: string;
  humidity: string;
  image: string;
  isFeatured?: boolean;
}

export const orchidsData: Orchid[] = [
  {
    id: '1',
    name: 'Phalaenopsis',
    scientificName: 'Phalaenopsis amabilis',
    family: 'Orchidaceae',
    origin: 'Asie du Sud-Est',
    description: 'L\'orchidée papillon est l\'une des orchidées les plus populaires et faciles à cultiver. Ses fleurs élégantes ressemblent à des papillons en vol.',
    careLevel: 'Facile',
    bloomingSeason: 'Toute l\'année',
    colors: ['Blanc', 'Rose', 'Violet', 'Jaune'],
    size: '30-60 cm',
    lightRequirement: 'Lumière indirecte',
    waterRequirement: 'Modéré',
    temperature: '18-25°C',
    humidity: '50-70%',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Cattleya',
    scientificName: 'Cattleya labiata',
    family: 'Orchidaceae',
    origin: 'Amérique du Sud',
    description: 'Connue comme la reine des orchidées, la Cattleya produit de grandes fleurs parfumées aux couleurs vives et éclatantes.',
    careLevel: 'Modéré',
    bloomingSeason: 'Automne-Hiver',
    colors: ['Violet', 'Rose', 'Blanc', 'Jaune'],
    size: '20-40 cm',
    lightRequirement: 'Lumière vive',
    waterRequirement: 'Modéré à faible',
    temperature: '15-28°C',
    humidity: '50-80%',
    image: 'https://images.unsplash.com/photo-1583160247711-2191776b4b91?w=400&h=300&fit=crop',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Dendrobium',
    scientificName: 'Dendrobium nobile',
    family: 'Orchidaceae',
    origin: 'Asie',
    description: 'Genre très diversifié d\'orchidées épiphytes, les Dendrobium offrent une grande variété de formes et de couleurs.',
    careLevel: 'Modéré',
    bloomingSeason: 'Printemps',
    colors: ['Blanc', 'Rose', 'Violet', 'Jaune', 'Orange'],
    size: '15-100 cm',
    lightRequirement: 'Lumière vive',
    waterRequirement: 'Variable selon la saison',
    temperature: '10-30°C',
    humidity: '50-70%',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Cymbidium',
    scientificName: 'Cymbidium hybridum',
    family: 'Orchidaceae',
    origin: 'Asie',
    description: 'Orchidées terrestres robustes, parfaites pour les débutants. Elles produisent de longues tiges florales spectaculaires.',
    careLevel: 'Facile',
    bloomingSeason: 'Hiver-Printemps',
    colors: ['Vert', 'Jaune', 'Rose', 'Blanc', 'Rouge'],
    size: '40-80 cm',
    lightRequirement: 'Lumière vive à mi-ombre',
    waterRequirement: 'Régulier',
    temperature: '10-25°C',
    humidity: '40-60%',
    image: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Vanda',
    scientificName: 'Vanda coerulea',
    family: 'Orchidaceae',
    origin: 'Asie du Sud-Est',
    description: 'Orchidées épiphytes aux racines aériennes, célèbres pour leurs fleurs bleues uniques dans le monde des orchidées.',
    careLevel: 'Difficile',
    bloomingSeason: 'Automne',
    colors: ['Bleu', 'Violet', 'Rose', 'Blanc'],
    size: '30-100 cm',
    lightRequirement: 'Lumière très vive',
    waterRequirement: 'Quotidien',
    temperature: '20-30°C',
    humidity: '70-90%',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=300&fit=crop',
    isFeatured: true,
  },
  {
    id: '6',
    name: 'Oncidium',
    scientificName: 'Oncidium sphacelatum',
    family: 'Orchidaceae',
    origin: 'Amérique tropicale',
    description: 'Surnommées "orchidées danseuses" pour leurs petites fleurs qui semblent danser au moindre souffle d\'air.',
    careLevel: 'Modéré',
    bloomingSeason: 'Automne-Hiver',
    colors: ['Jaune', 'Brun', 'Rouge', 'Blanc'],
    size: '20-60 cm',
    lightRequirement: 'Lumière vive',
    waterRequirement: 'Modéré',
    temperature: '15-25°C',
    humidity: '50-70%',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
  },
];
