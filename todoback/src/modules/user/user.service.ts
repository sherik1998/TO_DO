import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "../../services/token/token.service";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { LoginDto } from "./dto/login-admin.dto";
import { HashHelper } from "../../helpers/hash.helper";
import { JwtPayloadDto } from "../../services/token/dto/jwt-payload.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repUser: Repository<User>,

    private readonly tokenService: TokenService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const oldUser = await this.repUser.findOne({
        where: { email: createUserDto.email },
      });

      if (oldUser) {
        throw new UnauthorizedException("Email already exists");
      }

      const newPassword = await HashHelper.encrypt(createUserDto.password);

      const user = await this.repUser.save({
        ...createUserDto,
        password: newPassword,
      });

      const payload: JwtPayloadDto = { id: user.id, email: user.email };
      const token = this.tokenService.generateAuthToken(payload);
      return { ...user, token };
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }
      throw new BadRequestException();
    }
  }

  async getAllUsers() {
    const users = await this.repUser.find({ order: { createdAt: "ASC" } });
    return users;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.repUser.findOne({
      where: {
        email,
      },
      select: ["id", "email", "password", "name", "createdAt", "updatedAt"],
    });

    const passwordMatch =
      user?.password && (await HashHelper.compare(password, user.password));

    if (!user || !passwordMatch) {
      throw new UnauthorizedException("Not authorized");
    }

    const payload: JwtPayloadDto = { id: user.id, email: user.email };
    const token = this.tokenService.generateAuthToken(payload);

    return { ...user, password: undefined, token };
  }

  findByCond(cond: { [key: string]: string }) {
    return this.repUser.findOne({ where: cond });
  }
}
