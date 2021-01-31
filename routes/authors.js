const express = require('express')
const router = express.Router()
const Author = require('../models/author')

router.get('/',async (req,res) => {
    let searchOptions = {}
    if(req.query.searchauthor != null && req.query.searchauthor !== "")
    {
        searchOptions.name = new RegExp(req.query.searchauthor , 'i')
    }
    try{
        const authors = await Author.find(searchOptions)
        res.render("authors/listauthors" , { authors : authors , searchOptions : req.query.searchauthor });
    }
    catch{
        res.redirect('author')
    }
})

router.get('/new',(req,res) => {
    res.render("authors/createauthor" , { author : new Author() });
})

router.post('/', async (req,res) => {
    // const author = new Author({
    //     name : req.body.name
    // })
    // try{
    //     const res = await author.save()
    //     res.redirect('author')
    // }
    // catch{
    //     res.render('authors/createauthor' , {
    //         author : author,
    //         errorMessage : "Failed to create author"
    //     })
    //     console.log("it come here")
    // }

    const author = new Author({
        name : req.body.name
    })
    author.save((err,newauthor) => {
        if(err) {
            res.render('authors/createauthor',{ 
                author : author,
                errorMessage : "Error occured"
            })
        }
        else{
            res.redirect('author')
        }
    })
    // console.log(req.body.name)
    // res.redirect('/')
})  

module.exports = router;