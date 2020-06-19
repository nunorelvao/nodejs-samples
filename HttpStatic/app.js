const fs = require('fs');
const http = require('http');
const port = 3280;
const util = require('util');
const zlib = require('zlib')
const stream = require('stream');
const { lastIndexOf, substring, indexOf } = require('cli-color/beep');
const { error } = require('console');
const pipelineAsync = util.promisify(stream.pipeline);
const zipCompressorStream = zlib.createGzip();

const server = http.createServer(async (req, resp) => {

    await doProcess(req, resp)
        .catch((err) => {
            console.log(err);
            console.log('ERROR OCCURED ON SERVER GOING TO CLOSE THHE SERVER!');
            resp.end();
            server.close();
        })
        .then((resp) => {
            if (resp)
                console.log(resp);
        });
});


async function doProcess(req, resp) {


    //const readStream = fs.createReadStream('./static/index.html');
    // readStream.pipe(resp); //SYNC METHOD
    //await pipelineAsync(readStream, resp); //ASYNC METHOD

    try {

        if (req.url) {

            console.log(`Requested URL: ${req.url}`);
            //const routeReq = getCleanUrl(req.url.substring(req.url.lastIndexOf('/') + 1));
            var urlWithoutParams = getCleanUrl(req.url).substring(1);
            console.log(`Requested PARSED: ${urlWithoutParams}`);
            console.log(`LENGHT: ${urlWithoutParams.length}`);

            if (urlWithoutParams.length == 0) {
                resp.writeHead(200, { 'Content-type': 'text/html' });
                const readStream = fs.createReadStream('./static/index.html');
                await pipelineAsync(readStream, resp).catch(console.error);

            };

            if (urlWithoutParams !== undefined > 0 && urlWithoutParams.length > 0) {
                //check if file exists as static, if not just return 404

                await fs.exists(`./static/${urlWithoutParams}`, async (exists) => {
                    console.log(`FILE ${urlWithoutParams} EXISTS: ${exists}`);

                    if (exists) {
                        console.log(`GOING TO PARSE ./static/${urlWithoutParams}`);
                        // resp.writeHead(200, { 'Content-type': 'text/html' });
                        const readStream = await fs.createReadStream(`./static/${urlWithoutParams}`);
                        await pipelineAsync(readStream, resp).catch(console.error).catch(console.error);

                    }
                    else {
                        resp.writeHead(404, { 'Content-type': 'text/html' });
                        const readStreamErr = await fs.createReadStream('./static/404.html');
                        await pipelineAsync(readStreamErr, resp).catch(console.error).catch(console.error);

                    }
                });

                //No code here will await for async operatiosn to return
            }

        }
        else {
            //case not possible to have a url on request just end response to avoid being hanged
            await resp.end();
        }
    }
    catch (err) {
        //On case of error actually handle it to a error page but will eventually close the server!
        console.log("ERROR OCCURED ON TRY CATCH OUTSIDE: " + err);
        resp.writeHead(500, { 'Content-type': 'text/html' });
        const readStreamErr = fs.createReadStream('./static/500.html');
        await pipelineAsync(readStreamErr, resp);
    }
}

function getCleanUrl(url) {
    return url.replace(/#.*$/, '').replace(/\?.*$/, '');
};

server.on('listening', () => { console.log(`server is listening now on port ${port}`); });
server.on('close', () => { console.log(`server is closing on port ${port}`); });
server.on('connection', (socket) => {
    if (socket)
        console.log(`server is receiving connection from ${socket.localAddress} ` +
            `maxListeners: ${socket.getMaxListeners()}`);
});

server.on('error', (err) => {
    console.log(`ERROR in server is receing connection on port ${port}`);
    if (err)
        console.log(err);
});

server.listen(port);