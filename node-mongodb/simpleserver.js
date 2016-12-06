var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');  //assert is for debugging!!!

//connection url
var URL = 'mongodb://localhost:27017/confusion';

//use connection method to connect to the server
MongoClient.connect(URL, function (err, db) { //db refers to specified database
   assert.equal(err, null); //like C language

   console.log("Connected correctly to the server!!"); //This function is I/O and synchronous!!!!!!!!!!!

    var collection = db.collection('dishes'); //Retrieve the collection, it's not I/O?????????????

    //insert one document to the collection
    collection.insertOne({name: 'Uthapizza', description:'test'}, function (err, result) { //This is an I/O, so use callback!!!!!
        assert.equal(err, null);

         console.log('After Insert:');
         console.log(result.ops); //ops is an array object indicating all docs using insertOne/insertMany/replaceOne()

         //find all docs in the collection and convert them into an array!!!!!!!!!!!!
        //collection.find({}) where {} is a filter, as in * of SQL
        //To return all docs including newly-inserted one, this method must follow the insertOne()!!!!!!!!!!!!!
         collection.find({}).toArray(function(err, docs){
             assert.equal(err, null);

             console.log('Found:');
             console.log(docs);

             //drop the specified collection from the database!!!!!!
             //This method must follow the find() method, so it is inside the callback of find()
             db.dropCollection('dishes', function (err, result) {
                 assert.equal(err, null);

                 //close the connection!!!
                 //if not closing connection, the thread in the server will be left hanging, which is a waste of resource!!!
                 db.close();
             })
         })
    })

});