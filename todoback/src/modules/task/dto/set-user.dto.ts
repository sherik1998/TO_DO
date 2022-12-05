import { IsNotEmpty, IsString } from "class-validator";

export class IdsDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
