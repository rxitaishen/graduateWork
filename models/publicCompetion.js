const mongoose = require('mongoose');

// Book Schema
const publicCompetionSchema = mongoose.Schema({
	"regST":{
		type: String,
	},
    "regDT":{
		type: String,
	},
    "comST":{
		type: String,
	},
	"comDT":{
		type: String,
	},
    "auditST":{
        type: String,
    },
    "auditDT":{
        type: String,
    },
    // 0代表还没审核, 1代表审核通过，2代表没过
    "initOrNot":{
        type: Boolean,
    }
});

const PublicCompetion = module.exports = mongoose.model('publicCompetion', publicCompetionSchema);