import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { JwtAuthGuard } from "../user/guards/jwt-auth.guard";
import { IdsDto } from "./dto/set-user.dto";

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Req() req) {
    return this.taskService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("all")
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req) {
    return this.taskService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateTaskDto: UpdateTaskDto, @Req() req) {
    return this.taskService.update(req.user.id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("set_user")
  setUser(@Body() userSetDto: IdsDto) {
    return this.taskService.setUser(userSetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("start/:id")
  startTimeTask(@Param("id") taskId: string, @Req() req) {
    return this.taskService.startTimeTask(taskId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch("end/:id")
  endTimeTask(@Param("id") taskId: string, @Req() req) {
    return this.taskService.endTimeTask(taskId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("one/:id")
  remove(@Param("id") id: string, @Req() req) {
    return this.taskService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("all")
  removeAll(@Req() req) {
    return this.taskService.removeAll(req.user.id);
  }
}
