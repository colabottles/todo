import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../interfaces/todo';

const STORAGE_KEY = 'todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos$ = new BehaviorSubject<Todo[]>(this.loadFromStorage());

  addTodo(todo: Todo) {
    const updated = [...this.todos$.value, todo];
    this.todos$.next(updated);
    this.saveToStorage(updated);
  }

  removeTodo(id: string) {
    const updated = this.todos$.value.filter((t) => t.id !== id);
    this.todos$.next(updated);
    this.saveToStorage(updated);
  }

  toggleComplete(id: string) {
    const updated = this.todos$.value.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.todos$.next(updated);
    this.saveToStorage(updated);
  }

  getTodoById(id: string) {
    return this.todos$.pipe(
      map((todos) => todos.find((t) => t.id === id))
    );
  }

  private loadFromStorage(): Todo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(todos: Todo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
}
