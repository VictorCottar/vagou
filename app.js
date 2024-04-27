const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');
const Job = require('./models/Job');
const { where, Sequelize } = require('sequelize');
const Op = Sequelize.Op;


const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O express está rodando na porta ${PORT}`);
})


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));


// HANDLE BARS
app.engine('handlebars', engine());
app.set('views', './views');
app.set('view engine', 'handlebars');


// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// DB CONNECTION
db
  .authenticate()
  .then(() => {
    console.log("Conectou com sucesso!");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  })


// ROUTES
app.get('/', (req, res) => {

  let search = req.query.job;
  let query = '%' + search + '%';

  if (!search) {
    Job.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
      .then(jobs => {

        res.render('index', {
          jobs
        });
      })
      .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: { title: { [Op.like]: query } },
      order: [
        ['createdAt', 'DESC']
      ]
    })

      .then(jobs => {
        res.render('index', {
          jobs, search
        });
      })
      .catch(err => console.log(err));
  }


})

app.get('/jobs/add', (req, res) => {
  res.render('jobs');
})


// JOBS ROUTES 
app.use('/jobs', require('./routes/jobs'));