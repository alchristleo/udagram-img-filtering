import fs from 'fs';
import Jimp from 'jimp';

/**
 * @function filterImageFromURL helper function to download, filter, and save the filtered image locally
 * @param inputURL string
 * @returns {string} an absolute path to a filtered image locally saved file
 */
export async function filterImageFromURL(inputURL: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const photo = await Jimp.read(inputURL);
            const outpath = '/tmp/filtered.' + Math.floor(Math.random() * 2000) + '.jpg';
            await photo
                .resize(256, 256) // resize
                .quality(60) // set JPEG quality
                .greyscale() // set greyscale
                .write(__dirname + outpath, (img) => {
                    resolve(__dirname + outpath);
                });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * @function deleteLocalFiles helper function to delete files on the local disk, useful to cleanup after tasks
 * @param files an array of absolute paths to files
 */
export async function deleteLocalFiles(files: Array<string>) {
    for (let file of files) {
        fs.unlinkSync(file);
    }
}