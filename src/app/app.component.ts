import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container"
    style="margin-top: 30px;"
  >
    <h1>Todo App</h1>
    <hr>
    <div *ngIf="!isUpdateFormActive; else active" >
    <div class="form-group">
      <input [(ngModel)]="work" type="text" name="work" id="work" 
      [class]="changeInputClass()" placeholder="Type here"
      >
      <div class="invalid-feedback">Invalid Text</div>
    </div>
    <hr>
    <div class="form-group mt-2">
      <button
        [disabled]="!isValidValues"
        (click)="save()" 
        class="btn btn-primary w-100"
        >Add</button>
    </div>
    </div>

    <ng-template #active>
    <div  class="form-group">
      <input [(ngModel)]="updateWork" type="text" name="work" id="work" class="form-control" placeholder="Type here"
      >
    </div>
    <hr>
    <div class="form-group mt-2">
      <button
        (click)="update()" 
        class="btn btn-info w-100"
        >Update</button>
        <button (click)="get()" class="mt-1 btn btn-secondary w-100">
          Cancel
        </button>
    </div>
    </ng-template>
    <hr>
    <ul>
      <li class="mt-1" *ngFor="let w of works let i = index">
      {{w}}
      <div *ngIf="!isUpdateFormActive">
        <button
          (click)="remove(i)"
          class="btn btn-danger btn-sm mx-2">Delete</button>
          <button
          (click)="get(w,i)"
          class="btn btn-warning btn-sm">Update</button>
          </div>
        </li>
    </ul>
  </div>
  
  `
})
export class AppComponent {
  isUpdateFormActive: boolean = false
  isValidValues: boolean = false
  work: string = ""
  updateWork: string = ""
  works: string[] = ["Deneme1", "Deneme2", "Deneme3"]
  index: number = 0
  save() {
    this.works.push(this.work)
    this.work = ""
  }

  remove(index: number) {
    let result: boolean = confirm("Are you sure?")
    if (result) {
      this.works.splice(index, 1);
    }
  }
  get(work?: string, index?: number) {
    if (!this.isUpdateFormActive && work != null && index != null) {
      this.updateWork = work
      this.index = index
    }
    this.isUpdateFormActive = !this.isUpdateFormActive
  }

  update() {
    this.works[this.index] = this.updateWork
    this.isUpdateFormActive = false
  }

  changeInputClass() {
    if (this.work.length < 3 || this.work.length > 50 || this.work.startsWith(" ")) {
      this.isValidValues = false
      return "form-control is-invalid"
    }
    this.isValidValues = true
    return "form-control is-valid"
  }
}
