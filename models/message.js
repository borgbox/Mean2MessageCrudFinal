var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

/* Este trecho é um middleware que mongoose oferece
   para caso o evento/método remove seja invocada
   a associação existente no usuário, entre ele
   e a mensagem seja também eliminada*/
schema.post('remove', function (message) {
    User.findById(message.user, function (err, User) {
        user.messages.pull(message);
        user.save();
    });
});

module.exports = mongoose.model('Message', schema);