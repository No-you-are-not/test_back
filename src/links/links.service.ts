import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomBytes } from 'crypto';
import { LinksRepository } from './links.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinksService {
  constructor(
    private readonly linksRepository: LinksRepository,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate a cryptographically secure token
   */
  private generateToken(): string {
    // Generate 32 random bytes and convert to base64url
    const buffer = randomBytes(32);
    return buffer
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  /**
   * Generate a secure link for a document
   */
  generateLink(documentName: string): string {
    const token = this.generateToken();

    // Store in repository
    this.linksRepository.insertLink(token, documentName);

    // Construct full URL
    const baseUrl =
      this.configService.get<string>('BASE_URL') || 'http://localhost:3000';
    // Remove trailing slash from baseUrl if present to avoid double slashes
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const link = `${cleanBaseUrl}/docs/view/${token}`;

    return link;
  }

  /**
   * Redeem a secure link (one-time use)
   */
  redeemLink(token: string): string {
    // Find the link by token
    const link = this.linksRepository.findByToken(token);

    // Check if token exists
    if (!link) {
      throw new NotFoundException('Invalid or expired link.');
    }

    // Check if already redeemed
    if (link.redeemed_at !== null) {
      throw new NotFoundException('Invalid or expired link.');
    }

    // Mark as redeemed
    this.linksRepository.markRedeemed(token);

    // Return document name
    return link.document_name;
  }
}
