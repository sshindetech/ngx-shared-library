const fs = require('fs');

var dist = 'dist';

if (!fs.existsSync(dist)){
    fs.mkdirSync(dist);
}

fs.copyFile("package-cjs.json", `${dist}/package.json`, (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
});

fs.cpSync("assets", `${dist}/assets/`, {recursive: true}, (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
});