var express = require('express')
var app = express()

var fs = require('fs')

var cors = require('cors')
var axios = require('axios')

//Helpers
var contentFile_TXT = require('./helpers/contentFile_TXT')
var contentFile_JSON = require('./helpers/contentFile_JSON')

//cors
app.use(cors())
 
//Body-Parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/api/:cep',(req,res, next)=>{
   let { cep } = req.params
   
   axios.get(`https://viacep.com.br/ws/${cep}/json/`)
   .then(response => res.json(response.data))
   .catch(err =>{
      res.json({erro: 'Erro de servidor, tente novamente'})
      console.log(err)
   })
})

app.get("/api/download/:cep/:format",(req, res)=>{
   let { cep, format } = req.params

   axios.get(`https://viacep.com.br/ws/${cep}/json/`)
   .then(response => {
     if(format == "txt"){
      fs.appendFile(`CEP_${cep}.txt`, contentFile_TXT(response.data), (err)=>{
         if(err) throw err
         else{
            res.download(`CEP_${cep}.txt`,`CEP_${cep}.txt`,(err)=>{
               if(err) throw err
               else{
                  fs.unlink(`CEP_${cep}.txt`,(err)=>{
                     if(err) throw err
                  })
               }
            })
         } 
       })
     }
     else if(format == "json"){
      fs.appendFile(`CEP_${cep}.json`, contentFile_JSON(response.data), (err)=>{
         if(err) throw err
         else{
            console.log(response.data)
            res.download(`CEP_${cep}.json`,`CEP_${cep}.json`,(err)=>{
               if(err) throw err
               else{
                  fs.unlink(`CEP_${cep}.json`,(err)=>{
                     if(err) throw err
                  })
               }
            })
         } 
       })
     }
   })
})

app.listen(1425,()=>{
   console.log('aberto na porta 1425')
})
