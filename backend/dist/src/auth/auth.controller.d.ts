import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signup(body: any): Promise<{
        data: {
            id: any;
            email: any;
            role: any;
            token: string;
        };
    }>;
    login(body: any): Promise<{
        data: {
            id: any;
            email: any;
            role: any;
            token: string;
        };
    }>;
    private generateToken;
}
