const express=require("express");
const bodyparser=require("body-parser");
const date=require(__dirname+"/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

let items =[];
let workItems=[];

app.get("/",function(req,res){

    let day=date();

    res.render("list",{
        listTitle:day , newListItems :items });


});
app.post("/",function(req,res){
    let item=req.body.newItem;
if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
}
else{
    
        items.push(item); 
        res.redirect("/");

}
});

app.get("/work",function(req,res){
    res.render("list",{
        listTitle:"Work",newListItems:workItems
    })
});
app.post("/work",function(req,res){
    let items=req.body.newItem;
    workItems.push(items);
});



app.listen(3000,function(){
    console.log("Server is Online on Port:3000");
});