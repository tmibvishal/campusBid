const Product = require("../models/product.model");

module.exports.test = function(req, res){
    res.send("This is the test controller");
};

module.exports.product_create = function(req, res){
    let product = new Product({
        name: req.body.name,
        price: req.body.price
    });

    product.save(function (err) {
        if(err){
            throw err;
        }
        res.send("You have successfully created user: "+ req.body.name + " \nwith price: " + req.body.price)
    });
};

module.exports.product_details = function(req,res){
    Product.findById(req.params.id, function(err, product){
        if(err) throw err;
        res.send(product);
    });
};

module.exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, product){
        if(err) {
            res.send("Not able to update object\nError: " + err);
            return;
        }
        res.send("Product Updated");
    });


};

module.exports.product_delete = function(req, res){
    Product.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send("Not able to update object\nError: " + err);
            return;
        }
        res.send('Deleted successfully!');
    });
};