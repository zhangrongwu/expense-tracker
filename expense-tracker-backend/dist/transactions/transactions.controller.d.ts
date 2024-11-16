import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { User } from '../entities/user.entity';
export declare class TransactionsController {
    private transactionsService;
    constructor(transactionsService: TransactionsService);
    create(createTransactionDto: CreateTransactionDto, user: User): Promise<import("../entities/transaction.entity").Transaction>;
    findAll(user: User): Promise<import("../entities/transaction.entity").Transaction[]>;
    getStatistics(user: User): Promise<{
        totalIncome: number;
        totalExpense: number;
        balance: number;
    }>;
    findOne(id: string, user: User): Promise<import("../entities/transaction.entity").Transaction>;
    remove(id: string, user: User): Promise<void>;
}
