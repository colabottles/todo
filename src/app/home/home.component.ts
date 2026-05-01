import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { TodoService } from '../shared/data-access/todo.service';
import { Todo } from '../shared/interfaces/todo';
import { TodoFormComponent } from './ui/todo-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TodoFormComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonCheckbox,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          <h1>Todo</h1>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <app-todo-form (todoSubmitted)="createTodo($event)"></app-todo-form>
      <ion-list>
        <ion-item
          *ngFor="let todo of todoService.todos$ | async"
          [class.completed]="todo.completed"
        >
          <ion-checkbox
            slot="start"
            [checked]="todo.completed"
            (ionChange)="todoService.toggleComplete(todo.id)"
            [attr.aria-label]="'Mark ' + todo.title + ' as complete'"
          ></ion-checkbox>
          <ion-label style="padding-left: 0.75rem;">
            <a
              [routerLink]="['/detail', todo.id]"
              style="color: inherit; text-decoration: none;"
            >
              {{ todo.title }}
            </a>
          </ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            (click)="todoService.removeTodo(todo.id)"
            [attr.aria-label]="'Delete ' + todo.title"
          >
            Delete
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  `,
  styles: [
    `
      h1 {
        padding: 0 0 0 0.5rem;
        margin: 0;
        font-size: 1.25rem;
        line-height: 1;
      }
      .completed ion-label {
        text-decoration: line-through;
        opacity: 0.5;
      }
      ion-button[color='danger']::part(native) {
        transition:
          background-color 0.2s ease,
          color 0.2s ease;
      }
      ion-button[color='danger']:hover::part(native) {
        background-color: var(--ion-color-danger);
        color: #fff;
        border-radius: 4px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor(public todoService: TodoService) {}

  createTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }
}
