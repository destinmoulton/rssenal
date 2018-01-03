"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Middleware to validate that the user is authenticated.
 *
 * Output a 401 if unauthorized.
 *
 * @param {*} req Express request object.
 * @param {*} res Express response object.
 * @param {*} next next Express method to run (after this middleware)
 */
function requireJWT(req, res, next) {
    if (!req.user) {
        res.status(401).send("Unauthorized request.");
    } else {
        next();
    }
}

exports.default = requireJWT;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2ZXIvbGliL3JlcXVpcmVKV1QuanMiXSwibmFtZXMiOlsicmVxdWlyZUpXVCIsInJlcSIsInJlcyIsIm5leHQiLCJ1c2VyIiwic3RhdHVzIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7O0FBU0EsU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLEdBQXpCLEVBQThCQyxJQUE5QixFQUFvQztBQUNoQyxRQUFJLENBQUNGLElBQUlHLElBQVQsRUFBZTtBQUNYRixZQUFJRyxNQUFKLENBQVcsR0FBWCxFQUFnQkMsSUFBaEIsQ0FBcUIsdUJBQXJCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hIO0FBQ0g7QUFDSjs7a0JBRWNILFUiLCJmaWxlIjoicmVxdWlyZUpXVC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTWlkZGxld2FyZSB0byB2YWxpZGF0ZSB0aGF0IHRoZSB1c2VyIGlzIGF1dGhlbnRpY2F0ZWQuXG4gKlxuICogT3V0cHV0IGEgNDAxIGlmIHVuYXV0aG9yaXplZC5cbiAqXG4gKiBAcGFyYW0geyp9IHJlcSBFeHByZXNzIHJlcXVlc3Qgb2JqZWN0LlxuICogQHBhcmFtIHsqfSByZXMgRXhwcmVzcyByZXNwb25zZSBvYmplY3QuXG4gKiBAcGFyYW0geyp9IG5leHQgbmV4dCBFeHByZXNzIG1ldGhvZCB0byBydW4gKGFmdGVyIHRoaXMgbWlkZGxld2FyZSlcbiAqL1xuZnVuY3Rpb24gcmVxdWlyZUpXVChyZXEsIHJlcywgbmV4dCkge1xuICAgIGlmICghcmVxLnVzZXIpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg0MDEpLnNlbmQoXCJVbmF1dGhvcml6ZWQgcmVxdWVzdC5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV4dCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVxdWlyZUpXVDtcbiJdfQ==