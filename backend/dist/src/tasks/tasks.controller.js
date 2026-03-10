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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const passport_1 = require("@nestjs/passport");
let TasksController = class TasksController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTasks(req, progress, due) {
        const userId = req.user.userId || req.user.sub;
        const whereClause = { userId };
        if (progress)
            whereClause.progress = progress;
        if (due === 'week') {
            const nextWeek = new Date();
            nextWeek.setDate(nextWeek.getDate() + 7);
            whereClause.dueDate = { lte: nextWeek, gte: new Date() };
        }
        else if (due === 'overdue') {
            whereClause.dueDate = { lt: new Date() };
        }
        const tasks = await this.prisma.task.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });
        return { data: tasks.map(t => ({ ...t, _id: t.id })) };
    }
    async createTask(req, body) {
        const userId = req.user.userId || req.user.sub;
        const task = await this.prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                progress: body.progress,
                userId: userId
            },
        });
        return { data: { ...task, _id: task.id } };
    }
    async updateTask(id, body) {
        const { _id, userId, ...updateData } = body;
        if (updateData.dueDate) {
            updateData.dueDate = new Date(updateData.dueDate);
        }
        const task = await this.prisma.task.update({
            where: { id: id },
            data: updateData,
        });
        return { data: { ...task, _id: task.id } };
    }
    async deleteTask(id) {
        await this.prisma.task.delete({ where: { id: id } });
        return { message: 'Deleted successfully' };
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('progress')),
    __param(2, (0, common_1.Query)('due')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTask", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map