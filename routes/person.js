var express = require('express');
var router = express.Router();
var Person = require('./../models/Person');

//find all
router.get('/', function(req, res){
    Person.find({}, function(err, people){
        if(err){
            return;
        }
        res.send(people);
    });
});

//findOne
router.get('/:id', function(req, res){
    Person.findById(req.params.id, function(err, person){
        if(err){
            return;
        }
        res.send(person);
});

    // Person.findOne({
    //     _id: req.params.id
    // }, function(err, person)
    //     if(err){
    //         return;
    //     }
    //     res.send(person);
    // });
});

//router.post('/', function(req,res){
    // var arr = [{
    //         name:{
    //             firstname:'Gabriela 1',
    //             lastname: 'Ludovino'
    //         },
    //         age: 30
    //     }, {
    //         name:{
    //             firstname:'Gabriela 2',
    //             lastname: 'Ludovino'
    //         },
    //         age: 29
    //     },  {
    //         name:{
    //             firstname:'Gabriela 3',
    //             lastname: 'Ludovino'
    //         },
    //         age: 45
    // }];

    // Person.insertMany(arr, function(err, person){
    //     if (err) {
    //         return;
    //     }

    //     res.send(person);
    // });

    // var person = new Person({
    //     name:{
    //         firstname:'Gabriela',
    //         lastname: 'Ludovino'
    //     },
    //     age: 24
    // });

    // person.save(person, function(err, person){
    //     if(err){
    //         return;
    //     }
    //     res.send(person);
    // });

    // Person.create({
    //     name:{
    //         firstname: 'Bernardo',
    //         lastname: 'Tavares'
    //     },
    //     age: 23

    // }, function(err, person){
    //     if(err){
    //         return;
    //     }
    //     res.send(person);
    // });
//}); 

router.put('/:id', function(req, res){
    Person.findOneAndUpdate({
        _id: req.params.id
    }, {
        name:{
            firstname: 'TED',
            lastname: 'Talks'
        }
    }, function(err, person){
        if (err) {
            return;
        }

        res.send(person);

    });

    // Person.update({
    //     _id: req.params.id
    // }, {
    //     name:{
    //         firstname: 'José',
    //         lastname: 'Costa'
    //     }
    // }, function(err, person){
    //     if (err) {
    //         return;
    //     }

    //     res.send(person);

    // });
});

module.exports = router;