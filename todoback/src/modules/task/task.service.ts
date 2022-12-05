import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TimePoint } from "../../constants";
import { DeleteResult, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { IdsDto } from "./dto/set-user.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repTask: Repository<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.repTask.save({ ...createTaskDto, time: JSON.stringify([]) });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.repTask
      .createQueryBuilder("task")
      .select()
      .leftJoinAndSelect("task.user", "users")
      .where("task.id = :id", { id: updateTaskDto.id })
      .getOne();

    if (!task.user || id !== task.user.id) {
      throw new UnauthorizedException("This is not your task");
    }

    await this.repTask.update(updateTaskDto.id, updateTaskDto);

    return this.repTask.findOne({ where: { id: updateTaskDto.id } });
  }

  setUser(paramsTask: IdsDto) {
    return this.repTask.update(paramsTask.taskId, {
      user: { id: paramsTask.userId },
    });
  }

  async startTimeTask(taskId: string, userId: string) {
    const task = await this.repTask.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new UnauthorizedException("This is not your task");
    }

    const timePoints = JSON.parse(task.time);
    const length = timePoints.length;

    if (
      !length ||
      (timePoints[length - 1].start && timePoints[length - 1].end)
    ) {
      const point: TimePoint = { start: new Date(), end: null };
      timePoints.push(point);
      return this.repTask.update(task.id, { time: JSON.stringify(timePoints) });
    }

    throw new BadRequestException("Invalid set time point.");
  }

  async endTimeTask(taskId: string, userId: string) {
    const task = await this.repTask.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    if (!task) {
      throw new UnauthorizedException("This is not your task");
    }

    const timePoints = JSON.parse(task.time);
    const length = timePoints.length;

    if (length === 0) {
      throw new BadRequestException("Invalid set time point.");
    }

    if (timePoints[length - 1].start && timePoints[length - 1].end === null) {
      timePoints[length - 1].end = new Date();
      return this.repTask.update(task.id, { time: JSON.stringify(timePoints) });
    }

    throw new BadRequestException("Invalid set time point.");
  }

  findAllByUser(id: string) {
    return this.repTask.find({
      where: { user: { id } },
      order: { createdAt: "ASC" },
    });
  }

  findAll() {
    return this.repTask.find({
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
