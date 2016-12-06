/**
 * Created by taowang on 11/27/2016.
 */
const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const dboper = require('./operations');

const URL = 'mongodb://localhost:27017/confusion';

MongoClient.connect(URL, function (err, db) { //Asynchronous calling!!!!
    assert.equal(err, null);
    console.log('Connected correctly to the server');

    dboper.insertDocument(db, {name:'Vadonut', description:'test'}, 'dishes', function (result) {
        console.log(result.ops);

        //Verify if insertion successful?????
        dboper.findDocuments(db, 'dishes', function(docs){
            console.log(docs);

            //Getting here means finding documents is successful!
            //it's time to update the documents
            dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'Updated Test'}, 'dishes', function (result) {
                console.log(result.result);

                //Verify if update successful?????
                dboper.findDocuments(db, 'dishes', function (docs) {
                    console.log(docs);

                    //Delete the document
                    dboper.removeDocument(db, {name: 'Vadonut'}, 'dishes', function (result) {
                        console.log(result.result);

                        //Verify if deleting successful??
                        dboper.findDocuments(db, 'dishes', function (docs) {
                            console.log(docs);

                            //Last but not least, drop the whole collection
                            db.dropCollection('dishes', function (result) {
                                console.log(result);

                                //close the connection with the server
                                db.close();
                            })
                        })
                    })
                })
            })
        })

    })
});