const express = require('express')
const app = express()
const port = 3000

app.get('/addTwoNumbers', (req, res) => {
    const { num1, num2 } = req.query;

    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})