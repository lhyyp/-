const express = require('express');
const router = express.Router();
const db = require('../libs/db.js');
const fs = require('fs');
const pathlib=require('path');
const async =require("async")

//产品banner
router.get('/getbanner',(req,res)=>{
    db.selectAll('product_banner',(data)=>{
    	res.json(data);
    });
})


//产品分类
router.get('/getClassification',(req,res)=>{
    db.selectAll('product_classification',(data)=>{
    	res.json(data);

    });
})

/**

   获取分类的商品
   精品直兑  cid => 1
   
*/
router.get('/getExchange',(req,res)=>{
	let cid = req.query.cid;
	let page =  req.query.page || 0;
		page=page*10;
    db.select(`select id,productSrc,producttPrices,productIntroduce,beastNum from product where cid=${cid} order by id limit ${page},10`,(data)=>{
    	for(let i=0; i<data.length;i++){
    		data[i].productSrc=data[i].productSrc.split(',');
		}
		res.json(data);	
    });
})



/**

   人气推荐
   beastNum  =>  购买数量
   
*/
router.get('/getrecommendation',(req,res)=>{
	let page =  req.query.page || 0;
		page=page*10;
    db.select(`select id,productSrc,producttPrices,productIntroduce,beastNum from product   order by beastNum  desc limit ${page},10`,(data)=>{
    	for(let i=0; i<data.length;i++){
    		data[i].productSrc=data[i].productSrc.split(',');
		}
		res.json(data);	
    });
})

/**

   商品详情
   id  =>  商品id
   
*/
router.get('/getCommodityDetails',(req,res)=>{
	let id =  req.query.id ;
	if(!id){
		res.json({'status':0,'msg':'找不到该产品'});
	}
    db.select(`select * from product where id= ${id}`,(data)=>{
    	for(let i=0; i<data.length;i++){
    		data[i].productSrc=data[i].productSrc.split(',');
		}
		res.json(data);	
    });
})
/**

   商品详情
   code  =>  商品code
   
*/
router.get('/getProductInfo',(req,res)=>{
  let code =  req.query.code ;
  if(!code){
    res.json({'status':0,'msg':'找不到该产品'});
  }
    db.select(`select * from product where code= ${code}`,(data)=>{
        for(let i=0; i<data.length;i++){
          data[i].productSrc=data[i].productSrc.split(',');
        }
      res.json(data); 
    });
})


/**

   加入购物车
   code  =>  商品code
   
*/
router.get('/addcart',(req,res)=>{
  let data =  JSON.parse(req.query.data);
  let openid =  req.query.openid ;
  let qcode = data.code;
  if(!openid){
    res.json({'status':101,'msg':'请先登录'});
  }
  if(!data){
    res.json({'status':0,'msg':'加入购物车失败'});
  }
  async.waterfall([
       function(cb){
          db.add(`select * from shoppingCart where openid= '${openid}' and qcode = ${qcode}`,(err,result)=>{
            cb(err,result)
          });
       },
       function(result,cb){
        if(result.length>0){
          db.add(`UPDATE shoppingCart SET number=${result[0].number+1} WHERE openid='${openid}' and qcode = ${qcode}`, (err,result)=>{
            cb(err,result);
          }) 
        }else{
          db.add(`insert into shoppingCart (openid,product_id,prices,qcode,number,productIntroduce) values ('${openid}',${data.id},'${data.producttPrices}','${data.code}',1,'${data.productIntroduce}')`,(err,result)=>{
            cb(err,result);
          }) 
        }

       }
    ],function(err, data) {
            if (err) {
                console.log(err);
                res.json({"status":5000,"msg":err.message});
            } else {
              res.json(data);
            }
        })
  
})

  /**

   购物车宝贝
   openid  =>  用户id
   
*/ 

router.get('/getShoppingCartlist',(req,res)=>{
  let openid =  req.query.openid ;
  db.select(`select * from shoppingCart where openid= '${openid}'`,(data)=>{
    res.json(data); 
  });

})


 /**

   购物车宝贝
   code =>
   
*/ 

router.get('/reduce',(req,res)=>{
  let openid =  req.query.openid ;
  let qcode =  req.query.code ;
  let act =  req.query.act ;
   async.waterfall([
       function(cb){
          db.add(`select * from shoppingCart where openid= '${openid}' and qcode = ${qcode}`,(err,result)=>{
            cb(err,result)
          });
       },
       function(result,cb){
        if(result.length>0){
          if(act==0){
            if(result[0].number>1){
              db.add(`UPDATE shoppingCart SET number=${result[0].number-1} WHERE openid='${openid}' and qcode = ${qcode}`, (err,result)=>{
                cb(err,result);
              })
            }else{
               db.add(`DELETE FROM  shoppingCart  WHERE openid='${openid}' and qcode = ${qcode}`, (err,result)=>{
                cb(err,result);
              })
            }
          }else{
            db.add(`UPDATE shoppingCart SET number=${result[0].number+1} WHERE openid='${openid}' and qcode = ${qcode}`, (err,result)=>{
                cb(err,result);
              })
          }
        }
      }
    ],function(err, data) {
            if (err) {
                console.log(err);
                res.json({"status":5000,"msg":err.message});
            } else {
              res.json(data);
            }
        })
})














//上传图片s
router.post('/imgupload',function(req,res){
   var imgPath={};
       imgPath.oldpath=req.files[0].path;  //图片原名
       imgPath.newpath=req.files[0].path+pathlib.parse(req.files[0].originalname).ext; //图片原名+后缀
       imgPath.newFilename=req.files[0].filename+pathlib.parse(req.files[0].originalname).ext;

    fs.rename(imgPath.oldpath,imgPath.newpath,function(err){
              if(err){
                res.json({'status':0,'msg':'图片重命名错误'});
              }else{
                 res.json(imgPath.newFilename); 
              }
            })
   
  
})










module.exports = router;