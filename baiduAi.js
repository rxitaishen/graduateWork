const request = require('request');

const APP_ID = '33306376'; // 替换为你的 APP_ID
const API_KEY = 'DuX1QYNkhMKeey7CgwTVGZTr'; // 替换为你的 API_KEY
const SECRET_KEY = 'f1dlGqKsUEGhS2kT4cMcxY5c37XE8pND'; // 替换为你的 SECRET_KEY

function getAccessToken() {
  return new Promise((resolve, reject) => {
    const url = 'https://aip.baidubce.com/oauth/2.0/token';
    const grantType = 'client_credentials';
    const params = { grant_type: grantType, client_id: API_KEY, client_secret: SECRET_KEY };

    request.post({ url: url, form: params }, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        const result = JSON.parse(body);
        resolve(result.access_token);
      }
    });
  });
}


function getContentCheckResult(text) {
  return new Promise((resolve, reject) => {
    const params = {
      text: text
    };
    getAccessToken().then((token) => {
        const request_url = "https://aip.baidubce.com/rest/2.0/solution/v1/text_censor/v2/user_defined";
        const access_token = `[${token}]`;
        const headers = { 'content-type': 'application/x-www-form-urlencoded' };

        const options = {
            url: request_url + "?access_token=" + access_token,
            method: 'POST',
            headers: headers,
            form: params
        };

        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                // console.log(body);
                resolve(body)
            }
        });
    });
  });
}

module.exports = getContentCheckResult;
// // 测试代码
// const text = '我是一个测试文我他妈的本，包含敏感词汇，如：色情、赌博、毒品等。';
// getContentCheckResult(text).then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.error(err);
// });
