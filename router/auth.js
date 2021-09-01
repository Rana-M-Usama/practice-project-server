const express = require('express')
const router = express.Router();
const mysql = require('../db/mysql')
var bcrypt = require('bcryptjs');
const { query } = require('../db/mysql');
const multer = require('multer')



require('../db/mysql');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

router.post('/register', upload.single('profile-file'), async (req, res) => {
    console.log(JSON.stringify(req.file))
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashpassword)
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file}" /><br>`

    res.send(response)

    const query = `call database1.Register('${req.body.email}', '${hashpassword}', '${req.body.name}','${req.body.phone}',,'${req.body.image}');`
    console.log(query);
    mysql.query(query, async (err, result) => {

        console.log(err);
        console.log(result);

        if (err) {

            if (err.errno === 1062) {


                res.status(404).send('');
            }



        }
        else {

            res.send('success');
        }


    })
});

router.post('/signin', async (req, res) => {

    console.log(req.body);
    const query = `select password from users where Login_id='${req.body.email}'`
    console.log(query);


    mysql.query(query, async (err, result) => {

        console.log(result);
        if (result.length === 0) {
            res.status(404).send('');
        }
        else {


            var password = req.body.password;
            const comparison = await bcrypt.compare(password, result[0].password)
            if (comparison) {
                res.send('suceess')
            }
            else {
                res.status(401).send('');
            }



        }



    });
});
router.post('/about', async (req, res) => {
    console.log('called');


    const query = `select * from usersdetail where email='${req.body.Data}'`


    mysql.query(query, async (err, result) => {



        res.send(result[0]);

    })

});



// router.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any
//     console.log(req.file, req.body)
// })

router.post('/profile', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('A Multer error occurred when uploading')
        } else if (err) {
            console.log("An unknown error occurred when uploading.")
        }
        else {
            console.log("Everything went fine")
        }



    })
})

module.exports = router;