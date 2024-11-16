import { User } from './user.entity';
export declare class Transaction {
    id: number;
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date: Date;
    user: User;
}
