const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const mineType = require("mime-types");
var multiparty = require("multiparty");
const { exec } = require("child_process");
const multer = require('multer');
var iconv = require("iconv-lite");
var encoding = "cp936";
var binaryEncoding = "binary";


teamMember = require("./models/teamMember");
project = require("./models/project");
teacher = require("./models/teacher");
student = require("./models/student");
admin = require("./models/adminUser");
// 报名表
signpage = require("./models/signpage");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function imgToBase64(url) {
  try {
    let imgurl = url;
    let imageData = fs.readFileSync(imgurl); //从根目录访问
    if (!imageData) return "";
    let bufferData = Buffer.from(imageData).toString("base64");
    let base64 = "data:" + mineType.lookup(imgurl) + ";base64," + bufferData;
    return base64;
  } catch (error) {
    return "";
  }
}

//TODO:怎么经常去更新这个元素在新arr里的位置？这里的bug因为上面的i就是固定的了，不会因为arr减少而减少
function TEST_getTitleAndLink(targetText) {
	console.log('%c targetText', 'color: red', targetText);
  //const targetText = '关于启动浙江财经大学第十八届大学生电子商务竞赛 ... https://jwc.zufe.edu.cn/sanji-content.jsp?urltype=news.NewsContentUrl&wbtreeid=1082&wbnewsid=8035';
  
  function getTL(arrTL){
	// console.log('%c arrTL', 'color: red', arrTL);
	let obj = {}
	try {
		if(arrTL.length == 3){
			obj = {
				title: arrTL.slice(0, 2).join(" "),
				link: arrTL[2]
			}; 
		} else {
			obj = {
				title: arrTL[0],
				link: arrTL[1]
			}
		}
	} catch (error) {
		console.log(error);
		console.log('%c arrTL', 'color: blue', arrTL);
	}
	
	
	return obj;
  }

  const arr = targetText.split(" ");
  const tempArr = [];
  let length = 0;
  let temp = [];
  const tempTitles = [];
  const tempLink = [];
  const gtx = /[\u4e00-\u9fff]+/

  console.log('%c arr', 'color: red', arr);
  for (let i = 0; i < arr.length; i++) {
	if(arr[i].indexOf("https") > -1){
		tempLink.push(arr[i]);
		// temp = arr.splice(0, i+1 - length);
		// length = length + temp.length;
		// tempArr.push(temp) // TODO:怎么经常去更新这个元素在新arr里的位置？这里的bug因为上面的i就是固定的了，不会因为arr减少而减少
		// console.log('%c length', 'color: yellow', length, i+1 - length);
		// console.log('%c tempArr', 'color: yellow', tempArr);
	} else if(gtx.test(arr[i]) || arr[i].indexOf("赛") > -1 || arr[i].indexOf("赛") > -1 ){
		tempTitles.push(arr[i]);
	}
	console.log('%c tempTitles', 'color: yellow', tempTitles);
	console.log('%c tempLink', 'color: yellow', tempLink);
  }
  
  
  const newArr = [];

  for (let i = 0; i < tempArr.length; i++) {
	newArr.push(getTL(tempArr[i]))
  }

  return newArr;
}

function getTitleAndLink(targetText) {
	// console.log('%c targetText', 'color: red', targetText);
  //const targetText = '关于启动浙江财经大学第十八届大学生电子商务竞赛 ... https://jwc.zufe.edu.cn/sanji-content.jsp?urltype=news.NewsContentUrl&wbtreeid=1082&wbnewsid=8035';
  const targetDS = targetText.split("==============================");
  console.log(targetDS);
  const result = targetDS.map((tempTarget)=>{
    const arr = tempTarget.split(" ");
    const tempArr = [];
    let length = 0;
    let temp = [];
    const tempTitles = [];
    const tempLink = [];
    const gtx = /[\u4e00-\u9fff]+/

    // console.log('%c arr', 'color: red', arr);
    for (let i = 0; i < arr.length; i++) {
      if(arr[i].indexOf("https") > -1){
        tempLink.push(arr[i]);
      } else if(gtx.test(arr[i]) || arr[i].indexOf("赛") > -1 || arr[i].indexOf("赛") > -1 ){
        tempTitles.push(arr[i]);
      }
    }

    const tempObj = {titles: tempTitles, links: tempLink};
    const res = tempObj.titles.map((title, index) => ({
      title: title.trim(),
      link: tempObj.links[index].trim()
    }));

    return res;
  })
  return result;
}

