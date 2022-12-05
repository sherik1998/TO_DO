import { User } from "../../user/entities/user.entity";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseDateColumn, TimePoint } from "../../../constants";

@Entity({ name: "tasks" })
export class Task extends BaseDateColumn {
  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({ type: "text", nullable: true })
  text: string | null;

  @Column({ type: "text" })
  time: string;

  @Column({ default: false })
  isCheck: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  timePoints: number | null;

  @AfterLoad()
  timePointFromJson() {
    if (this.time) {
      const points: TimePoint[] = JSON.parse(this.time);
      if (points.length) {
        let milliseconds = 0;
        for (let i = 0; i < points.length; i++) {
          if (points[i].end && points[i].start) {
            milliseconds =
              milliseconds +
              (+new Date(points[i].end) - +new Date(points[i].start));
          }
        }
        this.timePoints = milliseconds;
      } else {
        this.timePoints = 0;
      }
    }
  }
}
