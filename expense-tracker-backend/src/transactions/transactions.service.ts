import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto, user: User): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      ...createTransactionDto,
      user,
    });
    return this.transactionRepository.save(transaction);
  }

  async findAll(user: User): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: { user: { id: user.id } },
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number, user: User): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }

  async remove(id: number, user: User): Promise<void> {
    const result = await this.transactionRepository.delete({
      id,
      user: { id: user.id },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
  }

  async getStatistics(user: User) {
    const transactions = await this.findAll(user);
    
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }
} 