const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs');

//ejs file for cookie changing ctf.
app.get('*', async (req, res) => {
    res.render('index', { title: 'Wrong Place' })
})

app.listen(port, () => console.log(`Server is running on port ${port} likely on localhost, if not on localhost then you are in production but you already know that!`));