import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GenerateLinkDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  documentName: string;
}
