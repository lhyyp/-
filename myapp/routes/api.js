const express = require('express');
const router = express.Router();
const db = require('../libs/db.js');

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











module.exports = router;