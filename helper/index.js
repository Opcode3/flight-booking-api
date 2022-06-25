const fs = require('fs');
exports.uid = (num) => Date.now().toString(32)+num;


exports.jsonWriter = (data) => {
    let message = "";
    fs.writeFile('data.json', data, (err) => {
        if (err) message = "An error was encountered while trying to write file";
        message = 'Data written to file';
    });

    return message;
}


exports.jsonReader = (callback) => {
    fs.readFile('data.json', (err, data) => {
        if (err) throw err;
        callback(JSON.parse(data));
    });
}