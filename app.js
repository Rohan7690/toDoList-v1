const express = require("express");
const bp = require("body-parser");
const app = express();
let date = require(__dirname+"/date.js");
var items = ["work", "sleep"];
let workItems = [];

app.use(express.static("public"));

app.use(bp.urlencoded({
    extended: true
}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  

    let day = date();

    res.render("list", {
        listTitle: day,
        items: items
    });

});

app.post("/", function (req, res) {
    let toDo = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(toDo);
        res.redirect("/work");
    }else{
        items.push(toDo);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work list",items:workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
    
});

app.post("/deleteItem", (req, res) => {
    const item = req.body.productId.value;

    

    if(req.body.list === "Work"){
        workItems.splice(workItems.indexOf(item), 1);
        res.redirect("/work");
    }else{
        items.splice(items.indexOf(item), 1);
        res.redirect("/");
    }
});

app.get("/about",function(req,res){
    res.render("about");
})
app.listen(3000, function () {
    console.log("server running on port 3000");
});