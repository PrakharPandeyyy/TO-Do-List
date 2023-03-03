const express=require("express");
const bodyparser=require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

let items =[];

app.get("/",function(req,res){

    let today=new Date();

    let options = {
        weekday : "long",
        day : "numeric",
        month: "long"
    };

    let day =today.toLocaleDateString("en-US",options);

    res.render("list",{
        kindofday:day , newListItems :items });


});
app.post("/",function(req,res){
    let item=req.body.newItem;
    items.push(item);

    res.redirect("/");
});


app.listen(3000,function(){
    console.log("Server is Online on Port:3000");
});