import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Todo } from '../../shared/interfaces/todo';

@Component({
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm" (ngSubmit)="handleSubmit()">
      <ion-card>
        <ion-card-title>
          <ion-label>Title</ion-label>
          <ion-input
            type="text"
            formControlName="title"
            label="Title"
          ></ion-input>
        </ion-card-title>
        <ion-card-content>
          <ion-label>Description</ion-label>
          <ion-input
          type="text"
          formControlName="description"
          label="Description"
        ></ion-input>
          <ion-button expand="full" type="submit">Add a Todo</ion-button>
        </ion-card-content>
      </ion-card>
    </form>
  `,
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();

  public todoForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder) { }

  handleSubmit() {
    const value = this.todoForm.value;

    if (this.todoForm.valid && value.title && value.description) {
      const todo: Todo = {
        id: Date.now().toString(),
        title: value.title,
        description: value.description,
      };

      this.todoSubmitted.emit(todo);
    }
  }
}

@NgModule({
  declarations: [TodoFormComponent],
  exports: [TodoFormComponent],
  imports: [IonicModule, ReactiveFormsModule],
})
export class TodoFormComponentModule { }
