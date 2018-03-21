### RSSenal

RSSenal is a simple personal RSS feed reader. The server is a node/express api using a mongo database and the client is a React redux app. The client is built using the Semantic UI React framework so it looks decent.

You can organize your subscriptions into groups (categories). Navigate your feeds using up/down arrows or j/k for the vim oriented. Disable HTML tags if you want a pure text experience.

### What RSSenal is **Not**

RSSenal was **not** built with multiple users in mind. There is a login, but the login information is statically configured via a configuration file.

There are **no** options to share a post on Facebook, Twitter, or any other social platforms. Copying a link is easy enough.

### Build Instructions

Copy the contents of src/config/config.template.js into its own file src/config/config.js. Change the configured values to match your own setup.

Compile the server code:
`$ npm run compile:server`

### License

RSSenal is released under the MIT license.
