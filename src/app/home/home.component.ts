import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadUsers, updateUser } from './user-store/user.actions';
import { User } from './models/user.model';
import { selectError, selectLoading, selectUsers } from './user-store/user.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public userForm: FormGroup = new FormGroup({});

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    
    this.userForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
    
    this.store.dispatch(loadUsers());
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

}
