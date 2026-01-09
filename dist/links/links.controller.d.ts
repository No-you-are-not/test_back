import { LinksService } from './links.service';
import { GenerateLinkDto } from './dto/generate-link.dto';
import { LinkResponseDto, DocumentResponseDto } from './dto/link-response.dto';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
    generateLink(generateLinkDto: GenerateLinkDto): LinkResponseDto;
    redeemLink(token: string): DocumentResponseDto;
}
