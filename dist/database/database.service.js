"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const bun_sqlite_1 = require("bun:sqlite");
let DatabaseService = class DatabaseService {
    db;
    onModuleInit() {
        this.db = new bun_sqlite_1.Database(':memory:');
        this.db.run(`
      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE NOT NULL,
        document_name TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        redeemed_at INTEGER DEFAULT NULL
      )
    `);
        this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_token ON links(token)
    `);
        console.log('Database initialized successfully');
    }
    getDatabase() {
        return this.db;
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)()
], DatabaseService);
//# sourceMappingURL=database.service.js.map