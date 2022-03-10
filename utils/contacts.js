
const fs = require('fs');

// --------------->MEMASUKAN DATA<----------



const dirPath = "./data";

// MEMBUAT DIRECTORY
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// MEMBUAT FILE DATA
const dataPatch = "./data/contacts.json";
if (!fs.existsSync(dataPatch)) {
    fs.writeFileSync(dataPatch, "[]", "utf-8");
}

// PERTANYAAN

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, rejects) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama);
        });
    });
};



// AMBIL SEMUA DAFTAR CONTACT DI CONTACT.JSON
const loadContact = () => {
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
}

// CARI CONTACT BERDASARKAN NAMA
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}


// menimpah file contacts.json dengan data yang baru 
const saveContacts = (contacts) =>{
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// menambahkan data contact baru 
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
};

// cek nama yang duplicate
const cekDuplicate=(nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

module.exports = {loadContact, findContact, addContact, cekDuplicate};