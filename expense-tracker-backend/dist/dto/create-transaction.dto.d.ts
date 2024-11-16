export declare class CreateTransactionDto {
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense';
    date: Date;
}
