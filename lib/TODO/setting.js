/**
 * Created by beens on 16/11/28.
 */


var wwwDir = "/Users/bens/my_code/svn_download/www/";

module.exports = {
    wwwDir:wwwDir,
    serverPort:"8001",
    url404:wwwDir+"404.html",
    svnUsername:"xufeng",
    svnPassword:"123456",
    // mysql:{
    //     host:"localhost",
    //     user: 'bens',
    //     password: 'xf771026aa',
    //     database:'chenhong',
    //     port: 3306
    // },
    // sqlite:{
    //     url:"/Users/beens/code/github/nodejs/server/sqlite/database/test.sqlite3"
    // },
    // fileUpload:{
    //     saveUrl:wwwDir+"upload/",
    //     maxSize:2 * 1024 * 1024,
    //     allowType:[
    //         "image/png",
    //         "image/jpg",
    //         "image/jpeg"
    //     ]
    // }
    svnList:[
        // {
        //     id:1,
        //     name:"应用app",
        //     svnUrl:"https://172.16.1.34/svn/Health/trunk/HealthCDWebPlatformApp/"
        // },
        {
            id:2,
            name:"预约挂号",
            svnUrl:"https://172.16.1.34/svn/h5/trank/app/common/AppointmentRegistration_WanDa"
        },
        {
            id:3,
            name:"小功能",
            svnUrl:"https://172.16.1.34/svn/h5/trank/app/wechat/xiaogongneng"
        },
        {
            id:4,
            name:"实时信息",
            svnUrl:"https://172.16.1.34/svn/h5/trank/app/common/HospitalInformationDisplay"
        },
        {
            id:5,
            name:"健康成都5.0",
            svnUrl:"https://172.16.1.34/svn/h5/trank/app/native/Health_CD_5.0"
        },
         {
            id:6,
            name:"3APP",
            svnUrl:"https://172.16.1.34/svn/h5/trank/app/common/HealthFiles/trunk"
        }
    ]
};