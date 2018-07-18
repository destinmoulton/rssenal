### RSSenal

RSSenal is a simple personal RSS feed reader. The server is a node/express api using a mongo database and the client is a React redux app. The client is built using the Semantic UI React framework so it looks decent.

You can organize your subscriptions into groups (categories). Navigate your feeds using up/down arrows or j/k for the vim oriented. Disable HTML tags if you want a pure text experience.

### What RSSenal is **Not**

RSSenal was **not** built with multiple users in mind. There is a login, but the login information is statically configured via a configuration file.

There are **no** options to share a post on Facebook, Twitter, or any other social platforms. Copying a link is easy enough.

### Requirements

-   pm2
-   mongodb

### Installation Instructions

`$ git clone https://github.com/destinmoulton/rssenal`

Install node_modules:
`$ npm install` or `$ yarn install`

### Configuration and Compilation

Copy the contents of `src/config/config.template.js` into its own file `src/config/config.js`. Change the configured values to match your own setup.

Compile the server:
`$ npm run compile:server`

You can leave the server compilation running or kill it with `Ctrl+c` when you have it configured.

Create a db in mongo.

Without authentication:
`$ mongo`
`> use rssenal` This will create the database.

Alter the configuration values in `src/config/config.js`

### Redux Debugging

To enable redux action and state logging set redux-debug to "on" in localStorage. Remove the item or set to "off" to disable redux console logs.

```
localStorage.setItem("redux-debug", "on");
```

### License

RSSenal is released under the MIT license.
