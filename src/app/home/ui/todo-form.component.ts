import { Component, EventEmitter, Output } from '@angular/core';
import { IonCard, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Todo } from '../../shared/interfaces/todo';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [IonCard, IonCardContent, IonButton],
  template: `
    <ion-card>
      <ion-card-content>
        <div class="input-group">
          <label for="title">Title</label>
          <input
            #titleInput
            id="title"
            type="text"
            class="native-input"
            placeholder="Todo title"
          />
        </div>
        <div class="input-group">
          <label for="description">Description</label>
          <input
            #descInput
            id="description"
            type="text"
            class="native-input"
            placeholder="Description (optional)"
          />
        </div>
        <ion-button expand="full" (click)="handleSubmit(titleInput, descInput)">
          Add a Todo
        </ion-button>
      </ion-card-content>
    </ion-card>
  `,
  styles: [`
    .input-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: 500;
    }
    .native-input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--ion-color-medium);
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
      background: transparent;
      color: inherit;
    }
  `],
})
export class TodoFormComponent {
  @Output() todoSubmitted = new EventEmitter<Todo>();

  handleSubmit(titleInput: HTMLInputElement, descInput: HTMLInputElement) {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    if (title) {
      const todo: Todo = {
        id: Date.now().toString(),
        title,
        description,
        completed: false,
      };
      this.todoSubmitted.emit(todo);
      titleInput.value = '';
      descInput.value = '';
    }
  }
}
