Homer Quotes App

Update a production build:

1. Create a new build. Example: `yarn build:prod:ios`
2. Make changes in your project.
3. Publish an update. Example: `yarn build:update:prod`
4. Force close and reopen the app at least twice to view the update.

Preview an update:

1. Publish an update to a branch. Example: `eas update --branch development --message "Change button label"`
2. In Expo Go or a development build, navigate to `Projects > HomerQuotes > Branch > Open`
