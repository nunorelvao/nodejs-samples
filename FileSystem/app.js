const util = require('util');
const stream = require('stream');
const { pipeline } = require('stream');
const pipelineAsync = util.promisify(stream.pipeline);
const fs = require('fs');
const clc = require('cli-color');
const ms = require('memory-streams');
const zlib = require('zlib')
const tar = require('tar');


//create dir output
fs.mkdirSync('output', { recursive: true }, (err) => {
    if (err) throw err;
});

//use to write a file directly
fs.writeFile('output/examplewritten.txt', "This is an example file created by nodeJs", errCallBack);


//Create a reader to read a file
var reader = fs.createReadStream('existingexample.json', 'utf8');
//using memory stream to pipe the file read into memory
var writerMs = new ms.WritableStream();
var readerMs = new ms.ReadableStream();

//create a zip gz cmpressor
var gZip = zlib.createGzip();
//Create a writer to write a file compressed
var writerFs = fs.createWriteStream('output/existingexample.json.gz');

//Do a pipeline SYNC
pipeline(reader, writerMs, (err) => {
    if (err) {
        console.error('Pipeline failed to writerMs SYNC', err);
    } else {
        //append to readerMS the writerMS content
        readerMs.append(writerMs.toString());
        //append a line in the file
        readerMs.append("\n###THIS LINE WAS ADDED TO MEMORY STREAM READER###");

        console.log('Pipeline succeeded To writerMs SYNC!');

        //Do a pipeline from a MemoryStreamReader to a ZIP GX FILE WITH tHE CONTENT
        pipeline(readerMs, gZip, writerFs, (err) => {
            if (err) {
                console.error('Pipeline failed to writerFs SYNC', err);
            } else {
                console.log("writerFs bytesWritten of GZFile: " + writerFs.bytesWritten);
                console.log('\nPipeline succeeded To writerFs SYNC!');
            }
        });
    }
});

//Do a pipeline ASYNC
async function runPipelineAsync() {
    await pipelineAsync(fs.createReadStream('existingexample.json'), zlib.createGzip(), fs.createWriteStream('output/existingexample.async.json.gz'));

    console.log('Pipeline succeeded To writerMs ASYNC!');
};

runPipelineAsync().catch(console.error);

//Create a tar file without compression on files
tar.c( // or tar.create
    {
        gzip: false,
        file: 'output/my-tarball.tgz'
    },
    ['example.txt', 'example2.txt'],
    (err) => {
        if (err)
            console.log(err);
        else
            console.log(clc.green('TAR file created sucessfully!\n'));
    }
);

//Create a tar file with compression on files
tar.c( // or tar.create
    {
        gzip: true,
        file: 'output/my-tarball-gzip.tgz'
    },
    ['example.txt', 'example2.txt'],
    (err) => {
        if (err)
            console.log(err);
        else
            console.log(clc.green('TAR file created sucessfully!\n'));
    }
);


function errCallBack(err) {
    if (err)
        console.log(err);
    else
        console.log(clc.blue('File is starting to be writed!\n'));

    //reset color of console
    console.log(clc.white(''));
}