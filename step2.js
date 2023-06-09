const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
};

async function webCat(url) {
    let res = await axios.get(url);
    try {
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}

const path = process.argv[2];

if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path);
} else {
    cat(path);
}
