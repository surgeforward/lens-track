import { Action } from '@ngrx/store';

export abstract class ActionWithPayload<T = any> implements Action {
  abstract type: string;

  constructor(public payload: T = null) { }
}
