const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../middleware/restricted-middleware");


router.get("/", restricted, (req, res) => {
    Users.find()
    .then(users => {
    res.json(users);
    })
    .catch(err => res.send(err));
});




module.exports = router;