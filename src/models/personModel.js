var fs = require('fs');

function personModel() { }

exports.getCPF = function getCPF(cpfConsulta, callback) {

    fs.readFile('./src/blacklist/blacklist.json', 'utf8', function (err, result) {
        var validate = false;
        if (!err) {
            var obj = JSON.parse(result);
            obj.blackList.forEach(function (blackList) {
                if (cpfConsulta == blackList.CPF) {
                    validate = true;
                }
            });
        }

        fs.readFile('./src/blacklist/controle.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data);
                obj.countSearch = obj.countSearch + 1;
                obj.lastSearch = new Date();
                json = JSON.stringify(obj, null, 2);
                fs.writeFile('./src/blacklist/controle.json', json, 'utf8', callback); // write it back 
            }
        });

        callback(err, validate);

    });
};

exports.putCPF = function (cpfNovo, callback) {

    fs.readFile('./src/blacklist/blacklist.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {

            var validate = true;
            if (!err) {
                var obj = JSON.parse(data);
                obj.blackList.forEach(function (blackList) {
                    if (cpfNovo == blackList.CPF) {
                        validate = false;
                    }
                });
            }

            if (validate) {
                obj = JSON.parse(data);
                obj.blackList.push({ CPF: cpfNovo });
                json = JSON.stringify(obj, null, 2);
                fs.writeFile('./src/blacklist/blacklist.json', json, 'utf8', callback); // write it back 
            }
            callback(err, validate);
        }
    });


};

exports.deleteCPF = function (cpf, callback) {
    fs.readFile('./src/blacklist/blacklist.json', 'utf8', function readFileCallback(err, data) {

        var objBlacklist = {
            blackList: []
        };

        if (err) {
            console.log(err);
        } else {
            obj = JSON.parse(data);

            obj.blackList.forEach(function (blackList) {
                if (cpf != blackList.CPF) {
                    objBlacklist.blackList.push({ CPF: blackList.CPF });
                }
            });
            json = JSON.stringify(objBlacklist, null, 2);
            fs.writeFile('./src/blacklist/blacklist.json', json, 'utf8', callback);
        }
        callback(err, true);
    });
};

exports.getStatus = function (callback) {
    fs.readFile('./src/blacklist/blacklist.json', 'utf8', function readFileCallback(err, result) {
        var count = 0;

        if (!err) {
            var obj = JSON.parse(result);

            obj.blackList.forEach(function (CPF) {
                count = count + 1;
            });
        }

        fs.readFile('./src/blacklist/controle.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object
                obj.countBlackList = count; //add some data
                json = JSON.stringify(obj, null, 2); //convert it back to json
                fs.writeFile('./src/blacklist/controle.json', json, 'utf8', callback); // write it back 

                callback(err, json);
            }
        });

    });
};