"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("../entities/transaction.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    async create(createTransactionDto, user) {
        const transaction = this.transactionRepository.create({
            ...createTransactionDto,
            user,
        });
        return this.transactionRepository.save(transaction);
    }
    async findAll(user) {
        return this.transactionRepository.find({
            where: { user: { id: user.id } },
            order: { date: 'DESC' },
        });
    }
    async findOne(id, user) {
        const transaction = await this.transactionRepository.findOne({
            where: { id, user: { id: user.id } },
        });
        if (!transaction) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }
    async remove(id, user) {
        const result = await this.transactionRepository.delete({
            id,
            user: { id: user.id },
        });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Transaction with ID ${id} not found`);
        }
    }
    async getStatistics(user) {
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
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map