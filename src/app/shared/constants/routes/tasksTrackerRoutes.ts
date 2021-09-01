import { TasksComponent } from "../../../tasks-module/tasks/tasks.component";
import { Route } from "@angular/router";

export const taskTrackerRoutes: Route[] =[
  {
    path: 'tasksTracker',
    component: TasksComponent
  }
]
