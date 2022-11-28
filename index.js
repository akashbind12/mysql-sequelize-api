const express = require("express")
const app = express();
const { User , Department, Post, Tag, post_tag } = require("./models");
const db = require("./models");
const { Op } = require("sequelize");

app.use(express.json());


app.get("/", async (req,res) => {
    try{

        let page = req.query.page ?  parseInt(req.query.page) : 1
        let per_page = req.query.per_page ? parseInt(req.query.per_page) : 5

        let users =  await User.findAll({
            limit: per_page,
            offset: (page - 1) * per_page,
            attributes:{
                exclude : [ "createdAt","updatedAt","department_id "]
            },
            where: {
                id: {
                  [Op.gt]: 2
                }
            },
            include: {
                model: Department,
                attributes:['id', 'Name']
            }
        })
        // console.log(users)
        // return res.send(users)
        const alldocuments = await User.findAll()
        const totaldocuments = alldocuments.length
        const totalPages = Math.ceil(totaldocuments/per_page);
        // console.log(totaldocuments,totalPages)

        return res.status(200).send({
            "success" : true,
            "data" : {
                    "totalItems": totaldocuments,
                    "data" : users
                },
            "totalPages": totalPages,
            "currentPage":page
        })

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
            "lastname": req.body.lastname,
            "department_id": req.body.department_id
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

//department 
app.get("/department", async (req,res) => {
    try{

        let departments =  await Department.findAll()
        console.log(departments)
        return res.send(departments)
    }catch(err){
        console.log(err)
        return res.send({err : err})
    }
})

app.post("/department", async (req,res) => {
    console.log(req.body)
   try{
        let department = await Department.create({
            "Name" : req.body.Name,
        })
        // console.log(user)
        return res.send({res : department})
   }catch(err) {
        // console.log(err)
        return res.send({err : err})
   }
})


// posts routes
app.post("/posts", async (req,res) => {
   console.log(req.body)
   try{
        let post = await Post.create({
            "name" : req.body.name,
            "title" : req.body.title,
            "content" : req.body.content,
            "user_id" : req.body.user_id,
        }) 

        // if(post){
        //     try{
        //         let postTag = await post_tag.create({
        //             "postId" : post.id,
        //             "tagId" : 2,
        //         }) 
        //         return res.send({res : {post,postTag }})
        //     }catch{
        //         return res.send({err : err})
        //     }
        //  }
         

        return res.send({res : post})
   }catch(err) {
        return res.send({err : err})
   }
})

app.get("/posts", async (req,res) => {
    try{

        let allpost =  await Post.findAll({
            attributes:['id', 'name', 'title', 'content'],
            include: [{
                    model : Tag,
                    attributes:['id', 'name'],
                }],
        })
        console.log(allpost)
        return res.send(allpost)
    }catch(err){
        console.log(err)
        return res.send({err : err})
    }
})


// tags routes
app.post("/tags", async (req,res) => {

    try{
         let tags = await Tag.create({
             "name" : req.body.name,
         }) 

         return res.send({res : tags})

    }catch(err) {
         return res.send({err : err})
    }
 })

 app.get("/tags", async (req,res) => {
    try{

        let tags =  await Tag.findAll({
            attributes:['id', 'name'],
            include: [{
                    model : Post,
                    attributes:['id', 'name', 'title', 'content'],
                }],
        })
        
        // console.log(post)
        return res.send(tags)
    }catch(err){
        console.log(err)
        return res.send({err : err})
    }
})

db.sequelize.sync().then((req) => {
    app.listen(3000, () => {
        console.log("server running at port 3000")
    })
})

