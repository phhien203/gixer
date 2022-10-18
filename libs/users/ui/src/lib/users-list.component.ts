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
        class="font-mono text-blue flex bg-white p-[48px] my-8 rounded-[15px] card"
      >
        <div class="w-[117px] h-[117px] flex-none">
          <img
            loading="lazy"
            class="w-full h-full rounded-full"
            [src]="user.avatar_url"
            [alt]="'User ' + user.login + ' avatar'"
          />
        </div>

        <div class="ml-4 flex-1">
          <h3 class="text-[26px] leading-[38px] text-gray-dark font-bold">
            <a href="{{ user.html_url }}" target="_blank" rel="noopener">{{
              user.name
            }}</a>
          </h3>
          <p class="text-blue font-normal text-[16px] leading-[23px]">
            {{ user.login }}
          </p>

          <p
            class="text-gray font-normal text-[15px] leading-[25px] opacity-75 mt-[20px]"
          >
            {{ user.bio ?? 'This profile has no bio' }}
          </p>

          <div
            class="pt-[15px] pb-[17px] px-[32px] bg-darker rounded-[10px] flex my-8"
          >
            <div class="flex flex-col w-1/3">
              <span class="text-gray text-[13px] leading-[19px]">Repos</span>
              <span
                class="text-[22px] leading-[33px] font-bold text-gray-dark"
                >{{ 0 ?? 0 }}</span
              >
            </div>

            <div class="flex flex-col w-1/3">
              <span class="text-gray text-[13px] leading-[19px]"
                >Followers</span
              >
              <span
                class="text-[22px] leading-[33px] font-bold text-gray-dark"
                >{{ user.followers }}</span
              >
            </div>

            <div class="flex flex-col w-1/3">
              <span class="text-gray text-[13px] leading-[19px]"
                >Following</span
              >
              <span
                class="text-[22px] leading-[33px] font-bold text-gray-dark"
                >{{ user.following }}</span
              >
            </div>
          </div>

          <p *ngIf="user.location">Location: {{ user.location }}</p>
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
      .card {
        box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.198567);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  //#region Input Output bindings
  @Input() currentPageIndex = 0;
  @Input() usersListState: UsersListState | null = null;

  @Output() pageIndexChanges = new EventEmitter<number>();
  //#endregion

  //#region Readonly fields
  readonly trackByUserId: TrackByFunction<UserModel> = (_, { id }) => id;

  readonly getTotalPage = (
    totalCount: number,
    pageSize = DEFAULT_PAGE_SIZE,
  ): number => {
    return (
      Math.floor(totalCount / pageSize) + (totalCount % pageSize > 0 ? 1 : 0)
    );
  };
  //#endregion
}
