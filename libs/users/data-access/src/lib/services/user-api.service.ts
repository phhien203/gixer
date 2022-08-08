import { inject, Injectable } from '@angular/core';
import { abortable, DEFAULT_PAGE_SIZE, UsersResponse } from '@gixer/users/util';
import { Observable, of } from 'rxjs';
import { octokitToken } from '../tokens/octokit.token';

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
              per_page: DEFAULT_PAGE_SIZE,
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
