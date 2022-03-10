
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 7000


// Modul Local
const {loadContact, findContact} = require('./utils/contacts')

app.set('view engine', 'ejs');

//  EXTERNAL MIDDLEWARE
app.use(expressLayouts);
app.use(morgan('dev'));



//-----------BUILDIN MIDLEWARE--------
app.use(express.static('public'));


// ROUTE
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama : 'rivo pelu',
            email : 'rivopelu@gmail',
            noHp : '081242144819'
        },
        {
            nama : 'nia tumbelaka',
            email : 'niatumbelaka@gmail',
            noHp : '083654554475'
        },
        {
            nama : 'dodt',
            email : 'dody@gmail',
            noHp : '081224445155'
        }
    ]

    res.render('content/index',{
        layout : 'main',
        nama : 'rivo pelu',
        title : 'home page',
        mahasiswa
    });
});


// ROUTE CONTACT
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('content/contact', {
        layout : 'main',
        title : 'çontact',
        contacts
    });
})

// single contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('content/detail', {
        layout : 'main',
        title : 'çontact detail',
        contact
    });
})

// ROUTE ABOUT
app.get('/about', (req, res) => {
    res.render('content/about', {
        layout : 'main',
        title :" about"
    });
})


app.use('/', (req, res) =>{
    res.status(404),
    res.send ('404')
})
// -----------SERVER----------------
app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
});