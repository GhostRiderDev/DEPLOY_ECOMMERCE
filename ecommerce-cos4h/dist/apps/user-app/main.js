/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/user-app/src/config/data-source.ts":
/*!*************************************************!*\
  !*** ./apps/user-app/src/config/data-source.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectionSource = void 0;
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_entity_1 = __webpack_require__(/*! ../entity/user.entity */ "./apps/user-app/src/entity/user.entity.ts");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'oracle',
    host: process.env.USERS_DB_HOST,
    port: +process.env.USERS_DB_PORT,
    database: process.env.USERS_DB_NAME,
    username: process.env.USERS_DB_USERNAME,
    password: process.env.USERS_DB_PASSWORD,
    sid: process.env.USERS_DB_SID,
    entities: [user_entity_1.UserEntity],
    migrations: [],
    logging: ['error'],
    synchronize: true,
};
exports["default"] = (0, config_1.registerAs)('data-source', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);


/***/ }),

/***/ "./apps/user-app/src/entity/user.entity.ts":
/*!*************************************************!*\
  !*** ./apps/user-app/src/entity/user.entity.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 50, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 100, unique: true, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 100, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 20, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 20, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar2', length: 30, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "city", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('User')
], UserEntity);


/***/ }),

/***/ "./apps/user-app/src/user-app.controller.ts":
/*!**************************************************!*\
  !*** ./apps/user-app/src/user-app.controller.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_app_service_1 = __webpack_require__(/*! ./user-app.service */ "./apps/user-app/src/user-app.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let UserAppController = class UserAppController {
    constructor(userAppService) {
        this.userAppService = userAppService;
    }
    async getUsers({ page, limit, }) {
        return await this.userAppService.findAll(page, limit);
    }
    async getUser(id) {
        const userDB = await this.userAppService.findOne(id);
        return JSON.stringify(userDB);
    }
    async createUser(user) {
        const response = await this.userAppService.create(user);
        return JSON.stringify(response);
    }
    async updateUser(data) {
        const response = await this.userAppService.update(data.id, data.user);
        return JSON.stringify(response);
    }
    deleteUser(id) {
        return this.userAppService.delete(id);
    }
};
exports.UserAppController = UserAppController;
__decorate([
    (0, microservices_1.MessagePattern)('MS-USERS-GET'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserAppController.prototype, "getUsers", null);
__decorate([
    (0, microservices_1.MessagePattern)('MS-USER-GET'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], UserAppController.prototype, "getUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('MS-USER-POST'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserAppController.prototype, "createUser", null);
__decorate([
    (0, microservices_1.EventPattern)('MS-USER-PUT'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserAppController.prototype, "updateUser", null);
__decorate([
    (0, microservices_1.EventPattern)('MS-USER-DELETE'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserAppController.prototype, "deleteUser", null);
exports.UserAppController = UserAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_app_service_1.UserAppService !== "undefined" && user_app_service_1.UserAppService) === "function" ? _a : Object])
], UserAppController);


/***/ }),

/***/ "./apps/user-app/src/user-app.module.ts":
/*!**********************************************!*\
  !*** ./apps/user-app/src/user-app.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_app_controller_1 = __webpack_require__(/*! ./user-app.controller */ "./apps/user-app/src/user-app.controller.ts");
const user_app_service_1 = __webpack_require__(/*! ./user-app.service */ "./apps/user-app/src/user-app.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ./entity/user.entity */ "./apps/user-app/src/entity/user.entity.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const data_source_1 = __webpack_require__(/*! ./config/data-source */ "./apps/user-app/src/config/data-source.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let UserAppModule = class UserAppModule {
};
exports.UserAppModule = UserAppModule;
exports.UserAppModule = UserAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [data_source_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => configService.get('data-source'),
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            microservices_1.ClientsModule.register([
                {
                    name: 'MS-ORDERS',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'CONSUMER-ORDER',
                        },
                    },
                },
            ]),
        ],
        controllers: [user_app_controller_1.UserAppController],
        providers: [user_app_service_1.UserAppService],
    })
], UserAppModule);


/***/ }),

/***/ "./apps/user-app/src/user-app.service.ts":
/*!***********************************************!*\
  !*** ./apps/user-app/src/user-app.service.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserAppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_entity_1 = __webpack_require__(/*! ./entity/user.entity */ "./apps/user-app/src/entity/user.entity.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let UserAppService = class UserAppService {
    constructor(userRepository, clientOrders) {
        this.userRepository = userRepository;
        this.clientOrders = clientOrders;
    }
    async findAll(page, limit) {
        try {
            const users = await this.userRepository.find({
                select: ['id', 'name', 'email', 'phone', 'address', 'country', 'city'],
                skip: (page - 1) * limit,
                take: limit,
            });
            const usersWithOrders = await Promise.all(users.map(async (user) => {
                const ordersUser = await (0, rxjs_1.firstValueFrom)(this.clientOrders.send('MS-ORDERS-USER-GET', user.id));
                return { ...user, ...ordersUser };
            }));
            return usersWithOrders;
        }
        catch (error) {
            console.log(error);
        }
    }
    async findOne(id) {
        const userDB = await this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.id',
            'user.name',
            'user.email',
            'user.phone',
            'user.address',
            'user.country',
            'user.city',
        ])
            .where('user.id = :id', { id })
            .getOne();
        if (!userDB) {
            return null;
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.clientOrders.send('MS-ORDERS-USER-GET', userDB.id));
        const ordersWithIdAndDate = response.orders.map((order) => {
            return {
                id: order.id,
                date: order.date,
            };
        });
        return { ...userDB, orders: ordersWithIdAndDate };
    }
    async create(user) {
        const userDB = await this.userRepository.findOneBy({ email: user.email });
        if (userDB) {
            return { status: 400, data: 'User already exists' };
        }
        await this.userRepository.save(user);
        return { status: 201, data: 'User created' };
    }
    async update(id, user) {
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id });
    }
    async delete(id) {
        await this.userRepository.delete(id);
    }
    async onModuleInit() {
        this.clientOrders.subscribeToResponseOf('MS-ORDERS-USER-GET');
        await this.clientOrders.connect();
    }
};
exports.UserAppService = UserAppService;
exports.UserAppService = UserAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, common_1.Inject)('MS-ORDERS')),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _b : Object])
], UserAppService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************************!*\
  !*** ./apps/user-app/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const user_app_module_1 = __webpack_require__(/*! ./user-app.module */ "./apps/user-app/src/user-app.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(user_app_module_1.UserAppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'CONSUMER-USER',
            },
        },
    });
    app.listen();
}
bootstrap();

})();

/******/ })()
;