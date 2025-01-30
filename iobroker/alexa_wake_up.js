const alexaDevice = "alexa2.0.Echo-Devices.G0922H084........";

const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/wake-up-alexa') {
        setState(`${alexaDevice}.Routines.573445ec-c826-47e6-9513-cb6fe9639652`, true, () => {
            setTimeout(() => {
                setState(`${alexaDevice}.Commands.textCommand`, "Play House of the rising sun on Spotify");
            }, 12000);
        });
    }
});

server.listen(8087, () => {
    console.log('HTTP server running on port 8087');
});
