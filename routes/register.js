const router = require("express").Router();
const Register = require("../models/register");

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var register = new Register();
   register.fullName = req.body.fullName;
    register.email = req.body.email;
    register.mobile = req.body.mobile;
    register.country = req.body.country;
    register.state = req.body.state;
    register.city = req.body.city;
    register.address = req.body.address;
    
    
    register.save((err, doc) => {
        if (!err)
            res.redirect('register/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("register", {
                    viewTitle: "",
                    register: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Register.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('register/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("register", {
                    viewTitle: 'Update user',
                    register: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Register.find((err, docs) => {
        if (!err) {
            res.render("register/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving user list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("register", {
                viewTitle: "Update user",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/register/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
});

module.exports = router;
