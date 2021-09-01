import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
// import { TasksModuleModule } from "./tasks-module/tasks-module.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
// import { appReducers } from "./store/reducers/app.reducers";
import { UpdatedTasksModule } from "./updated-tasks/updated-tasks.module";
import { RouterModule } from "@angular/router";
import {TasksComponent} from "./tasks-module/tasks/tasks.component";
import { TasksModuleModule } from "./tasks-module/tasks-module.module";
import {errorRoutes} from "./shared/constants/routes/errorsRoutes";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(errorRoutes),
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    UpdatedTasksModule,
    TasksModuleModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
