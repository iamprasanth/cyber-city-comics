const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
    comicId: {
        type: Number,
        required: true
    },
    views: {
        type: Number,
        default: 1,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Comic", ComicSchema);
