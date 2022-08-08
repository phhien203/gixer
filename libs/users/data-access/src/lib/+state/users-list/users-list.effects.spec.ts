import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as UsersActions from './users-list.actions';
import { UsersListEffects } from './users-list.effects';

describe('UsersEffects', () => {
  let actions: Observable<Action>;
  let effects: UsersListEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        UsersListEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(UsersListEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: UsersActions.loadUsers({ username: '', page: 1, per_page: 5 }),
      });

      const expected = hot('-a-|', {
        a: UsersActions.loadUsersSuccess({ items: [], total_count: 0 }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
