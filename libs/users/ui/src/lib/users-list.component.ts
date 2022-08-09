import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';
import {
  DEFAULT_PAGE_SIZE,
  UserModel,
  UsersListState,
} from '@gixer/users/util';
import { TuiMapperPipeModule } from '@taiga-ui/cdk';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiPaginationModule } from '@taiga-ui/kit';

@Component({
  selector: 'gixer-users-users-list',
  standalone: true,
  imports: [
    CommonModule,
    TuiLoaderModule,
    TuiPaginationModule,
    TuiMapperPipeModule,
  ],
  template: `
    <tui-loader
      size="l"
      [showLoader]="!usersListState ? false : !usersListState.loaded"
      [overlay]="true"
    >
      <p
        *ngIf="usersListState?.error"
        class="text-red-400 text-center text-lg mt-4"
      >
        {{ usersListState?.error }}
      </p>

      <h3
        *ngIf="usersListState?.total_count ?? 0 > 0"
        class="text-center text-lg mt-4"
      >
        {{ usersListState?.total_count }} users found
      </h3>

      <tui-pagination
        *ngIf="usersListState?.total_count ?? 0 > 0"
        class="my-4"
        [sidePadding]="5"
        [index]="currentPageIndex"
        [length]="usersListState?.total_count ?? 0 | tuiMapper: getTotalPage"
        (indexChange)="pageIndexChanges.emit($event)"
      ></tui-pagination>

      <article
        *ngFor="let user of usersListState?.items ?? []; trackBy: trackByUserId"
        class=" flex bg-slate-50 p-4 shadow-xl ring-1 ring-gray-900/5 my-4 rounded-md"
      >
        <div class="w-[60px] h-[60px] flex-none">
          <img
            loading="lazy"
            class="w-full h-full rounded-full"
            [src]="user.avatar_url"
            [alt]="'User ' + user.login + ' avatar'"
          />
        </div>

        <div class="ml-4 flex-1">
          <h3 class="text-lg text-blue-500">
            <a href="{{ user.html_url }}" target="_blank" rel="noopener">{{
              user.login
            }}</a>
          </h3>
          <p class="text-slate-700 italic">{{ user.name }}</p>
          <p>{{ user.bio }}</p>
          <p>{{ user.location }}</p>
        </div>
      </article>
    </tui-loader>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 200px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() currentPageIndex = 0;
  @Input() usersListState: UsersListState | null = null;

  @Output() pageIndexChanges = new EventEmitter<number>();

  readonly trackByUserId: TrackByFunction<UserModel> = (_, { id }) => id;

  readonly getTotalPage = (
    totalCount: number,
    pageSize = DEFAULT_PAGE_SIZE,
  ): number => {
    return (
      Math.floor(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
    );
  };
}
