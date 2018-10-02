const auth = {
    username: "<RSSENAL_USERNAME>",
    password: "<RSSENAL_PASSWORD>"
};

const config = {
    port: 3000,
    mongo: {
        host: "mongodb://localhost",
        options: {
            dbName: "rssenal"
            // Additional options here... ie auth
        }
    },
    auth,
    jwt: {
        secret: "SOMETHINGSUPERSECRET!"
    }
};

module.exports = config;
