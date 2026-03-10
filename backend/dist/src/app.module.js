"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_controller_1 = require("./auth/auth.controller");
const tasks_controller_1 = require("./tasks/tasks.controller");
const prisma_service_1 = require("./prisma/prisma.service");
const jwt_strategy_1 = require("./auth/jwt.strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'my_super_secret_jwt_key_123',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        controllers: [auth_controller_1.AuthController, tasks_controller_1.TasksController],
        providers: [prisma_service_1.PrismaService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map