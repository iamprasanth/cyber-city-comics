const responseController = require('./response');
const Comic = require('../models/Comic');
const fetch = require('node-fetch');

// Get latest Comic
exports.getLatest = async (req, res) => {
    try {
        const comicData = await getComic('');

        return responseController.succesResponse(res, comicData);
    } catch (err) {
        responseController.errorResponse(res, 500, err.message);
    }
};

// Get comic by id
exports.getById = async (req, res) => {
    try {
        if (req.params.comicId === 'random') {
            const latestComicId = await getLatestComicId();
            // Generate random number between 1 and maximum comic id
            const randomComicId = Math.floor(
                Math.random() * (latestComicId - 1 + 1) + 1
            );
            const randomComicData = await getComic(randomComicId);

            return responseController.succesResponse(res, randomComicData);
        } else {
            const comicData = await getComic(req.params.comicId);

            return responseController.succesResponse(res, comicData);
        }
    } catch (err) {
        responseController.errorResponse(res, 500, err.message);
    }
};

// Retreives a specific comic
const getComic = (comicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://xkcd.com/' + comicId + '/info.0.json');
            const responseData = await response.json();
            const viewCount = await incrementViewCount(responseData.num);
            const comicDate = new Date(responseData['year'], responseData['month'] - 1, responseData['day']);
            responseData['comic_date'] = comicDate.toLocaleString('default', { month: 'short' }) + '. ' + responseData['day'] + ', ' + responseData['year'];
            responseData['view_count'] = viewCount;
            responseData['latest_comic_id'] = await getLatestComicId();// Used To hide next button for Latest Comic
            responseData['transcript'] = responseData['transcript']
                .replace(/\s?\{[^}]+\}/g, '') // Remove alt value in transcript
                .replace(/}/g, '') // Remove curly braces
                .replace(/[\[\]]+/g, ''); // Remove angle brackets

            return resolve(responseData)
        } catch (error) {
            return reject(error);
        }
    })
}

// Function to increment view count of a specific Comic
const incrementViewCount = (comicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const comicExist = await Comic.findOne({ comicId });
            if (comicExist) {
                await comicExist.updateOne(
                    {
                        $inc: { views: 1 }
                    },
                    { new: true }
                );

                return resolve(comicExist.views + 1)
            }
            else {
                const newComic = new Comic({
                    comicId
                });
                const postSave = await newComic.save();

                return resolve(1)
            }
        } catch (error) {
            return reject(error);
        }
    })
}

// Returns latest comic's ID
const getLatestComicId = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('https://xkcd.com/info.0.json');
            const responseData = await response.json();

            return resolve(responseData.num)
        } catch (error) {
            return reject(error);
        }
    })
};