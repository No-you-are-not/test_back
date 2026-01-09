import { OnModuleInit } from '@nestjs/common';
import { Database } from 'bun:sqlite';
export declare class DatabaseService implements OnModuleInit {
    private db;
    onModuleInit(): void;
    getDatabase(): Database;
}
