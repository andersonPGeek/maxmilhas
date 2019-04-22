

exports.get = (req, res, next) => {
    res.render('index');
};

exports.getContact = (req, res, next) => {
    console.log('passei aqui');
    res.render('../views/contact');
};

exports.getStatus = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};


exports.getById = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};

exports.getByCPF = (req, res, next) => {
    req.validate();
    res.status(200).send('Requisição recebida com sucesso!');
};

exports.post = (req, res, next) => {
    res.status(201).send('Requisição recebida com sucesso!');
};


exports.put = (req, res, next) => {
    let id = req.params.cpf;
    res.status(201).send(`Requisição recebida com sucesso! ${id}`);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    res.status(200).send(`Requisição recebida com sucesso! ${id}`);
};