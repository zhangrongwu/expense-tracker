import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        username: string;
        transactions: import("../entities/transaction.entity").Transaction[];
        createdAt: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        user: Partial<import("../entities/user.entity").User>;
    }>;
}
