const path = require('path');
const express = require('express');
const { EDESTADDRREQ } = require('constants');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.get('/hello', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'hello.html'));
});

app.get('/form', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'forms.html'));
});

app.get('/jsondata', (req, res, next) => {
    // req.on('end', () => {
    res.render("jsondata", {
        display_input_form: true
    });
    // });
});

app.post('/jsondata', (req, res, next) => {
    const body = [];
    req.on('data', chunk => {
        body.push(chunk);
    });

    req.on('end', () => {
        const data = Buffer.concat(body).toString().split('data=');
        const data_arr = [];
        data_arr[0] = data[1].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        data_arr[1] = data[2].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        data_arr[2] = data[3].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        data_arr[3] = data[4].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        data_arr[4] = data[5].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        data_arr[5] = data[6].toString().replace(/[+]+/, ' ');
        console.log(data_arr);
        res.render("jsondata", {
            display_input_form: false,
            data_arr: data_arr
        });
    });
});

app.post('/formdata', (req, res, next) => {

    const body = [];
    req.on('data', chunk => {
        body.push(chunk);
    });

    req.on('end', () => {
        const data = Buffer.concat(body).toString().split('data=');
        const form_1 = data[1].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        const form_2 = data[2].toString().split('&')[0].toString().replace(/[+]+/, ' ');
        const form_3 = data[3].toString().replace(/[+]+/, ' ');
        res.render("formdata", {
            form_1: form_1,
            form_2: form_2,
            form_3: form_3
        });
    });
});

app.listen(3000);