var express = require('express');
var router = express.Router();

var User = require('../models/user');
var jwt = require('jsonwebtoken');

/* Para encriptarmos a senha utilizamos bcryptjs
   "npm install --save bcryptjs" 
   e ao chamar o método hashSync com salt 10
   geramos o hash */
var bcrypt = require('bcryptjs');

/* Para gerar o token a ser armazenado no front-end
devemos importar a biblioteca JWT para tanto executar
"npm install --save jsonwebtoken"  
*/

router.post('/', function (req, res, next) {

    var user = new User({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        //Erro genérico
        if (err) {
            return res.status(500).json({
                title: 'An error ocurred',
                error: err
            });
        }
        //Uuário não encontrado
        if (!user) {
            return res.status(500).json({
                title: 'No user found',
                error: { message: 'User not found' }
            });
        }
        //Verifica password
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        /* Tudo OK - vamos gerar e enviar o token
           o que se passa para gera o token:
           é o payload, a chave segredo, opções e um callback */
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged In',
            token: token,
            userId: user._id
        });
    });
});

//Exportar rota sem esse trecho ao referenciar no app.js não funciona
module.exports = router;