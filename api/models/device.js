const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
    uid: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        required: true
    }
})

module.exports = mongoose.model('Device', deviceSchema);