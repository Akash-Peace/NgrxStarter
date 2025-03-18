import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { loadUsers, updateAllUser, updateUser } from './user-store/user.actions';
import { User } from './models/user.model';
import { selectError, selectLoading, selectUsers } from './user-store/user.selectors';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styles: [``]
})
export class HomeComponent implements OnInit {
  public users$: Observable<User[]> = new Observable<User[]>();
  public loading$: Observable<boolean> = new Observable<boolean>();
  public error$: Observable<string | null> = new Observable<string | null>();
  public editingId: number | null = null;
  public editAll: boolean = false;
  public userForm: FormGroup = new FormGroup({});

  constructor(private store: Store, private fb: FormBuilder) {}

  get usersFromArr() {
    return this.userForm.get('jsonPlace') as FormArray;
  }  

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    
    this.userForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      jsonPlace: this.fb.array([]),
    });

    this.store.dispatch(loadUsers());
    
    this.users$.subscribe((users: User[]) => {
      users.forEach(user => {
        console.log(user)
        this.usersFromArr.push(
          this.fb.group({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          })
          )
        });
        console.log("aaa ", this.usersFromArr)
      })
      
  }

  editUser(user: User) {
    this.editingId = user.id;
    this.userForm.patchValue(user);
  }

  saveUser() {
    if (this.userForm.valid) {
      this.store.dispatch(updateUser({ user: this.userForm.value }));
      this.editingId = null;
    }
  }

  editAllUser() {
    this.editAll = true;
  }
  saveAllUser() {
    if (this.userForm.valid) {
      this.editAll = false;
      console.log(this.userForm)
      this.store.dispatch(updateAllUser({ users: this.userForm.value }));
    }
  }

}
