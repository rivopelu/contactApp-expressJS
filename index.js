
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express()
const port = 7000
const { body, check, validationResult } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// Modul Local
const { loadContact, findContact, addContact, cekDuplicate } = require('./utils/contacts')

app.set('view engine', 'ejs');

//  EXTERNAL MIDDLEWARE
app.use(expressLayouts);
app.use(morgan('dev'));


// konfigurasi flas
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
})
);
app.use(flash());


//-----------BUILDIN MIDLEWARE--------
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// ROUTE
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'rivo pelu',
            email: 'rivopelu@gmail',
            noHp: '081242144819'
        },
        {
            nama: 'nia tumbelaka',
            email: 'niatumbelaka@gmail',
            noHp: '083654554475'
        },
        {
            nama: 'dodt',
            email: 'dody@gmail',
            noHp: '081224445155'
        }
    ]

    res.render('content/index', {
        layout: 'main',
        nama: 'rivo pelu',
        title: 'home page',
        mahasiswa
    });
});


// ROUTE CONTACT
app.get('/contact', (req, res) => {
    const contacts = loadContact();

    res.render('content/contact', {
        layout: 'main',
        title: 'çontact',
        msg : req.flash('msg'),
        contacts
    });
})

// HALAMAN TAMBAH DATA CONTACT
app.get('/contact/add', (req, res) => {
    res.render('content/add-contact', {
        title: 'form tambah data',
        layout: 'main'
    });
})

// PROCESS DATA CONTACT
app.post('/contact', [
    body('nama').custom((value) => {
        const duplicate = cekDuplicate(value);
        if (duplicate) {
            throw new Error('nama contact sudah di gunakan')
        }
        return true;
    }),
    check('email', 'email tidak valid').isEmail(),
    check('nohp', 'no hp tidak valid').isMobilePhone('id-ID'),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('content/add-contact', {
            title: 'tambah data contact',
            layout: 'main',
            errors: errors.array(),
        });
    } else {
        // kirim flash massage
        req.flash('msg', 'data contact berhasil di tambahkan');
        addContact(req.body);
        res.redirect('/contact')
    }

})

// single contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('content/detail', {
        layout: 'main',
        title: 'çontact detail',
        contact
    });
})

// ROUTE ABOUT
app.get('/about', (req, res) => {
    res.render('content/about', {
        layout: 'main',
        title: " about"
    });
})


app.use('/', (req, res) => {
    res.status(404),
        res.send('404')
})
// -----------SERVER----------------
app.listen(port, () => {
    console.log(`server berjalan di port ${port}`)
});