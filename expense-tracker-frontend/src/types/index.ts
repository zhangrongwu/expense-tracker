export interface User {
  id: number;
  email: string;
  username: string;
}

export interface Transaction {
  id: number;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
  user?: User;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface Statistics {
  totalIncome: number;
  totalExpense: number;
  balance: number;
} 