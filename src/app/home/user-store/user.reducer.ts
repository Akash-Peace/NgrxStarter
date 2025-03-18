import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '../models/user.model';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users, error: null })),
  on(UserActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.updateUser, (state) => ({ ...state, loading: true, error: null })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    error: null
  })),
  on(UserActions.updateAllUser, (state) => ({ ...state, loading: true, error: null })),
);

