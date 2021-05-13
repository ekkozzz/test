const express = require("express")

const app = express()

app.use(express.json())

//连接mongo数据库
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/express-test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//list数据模型
const List = mongoose.model(
  "List",
  new mongoose.Schema({
    name: String
  })
)

//解决跨域
app.use(require("cors")())
//静态文件
app.use(express.static("public"))

app.get("/", function(req, res) {
  res.send("hello word")
})

app.get("/home", function(req, res) {
  res.send("this is home page")
})

//获取list
app.get("/list", async function(req, res) {
  const data = await List.find()
  res.send(data)
})

//获取list by id
app.get("/list/:id", async function(req, res) {
  const data = await List.findById(req.params.id)
  res.send(data)
})

//发送post请求添加
app.post("/list", async function(req, res) {
  const data = await List.create(req.body)
  res.send(data)
})

//修改
app.put("/list/:id", async function(req, res) {
  const data = await List.findById(req.params.id)
  data.name = req.body.name
  await data.save()
  res.send(data)
})

//删除
app.delete("/list/:id", async function(req, res) {
  const data = await List.findById(req.params.id)
  await data.remove()
  res.send({
    success: true
  })
})

app.listen(3000, () => {
  console.log("http://localhost:3000")
})
