import { Observable } from 'rxjs';

/**
 * The Octokit REST API client returns promises but supports passing an AbortSignal to abort an HTTP request.
 * Wrapping requests in RxJS observables in this way makes GitHub API requests abortable,
 * meaning they are canceled when no subscribers remain.
 *
 * Ref: The Angular Developer's Nx Handbook, page 61, chapter Creating a data access library
 * (https://leanpub.com/the-angular-developers-nx-handbook)
 * @param promiseFactory
 * @returns Observable
 */
export function abortable<TValue>(
  promiseFactory: (signal: AbortSignal) => Promise<TValue>,
): Observable<TValue> {
  return new Observable((subscriber) => {
    const abortController = new AbortController();

    promiseFactory(abortController.signal)
      .then((value) => {
        if (subscriber.closed) {
          return;
        }
        subscriber.next(value);
        subscriber.complete();
      })
      .catch((error: unknown) => {
        if (subscriber.closed) {
          return;
        }
        subscriber.error(error);
      });

    return () => {
      abortController.abort();
    };
  });
}
