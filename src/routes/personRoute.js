const express = require('express');
const router = express.Router();
const controller = require('../controllers/personController');

router.get('/status', controller.getStatus);
router.get('/:id', controller.getById);
router.get('/consulta/:cpf', controller.getByCPF);
router.get('/status', controller.getStatus);
router.get('/', controller.get);
router.get('/person/contact', controller.getContact);
router.post('/inserir/:cpf', controller.post);
router.delete('/delete/:cpf', controller.delete);

module.exports = router;