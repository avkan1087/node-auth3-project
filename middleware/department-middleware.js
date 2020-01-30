module.exports = department => {
    return function(req, res, next) {
        if (req.token && user.department === req.token.department) {
        next();
        } else {
        res
            .status(403)
            .json({ message: `Unauthorized to use this resource, you must be in ${department}` });
            }
        };
};