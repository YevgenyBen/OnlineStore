var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "online_store"
});


/* 
Get Orders List
GET /orders
*/
router.get('/', (req,res,next) => {
    con.query("SELECT * FROM orders", function (err, result, fields) {
        if (err){
            console.log(err);
            res.status(500).end();
            return;
        }
        console.log(result);
        res.status(200).json(result);
    });
});

/* 
Get Order By ID
GET /orders/:id
*/
router.get('/:id', (req,res,next) => {
    con.query("SELECT * FROM orders WHERE id = " + req.params.id, function (err, result, fields) {
        if (err){
            console.log(err);
            res.status(500).end();
            return;
        }
        console.log(result);
        res.status(result && result.length > 0?200:204).json(result);
    });
});

/* 
Get Products From Order By ID
GET /orders/:id/products
*/
router.get('/:id/products', (req,res,next) => {
    let sql = `SELECT p.* FROM orders o 
    left join order_to_product otp on o.id = otp.order_id
    left join products p on p.id = otp.product_id
    where o.id = ${req.params.id}
    `;

    con.query(sql, function (err, result, fields) {
        if (err){
            console.log(err);
            res.status(500).end();
            return;
        }
        console.log(result);
        res.status(result && result.length > 0?200:204).json(result);
    });
});

/* 
Get Product By ID From Order By ID
GET /orders/:id/products/:pid
*/
router.get('/:id/products/:pid', (req,res,next) => {
    let order = orders.find( o => o.id == req.params.id );
    if( !order ){
        res.status( 204 ).json(order);
    }
    result = null;
    let exist = order.products.find( o => o == req.params.pid);
    if( !exist ){
        res.status( 204 ).json();
    }

    result = products.find( o =>  o.id == req.params.pid  );
    res.status(200).json(result);

    
});


/*
Post Add Order
Post /orders
*/

router.post("/",(req,res,next)=>{
    console.log(req.body);
    if( orders.length > 0 ){
        req.body.id = orders[ orders.length - 1].id + 1;
    }else{
        req.body.id = 1;
    }
    if( !req.body.products ){
        req.body.products = [];
    }
    orders.push(req.body);
    res.status(201).json(req.body);
});

/*
Delete Delete Order
Delete /orders/:id
*/

router.delete("/:id",(req,res,next)=>{
    console.log(req.params.id);
    var order = orders.find(o => o.id == req.params.id);
    if( !order ){
        res.status(204);
    }
    
    orders.splice( orders.indexOf( order ),1 );

    var order = null;
    orders.map( (o,index) => {
        o.id == req.params.id? orders.splice(index,1):null;
        o.id == req.params.id?order = o:null;
    });
    res.status(200).json(order);
});
module.exports = router;