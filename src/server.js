const express = require('express')
const server = express();

const PORT = 4000;
const AUTHOR = 'Adrian Sak'

function getStartedInfo() {
    let currentDate = new Date();
    return `The server is starting on port ${PORT} at ${currentDate.toLocaleString()}, owner: ${AUTHOR}`;
}

server.get('/', (req, res) => {
    res.send('Hello World!');
})

server.listen(PORT, () => {
    let startString = getStartedInfo();
    console.log(startString);
})
