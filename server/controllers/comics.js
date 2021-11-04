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
        if (req.params.comicId == 'random') {
            const currentComicData = await getComic('');
            const randomComicId = Math.floor(
                Math.random() * (currentComicData.num - 1 + 1) + 1
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
            responseData['view_count'] = viewCount;

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
