const bcrypt = require('bcrypt');


const text = 'papaya';

async function hash(password) {
    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    return hash;
}

hash(text);