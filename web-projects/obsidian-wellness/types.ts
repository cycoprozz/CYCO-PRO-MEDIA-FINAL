export enum SectionId {
  HOME = 'home',
  SERVICES = 'services',
  NUTRITION = 'nutrition',
  GUIDE = 'guide',
  CONTACT = 'contact'
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  image: string;
}

export interface NutritionItem {
  id: string;
  title: string;
  ingredients: string[];
  price: string;
  type: 'smoothie' | 'bowl' | 'meal';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}