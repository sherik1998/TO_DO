import { ApiProperty } from '@nestjs/swagger';

export class TokensDto {
  @ApiProperty({
    type: String,
    description: 'Access token user',
    example: 'some token',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Time token',
    example: '1h',
  })
  accessTokenExpires: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token user',
    example: 'some token',
  })
  refreshToken: string;
}
