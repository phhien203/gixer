import { InjectionToken } from '@angular/core';
import { Octokit } from '@octokit/rest';

export const octokitToken = new InjectionToken<Octokit>('octokit token', {
  providedIn: 'root',
  factory: () =>
    new Octokit({
      auth: process.env['NX_OCTOKIT_ACCESS_KEY'],
    }),
});
