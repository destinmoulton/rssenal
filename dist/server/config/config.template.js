"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var auth = {
    username: "<RSSENAL_USERNAME>",
    password: "<RSSENAL_PASSWORD>"
};

var config = {
    port: 3000,
    mongo: {
        uri: "mongodb://localhost/rssenal"
    },
    auth: auth,
    jwt: {
        secret: "SOMETHINGSUPERSECRET!"
    }
};

exports.default = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvY29uZmlnL2NvbmZpZy50ZW1wbGF0ZS5qcyJdLCJuYW1lcyI6WyJhdXRoIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImNvbmZpZyIsInBvcnQiLCJtb25nbyIsInVyaSIsImp3dCIsInNlY3JldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFNQSxPQUFPO0FBQ1RDLGNBQVUsb0JBREQ7QUFFVEMsY0FBVTtBQUZELENBQWI7O0FBS0EsSUFBTUMsU0FBUztBQUNYQyxVQUFNLElBREs7QUFFWEMsV0FBTztBQUNIQyxhQUFLO0FBREYsS0FGSTtBQUtYTixjQUxXO0FBTVhPLFNBQUs7QUFDREMsZ0JBQVE7QUFEUDtBQU5NLENBQWY7O2tCQVdlTCxNIiwiZmlsZSI6ImNvbmZpZy50ZW1wbGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGF1dGggPSB7XG4gICAgdXNlcm5hbWU6IFwiPFJTU0VOQUxfVVNFUk5BTUU+XCIsXG4gICAgcGFzc3dvcmQ6IFwiPFJTU0VOQUxfUEFTU1dPUkQ+XCJcbn07XG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICBwb3J0OiAzMDAwLFxuICAgIG1vbmdvOiB7XG4gICAgICAgIHVyaTogXCJtb25nb2RiOi8vbG9jYWxob3N0L3Jzc2VuYWxcIlxuICAgIH0sXG4gICAgYXV0aCxcbiAgICBqd3Q6IHtcbiAgICAgICAgc2VjcmV0OiBcIlNPTUVUSElOR1NVUEVSU0VDUkVUIVwiXG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnOyJdfQ==