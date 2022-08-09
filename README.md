

# Gixer

Gixer is a Github User Search cloned web app. It provides users the ability to search Github users by username. You can try the app at [gixer.netlify.app](https://gixer.netlify.app). You don't need to login to use the app.

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-ui.png" width="450"></p>

**Gixer user interface**

## Technical Stack
Here is the technical stack of Gixer
- [Angular v14](https://angular.io/) with standalone components
- [Taiga UI](https://taiga-ui.dev/getting-started) for UI components
- [TailwindCSS](https://tailwindcss.com/) for styling
- [NgRx](https://ngrx.io/) for state management
- [Github Octokit](https://github.com/octokit/octokit.js) for REST API call
- [Nx](https://nx.dev/) build system
- [Netlify](https://www.netlify.com/) for deployment

Gixer is built with performance and quality first approach
- All components are applying the OnPush change detection strategy
- Images are lazy loaded
- Pagination applied
- `async` pipe is used as much as possible
- Feature module is lazy loaded
- Pipes are using instead of direct function call in templates
- Ability for developers to analyze the bundle report, by running `npm run build-stats && npm run bundle-report`

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-bundle-report.png" width="450"></p>

**Gixer bundle report**

## Features Included
- Users search Github users by typing the username in search control, the input cursor will automatically focus on the search box
- Users can see a list of paginated search results
- Users can see total number of users found
- Users can see avatar, login name, full name, bio, location, following and followers count
- Users can click on login name on each search result to go to the Github profile of that Github account
- Users can see `No users found` message when the search criteria doesn't match any Github users
- Users can see an error message `Only the first 1000 search results are available` if users query for more than 1000 results
- Users can see load indicator while the app is making request to Github API

## Project Structure

The project structure conforms with the philosophy of Nx. The main app is kept as small as possible. Whereas feature modules reside in libraries. Here is the current project structure

```
.
├── apps/
│   ├── gixer-app
│   └── gixer-app-e2e
└── libs/
    └── users/
        ├── data-access
        ├── feat-search-users
        ├── ui
        └── util
```
And here is the dependency graph of Gixer app

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-dependency-graph.png" width="450"></p>

**Gixer dependency graph**

## Roadmap

Here are some features that can be added in the future
- Add E2E and unit tests
- Make the search term in the input control reflected to the address bar, so that users can bookmark the link and see the previous search results
- Add users advanced search functionality
- Add light/dark mode switcher
- Show the very first pull request of a Github account in each search result
- Add metadata tags to make the app more SEO friendly
- Fully support for accessibility
- Apply custom preload strategy for lazy loaded feature modules
- Opt-in Nx Cloud

## License

[MIT](https://opensource.org/licenses/MIT)
