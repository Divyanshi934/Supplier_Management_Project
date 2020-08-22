var express = require('express');
var router = express.Router();
var pool=require('./pool.js')
var upload=require('./multer')
/* GET home page. */
router.get('/searching', function(req, res, next) {
  res.render('search',{msg:''});
   });

router.get('/supplierinterface', function(req, res, next) {
  if(!req.session.ADMIN)
 { res.render('adminlogin',{msg:''});}
 else

  {
  res.render('suppliers',{msg:''});
  }
});

router.get('/displays',function(req,res,next){
  pool.query('select D.*,(select SN.statename from statename SN where SN.stateid=D.supplierstate)as sname,(select C.cityname from listofcities C where C.cityid=D.suppliercity)as cname from deal D',function(error,result){
    if(error)
    {console.log(error)
      res.render('displays',{data:'Server Error'})}
    else
    {res.render('displays',{data:result})}
  })
});

router.get('/displaybyid',function(req,res,next){
  pool.query('select D.*,(select SN.statename from statename SN where SN.stateid=D.supplierstate)as sname,(select C.cityname from listofcities C where C.cityid=D.suppliercity)as cname from deal D where D.supplierid=?',[req.query.sid],function(error,result){
    if(error)
    { console.log(error)
res.render('displaybyid',{data:'Server Error'})
    }
    else
    {if(result.length==0)
      res.render('displaybyid',{data:'Record Not Found'})
      else res.render('displaybyid',{data:result[0]})

    }
  })
});

router.get('/suppliereditdelete',function(req,res,next){
  if(req.query.btn=='Edit')
  {
    pool.query('update deal set suppliername=?,supplieraddress=?,supplierstate=?,suppliercity=?,suppliermob=?,supplierphone=?,dealing=?,dob=?,gender=? where supplierid=?',[req.query.suppliername,req.query.supplieradd,req.query.state,req.query.city,req.query.mno,req.query.pno,req.query.deal,req.query.dob,req.query.gender,req.query.supplierid],function(error,result){
if(error)

{
  console.log(error)
  return res.redirect('/laptop/displays')}
else
{
  return res.redirect('/laptop/displays')}
})
}
else{
  pool.query('delete from deal where supplierid=?',[req.query.supplierid],function(error,result){
    if(error)
    { console.log(error)
     return res.redirect('/laptop/displays')}
    else
    { return res.redirect('/laptop/displays')}
  
  })
} 
});

router.post('/editpicture',upload.single('picture'),function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
 pool.query('update deal set picture=?where supplierid=?',[req.file.originalname,req.body.supplierid],function(error,result){
 
  if(error)
  { console.log(error)
   return res.redirect('/laptop/displays')}
  else
  { return res.redirect('/laptop/displays')}
   })
  })



router.post('/suppliersubmit',upload.single('picture'),function(req,res,next){
  console.log(req.body)
  console.log(req.file)
  pool.query('insert into deal(suppliername,supplieraddress,supplierstate,suppliercity,suppliermob,supplierphone,dealing,picture,dob,gender)values(?,?,?,?,?,?,?,?,?,?)',[req.body.suppliername,req.body.supplieradd,req.body.state,req.body.city,req.body.mno,req.body.pno,req.body.deal,req.file.originalname,req.body.dob,req.body.gender],function(error,result){
    if(error)
    { console.log(error)
      res.render('suppliers',{msg:'Fail to submit record'});}
      else
  { res.render('suppliers',{msg:'Record Submitted'});}

  
    })
  
  
});
router.get('/fetchstatename',function(req,res,next){
  pool.query('select*from statename',function(error,result){
    if(error)
    {return res.status(500).json([])}
    else
    {return res.status(200).json(result)}
  })
});
router.get('/fetchcityname',function(req,res,next){
  pool.query('select*from listofcities where stateid=?',[req.query.tid],function(error,result){
    if(error)
    {return res.status(500).json([])}
    else
    {return res.status(200).json(result)}
  })
});
router.get('/displayallJSON', function(req, res, next) {
  var q="select D.picture,D.suppliername from deal D where D.suppliername like '%"+req.query.txt+"%'"
  console.log(q) 
  pool.query(q,function(error,result){
  if(error)
  { console.log(error)
    res.status(500).json([])
  }
    else
  {res.status(200).json(result)}
  
   })
  });
 
 
module.exports = router; 