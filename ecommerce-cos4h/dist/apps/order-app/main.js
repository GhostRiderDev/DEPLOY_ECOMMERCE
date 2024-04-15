/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/order-app/src/config/data-source.ts":
/*!**************************************************!*\
  !*** ./apps/order-app/src/config/data-source.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    uri: `mongodb://${process.env.ORDER_DB_HOST}:${process.env.ORDER_DB_PORT}/${process.env.ORDER_DB_NAME}`,
    user: process.env.ORDER_DB_USERNAME,
    pass: process.env.ORDER_DB_PASSWORD,
};
exports["default"] = (0, config_1.registerAs)('data-source', () => config);


/***/ }),

/***/ "./apps/order-app/src/dto/order.dto.ts":
/*!*********************************************!*\
  !*** ./apps/order-app/src/dto/order.dto.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDto = void 0;
class OrderDto {
}
exports.OrderDto = OrderDto;


/***/ }),

/***/ "./apps/order-app/src/module/order-detail/order-detail/order-detail.module.ts":
/*!************************************************************************************!*\
  !*** ./apps/order-app/src/module/order-detail/order-detail/order-detail.module.ts ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderDetailModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const order_detail_service_1 = __webpack_require__(/*! ./order-detail.service */ "./apps/order-app/src/module/order-detail/order-detail/order-detail.service.ts");
let OrderDetailModule = class OrderDetailModule {
};
exports.OrderDetailModule = OrderDetailModule;
exports.OrderDetailModule = OrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [order_detail_service_1.OrderDetailService],
    })
], OrderDetailModule);


/***/ }),

/***/ "./apps/order-app/src/module/order-detail/order-detail/order-detail.service.ts":
/*!*************************************************************************************!*\
  !*** ./apps/order-app/src/module/order-detail/order-detail/order-detail.service.ts ***!
  \*************************************************************************************/
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
exports.OrderDetailService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let OrderDetailService = class OrderDetailService {
    constructor(orderDetailModel, clientOrders) {
        this.orderDetailModel = orderDetailModel;
        this.clientOrders = clientOrders;
    }
    async create(ids_products) {
        try {
            const allProducts = await Promise.all(ids_products.map(async (id) => {
                const product = await (0, rxjs_1.firstValueFrom)(this.clientOrders.send("MS-PRODUCT-GET", id));
                if (!product.name) {
                    throw new common_1.BadRequestException(`Product with id ${id} not found`);
                }
                return product;
            }));
            const totalPrice = this.calculateTotalPrice(allProducts);
            const orderDetailToSave = new this.orderDetailModel();
            orderDetailToSave.price = totalPrice;
            orderDetailToSave.products = allProducts;
            orderDetailToSave.save();
            return { status: 201, data: orderDetailToSave._id };
        }
        catch (error) {
            throw error;
        }
    }
    findAll() {
        return `This action returns all orderDetail`;
    }
    findOne(id) {
        return `This action returns a #${id} orderDetail`;
    }
    update(id, updateOrderDetailDto) {
        return `This action updates a #${id} orderDetail`;
    }
    remove(id) {
        return `This action removes a #${id} orderDetail`;
    }
    calculateTotalPrice(orderDetail) {
        return orderDetail.reduce((acc, product) => {
            if (product.stock === 0)
                return acc;
            return acc + Number(product.price);
        }, 0);
    }
    async updateUrlProductImage(idProduct, newImageUrl) {
        try {
            await this.orderDetailModel.updateMany({ "products.id": idProduct }, { $set: { "products.$[prod].imageUrl": newImageUrl } }, { arrayFilters: [{ "prod.id": idProduct }] });
        }
        catch (error) {
            console.error(error);
        }
    }
    async onModuleInit() {
        this.clientOrders.subscribeToResponseOf("MS-PRODUCT-GET");
        await this.clientOrders.connect();
    }
};
exports.OrderDetailService = OrderDetailService;
exports.OrderDetailService = OrderDetailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("OrderDetail")),
    __param(1, (0, common_1.Inject)("MS-PRODUCTS")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _b : Object])
], OrderDetailService);


/***/ }),

/***/ "./apps/order-app/src/order-app.controller.ts":
/*!****************************************************!*\
  !*** ./apps/order-app/src/order-app.controller.ts ***!
  \****************************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderAppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const order_app_service_1 = __webpack_require__(/*! ./order-app.service */ "./apps/order-app/src/order-app.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const order_dto_1 = __webpack_require__(/*! ./dto/order.dto */ "./apps/order-app/src/dto/order.dto.ts");
