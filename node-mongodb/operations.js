/**
 * Created by taowang on 11/27/2016.
 */
var assert = require('assert');

exports.insertDocument = function (db, document, collection, callback) {
  //Get the documents collection
    var coll = db.collection(collection);

    //insert some documents
    coll.insert(document, function(err, result){
        assert.equal(err, null);

        console.log('inserted ' + result.result.n + ' documents into the document collection ' + collection);

        callback(result); //Asynchronous calling
    })
};

exports.findDocuments = function (db, collection, callback) {
    //Get the documents collection
    var coll = db.collection(collection);

    //find some documents
    //find({}) returns a cursor object!!!!!
    coll.find({}).toArray(function (err, docs) {
        assert.equal(err, null);

        callback(docs);
    })
};

exports.removeDocument = function (db, document, collection, callback) {
  //Get the documents collection
    var coll = db.collection(collection);

    //Delete the document
    //One means to delete the very first one matching the passed 'document'
    coll.deleteOne(document, function (err, result) {
        assert.equal(err, null);

        console.log("Removed the document " + JSON.stringify(document));
        callback(result); //asynchronous calling!!!!!!
    })
};

exports.updateDocument = function (db, document, update, collection, callback) {
    //Get the documents collection
    var coll = db.collection(collection);

    // Update document
    //One means to update the very first document matching the passed 'document'
    coll.updateOne(document
        , { $set: update }, null, function(err, result) {

            assert.equal(err, null);
            console.log("Updated the document with " + update);
            callback(result);
        });
};

