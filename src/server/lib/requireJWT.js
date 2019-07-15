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

export default requireJWT;
