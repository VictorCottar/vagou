const express    = require('express');
const app        = express();
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const router = require('./routes/jobs');

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}`);
})


// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }))


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
    res.send("Está funcionando");
})

router.get('/test', (req, res) => {
    res.send("Está ffafafuncionando");
})

// JOBS ROUTES 
app.use('/jobs', require('./routes/jobs'));