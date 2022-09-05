import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repTask: Repository<Task>
  ) {}

  create(id: string, createTaskDto: CreateTaskDto) {
    if (id) {
      return this.repTask.save({ ...createTaskDto, user: { id } });
    }
    throw new UnauthorizedException();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repTask
      .createQueryBuilder("task")
      .select()
      .leftJoinAndSelect("task.user", "users")
      .where("task.id = :id", { id: updateTaskDto.id })
      .getOne();

    if (id !== task.user.id) {
      throw new UnauthorizedException("This is not your task");
    }

    await this.repTask.update(updateTaskDto.id, updateTaskDto);

    return this.repTask.findOne({ where: { id: updateTaskDto.id } });
  }

  findAll(id: string) {
    return this.repTask.find({
      where: { user: { id } },
      order: { createdAt: "ASC" },
    });
  }

  findOne(id: string, userId: string) {
    return this.repTask.findOne({ where: { id, user: { id: userId } } });
  }

  async remove(id: string, userId: string) {
    const task = await this.repTask.findOne({
      where: { id, user: { id: userId } },
    });

    if (!task) {
      throw new UnauthorizedException("This is not your task");
    }
    return this.repTask.delete(id);
  }

  async removeAll(id: string) {
    const tasks = await this.repTask.find({
      where: { user: { id } },
    });

    const promises: Promise<DeleteResult | undefined>[] = [];

    for (const task of tasks) {
      promises.push(this.repTask.delete(task.id));
    }

    const result = await Promise.all(promises);
    return { message: `Delete ${result.length} tasks` };
  }
}
