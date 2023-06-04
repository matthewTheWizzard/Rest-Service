const mongoose = require('mongoose');
const net = require('node:net')

const gatewaySchema = mongoose.Schema({
    serialNumber: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    ipv4: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(ip) {
                return net.isIPv4(ip);
            },
            message: 'Invalid IPv4'
        }
    },
    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }]
})

module.exports = mongoose.model('Gateway', gatewaySchema);
