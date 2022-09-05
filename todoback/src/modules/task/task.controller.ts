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

@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    return this.taskService.create(req.user.id, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Req() req) {
    return this.taskService.findAll(req.user.id);
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
