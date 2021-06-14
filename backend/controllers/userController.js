const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        User.find()
            .then(users => res.json(users))
            .catch(e => next(e));
        return;
    }
    catch(e) {
        console.log(e);
    }
    return res.status(500)
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findOne({ _id: Object(id) })
        return res.status(200).json(user);
    }
    catch(e) {
        console.log(e);
    }
    return res.status(500);
});

router.post('/', async (req, res) => {
    try {
        let user = new User({...req.body});
        let savedUser = await user.save();
        return res.status(200).json(savedUser);
    } 
    catch(e) {
        console.log(e);
    }
    return res.status(500);
});

router.patch('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updatedUser = await User.findByIdAndUpdate(Object(id), req.body, { new: true })
        return res.status(200).json(updatedUser);
    } 
    catch(e) {
        console.log(e);
    }
    return res.status(500);
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findByIdAndDelete({ _id: Object(id) })
        return res.status(200).json(user);

    }
    catch(e) { 
        console.log(e);
    }
    return res.status(500)
});

module.exports = router;