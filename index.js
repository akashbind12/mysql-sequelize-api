const express = require("express")
const app = express();
const { User } = require("./models");
const db = require("./models");

app.use(express.json());


app.get("/", async (req,res) => {
    try{

        let users =  await User.findAll()
        console.log(users)
        return res.send(users)
    }catch(err){
        console.log(err)
        return res.send({err : err})
    }
})

app.post("/", async (req,res) => {
    console.log(req.body)
   try{
        let user = await User.create({
            "firstName" : req.body.firstName,
            "age": req.body.age,
            "lastname": req.body.lastname
        })
        // console.log(user)
        return res.send({res : user})
   }catch(err) {
        // console.log(err)
        return res.send({err : err})
   }
})

app.delete("/:id", async (req,res) => {
    try{
        let user = await User.destroy({ where: { id : req.params.id}})
        // console.log(user)
        return res.send({res : user})
   }catch(err) {
        console.log(err)
        return res.send({err : err})
   }
})

app.put("/:id", async (req,res) => {
    try{
        let user = await User.update(
            {
                "firstName" : req.body.firstName,
                "age": req.body.age,
                "lastname" : req.body.lastname
            },
            { 
                where: { id : req.params.id}
            }
        )
        console.log(user)
        return res.send({res : user})
   }catch(err) {
        console.log(err)
        return res.send({err : err})
   }
})

db.sequelize.sync().then((req) => {
    app.listen(3000, () => {
        console.log("server running at port 3000")
    })
})

