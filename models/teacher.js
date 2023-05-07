const mongoose = require('mongoose');

// Book Schema
const teacherSchema = mongoose.Schema({
	"name":{
		type: String,
	},
	"pass":{
		type: String,	
	},
    "sex":{
		type: Number,	
	},
    // 职称
    "workPosition":{
		type: String,	
	},
    // 工号
	"workId":{
		type: Number,
	},
	"callNumber":{
		type: Number,
	},
	// 这里不用放前端
	"projectToAudit":{
		type: Array,
	},
});

const Teachers = module.exports = mongoose.model('teachers', teacherSchema);