function getNotices() {
  // 在Node.js中执行Python脚本
  let res = "";
  // let cmd = 'pip install requests --user && pip install bs4 --user && python ./public/爬取通知.py '
  let cmd = "python ./public/爬取通知.py ";

  function myAsyncFunction() {
    return new Promise(function (resolve, reject) {
      exec(cmd, { encoding: binaryEncoding }, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行Python脚本时出错： ${error}`);
          console.error(
            iconv.decode(Buffer.from(stderr, binaryEncoding), encoding)
          );
          reject(error);
        }
        // 打印输出
        const res = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding);
        resolve(res);
      });
    });
  }
  return myAsyncFunction();
}

//===============链接到mongodb==================//

mongoose.connect('mongodb://localhost/competstore');
var db = mongoose.connection;

//监听事件
mongoose.connection.once("open", function () {
	console.log("数据库连接成功~~~");
});

mongoose.connection.once("close", function () {
	console.log("数据库连接已经断开~~~");
});

//===============用户相关==================//

app.get("/", (req, res) => {
  getNotices()
    .then(function (result) {
      res.send(result);
    })
    .catch(function (error) {
      console.error(error); // 处理错误
    });
});

//登录
app.post(`/login`, (req, res) => {
  var t = req.body;
  student.findOne({ userName: t.userName, passWord: t.passWord }, (err, user) => {
    if (err) {
      //console.log(err);
      throw err;
    }
    if (user) {
      res.send("登录成功");
    } else {
      res.send("登录失败");
    }
  });
});

//登出
app.post(`/logout`, (req, res) => {
  var t = req.body;
  student.findOne({ name: t.userName, pass: t.passWord }, (err, user) => {
    if (err) {
      //console.log(err);
      throw err;
    }
    if (user) {
      res.send("退出成功");
    } else {
      res.send("登录失败");
    }
  });
});

// 注册函数
const userRegister = (t, identy, res) => {
  const stdParams = {
    ...t,
    roleInTeam: '队长',
    teamId: Math.floor(Math.random() * 90000) + 10000,
    projectId: Math.floor(Math.random() * 900) + 100,
  };
  const teacherParams = {
    ...t,
    projectToAudit: [],
  };
  const adminParams = {
    ...t,
  };
  const kuArr = [student, teacher, admin];
  const paramsArr = [stdParams, teacherParams, adminParams];

  kuArr[identy].create(paramsArr[identy], (err, user) => {
    if (err) {
      //console.log(err);
      throw err;
    }
    if(identy === 0){
      teamMember.create(stdParams, (err, user) => {
        if (err) {
          //console.log(err);
          throw err;
        }
        if (user) {
          console.log("队长注册成功");
        } else {
          console.log("队长注册失败");
        }
      });
    }
    if (user) {
      res.send("注册成功");
    } else {
      res.send("注册失败");
    }
  });
}

//注册
app.post(`/register`, (req, res) => {
  var t = req.body;
  userRegister(t, t.identy, res)
});

//删除用户信息
app.delete("/userDelete/:_id", (req, res) => {
  var query = { _id: req.params._id };
  student.deleteOne(query, (err, user) => {
    if (err) {
      throw err;
    }
    res.json(user);
  });
});

// ===============学生端 主缆==================//
app.get("/mainStd/notice", (req, res) => {
  // res.send('welconm');
  getNotices()
    .then(function (result) {
      	res.send(getTitleAndLink(result.substr(1)));
    })
    .catch(function (error) {
      console.error(error); // 处理错误
    });
});

//查询队伍成员/mainStd/member
app.post("/mainStd/member", (req, res, next) => {
  teamMember.find(req.body, (err, teamMembers) => {
    if (err) {
      throw err;
    }
    if (teamMembers) {
      //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
      res.json(teamMembers);
    } else {
      res.send("未找到相关信息");
    }
  });
});



// TODO:===============支持记录==================//

// 配置 multer
const upload = multer({
  storage: multer.memoryStorage() // 把文件存储在内存中
});

// 处理文件上传请求
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file; // 获取上传的文件
  const fileData = file.buffer; // 获取上传文件的二进制数据
  // 将二进制数据写入到数据库中
  res.send({ message: 'File uploaded successfully' });
});




// ===============成员记录==================//

// 该队伍名下所有成员

app.post("/api/myGroup/list", (req, res, next) => {
  var t = req.body;
  teamMember.find({ teamId: t.teamId }, (err, RcArr) => {
    console.log(RcArr);
    if (err) {
      throw err;
    }
    if (RcArr.length !== 0) {
      //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
      console.log("RcArr不为null", RcArr);
      res.json(RcArr);
    } else {
      console.log("RcArr为null");
      res.send("未找到相关信息");
    }
  });
});

// 成员详情
app.post(`/myGroup/detail`, (req, res) => {
  var t = req.body;
  teamMember.findOne({ stdNumber: t.stdNumber }, (err, tm) => {
    if (err) {
      throw err;
    }
    if (tm !== null) {
        res.json(tm);
    } else {
      console.log("proName为null");
      res.send('0');
    }
  });
});

//删除成员
app.delete("/myGroup/:userName", (req, res) => {
  var query = { userName: req.params.userName };
  console.log(query);
  teamMember.deleteOne(query, (err, project) => {
    if (err) {
      throw err;
    }
    res.send('1');
  });
});

// 添加成员
app.post(`/myGroup/add`, (req, res) => {
  console.log(req.body)
  teamMember.create(req.body, (err, user) => {
    if (err) {
      //console.log(err);
      throw err;
    }
    if (user) {
      console.log("队员添加成功");
      res.send('1');
    } else {
      console.log("队员添加失败");
      res.send('0');
    }
  });
});

// 编辑成员
app.post("/myGroup/update", (req, res, next) => {
  console.log("编辑成员", req.body, req);
  let t = req.body._id;
  teamMember.findOne({ _id: t }, (err, tm) => {
    if (err) {
      throw err;
    }
    if (tm !== null) {
      //findone 和find 返回值有区别，当找不到时 find返回空数组，findone返回null
      teamMember.updateOne({ _id: t }, req.body, (err, docs) => {
        if (err) {
          res.send('0');
        }
        /**更新数据成功，紧接着查询数据 */
        teamMember.findOne({ _id: t }, (err, t) => {
          if (err) {
            res.send('0');
          }
          res.json(t);
        });
      });
    } else {
      console.log("proName为null");
      res.send('0');
    }
  });
});

app.listen(5000);
console.log("Running on port 5000...");
