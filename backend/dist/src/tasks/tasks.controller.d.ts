import { PrismaService } from '../prisma/prisma.service';
export declare class TasksController {
    private prisma;
    constructor(prisma: PrismaService);
    getTasks(req: any, progress?: string, due?: string): Promise<{
        data: {
            _id: string;
            id: string;
            title: string;
            description: string | null;
            dueDate: Date | null;
            progress: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    createTask(req: any, body: any): Promise<{
        data: {
            _id: string;
            id: string;
            title: string;
            description: string | null;
            dueDate: Date | null;
            progress: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateTask(id: string, body: any): Promise<{
        data: {
            _id: string;
            id: string;
            title: string;
            description: string | null;
            dueDate: Date | null;
            progress: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    deleteTask(id: string): Promise<{
        message: string;
    }>;
}
