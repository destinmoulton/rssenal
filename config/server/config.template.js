const auth = {
    username: "<RSSENAL_USERNAME>",
    password: "<RSSENAL_PASSWORD>"
};

const config = {
    port: 3000,
    mongo: {
        uri: "mongodb://localhost/rssenal"
    },
    auth,
    jwt: {
        secret: "SOMETHINGSUPERSECRET!"
    }
};

module.exports = config;
