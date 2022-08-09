

# Gixer

Gixer is a Github User Search cloned web app. It provides users the ability to search Github user by username.

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-ui.png" width="450"></p>

**Gixer user interface**

## Technical Stack
Here is the technical stack of Gixer
- Angular v14 with standalone components
- TaigaUI for UI components
- TailwindCSS for styling
- NgRx for state management
- Github Octokit for REST API call
- Nx build system

Gixer is built with performance and quality first approach.
- All components apply the OnPush change detection strategy
- Images are lazy loaded
- Pagination applied
- `async` pipe is used as much as possible
- Feature module is lazy loaded
- Pipes are using instead of direct function call in templates
- Ability for developers to analyze the bundle report, by running `npm run build-stats && npm run bundle-report`

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-bundle-report.png" width="450"></p>

**Gixer bundle report**

## Features Included
- Users search Github users by typing the username in search control, the input cursor is auto focus on the search box
- Users can see a list of paginated search results
- Users can see total number of users found
- Users can see avatar, login name, full name, bio, location, followings and followers count
- Users can click on login name on each search result to go to the Github profile of that Github account
- Users can see No users found message when the search criteria doesn't match any Github users
- Users can see an error message `Only the first 1000 search results are available` if users query for more than 1000 results

## Project Structure

The project structure conforms with the philosophy of Nx. The main app is kept as small as possible. Whereas feature modules code resides in libraries. Here is the current project structure.

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
And here is the dependency graph of Gixer app.

<p style="text-align: center;"><img src="https://gixer.netlify.com/assets/readme/gixer-dependency-graph.png" width="450"></p>

**Gixer dependency graph**

## Roadmap

Here are features that can be added in the future
- Add E2E and unit tests
- Make the search term in the input control reflected in the address bar, so that users can bookmark the link and see the previous search results.
- Add the ability to advanced search for users
- Add light/dark mode switcher
- Add metadata tags to make the app more SEO friendly.
- Fully support for accessibility
- Apply custom preload strategy for lazy loaded modules
- Opt-in Nx Cloud

## License

[MIT](https://opensource.org/licenses/MIT)
