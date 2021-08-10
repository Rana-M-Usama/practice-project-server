const express = require('express')
const router = express.Router();
const mysql = require('../db/mysql')


router.post('/register', async (req, res) => {   
    console.log(req.body);

});

router.post('/signin', async (req, res) => {

    console.log(req.body);
    query = `select password from registration where email='${req.body.email}'`
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
module.exports = router;