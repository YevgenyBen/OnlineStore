var express = require('express');
var router = express.Router();

products = [
    {id:1,name:"HDD",price:600,weight:25},
    {id:2,name:"Car",price:80000,weight:25000},
    {id:3,name:"Key",price:10,weight:10},
    {id:4,name:"Shirt",price:50,weight:6}
]
/* GET Products List. */
router.get('/api/v1/', function(req, res, next) {
    response = {
        success:true,
        error:false,
        message:"Got List",
        data:products
    }
    res.status(200).json(response);
    
});
/* GET Products List. */
router.get('/api/v1/:id', function(req, res, next) {
    console.log( "id: " , req.params );
    let id = req.params.id;
    response = {
        success:true,
        error:false,
        message:"Got Product",
        data: products.find( (product) => product.id == id )
    }
    res.status(200).json(response);
    // for( let i = 0; i < products.length ; i++){
    //     if( products[i].id == id ){
    //         response.data = products[i];
    //         break;
    //     }
    // }
    
});
router.post('/api/v1/',function(req,res,next){
    console.log( req.body );
    req.body.id = products.length;
    products.push(req.body);
    response = {
        success:true,
        error:false,
        message:"Product Added",
        data:null
    }
  res.status(201).send(response);
});

module.exports = router;