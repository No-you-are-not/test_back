import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Insert a new link into the database
   */
  insertLink(token: string, documentName: string): void {
    const db = this.databaseService.getDatabase();
    const createdAt = Date.now();

    const stmt = db.prepare(
      'INSERT INTO links (token, document_name, created_at) VALUES (?, ?, ?)',
    );

    stmt.run(token, documentName, createdAt);
  }

  /**
   * Find a link by its token
   */
  findByToken(token: string): Link | null {
    const db = this.databaseService.getDatabase();

    const stmt = db.prepare('SELECT * FROM links WHERE token = ?');
    const result = stmt.get(token) as Link | undefined;

    return result || null;
  }

  /**
   * Mark a link as redeemed
   */
  markRedeemed(token: string): void {
    const db = this.databaseService.getDatabase();
    const redeemedAt = Date.now();

    const stmt = db.prepare(
      'UPDATE links SET redeemed_at = ? WHERE token = ?',
    );

    stmt.run(redeemedAt, token);
  }
}
