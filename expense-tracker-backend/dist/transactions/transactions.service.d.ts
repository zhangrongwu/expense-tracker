import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { User } from '../entities/user.entity';
export declare class TransactionsService {
    private transactionRepository;
    constructor(transactionRepository: Repository<Transaction>);
    create(createTransactionDto: CreateTransactionDto, user: User): Promise<Transaction>;
    findAll(user: User): Promise<Transaction[]>;
    findOne(id: number, user: User): Promise<Transaction>;
    remove(id: number, user: User): Promise<void>;
    getStatistics(user: User): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
}
