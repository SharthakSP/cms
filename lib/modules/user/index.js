//var bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 10;
var bcrypttHelper = require('../../helpers/bcrypt.helper')
var mongoCLient = require('mongodb').MongoClient;
const { check } = require('express-validator/check');

mongoCLient.Promise = Promise;
function check() {
    [
        check()
    ]
}


exports.create_user = async (req, res, next) => {
    check();
    var collection = req.db.collection("User");

    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;

    var salutation = req.body.salutation;
    var user_role = req.body.user_role;
    var agree_terms_condition = req.body.agree_terms_condition;

    var salt = await bcrypttHelper.generateSalt(BCRYPT_SALT_ROUNDS);

    var password = await bcrypttHelper.hashPwd(req.body.password, salt);
    console.log('password ::::::::::::::::::', password);

    

    collection.findOne({ email: email })
        .then((email) => {
            if (email) {
                res.status(409).json({
                    status: "Conflict Error",
                    message: "Email Already Exists"
                });
                return;
            }
        });

    collection.insertOne({ first_name, last_name, email, password, salutation, user_role, agree_terms_condition })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });

}

