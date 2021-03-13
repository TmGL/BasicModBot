const mongoose = require('mongoose');

const warnSchema = new mongoose.Schema({
    Guild: String,
    Member: String,
    warnings: [Object]
});

module.exports = mongoose.model('warnings', warnSchema);