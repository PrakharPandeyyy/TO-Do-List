const express=require("express");
const bodyparser=require("body-parser");
const mongoose = require('mongoose')


const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/todolistDB', { useNewUrlParser: true });

const itemsSchema ={
    name: String
};
const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});
const item2 = new Item({
    name: "Hit the + button to add a new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete and item.!"
});
const defaultItem=[item1,item2,item3];
async function fun1(){
    try{
        await Item.insertMany(defaultItem);
    }
    catch(err){
        console.log(err.message);
    }
}
// fun1();
const ListSchema={
    name:String,
    items:[itemsSchema]
}
const List = mongoose.model("List",ListSchema);




app.get("/",function(req,res){

    async function fun2(){
        try{
            const data= await Item.find();
            if (data.length===0){
                fun1();
                res.redirect("/");
            }
            else{
                res.render("list",{
                    listTitle:"Today" , newListItems :data});
            }

            }
        catch(err){
            console.log(err.message);
        }
    }
    fun2();
});

app.get("/:customListName",function(req,res){
    const customListName=req.params.customListName;

    // List.findOne({name:customListName},function(err,foundList){

    //     if(!err){
    //         if(!foundList){
    //             const list= new List({
    //                 name : customListName,
    //                 items : defaultItem
    //             });
    //             list.save();
    //         }
    //         else{
    //             res.render("list",{listTitle:data.name , newListItems :data.items});
    //         }
    //     }
    // });
 

 
    async function fun4(){
        try{
            const data= await List.findOne({name:customListName});
            res.render("list",{listTitle:data.name , newListItems :data.items});
            
            
        }
        catch(err){
            
            const list= new List({
                name : customListName,
                items : defaultItem
            });
            list.save();
            res.redirect("/"+customListName);
        }
    }
    fun4();
});


app.post("/",function(req,res){
    const itemName =req.body.newItem;
    const item=new Item({
        name:itemName
    });
    item.save();
    
});


app.post("/delete",function(req,res){
    const checkedItemId= req.body.checkbox;
    async function fun3(){
        try{
        await Item.findByIdAndDelete(checkedItemId);
        console.log("Sucessfully Deleted");
        }
        catch(err){
            console.log(err.message);
        }
    }
    fun3();
    res.redirect("/");
});


app.post("/work",function(req,res){
    let items=req.body.newItem;
    workItems.push(items);
});



app.listen(3000,function(){
    console.log("Server is Online on Port:3000");
});