let OrderAppController = class OrderAppController {
    constructor(orderAppService) {
        this.orderAppService = orderAppService;
    }
    async addOrder(order) {
        const response = await this.orderAppService.saveOrder(order);
        return response;
    }
    getOrders() {
        return this.orderAppService.findOrders();
    }
    async getOrder(id) {
        const order = await this.orderAppService.findOrder(id);
        return JSON.stringify(order);
    }
    updateOrder({ id, order }) {
        return this.orderAppService.updateOrder(id, order);
    }
    getOrdersUser(id_user) {
        return this.orderAppService.findOrdersUser(id_user);
    }
    updateProductImage(data) {
        this.orderAppService.updateImageUrlProduct(data.id, data.url);
    }
};
exports.OrderAppController = OrderAppController;
__decorate([
    (0, microservices_1.MessagePattern)("MS-ORDER-POST"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof order_dto_1.OrderDto !== "undefined" && order_dto_1.OrderDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], OrderAppController.prototype, "addOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-ORDERS-GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderAppController.prototype, "getOrders", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-ORDER-GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderAppController.prototype, "getOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-ORDER-PUT"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderAppController.prototype, "updateOrder", null);
__decorate([
    (0, microservices_1.MessagePattern)("MS-ORDERS-USER-GET"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderAppController.prototype, "getOrdersUser", null);
__decorate([
    (0, microservices_1.EventPattern)("MS-ORDER-UPDATE-PRODUCT-IMAGE"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderAppController.prototype, "updateProductImage", null);
exports.OrderAppController = OrderAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof order_app_service_1.OrderAppService !== "undefined" && order_app_service_1.OrderAppService) === "function" ? _a : Object])
], OrderAppController);


/***/ }),

/***/ "./apps/order-app/src/order-app.module.ts":
/*!************************************************!*\
  !*** ./apps/order-app/src/order-app.module.ts ***!
  \************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const order_app_service_1 = __webpack_require__(/*! ./order-app.service */ "./apps/order-app/src/order-app.service.ts");
const order_app_controller_1 = __webpack_require__(/*! ./order-app.controller */ "./apps/order-app/src/order-app.controller.ts");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const data_source_1 = __webpack_require__(/*! ./config/data-source */ "./apps/order-app/src/config/data-source.ts");
const order_schema_1 = __webpack_require__(/*! ./schema/order.schema */ "./apps/order-app/src/schema/order.schema.ts");
const orderDetails_schema_1 = __webpack_require__(/*! ./schema/orderDetails.schema */ "./apps/order-app/src/schema/orderDetails.schema.ts");
const order_detail_service_1 = __webpack_require__(/*! ./module/order-detail/order-detail/order-detail.service */ "./apps/order-app/src/module/order-detail/order-detail/order-detail.service.ts");
const order_detail_module_1 = __webpack_require__(/*! ./module/order-detail/order-detail/order-detail.module */ "./apps/order-app/src/module/order-detail/order-detail/order-detail.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let OrderAppModule = class OrderAppModule {
};
exports.OrderAppModule = OrderAppModule;
exports.OrderAppModule = OrderAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [data_source_1.default],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (configService) => configService.get('data-source'),
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: orderDetails_schema_1.OrderDetail.name, schema: orderDetails_schema_1.OrderDetailSchema },
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'MS-PRODUCTS',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'productClient',
                            brokers: ['localhost:9092'],
                        },
                        consumer: { groupId: 'CONSUMER-PRODUCT' },
                    },
                },
                {
                    name: 'MS-USERS',
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: 'orderClient',
                            brokers: ['localhost:9092'],
                        },
                        consumer: {
                            groupId: 'CONSUMER-USER',
                        },
                    },
                },
            ]),
        ],
        controllers: [order_app_controller_1.OrderAppController],
        providers: [order_app_service_1.OrderAppService, order_detail_module_1.OrderDetailModule, order_detail_service_1.OrderDetailService],
    })
], OrderAppModule);


/***/ }),

