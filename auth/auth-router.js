const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');
const secrets = require('../secrets/secrets');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); 
    user.password = hash;

    Users.add(user)
    .then(saved => {
        res.status(201).json(saved);
    })
    .catch(error => {
        res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
let { username, password } = req.body;

Users.findBy({ username })
.first()
.then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {

    const token = signToken(user);
    const tokenData = jwt.verify(token, secrets.jwtSecret)
    console.log(tokenData)
    res.status(200).json({
        token: token,
        message: `Welcome ${user.username}!`,
    });
    } else {
    res.status(401).json({ message: 'Invalid Credentials' });
    }
})
.catch(error => {
    res.status(500).json(error);
});
});


// router.get('/logout', (req, res) => {
//     req.session.destroy(error => {
//         error ? res.status(500).json({ message: "Already logged out"}) 
//         : res.status(200).json({ message: 'logged out'}) 
//     });
// });

function signToken(user) {
    const payload = {
    id: user.id,
    username: user.username,
    department: user.department
    };

    const secret = process.env.JWT_SECRET || 'secret';

    const options = {
    expiresIn: '1hr',
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;