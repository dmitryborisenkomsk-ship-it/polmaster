// Product images
import laminate1 from '@/assets/catalog/laminate-1.jpg';
import laminate2 from '@/assets/catalog/laminate-2.jpg';
import parquet1 from '@/assets/catalog/parquet-1.jpg';
import parquet2 from '@/assets/catalog/parquet-2.jpg';
import vinyl1 from '@/assets/catalog/vinyl-1.jpg';
import vinyl2 from '@/assets/catalog/vinyl-2.jpg';
import quartzVinyl1 from '@/assets/catalog/quartz-vinyl-1.jpg';
import quartzVinyl2 from '@/assets/catalog/quartz-vinyl-2.jpg';
import engineered1 from '@/assets/catalog/engineered-1.jpg';
import engineered2 from '@/assets/catalog/engineered-2.jpg';
import cork1 from '@/assets/catalog/cork-1.jpg';
import cork2 from '@/assets/catalog/cork-2.jpg';

export type ProductCategory = 
  | 'Ламинат' 
  | 'Паркетная доска' 
  | 'Виниловый пол' 
  | 'Кварц-винил' 
  | 'Инженерная доска' 
  | 'Пробковое покрытие';

export type WearClass = '21' | '22' | '23' | '31' | '32' | '33' | '34' | '43';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  price: number;
  inStock: boolean;
  image: string;
  wearClass: WearClass;
  waterResistant: boolean;
  thickness: number;
  /** Площадь покрытия одной упаковки, м² */
  packAreaM2: number;
}

export const products: Product[] = [
  // Ламинат
  {
    id: '1',
    name: 'Ламинат Дуб Светлый Premium',
    category: 'Ламинат',
    brand: 'Quick-Step',
    price: 1290,
    inStock: true,
    image: laminate1,
    wearClass: '32',
    waterResistant: false,
    thickness: 8,
    packAreaM2: 2.22,
  },
  {
    id: '2',
    name: 'Ламинат Орех Тёмный Classic',
    category: 'Ламинат',
    brand: 'Tarkett',
    price: 890,
    inStock: true,
    image: laminate2,
    wearClass: '31',
    waterResistant: false,
    thickness: 7,
    packAreaM2: 2.22,
  },
  // Паркетная доска
  {
    id: '3',
    name: 'Паркет Дуб Натуральный Ёлочка',
    category: 'Паркетная доска',
    brand: 'Barlinek',
    price: 3490,
    inStock: true,
    image: parquet1,
    wearClass: '23',
    waterResistant: false,
    thickness: 14,
    packAreaM2: 2.0,
  },
  {
    id: '4',
    name: 'Паркет Ясень Классик',
    category: 'Паркетная доска',
    brand: 'Polarwood',
    price: 2890,
    inStock: false,
    image: parquet2,
    wearClass: '23',
    waterResistant: false,
    thickness: 14,
    packAreaM2: 2.0,
  },
  // Виниловый пол
  {
    id: '5',
    name: 'Винил Серый Камень LVT',
    category: 'Виниловый пол',
    brand: 'Pergo',
    price: 1590,
    inStock: true,
    image: vinyl1,
    wearClass: '33',
    waterResistant: true,
    thickness: 4,
    packAreaM2: 2.22,
  },
  {
    id: '6',
    name: 'Винил Дуб Бежевый Comfort',
    category: 'Виниловый пол',
    brand: 'Egger',
    price: 1290,
    inStock: true,
    image: vinyl2,
    wearClass: '32',
    waterResistant: true,
    thickness: 5,
    packAreaM2: 2.22,
  },
  // Кварц-винил
  {
    id: '7',
    name: 'Кварц-винил Мрамор Светлый SPC',
    category: 'Кварц-винил',
    brand: 'Alpine Floor',
    price: 1890,
    inStock: true,
    image: quartzVinyl1,
    wearClass: '34',
    waterResistant: true,
    thickness: 4,
    packAreaM2: 2.22,
  },
  {
    id: '8',
    name: 'Кварц-винил Дуб Медовый SPC',
    category: 'Кварц-винил',
    brand: 'FineFloor',
    price: 1690,
    inStock: false,
    image: quartzVinyl2,
    wearClass: '33',
    waterResistant: true,
    thickness: 5,
    packAreaM2: 2.22,
  },
  // Инженерная доска
  {
    id: '9',
    name: 'Инженерная доска Дуб Натур',
    category: 'Инженерная доска',
    brand: 'Coswick',
    price: 4290,
    inStock: true,
    image: engineered1,
    wearClass: '23',
    waterResistant: false,
    thickness: 15,
    packAreaM2: 2.0,
  },
  {
    id: '10',
    name: 'Инженерная доска Орех Американский',
    category: 'Инженерная доска',
    brand: 'Kahrs',
    price: 5890,
    inStock: true,
    image: engineered2,
    wearClass: '23',
    waterResistant: false,
    thickness: 15,
    packAreaM2: 2.0,
  },
  // Пробковое покрытие
  {
    id: '11',
    name: 'Пробка Натуральная Classico',
    category: 'Пробковое покрытие',
    brand: 'Corkstyle',
    price: 2190,
    inStock: true,
    image: cork1,
    wearClass: '31',
    waterResistant: true,
    thickness: 10,
    packAreaM2: 1.8,
  },
  {
    id: '12',
    name: 'Пробка Дуб Рустик Print',
    category: 'Пробковое покрытие',
    brand: 'Wicanders',
    price: 2490,
    inStock: false,
    image: cork2,
    wearClass: '32',
    waterResistant: true,
    thickness: 11,
    packAreaM2: 1.8,
  },
];

export const categories: ProductCategory[] = [
  'Ламинат',
  'Паркетная доска',
  'Виниловый пол',
  'Кварц-винил',
  'Инженерная доска',
  'Пробковое покрытие',
];

export const brands = [
  'Quick-Step',
  'Tarkett',
  'Barlinek',
  'Polarwood',
  'Pergo',
  'Egger',
  'Alpine Floor',
  'FineFloor',
  'Coswick',
  'Kahrs',
  'Corkstyle',
  'Wicanders',
];

export const wearClasses: WearClass[] = ['21', '22', '23', '31', '32', '33', '34', '43'];

export const thicknesses = [4, 5, 7, 8, 10, 11, 14, 15];
