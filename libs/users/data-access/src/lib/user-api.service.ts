import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { abortable } from './abortable.operator';
import { octokitToken } from './octokit.token';
import { UsersResponse } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  #octokit = inject(octokitToken);

  findByUsername(username: string, page = 1): Observable<UsersResponse> {
    return username === ''
      ? of({ items: [], total_count: 0 })
      : abortable((signal) =>
          this.#octokit.search
            .users({
              q: username,
              page,
              per_page: 10,
              request: {
                signal,
              },
            })
            .then((res) => {
              return res.data;
            }),
        );
  }

  getUserDescription(username: string) {
    return abortable((signal) =>
      this.#octokit.users
        .getByUsername({
          username,
          request: {
            signal,
          },
        })
        .then((res) => res.data),
    );
  }
}
