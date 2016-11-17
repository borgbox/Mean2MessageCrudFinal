var express = require('express');
var router = express.Router();

//Model/Schema Mongoose nosso ORM
var Message = require('../models/message')

//Importa jwt para validar token
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    //Método exec recebe a callback function
    Message.find()
        /* Método populate serve para forçar que os objetos associados,
           no caso user dentro de messages seja carregado:
           o primeiro parametro do método é o objeto dentro de message
           que se quer carregar e o segundo o atributos que desejamos 
           carregar desseobjeto*/
        .populate('user', 'firstname')
        .exec(function (err, messages) {
        if (err) {
            return res.status(500).json({
                title: 'Um erro ocorreu',
                error: err
            });
        }
        res.status(200).json({
            message: 'Sucesso',
            obj: messages
        });
    });
});

/* Pra garantir que somente usuários autenticados tenham acesso
a criar, alterar ou apagar dados será colocando um middleware 
que verificará a validade do token. O motivo do middleware
ser colocado nessa linha, depois do método get é nesse
cenário não queremos inclui-lo na verificação mas somente as rotas abaixo */
router.use('/', function (req, res, next) {
    //Utiliza req.query pois o token é passado pela URL query parameters
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: err
            });
        }
        next();
    });
});

router.patch('/:id', function (req, res, next) {

    /* Decodifica o token para capturar o usuário
       e associa-lo a mensagem criada*/
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: { message: 'Message not found' }
            });
        }

        /* Valida usuário para permitir que somente o usuário
           dono da mensagem pode altera-la ou elimina-la
           O atributo em "message.user" comente possui o Id*/
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: { message: 'Users do not match' }
            });
        }

        message.content = req.body.content;
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.post('/', function (req, res, next) {
    /* Decodifica o token para capturar o usuário
       e associa-lo a mensagem criada*/
    var decoded = jwt.decode(req.query.token);

    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        //Prepara a mensagem e associa o usuário
        var message = new Message({
            content: req.body.content,
            user: user
        });

        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            // Uma vez criada com sucesso associa-se a
            //  mensagem recém criada com o usuário
            user.messages.push(result);
            user.save();

            res.status(201).json({
                title: 'Saved Message',
                obj: result
            });
        });
    });// User.findById(decode.user._id, function (err, user) {
});

router.delete('/:id', function (req, res, next) {

    /* Decodifica o token para capturar o usuário
       e associa-lo a mensagem criada*/
    var decoded = jwt.decode(req.query.token);

    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: { message: 'Message not found' }
            });
        }
        /* Valida usuário para permitir que somente o usuário
           dono da mensagem pode altera-la ou elimina-la
           O atributo em "message.user" comente possui o Id*/
        if (message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not authenticated',
                error: { message: 'Users do not match' }
            });
        }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'message deleted',
                obj: result
            });
        });
    });
});

module.exports = router;