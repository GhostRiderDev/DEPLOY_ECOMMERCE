/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/product-app/src/config/data-source.ts":
/*!****************************************************!*\
  !*** ./apps/product-app/src/config/data-source.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectionSource = void 0;
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const ProductEntity_1 = __webpack_require__(/*! ../entity/ProductEntity */ "./apps/product-app/src/entity/ProductEntity.ts");
const CategoryEntity_1 = __webpack_require__(/*! ../entity/CategoryEntity */ "./apps/product-app/src/entity/CategoryEntity.ts");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'postgres',
    host: process.env.PRODUCT_DB_HOST,
    port: +process.env.PRODUCT_DB_PORT,
    database: process.env.PRODUCT_DB_NAME,
    username: process.env.PRODUCT_DB_USERNAME,
    password: process.env.PRODUCT_DB_PASSWORD,
    entities: [ProductEntity_1.ProductEntity, CategoryEntity_1.CategoryEntity],
    migrations: [],
    logging: ['error'],
    synchronize: true,
};
exports["default"] = (0, config_1.registerAs)('data-source', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);


/***/ }),

/***/ "./apps/product-app/src/entity/CategoryEntity.ts":
/*!*******************************************************!*\
  !*** ./apps/product-app/src/entity/CategoryEntity.ts ***!
  \*******************************************************/
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
exports.CategoryEntity = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const ProductEntity_1 = __webpack_require__(/*! ./ProductEntity */ "./apps/product-app/src/entity/ProductEntity.ts");
let CategoryEntity = class CategoryEntity {
};
exports.CategoryEntity = CategoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], CategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductEntity_1.ProductEntity, (product) => product.category),
    __metadata("design:type", Array)
], CategoryEntity.prototype, "products", void 0);
exports.CategoryEntity = CategoryEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Category' })
], CategoryEntity);


/***/ }),

/***/ "./apps/product-app/src/entity/ProductEntity.ts":
/*!******************************************************!*\
  !*** ./apps/product-app/src/entity/ProductEntity.ts ***!
  \******************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductEntity = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const CategoryEntity_1 = __webpack_require__(/*! ./CategoryEntity */ "./apps/product-app/src/entity/CategoryEntity.ts");
let ProductEntity = class ProductEntity {
};
exports.ProductEntity = ProductEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], ProductEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image_url',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: 'https://cdns.iconmonstr.com/wp-content/releases/preview/2019/240/iconmonstr-product-3.png',
    }),
    __metadata("design:type", String)
], ProductEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false, name: 'id_category' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "idCategory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => CategoryEntity_1.CategoryEntity, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'id_category' }),
    __metadata("design:type", typeof (_a = typeof CategoryEntity_1.CategoryEntity !== "undefined" && CategoryEntity_1.CategoryEntity) === "function" ? _a : Object)
], ProductEntity.prototype, "category", void 0);
exports.ProductEntity = ProductEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'Product' })
], ProductEntity);


/***/ }),

/***/ "./apps/product-app/src/product-app.controller.ts":
/*!********************************************************!*\
  !*** ./apps/product-app/src/product-app.controller.ts ***!
  \********************************************************/
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
exports.ProductAppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_app_service_1 = __webpack_require__(/*! ./product-app.service */ "./apps/product-app/src/product-app.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let ProductAppController = class ProductAppController {
    constructor(productAppService) {
        this.productAppService = productAppService;
    }
    async getProducts() {
        const products = await this.productAppService.findAll();
        return products;
    }
    async getProduct(id) {
        const product = await this.productAppService.findOne(id);
        return JSON.stringify(product);
    }
    createProduct(product) {
        return this.productAppService.create(product);
    }
    updateProduct(data) {
        console.log("*************PASA POR AQUI***************", data);
        this.productAppService.update(data.id, data.product);
    }
    deleteProduct(id) {
        return this.productAppService.delete(id);
    }
    reduceStock(id) {
        this.productAppService.reduceStock(id);
    }
};
exports.ProductAppController = ProductAppController;
__decorate([
    (0, microservices_1.MessagePattern)("MS-PRODUCTS-GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProductAppController.prototype, "getProducts", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-PRODUCT-GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof crypto_1.UUID !== "undefined" && crypto_1.UUID) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ProductAppController.prototype, "getProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-PRODUCT-POST"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ProductAppController.prototype, "createProduct", null);
__decorate([
    (0, microservices_1.EventPattern)("MS-PRODUCT-PUT"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductAppController.prototype, "updateProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-PRODUCTS-DELETE"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProductAppController.prototype, "deleteProduct", null);
__decorate([
    (0, microservices_1.EventPattern)("MS-PRODUCT-STOCK-REDUCED"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductAppController.prototype, "reduceStock", null);
exports.ProductAppController = ProductAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof product_app_service_1.ProductAppService !== "undefined" && product_app_service_1.ProductAppService) === "function" ? _a : Object])
], ProductAppController);


/***/ }),

