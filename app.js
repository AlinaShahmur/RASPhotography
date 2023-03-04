const express = require('express');
const path = require("path");
const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
    })
}

app.listen(process.env.PORT || 3000, () => console.log(`listening on port 8000`));
