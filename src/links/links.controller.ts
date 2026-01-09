import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { GenerateLinkDto } from './dto/generate-link.dto';
import {
  LinkResponseDto,
  DocumentResponseDto,
} from './dto/link-response.dto';

@Controller('api')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('generate-link')
  @HttpCode(HttpStatus.CREATED)
  generateLink(@Body() generateLinkDto: GenerateLinkDto): LinkResponseDto {
    const link = this.linksService.generateLink(generateLinkDto.documentName);
    return { link };
  }

  @Get('docs/view/:token')
  @HttpCode(HttpStatus.OK)
  redeemLink(@Param('token') token: string): DocumentResponseDto {
    const documentName = this.linksService.redeemLink(token);
    return { documentName };
  }
}
