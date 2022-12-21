const express = require ('express')
const router = express.Router()

//import model (People)
const { People } = require('../models')
//could also do: const db = require('../models) and then we'd use db.People throughout the code when we want to reference the model.

console.log(People)
//Routes

//http://localhost:4000/people - INDEX/GET(READ)
router.get('/', async (req, res)=> {
    // res.status(200).json({message: 'people index/get route '})
    try {
        const allPeople = await People.find({}) //.find would not be the best for very large pieces of data - not scalable. We would want to be more specific
        res.status(200).json(allPeople)
    } catch(err){
        res.status(400).json({error: err})
    }
})


//http://localhost:4000/people - POST/CREATE
router.post('/', async (req, res)=> {
    // console.log('post route', req.body)
    // res.status(201).json({message: 'people create/post route '})
    try {
        const newPerson = await People.create(req.body)
        res.status(201).json(newPerson)
    }catch(err) {
        res.status(400).json({error: err})
    }
})

//http://localhost:4000/people/:id - SHOW/GET(READ)
router.get('/:id', async (req, res, next) => {
    // res.status(200).json({message: 'people show route ' + req.params.id})
    try {
        const foundPerson = await People.findById(req.params.id)
        res.status(200).json(foundPerson)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

//http://localhost:4000/people/:id - DELETE
router.delete('/:id', async (req, res, next) => {
    // res.status(200).json({message: 'people delete route ' + req.params.id})
    try {
        const deletedPerson = await People.findByIdAndDelete(req.params.id)
        res.status(200).json(deletedPerson)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

//http://localhost:4000/people/:id - PUT/UPDATE
router.put('/:id', async (req, res, next) => {
    // res.status(200).json({message: 'people update route ' + req.params.id})
    try {
        const updatedPerson = await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPerson)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

module.exports = router