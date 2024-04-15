/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/file-app/src/config/cloudinary.config.ts":
/*!*******************************************************!*\
  !*** ./apps/file-app/src/config/cloudinary.config.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cloudinaryConfig = void 0;
const cloudinary_1 = __webpack_require__(/*! cloudinary */ "cloudinary");
const dotenv_1 = __webpack_require__(/*! dotenv */ "dotenv");
(0, dotenv_1.config)({ path: '.env' });
exports.cloudinaryConfig = {
    provide: 'CLOUDINARY',
    useFactory: () => cloudinary_1.v2.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }),
};


/***/ }),

/***/ "./apps/file-app/src/file-app.controller.ts":
/*!**************************************************!*\
  !*** ./apps/file-app/src/file-app.controller.ts ***!
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileAppController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_app_service_1 = __webpack_require__(/*! ./file-app.service */ "./apps/file-app/src/file-app.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let FileAppController = class FileAppController {
    constructor(fileAppService) {
        this.fileAppService = fileAppService;
    }
    async uploadImageProduct(file) {
        const image = await this.fileAppService.uploadImage(file, "products");
        return image.secure_url;
    }
    async deleteImageByUrl(url) {
        this.fileAppService.deleteFile(url);
    }
};
exports.FileAppController = FileAppController;
__decorate([
    (0, microservices_1.MessagePattern)("MS-FILE-PRODUCT-POST"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileAppController.prototype, "uploadImageProduct", null);
__decorate([
    (0, microservices_1.EventPattern)("MS-FILE-DELETE"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FileAppController.prototype, "deleteImageByUrl", null);
exports.FileAppController = FileAppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof file_app_service_1.FileAppService !== "undefined" && file_app_service_1.FileAppService) === "function" ? _a : Object])
], FileAppController);


/***/ }),

/***/ "./apps/file-app/src/file-app.module.ts":
/*!**********************************************!*\
  !*** ./apps/file-app/src/file-app.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileAppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const file_app_controller_1 = __webpack_require__(/*! ./file-app.controller */ "./apps/file-app/src/file-app.controller.ts");
const file_app_service_1 = __webpack_require__(/*! ./file-app.service */ "./apps/file-app/src/file-app.service.ts");
const cloudinary_config_1 = __webpack_require__(/*! ./config/cloudinary.config */ "./apps/file-app/src/config/cloudinary.config.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let FileAppModule = class FileAppModule {
};
exports.FileAppModule = FileAppModule;
exports.FileAppModule = FileAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: "MS-PRODUCTS",
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ["localhost:902"],
                        },
                    },
                },
            ]),
        ],
        controllers: [file_app_controller_1.FileAppController],
        providers: [file_app_service_1.FileAppService, cloudinary_config_1.cloudinaryConfig],
    })
], FileAppModule);


/***/ }),

/***/ "./apps/file-app/src/file-app.service.ts":
/*!***********************************************!*\
  !*** ./apps/file-app/src/file-app.service.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileAppService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cloudinary_1 = __webpack_require__(/*! cloudinary */ "cloudinary");
const crypto_1 = __webpack_require__(/*! crypto */ "crypto");
let FileAppService = class FileAppService {
    async uploadImage(file, folder) {
        const bufer = Buffer.from(file.buffer.data);
        file.filename = (0, crypto_1.randomUUID)().toString();
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ resource_type: "image", folder }, (error, result) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(result);
                }
            });
            upload.write(bufer);
            upload.end();
        });
    }
    async deleteFile(url) {
        const publicId = url.split("/").pop().split(".")[0];
        await cloudinary_1.v2.api.delete_resources([`products/${publicId}`]);
    }
};
exports.FileAppService = FileAppService;
exports.FileAppService = FileAppService = __decorate([
    (0, common_1.Injectable)()
], FileAppService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

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

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("cloudinary");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

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
/*!***********************************!*\
  !*** ./apps/file-app/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const file_app_module_1 = __webpack_require__(/*! ./file-app.module */ "./apps/file-app/src/file-app.module.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(file_app_module_1.FileAppModule, {
        transport: microservices_1.Transport.KAFKA,
        options: {
            client: {
                brokers: ["localhost:9092"],
            },
            consumer: {
                groupId: "CONSUMER-FILE",
            },
        },
    });
    app.listen();
}
bootstrap();

})();

/******/ })()
;