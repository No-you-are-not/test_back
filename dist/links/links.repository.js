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
exports.LinksRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let LinksRepository = class LinksRepository {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    insertLink(token, documentName) {
        const db = this.databaseService.getDatabase();
        const createdAt = Date.now();
        const stmt = db.prepare('INSERT INTO links (token, document_name, created_at) VALUES (?, ?, ?)');
        stmt.run(token, documentName, createdAt);
    }
    findByToken(token) {
        const db = this.databaseService.getDatabase();
        const stmt = db.prepare('SELECT * FROM links WHERE token = ?');
        const result = stmt.get(token);
        return result || null;
    }
    markRedeemed(token) {
        const db = this.databaseService.getDatabase();
        const redeemedAt = Date.now();
        const stmt = db.prepare('UPDATE links SET redeemed_at = ? WHERE token = ?');
        stmt.run(redeemedAt, token);
    }
};
exports.LinksRepository = LinksRepository;
exports.LinksRepository = LinksRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], LinksRepository);
//# sourceMappingURL=links.repository.js.map