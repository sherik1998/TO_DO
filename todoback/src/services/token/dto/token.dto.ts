import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({
    type: String,
    description: 'Token user',
    example: 'some token',
  })
  @IsString()
  @IsNotEmpty()
  token: string;
}
