import { TestBed } from '@angular/core/testing';
import { DeepPartial } from '@gixer/users/util';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subscription } from 'rxjs';
import { State } from '../users.reducers';
import {
  getUsersListCriteriaPage,
  getUsersListCriteriaState,
} from './users-list-criteria.selectors';

describe('UsersListCriteriaSelectors', () => {
  let storeSpy: MockStore<DeepPartial<State>>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    storeSpy = TestBed.inject(MockStore);

    storeSpy.setState({
      users: {
        usersListCriteria: {
          username: 'hien pham',
          page: 1,
          per_page: 30,
        },
      },
    });
  });

  describe('SELECTOR: getUsersListCriteriaState', () => {
    let result: unknown;
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersListCriteriaState).subscribe((val) => {
        result = val;
      });
    });

    Then('should return users list criteria data', () => {
      expect(result).toEqual({
        username: 'hien pham',
        page: 1,
        per_page: 30,
      });
      sub.unsubscribe();
    });
  });

  describe('SELECTOR: getUsersListCriteriaPage', () => {
    let result: unknown;
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersListCriteriaPage).subscribe((val) => {
        result = val;
      });
    });

    Then('should return list page state', () => {
      expect(result).toEqual(1);
      sub.unsubscribe();
    });
  });
});
