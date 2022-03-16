import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

interface ToDo {
  userInput: string;
  selectValue: string;
}

interface Content {
  state: string;
  toDo?: ToDo[] | undefined;
  progress?: ToDo[] | undefined;
  done?: ToDo[] | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angularFirstAssignment';
  Options = ['Easy', 'Medium', 'Hard'];
  userInput: string = '';
  selectValue: string = '';
  rightArrow = faAngleRight;
  leftArrow = faAngleLeft;
  deleteMark = faXmark;
  bars = faBars;

  content: Content[] = [
    {
      state: 'To-Do',
      toDo: [],
    },

    {
      state: 'In Progress',
      progress: [],
    },

    {
      state: 'Done',
      done: [],
    },
  ];

  addTask() {
    let task: ToDo = {
      userInput: this.userInput,
      selectValue: this.selectValue,
    };
    if (this.userInput && this.selectValue) this.content[0].toDo?.push(task);
  }

  deleteTask(index: number) {
    this.content[0].toDo?.splice(index, 1);
  }

  moveToProgress(index: number) {
    let taskInProgress = this.content[0].toDo?.splice(index, 1);
    if (taskInProgress) this.content[1].progress?.push(...taskInProgress);
  }

  moveToToDo(index: number) {
    let taskForTodo = this.content[1]?.progress?.splice(index, 1);
    if (taskForTodo) this.content[0].toDo?.push(...taskForTodo);
  }
  moveToDone(index: number) {
    let taskForDone = this.content[1]?.progress?.splice(index, 1);
    if (taskForDone) this.content[2].done?.push(...taskForDone);
  }
  backToProgress(index: number) {
    let reverse = this.content[2]?.done?.splice(index, 1);
    if (reverse) this.content[1].progress?.push(...reverse);
  }
}
