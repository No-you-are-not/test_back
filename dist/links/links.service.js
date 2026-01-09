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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const links_repository_1 = require("./links.repository");
const config_1 = require("@nestjs/config");
let LinksService = class LinksService {
    linksRepository;
    configService;
    constructor(linksRepository, configService) {
        this.linksRepository = linksRepository;
        this.configService = configService;
    }
    generateToken() {
        const buffer = (0, crypto_1.randomBytes)(32);
        return buffer
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
    }
    generateLink(documentName) {
        const token = this.generateToken();
        this.linksRepository.insertLink(token, documentName);
        const baseUrl = this.configService.get('BASE_URL') || 'http://localhost:3000';
        const link = `${baseUrl}/api/docs/view/${token}`;
        return link;
    }
    redeemLink(token) {
        const link = this.linksRepository.findByToken(token);
        if (!link) {
            throw new common_1.NotFoundException('Invalid or expired link.');
        }
        if (link.redeemed_at !== null) {
            throw new common_1.NotFoundException('Invalid or expired link.');
        }
        this.linksRepository.markRedeemed(token);
        return link.document_name;
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [links_repository_1.LinksRepository,
        config_1.ConfigService])
], LinksService);
//# sourceMappingURL=links.service.js.map