import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Todo } from '../../shared/interfaces/todo';

@Component({
  selector: 'app-todo-form',
  template: `
    <form [formGroup]="todoForm">
      <ion-label>Title</ion-label>
      <ion-input
        type="text"
        formControlName="title"
      ></ion-input>
      <ion-label>Description</ion-label>
      <ion-input
        type="text"
        formControlName="description"
      ></ion-input>
    </form>
  `,
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();
  public todoForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    const value = this.todoForm.value;

    if (this.todoForm.valid && value.title && value.description) {
      const todo: Todo = {
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
