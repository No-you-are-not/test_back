import { LinksRepository } from './links.repository';
import { ConfigService } from '@nestjs/config';
export declare class LinksService {
    private readonly linksRepository;
    private readonly configService;
    constructor(linksRepository: LinksRepository, configService: ConfigService);
    private generateToken;
    generateLink(documentName: string): string;
    redeemLink(token: string): string;
}
