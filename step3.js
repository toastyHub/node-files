const fs = require('fs');
const axios = require('axios');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        handleOutput(data, out);
    });
};

async function webCat(url) {
    let res = await axios.get(url);
    try {
        console.log(res.data);
        handleOutput(res.data, out);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }

}

function handleOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.log(`Coundn't write ${out}: ${err}`);
                process.exit(1);
            };
        });
    } else {
        console.log(text);
    };
};


let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.startsWith('http://') || path.startsWith('https://')) {
    webCat(path);
} else {
    cat(path);
}