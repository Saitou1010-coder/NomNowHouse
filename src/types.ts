import { Timestamp } from 'firebase/firestore';

export type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Snack" | "Drink" | "Other";

export interface Recipe {
  id?: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  category: Category;
  rating?: number;
  estimatedTime?: number | null;
  authorId: string;
  householdId: string;
  sourceUrl?: string;
  imageUrl?: string;
  createdAt: Timestamp;
  isStock?: boolean;
  tags?: string[];
  notes?: string;
  winePairing?: string;
  isFavorite?: boolean;
  calories?: number;
  protein?: number;
  fat?: number;
  carbs?: number;
}

export interface Household {
  id?: string;
  name: string;
  ownerId: string;
  members: { [userId: string]: 'admin' | 'member' | 'viewer' };
  createdAt?: Timestamp;
  isStock?: boolean;
  recipesSeeded?: boolean;
  vietnamRecipesSeeded?: boolean;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  favoriteCuisine?: string;
}

export interface MealPlanItem {
  id?: string;
  householdId: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner';
  recipeId?: string;
  title: string;
}

export interface GroceryItem {
  id?: string;
  householdId: string;
  name: string;
  quantity?: string;
  category: string;
  checked: boolean;
  addedBy?: string;
  order?: number;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
