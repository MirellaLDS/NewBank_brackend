const Shell = require('node-powershell');

//Initializer a shell instance
const ps = new Shell({
    executionPolicy: 'Bypass',
    noProfile: true
});

module.exports = {

    index(req, res) {
        // res.send("Hello from Node")
      
        ps.addCommand('heroku logs --app newbank-backend --num=50')
        ps.invoke().then(output => {
            // console.log(output);
            res.send(`<pre> ${output} </pre>`);
        }).catch(err => {
            res.send("Fail");
            console.log(err);
            ps.dispose();
        });
      }
}