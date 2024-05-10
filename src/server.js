const express = require('express');
const ipGetter = require('public-ip');
const axios = require('axios');

const server = express();

const PORT = 4000;
const AUTHOR = 'Adrian Sak'

function getStartedInfo() {
    let currentDate = new Date();
    return `The server is starting on port ${PORT} at ${currentDate.toLocaleString()}, owner: ${AUTHOR}`;
}

async function getClientPublicIpAddress() {
    const clientAddress = await ipGetter.v4();
    console.log('current client public ipv4 address: ',  clientAddress);
    return clientAddress;
}

async function getClientDataBasedOnIp(ipAddress) {

    let clientIpAddress = await getClientPublicIpAddress();
    const response = await axios.get(`https://ipapi.co/${clientIpAddress}/timezone`);

    return {
        "ip": clientIpAddress,
        "timezone": response.data,
        "date": new Date().toLocaleString('pl-PL', { timeZone: response.data })
    };
}

async function prepareHTMLResponse() {

    let responseData = await getClientDataBasedOnIp();

    const htmlResponse = `
            <!DOCTYPE html>
            <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Data based on ip</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                    }
                    table {
                        margin: 0 auto;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    th {
                        background-color: green;
                    }
                </style>
            </head>
            <body>
                <h2>IP Timezone Information</h2>
                <table>
                    <tr>
                        <th>IP Address</th>
                        <td>${responseData.ip}</td>
                    </tr>
                    <tr>
                        <th>Timezone</th>
                        <td>${responseData.timezone}</td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>${responseData.date}</td>
                    </tr>
                </table>
            </body>
            </html>
        `;

    return htmlResponse;
}

server.get('/', async (req, res) => {
    try {
        const htmlResponse = await prepareHTMLResponse();
        res.send(htmlResponse);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
});


server.get('/address', (req, res) => {
    let clientCurrentAddress = getClientPublicIpAddress();
    res.send('asdasd' +clientCurrentAddress);
});

server.get('/timezone', async (req, res) => {
    let clientData = await getClientDataBasedOnIp();
    res.send(clientData);
});

server.listen(PORT, () => {
    let startString = getStartedInfo();
    console.log(startString);
})
