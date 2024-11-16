import { Transaction } from './transaction.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    username: string;
    transactions: Transaction[];
    createdAt: Date;
}