/***/ "./apps/product-app/src/product-app.module.ts":
/*!****************************************************!*\
  !*** ./apps/product-app/src/product-app.module.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const product_app_controller_1 = __webpack_require__(/*! ./product-app.controller */ "./apps/product-app/src/product-app.controller.ts");
const product_app_service_1 = __webpack_require__(/*! ./product-app.service */ "./apps/product-app/src/product-app.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const data_source_1 = __webpack_require__(/*! ./config/data-source */ "./apps/product-app/src/config/data-source.ts");
const ProductEntity_1 = __webpack_require__(/*! ./entity/ProductEntity */ "./apps/product-app/src/entity/ProductEntity.ts");
const CategoryEntity_1 = __webpack_require__(/*! ./entity/CategoryEntity */ "./apps/product-app/src/entity/CategoryEntity.ts");
let ProductAppModule = class ProductAppModule {
};
exports.ProductAppModule = ProductAppModule;
exports.ProductAppModule = ProductAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [data_source_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('data-source'),
            }),
            typeorm_1.TypeOrmModule.forFeature([ProductEntity_1.ProductEntity, CategoryEntity_1.CategoryEntity]),
        ],
        controllers: [product_app_controller_1.ProductAppController],
        providers: [product_app_service_1.ProductAppService],
    })
], ProductAppModule);


/***/ }),

/***/ "./apps/product-app/src/product-app.service.ts":
/*!*****************************************************!*\
  !*** ./apps/product-app/src/product-app.service.ts ***!
  \*****************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductAppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const ProductEntity_1 = __webpack_require__(/*! ./entity/ProductEntity */ "./apps/product-app/src/entity/ProductEntity.ts");
let ProductAppService = class ProductAppService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    findAll() {
        return this.productRepository.find();
    }
    async findOne(id) {
        const productDB = await this.productRepository.findOneBy({ id });
        if (!productDB) {
            return {
                id,
                name: null,
                description: null,
                price: null,
                stock: null,
                imageUrl: null,
                idCategory: null,
                category: null,
            };
        }
        return productDB;
    }
    async create(product) {
        return this.productRepository.save(product);
    }
    async update(id, product) {
        await this.productRepository.update(id, product);
    }
    async delete(id) {
        await this.productRepository.delete(id);
    }
    async reduceStock(id) {
        const productDB = await this.productRepository.findOneBy({ id });
        if (!productDB) {
            throw new common_1.NotFoundException("Product not found");
        }
        productDB.stock -= 1;
        await this.productRepository.update(id, productDB);
    }
};
exports.ProductAppService = ProductAppService;
exports.ProductAppService = ProductAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ProductEntity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ProductAppService);


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

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

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
/*!**************************************!*\
  !*** ./apps/product-app/src/main.ts ***!
  \**************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const product_app_module_1 = __webpack_require__(/*! ./product-app.module */ "./apps/product-app/src/product-app.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(product_app_module_1.ProductAppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'CONSUMER-PRODUCT',
            },
        },
    });
    app.listen();
}
bootstrap();

})();

/******/ })()
;