import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayloadDto } from "../../../services/token/dto/jwt-payload.dto";

import { UserService } from "../../user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("TOKEN_SECRET"),
    });
  }

  async validate(payload: JwtPayloadDto) {
    let user = await this.userService.findByCond({ email: payload.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      ...user,
    };
  }
}
