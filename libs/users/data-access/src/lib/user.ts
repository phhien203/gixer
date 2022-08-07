export interface User {
  readonly id: number;
  readonly login: string;
  readonly html_url: string;
  readonly avatar_url: string;
}

export type Users = readonly User[];

export interface UsersResponse {
  readonly items: Users;
  readonly total_count: number;
}

// avatar_url: "https://avatars.githubusercontent.com/u/496779?v=4"
// events_url: "https://api.github.com/users/hien/events{/privacy}"
// followers_url: "https://api.github.com/users/hien/followers"
// following_url: "https://api.github.com/users/hien/following{/other_user}"
// gists_url: "https://api.github.com/users/hien/gists{/gist_id}"
// gravatar_id: ""
// html_url: "https://github.com/hien"
// id: 496779
// login: "hien"
// node_id: "MDQ6VXNlcjQ5Njc3OQ=="
// organizations_url: "https://api.github.com/users/hien/orgs"
// received_events_url: "https://api.github.com/users/hien/received_events"
// repos_url: "https://api.github.com/users/hien/repos"
// score: 1
// site_admin: false
// starred_url: "https://api.github.com/users/hien/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/hien/subscriptions"
// type: "User"
// url: "https://api.github.com/users/hien"
