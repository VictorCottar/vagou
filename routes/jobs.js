const express = require('express');
const router = express.Router();
const Job = require('../models/Job');


router.post('/add', (req, res) => {

    let { title, salary, company, description, email, new_job } = req.body;

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
        .then(() => res.redirect('/'));
});

module.exports = router;