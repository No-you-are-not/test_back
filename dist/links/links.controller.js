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
exports.LinksController = void 0;
const common_1 = require("@nestjs/common");
const links_service_1 = require("./links.service");
const generate_link_dto_1 = require("./dto/generate-link.dto");
const link_response_dto_1 = require("./dto/link-response.dto");
let LinksController = class LinksController {
    linksService;
    constructor(linksService) {
        this.linksService = linksService;
    }
    generateLink(generateLinkDto) {
        const link = this.linksService.generateLink(generateLinkDto.documentName);
        return { link };
    }
    redeemLink(token) {
        const documentName = this.linksService.redeemLink(token);
        return { documentName };
    }
};
exports.LinksController = LinksController;
__decorate([
    (0, common_1.Post)('generate-link'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_link_dto_1.GenerateLinkDto]),
    __metadata("design:returntype", link_response_dto_1.LinkResponseDto)
], LinksController.prototype, "generateLink", null);
__decorate([
    (0, common_1.Get)('docs/view/:token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", link_response_dto_1.DocumentResponseDto)
], LinksController.prototype, "redeemLink", null);
exports.LinksController = LinksController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
//# sourceMappingURL=links.controller.js.map