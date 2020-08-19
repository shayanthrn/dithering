const express = require('express');
const router = express.Router();
var floydSteinberg = require('floyd-steinberg');
var fs = require('fs');
var PNG = require('pngjs').PNG;
var mv = require('mv');


router.get("/",function(req,res){
    res.render("index.ejs");
    res.end();
})

router.get("/aboutdither",function(req,res){
    res.render("whatisdither.ejs");
    res.end();
})

router.get("/supports",function(req,res){
    res.render("supports.ejs");
    res.end();
})

router.post("/uploadphoto",function(req,res){
    mv(req.files.file.tempFilePath,"public/in.png",function(err){
        fs.createReadStream('public/in.png').pipe(new PNG()).on('parsed', function() {
            floydSteinberg(this).pack().pipe(fs.createWriteStream('public/out.png'));
            res.redirect("/compare")
        });
    })
})

router.get("/compare",function(req,res){
    res.render("compare.ejs");
    res.end();
})

router.get("*",function(req,res){
    res.render("404.ejs");
    res.end();
})

module.exports = router;