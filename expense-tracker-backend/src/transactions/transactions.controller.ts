import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../entities/user.entity';

@Controller('transactions')
@UseGuards(AuthGuard())
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createTransactionDto: CreateTransactionDto,
    @GetUser() user: User,
  ) {
    return this.transactionsService.create(createTransactionDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.transactionsService.findAll(user);
  }

  @Get('statistics')
  getStatistics(@GetUser() user: User) {
    return this.transactionsService.getStatistics(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.transactionsService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.transactionsService.remove(+id, user);
  }
} 