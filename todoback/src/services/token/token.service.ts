import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { TokenErrorEnum, TokenTypeEnum } from "../../constants";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  generateAuthToken(payload: JwtPayloadDto) {
    const accessTokenExpires = this.configService.get(
      "ACCESS_TOKEN_EXPIRES_IN"
    );

    const accessToken = this.generateToken(payload, accessTokenExpires);

    return {
      accessToken,
      accessTokenExpires,
    };
  }

  verifyToken(token: string, type: TokenTypeEnum) {
    try {
      return this.jwtService.verify(token);
    } catch ({ name }) {
      if (
        name == TokenErrorEnum.TOKEN_EXPIRED_ERROR &&
        type == TokenTypeEnum.ACCESS_TOKEN
      ) {
        throw new UnauthorizedException();
      }
      if (
        name == TokenErrorEnum.TOKEN_EXPIRED_ERROR &&
        type == TokenTypeEnum.REFRESH_TOKEN
      ) {
        throw new UnauthorizedException();
      }
      throw new UnauthorizedException();
    }
  }

  generateToken(payload: JwtPayloadDto, expiresIn: string) {
    const token = this.jwtService.sign(payload, { expiresIn });
    return token;
  }
}
