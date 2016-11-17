var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);

// A validação UNIQUE presente no campo email, apesar de configurada
// não funciona realmente até a implementação da validação e para tanto
// é necessário a da instalação do pacote abaixo:
// npm install --save mongoose-unique-validator 
// após isso deve-se incluir o plugin validator