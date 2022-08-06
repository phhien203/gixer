import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFeatSearchUsersComponent } from './users-feat-search-users.component';

describe('UsersFeatSearchUsersComponent', () => {
  let component: UsersFeatSearchUsersComponent;
  let fixture: ComponentFixture<UsersFeatSearchUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersFeatSearchUsersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersFeatSearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
