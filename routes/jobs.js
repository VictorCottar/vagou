const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { where } = require('sequelize');


// DETALHES DA VAGA
router.get('/details/:id', (req, res) => Job.findOne ({
    where: {id: req.params.id}
}).then(job => {

    res.render('details', {
        job
    });

}).catch(err => console.log(err)));


// ADICIONAR JOB
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