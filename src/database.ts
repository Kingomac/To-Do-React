import Dexie from "dexie";

export type ITask = {
  id?: number;
  name: string;
  completed: boolean;
  category: string;
  created_at: Date;
  updated_at: Date;
};

export class Database extends Dexie {
  tasks: Dexie.Table<ITask, number>;
  constructor() {
    super("Database");
    this.version(3).stores({
      tasks: "++id, name, completed, category, created_at, updated_at",
    });
    this.tasks = this.table("tasks");
  }
}
