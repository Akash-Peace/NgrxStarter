import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map((updatedUser) => UserActions.updateUserSuccess({ user: updatedUser })),
          catchError((error) => of(UserActions.loadFailure({ error: error.message })))
        )
      )
    )
  );

  updateAllUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAllUser),
      switchMap(({ users }) =>
        this.userService.updateAllUser(users).pipe(
          map((users) => UserActions.loadUsersSuccess({ users })),
          catchError((error) => of(UserActions.loadFailure({ error: error.message })))
        )
      )
    )
  );
}