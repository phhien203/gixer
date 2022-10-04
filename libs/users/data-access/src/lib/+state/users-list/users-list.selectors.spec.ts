import { TestBed } from '@angular/core/testing';
import { DeepPartial, UserModel } from '@gixer/users/util';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subscription } from 'rxjs';
import { State } from '../users.reducers';
import {
  getUsersError,
  getUsersItems,
  getUsersListState,
  getUsersLoaded,
  getUsersTotalCount,
} from './users-list.selectors';

function createFakeUser(override?: Partial<UserModel>): UserModel {
  return {
    id: 1,
    login: 'fake login name',
    html_url: 'fake html',
    avatar_url: 'fake avatar url',
    ...override,
  };
}

describe('UserListSelectors', () => {
  let storeSpy: MockStore<DeepPartial<State>>;
  const fakeItems = [createFakeUser(), createFakeUser()];

  Given(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });

    storeSpy = TestBed.inject(MockStore);

    storeSpy.setState({
      users: {
        usersList: {
          items: fakeItems,
          total_count: 20,
          loaded: true,
        },
      },
    });
  });

  describe('SELECTOR: getUsersListState', () => {
    let result: unknown;
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersListState).subscribe((val) => {
        result = val;
      });
    });

    Then('should return users list data', () => {
      expect(result).toEqual({
        items: fakeItems,
        total_count: 20,
        loaded: true,
      });
      sub.unsubscribe();
    });
  });

  describe('SELECTOR: getUsersItems', () => {
    let result: UserModel[] = [];
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersItems).subscribe((val) => {
        result = val;
      });
    });

    Then('should return items data', () => {
      expect(result).toEqual(fakeItems);
      sub.unsubscribe();
    });
  });

  describe('SELECTOR: getUsersTotalCount', () => {
    let result = 0;
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersTotalCount).subscribe((val) => {
        result = val;
      });
    });

    Then('should return total count', () => {
      expect(result).toEqual(20);
      sub.unsubscribe();
    });
  });

  describe('SELECTOR: getUsersLoaded', () => {
    let result = false;
    let sub: Subscription;

    When(() => {
      sub = storeSpy.select(getUsersLoaded).subscribe((val) => {
        result = val;
      });
    });

    Then('should return loaded', () => {
      expect(result).toEqual(true);
      sub.unsubscribe();
    });
  });

  describe('SELECTOR: getUsersError', () => {
    let result = '';
    let sub: Subscription;

    Given(() => {
      storeSpy.setState({
        users: {
          usersList: {
            error: 'Something went wrong',
          },
        },
      });
    });

    When(() => {
      sub = storeSpy.select(getUsersError).subscribe((val) => {
        result = val;
      });
    });

    Then('should return error', () => {
      expect(result).toEqual('Something went wrong');
      sub.unsubscribe();
    });
  });
});
