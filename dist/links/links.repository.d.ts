import { DatabaseService } from '../database/database.service';
import { Link } from './entities/link.entity';
export declare class LinksRepository {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    insertLink(token: string, documentName: string): void;
    findByToken(token: string): Link | null;
    markRedeemed(token: string): void;
}
