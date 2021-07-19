const projectId = 'osher-project' //// Your Google Cloud Platform project ID

// Imports the Google Cloud client library

const {Storage} = require('@google-cloud/storage');
const db = require('../database');
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

    const bucket = storageObject.bucket(object.bucket),
        filePath = object.name,
        path = filePath.split('/'),
        uid = path[1],
        eid = path[3],
        fileName = filePath.split('/').pop(),
        bucketDir = dirname(filePath),
        workingDir = join(tmpdir(), 'thumbs'),
        tmpFilePath = join(workingDir, `${fileName}.png`)

    functions.logger.info('pass 2', `${filePath}`)
    functions.logger.info('pass 3', `${fileName}`)
    functions.logger.info('pass 4', bucketDir)
    functions.logger.info('pass 6.5', fileName.includes('thumb@') || !object.contentType.includes('image'), 'object.contentType ==>', object.contentType, 'fileName ==> ', fileName)

    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
        console.log('exiting function')
        return false
    }
    await fs.ensureDir(workingDir)
    await bucket.file(filePath).download({
        destination: tmpFilePath
    })

    const sizes = [64, 128, 256]
    const listOfThumbs = {}
    const uploadPromises = sizes.map(async size => {
        functions.logger.info('pass 9', 'size', size)

        const thumbName = `thumb@${size}_${fileName}`
        functions.logger.info('pass 10 thumbName', thumbName)

        const thumbPath = join(workingDir, thumbName)
        functions.logger.info('pass 11 thumbName', thumbPath)
        //resize the image

        await sharp(tmpFilePath)
            .resize(size, size).toFile(thumbPath)

        const metadata = {contentType: object.contentType};
        const thumbs = join(bucketDir, 'thumbs')
        const newBucketDir = join(thumbs, fileName)
        return bucket.upload(thumbPath, { /// thumbPath
            destination: join(newBucketDir, thumbName),
            metadata: metadata
        }).then(async (data) => {
            const file = data[0]
            await file.getSignedUrl({
                action: 'read',
                expires: '03-17-2500'
            }).then((response) => {
                const url = response[0];
                functions.logger.info('pass 13 url', url)
                if (!listOfThumbs[size]) {
                    listOfThumbs[size] = url
                }
                functions.logger.info('pass 13.5 listOfThumbs', listOfThumbs)
            })

            functions.logger.info('pass 14 listOfThumbs', listOfThumbs)
            const dbFileName = fileName < 10 ? `0${fileName}` : `${fileName}`
            const entity = `users/${uid}/data/events/${eid}/photos/${dbFileName}/thumbs`
            await db.set(entity, listOfThumbs)
        })
    })
    functions.logger.info('pass 12 before promiseall ', uploadPromises)
    await Promise.all(uploadPromises)
})