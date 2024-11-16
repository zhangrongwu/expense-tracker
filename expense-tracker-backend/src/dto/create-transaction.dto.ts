import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNotEmpty()
  date: Date;
} 