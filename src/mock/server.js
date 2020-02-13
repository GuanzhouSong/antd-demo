var app = require('koa')();
var router = require('koa-router')();
const fs = require('fs');
const path = require('path');


router.get('/api/get', function *(next){
    delete require.cache[require.resolve(`${process.cwd()}/src/date.json`)];
    let string = require(`${process.cwd()}/src/date.json`);
    console.log("get");
    console.log(string);
    this.set('Access-Control-Allow-Origin', '*');
    this.body = string;
});



router.get('/api/get/:string', function *(next){
    console.log("write " + this.params.string);
    this.set('Access-Control-Allow-Origin', '*');
    let jsonFile = `{
        "string": "${this.params.string}"
    }`;
    let rootDir  = process.cwd();
    console.log(rootDir);
    fs.writeFileSync(`${rootDir}/src/date.json`, jsonFile,(err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
        // success case, the file was saved
        console.log('Lyric saved!');
    });
    this.body = require('../date.json');
});


//
// //Homepage Recommendation
// var homeListData = require('./home/list.js')
// router.get('/api/homelist/:city/:page', function *(next) {
//     console.log('Homepage Recommendation')
//
//     // params
//     const params = this.params
//     const paramsCity = params.city
//     const paramsPage = params.page
//
//     this.body = homeListData
// });
//
// //Search Result
// var searchListData = require('./search/list.js')
// router.get('/api/search/:page/:city/:keyword', function *(next) {
//     console.log('Search Result')
//
//     const params = this.params
//     const paramsPage = params.page
//     const paramsCity = params.city
//     const paramsCategory = params.category
//     const paramsKeyword = params.keyword
//
//     this.body = searchListData
// })
//
//
//
// //Detail page
// const detailInfo = require('./detail/info.js')
// router.get('/api/detail/info/:id', function *(next) {
//
//     const params = this.params
//     const id = params.id
//
//     this.body = detailInfo
// })
//
//
// //page comment
// const detailComment = require('./detail/comment.js')
// router.get('/api/detail/comment/:page/:id', function *(next) {
//     this.body = detailComment
// })
//
//
// //submit review
// router.post('/api/submitComment', function *(next) {
//     console.log('提交评论')
//
//     // 获取参数
//
//     this.body = {
//         errno: 0,
//         msg: 'ok'
//     }
//
// })
//
// 开始服务并生成路由
app.use(router.routes())
   .use(router.allowedMethods());
app.listen(3001);
