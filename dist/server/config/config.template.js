"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var auth = {
    username: "usernamehere",
    password: "supersecret"
};

exports.default = config = {
    port: 3000,
    mongo: {
        uri: "mongodb://localhost/rssenal"
    },
    jwt: {
        secret: auth.username + auth.password
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvY29uZmlnL2NvbmZpZy50ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJhdXRoIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImNvbmZpZyIsInBvcnQiLCJtb25nbyIsInVyaSIsImp3dCIsInNlY3JldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxPQUFPO0FBQ1RDLGNBQVUsY0FERDtBQUVUQyxjQUFVO0FBRkQsQ0FBYjs7a0JBS2dCQyxTQUFTO0FBQ3JCQyxVQUFNLElBRGU7QUFFckJDLFdBQU87QUFDSEMsYUFBSztBQURGLEtBRmM7QUFLckJDLFNBQUs7QUFDREMsZ0JBQVFSLEtBQUtDLFFBQUwsR0FBZ0JELEtBQUtFO0FBRDVCO0FBTGdCLEMiLCJmaWxlIjoiY29uZmlnLnRlbXBsYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXV0aCA9IHtcbiAgICB1c2VybmFtZTogXCJ1c2VybmFtZWhlcmVcIixcbiAgICBwYXNzd29yZDogXCJzdXBlcnNlY3JldFwiXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoY29uZmlnID0ge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgbW9uZ286IHtcbiAgICAgICAgdXJpOiBcIm1vbmdvZGI6Ly9sb2NhbGhvc3QvcnNzZW5hbFwiXG4gICAgfSxcbiAgICBqd3Q6IHtcbiAgICAgICAgc2VjcmV0OiBhdXRoLnVzZXJuYW1lICsgYXV0aC5wYXNzd29yZFxuICAgIH1cbn0pO1xuIl19