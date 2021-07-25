const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs');

async function basicChecks(req) {
    //takes in the whole req and gives true or error string, if true continue, or else return the error string given by this function.
    let rawdata = fs.readFileSync('data.json');
    let data = JSON.parse(rawdata);

    let ip = req.headers["x-forwarded-for"];
    if (ip) {
        var list = ip.split(",");
        ip = list[list.length - 1];
    } else {
        ip = req.socket.remoteAddress;
    }
    //console.log("headers:", req.headers)
    console.log("query:", req.query)
    console.log("body:", req.body)
    console.log(ip)

    newIpField = { "ip_field": ip }
    data.push(newIpField)
    fs.writeFile('data.json', JSON.stringify(data), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
}
//ejs file for cookie changing ctf.
app.get('*', async (req, res) => {
    basicChecks(req)
    res.render('index', { title: 'Wrong Place' })
})
//hmm
app.listen(port, () => console.log(`Server is running on port ${port} likely on localhost, if not on localhost then you are in production but you already know that!`));