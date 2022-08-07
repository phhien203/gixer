import { Observable } from 'rxjs';

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
