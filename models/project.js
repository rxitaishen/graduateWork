const mongoose = require('mongoose');

// Book Schema
const ProjectSchema = mongoose.Schema({
	"proName":{
		type: String,
	},
    "proType":{
		type: String,
	},
    // 用来判断是pdf还是word
    "fileType":{
		type: String,
	},
	"passOrNot":{
		type: Boolean,	
	},
    "owner":{
        type: String,
    },
    "teamId":{
		type: String,
	},
    "auditTeachers":{
        type: Array,
    },
	"ownerCallNumber":{
		type: Number,
	},
    "aiScore":{
        type: Number,
    },
    "auditScore": {
        type: Number,
    },
    "prize": {
        type: String,
    }
});

const Projects = module.exports = mongoose.model('projects', ProjectSchema);