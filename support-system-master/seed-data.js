let mongoose    = require('mongoose');
const User = require('./models/user_model');
const Setting = require('./models/settings_model');
const bcrypt    = require('bcrypt');

//declaration for bcrypt
let saltrounds   = 10;

function dropDb(cb) {
    let db = 'mongodb://localhost:27017/support';
    mongoose.connect(db,function(err){
        if (err) {
            reject(err);
        }
        console.log('dropping db..');
        mongoose.connection.db.dropDatabase().then(cb);
    });
}

function addSeedUser() {
    const user = {
        user_name: 'Support Admin',
        user_id: 'supportadmin',
        password: 'welcome123',
        role: 'admin',
        email: 'vijay.kumar@applaudsolutions.com',
        contact: '8927219492'
    };

    let salt  			   = bcrypt.genSaltSync(saltrounds);
    let hashed_password    = bcrypt.hashSync(user.password,salt);
    let new_user = new User({
        user_name      :   user.name,
        user_id        :   user.user_id,
        password       :   hashed_password,
        role           :   user.role,
        email          :   user.email,
        contact        :   user.contact
    });

    new_user.save((err, data) => {
        if (err) {
            console.log('error while creating admin user');
            console.log(err);
            return;
        }
        console.log('created seed user..');
    });
};

function reminderSettings() {
    let setting = new Setting({
        owindow : 30,
        hwindow : 30,
        auto	: false,
    });

    setting.save((err, data) => {
        if (err) {
            console.log('error while creating reminder settings');
            console.log(err);
            return;
        }
        console.log('created reminder settings..')
    })
}

function seed() {
    function cb() {
        addSeedUser(); //adding admin user
        reminderSettings(); //seeding reminder settings
    }

    const args = process.argv.slice(2);
    if (args.indexOf('drop') >= 0) {
        dropDb(cb);
    } else {
        cb();
    }
}

module.exports = seed;