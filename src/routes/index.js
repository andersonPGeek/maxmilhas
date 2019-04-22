
const validarCpf = require('validar-cpf');
const express = require('express');
const router = express.Router();
const app = module.exports = express();

router.get('/', function (req, res, next) {

    res.render('../views/blacklist/index', { title: 'Blacklist' });

});

router.get('/status', function (req, res, next) {
    var personModel = require('../models/personModel');

    personModel.getStatus(function (err, result) {
        res.status(200).send(result);
    })
});

router.post('/inserir/', function (req, res, next) {
    var personModel = require('../models/personModel');
    var cpf = req.body.cpf;

    console.log(cpf);

    if (!validarCpf(cpf)) {
        res.send('CPF inválido', 500);
    } else {
        personModel.putCPF(cpf, function (err, result) {
            if (result == true) {
                res.status(200).send({
                    title: "CPF inserido com sucesso"
                });
            } else {
                res.status(200).send({
                    title: "CPF já existe na base"
                });
            }
        })
    }


});

router.delete('/delete/:cpf', function (req, res, next) {
    var personModel = require('../models/personModel');
    var cpf = req.params.cpf;

    if (!validarCpf(cpf)) {
        res.send('CPF inválido', 500);
    } else {
        personModel.deleteCPF(cpf, function (err, result) {

            if (result == true) {
                res.status(200).send({
                    title: "CPF deletado com sucesso"
                });
            } else {
                res.status(200).send({
                    title: "CPF não encontrado"
                });
            }
        })
    }
});

router.get('/consulta/', function (req, res, next) {

    var personModel = require('../models/personModel');
    var cpf = req.query.cpf;

    if (!validarCpf(cpf)) {
        res.status(200).send({
            title: "CPF inválido"
        });
    } else {
        personModel.getCPF(cpf, function (err, result) {

            if (result == true) {
                res.status(200).send({
                    title: "BLOCK"
                });
            } else {
                res.status(200).send({
                    title: "FREE"
                });
            }
        })
    }
});

module.exports = router;
