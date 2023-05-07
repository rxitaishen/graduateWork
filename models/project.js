const mongoose = require('mongoose');

// Book Schema
const ProjectSchema = mongoose.Schema({
	"proName":{
		type: String,
	},
	"passOrNot":{
		type: Boolean,	
	},
    "ownerId":{
        type: Number,
    },
    "team":{
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