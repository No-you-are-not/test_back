import { Injectable, OnModuleInit } from '@nestjs/common';
import { Database } from 'bun:sqlite';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private db: Database;

  onModuleInit() {
    // Initialize in-memory SQLite database
    this.db = new Database(':memory:');

    // Create the links table
    this.db.run(`
      CREATE TABLE IF NOT EXISTS links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE NOT NULL,
        document_name TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        redeemed_at INTEGER DEFAULT NULL
      )
    `);

    // Create index for fast token lookup
    this.db.run(`
      CREATE INDEX IF NOT EXISTS idx_token ON links(token)
    `);

    console.log('Database initialized successfully');
  }

  getDatabase(): Database {
    return this.db;
  }
}
