let express = require('express')
let students = require('./student')

let router = express.Router()


router.get('/students',(req,res)=>{
  students.find((err,students)=>{
    if (err){
      return res.status(500).send('error')
    }
    res.render('index.html',{
      list:['苹果','雪梨','香蕉','榴莲'],
      students
    })
  })
})

router.get('/students/new',(req,res)=>{
  res.render('new.html');
})

router.post('/students/new',(req,res)=>{
  students.save(req.body,(err)=>{
    if (err){
      return res.status(500).send('error');
    }
    res.redirect('/students')
  })
})

router.get('/students/edit',(req,res)=>{
  students.findByid(parseInt(req.query.id),(err,student)=>{
    if (err){
      return req.status(500).send('error')
    }
    console.log(student)
    res.render('edit.html',{
      student
    });
  })
})

router.post('/students/edit',(req,res)=>{
  students.updataId(req.body,(err)=>{
    if (err){
      return res.status(500).send('error')
    }
    res.redirect('/students')
  })
})

router.get('/students/delete',(req,res)=>{
  console.log(req.query.id);
  students.deleteById(req.query.id,(err)=>{
    if (err){
      return res.statusCode(500).send('error')
    }
    res.redirect('/students')
  })
})


module.exports = router