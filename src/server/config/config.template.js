const auth = {
    username: "usernamehere",
    password: "supersecret"
};

export default (config = {
    port: 3000,
    mongo: {
        uri: "mongodb://localhost/rssenal"
    },
    jwt: {
        secret: "SOMETHINGSUPERSECRET!"
    }
});
