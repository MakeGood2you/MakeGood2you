const projectId = 'osher-project' //// Your Google Cloud Platform project ID

// Imports the Google Cloud client library
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');
// Creates a client
const {tmpdir} = require('os');
const {dirname, join} = require('path');
const storageObject = new Storage({
    projectId,
    keyFilename: join(__dirname, '../../key/serviceAccountKey.json')
});
const sharp = require('sharp')
const fs = require('fs-extra')
const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.generateThumbs = functions.storage.object().onFinalize(async (object) => {

    const bucket = storageObject.bucket(object.bucket)
    const filePath = object.name
    const fileName = filePath.split('/').pop()
    functions.logger.info('pass 3', `${fileName}`)

    const bucketDir = dirname(filePath)
    functions.logger.info('pass 4', bucketDir)

    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, 'source.png')
    functions.logger.info('pass 6.5', fileName.includes('thumb@') || !object.contentType.includes('image'), 'object.contentType ==>', object.contentType, 'fileName ==> ', fileName)

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        console.log('exiting function')
        return false
    }

    await fs.ensureDir(workingDir)
    await bucket.file(filePath).download({
        destination: tmpFilePath
    })
    const size= 256
    // const sizes = [64, 128, 256]
    // const uploadPromises = sizes.map(async size => {
    //     functions.logger.info('pass 9', 'size', size, 'sizes', sizes)

        const thumbName = `thumb@${size}_${fileName}`
        functions.logger.info('pass 10 thumbName', thumbName)

        const thumbPath = join(workingDir, thumbName)
        functions.logger.info('pass 11 thumbName', thumbPath)
        //resize the image

        await sharp(tmpFilePath)
            .resize(size, size).toFile(thumbPath)

        const metadata = {contentType: object.contentType};
        const newFilePath = filePath + '/resizes'
        const newBucketDir = dirname(newFilePath)
        return bucket.upload(thumbPath, {
            destination: join(newBucketDir, thumbName),
            metadata: metadata,
        })
    // })
    // functions.logger.info('pass 12 before promiseall ', uploadPromises)

    // await Promise.all(uploadPromises)

})