/***/ "./apps/order-app/src/order-app.service.ts":
/*!*************************************************!*\
  !*** ./apps/order-app/src/order-app.service.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderAppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
const order_detail_service_1 = __webpack_require__(/*! ./module/order-detail/order-detail/order-detail.service */ "./apps/order-app/src/module/order-detail/order-detail/order-detail.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let OrderAppService = class OrderAppService {
    constructor(orderModel, orderDetailService, clientUsers) {
        this.orderModel = orderModel;
        this.orderDetailService = orderDetailService;
        this.clientUsers = clientUsers;
    }
    async saveOrder(order) {
        try {
            const responseDetail = await this.orderDetailService.create(order.ids_products);
            if (responseDetail.status !== 201) {
                return responseDetail;
            }
            const orderToSave = new this.orderModel();
            orderToSave.date = new Date();
            orderToSave.id_user = order.id_user;
            orderToSave.order_detail_id = responseDetail.data;
            await orderToSave.save();
            return { status: 201, data: "Order saved" };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                return { status: 400, data: error.message };
            }
            else {
                return { status: 500, data: "Internal server error" };
            }
        }
    }
    async findOrders() {
        const orders = await this.orderModel
            .find()
            .populate("order_detail_id")
            .exec();
        return orders;
    }
    async findOrdersUser(id_user) {
        const orders = await this.orderModel
            .find({ id_user })
            .populate("order_detail_id")
            .exec();
        return { orders };
    }
    async findOrder(id) {
        const order = await this.orderModel
            .findById(Object(id))
            .populate("order_detail_id")
            .exec();
        if (!order) {
            return new microservices_1.RpcException("Order not found");
        }
        return order;
    }
    async updateOrder(id, order) {
        const orderToUpdate = await this.orderModel.findById(id).exec();
        if (!orderToUpdate) {
            return new microservices_1.RpcException("Order not found");
        }
        orderToUpdate.id_user = order.id_user;
        orderToUpdate.date = new Date();
        await orderToUpdate.save();
        return { status: 200, data: "Order updated" };
    }
    updateImageUrlProduct(idProduct, newImgUrl) {
        this.orderDetailService.updateUrlProductImage(idProduct, newImgUrl);
    }
    async onModuleInit() {
        this.clientUsers.subscribeToResponseOf("MS-USER-GET");
        await this.clientUsers.connect();
    }
};
exports.OrderAppService = OrderAppService;
exports.OrderAppService = OrderAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Order")),
    __param(2, (0, common_1.Inject)("MS-USERS")),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof order_detail_service_1.OrderDetailService !== "undefined" && order_detail_service_1.OrderDetailService) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientKafka !== "undefined" && microservices_1.ClientKafka) === "function" ? _c : Object])
], OrderAppService);


/***/ }),

/***/ "./apps/order-app/src/schema/order.schema.ts":
/*!***************************************************!*\
  !*** ./apps/order-app/src/schema/order.schema.ts ***!
  \***************************************************/
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
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
const mongoose_2 = __webpack_require__(/*! mongoose */ "mongoose");
let Order = class Order {
};
exports.Order = Order;
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now, required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Order.prototype, "id_user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'OrderDetail' }),
    __metadata("design:type", typeof (_b = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _b : Object)
], Order.prototype, "order_detail_id", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ collection: 'order' })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
exports.OrderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    },
});
exports.OrderSchema.virtual('id').get(function () {
    return this._id.toString();
});


/***/ }),

/***/ "./apps/order-app/src/schema/orderDetails.schema.ts":
/*!**********************************************************!*\
  !*** ./apps/order-app/src/schema/orderDetails.schema.ts ***!
  \**********************************************************/
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
exports.OrderDetailSchema = exports.OrderDetail = void 0;
const mongoose_1 = __webpack_require__(/*! @nestjs/mongoose */ "@nestjs/mongoose");
let OrderDetail = class OrderDetail {
};
exports.OrderDetail = OrderDetail;
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
        get: (price) => parseFloat(price.toFixed(2)),
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array), required: true, name: 'products' }),
    __metadata("design:type", Array)
], OrderDetail.prototype, "products", void 0);
exports.OrderDetail = OrderDetail = __decorate([
    (0, mongoose_1.Schema)({ collection: 'orderDetail' })
], OrderDetail);
exports.OrderDetailSchema = mongoose_1.SchemaFactory.createForClass(OrderDetail);
exports.OrderDetailSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.OrderDetailSchema.virtual('id').get(function () {
    return this._id.toString();
});


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

/***/ "@nestjs/mongoose":
/*!***********************************!*\
  !*** external "@nestjs/mongoose" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

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
/*!************************************!*\
  !*** ./apps/order-app/src/main.ts ***!
  \************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const order_app_module_1 = __webpack_require__(/*! ./order-app.module */ "./apps/order-app/src/order-app.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    process.env.KAFKAJS_NO_PARTITIONER_WARNING = '1';
    const app = await core_1.NestFactory.createMicroservice(order_app_module_1.OrderAppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            subscribe: {
                fromBeginning: true,
            },
            client: {
                brokers: ['localhost:9092'],
            },
        },
    });
    app.listen();
}
bootstrap();

})();

/******/ })()
;