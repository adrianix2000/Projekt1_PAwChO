const express = require('express');
const axios = require('axios');


const server = express();

// constants
const PORT = 4000;
const AUTHOR = 'Adrian Sak'

function getStartedInfo() {
    let currentDate = new Date();
    return `The server is starting on port ${PORT} at ${currentDate.toLocaleString()}, owner: ${AUTHOR}`;
}

// fetching client public ip address using public-ip package
async function getClientPublicIpAddress() {
    return await axios.get('https://api.ipify.org?format=json').then((response) => {
        console.log("dsfdsf: " + response.data.ip);
        return response.data.ip;
    });
}

// fetching client data based on ip address using ipapi.co API
async function getClientDataBasedOnIp(ipAddress) {

    let clientIpAddress = await getClientPublicIpAddress();

    console.log("client ip: " + clientIpAddress);

    const response = await axios.get(`https://ipapi.co/${clientIpAddress}/timezone`);

    return {
        "ip": clientIpAddress,
        "timezone": response.data,
        "date": new Date().toLocaleString('pl-PL', { timeZone: response.data })
    };
}


// preoaring html response with client data based on fetched data 
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

// main endpoint
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