const express = require('express');
const path = require("path");
const app = express();


console.log(process.env.NODE_ENV);
console.log("dirname:" + __dirname);
if (process.env.NODE_ENV === 'production') {
    console.log("inside");
    app.use('/', express.static(path.join(__dirname, 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
}

app.listen(process.env.PORT||3000, () => console.log(`listening on port 3000`));
