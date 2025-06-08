export interface User {
  id: string;
  username: string;
  email: string;
  fullAddress: string;
  shoppingPreference: 'Supermarket' | 'Local Market' | 'Online Grocery' | 'Farmers Market' | 'Convenience Store';
  registrationDate: string;
  totalEmissions: number;
  emissionsSaved: number;
  points: number;
  profileImage?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  productName: string;
  quantity: number;
  category: string;
  brand?: string;
  emissions: number;
  date: string;
  store: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  avgEmissions: number;
  harmfulnessLevel: 'low' | 'medium' | 'high' | 'extreme';
  alternatives?: string[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  emissionsSaved: number;
  rank: number;
  profileImage?: string;
}