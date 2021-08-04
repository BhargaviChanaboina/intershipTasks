const mongoose 					= require('mongoose');
const Schema   					= mongoose.Schema;

module.exports = mongoose.model('mail_templates', new Schema({
    email_type   :   String,
    title        :   String,
    content      :   String,
    attachments  :   String
})
);