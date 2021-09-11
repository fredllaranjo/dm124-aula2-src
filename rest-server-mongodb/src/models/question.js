const getDb = require('../database/QuestionsMongoDB').getDb;
const mongodb = require('mongodb');
class Question {
    constructor(number, status, description, id) {
        this.number = number;
        this.status = status;
        this.description = description;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save() {
        const db = getDb();
        let dbOp;
        if (this._id) {
            dbOp = db.collection('questions').updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
        } else {
            dbOp = db.collection('questions').insertOne(this);
        }
        return dbOp.then().catch();
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('questions').find() // find({number: 1000}) 
        .toArray().then(questions => { return questions; }).catch(); // find() Não devolve uma promise, devolve Cursor
    }

    static findById(questionId) {
        const db = getDb();
        return db.collection('questions').find({ _id: new mongodb.ObjectId(questionId) })
        .next().then(questions => { return questions; }).catch();
    }

    static deleteById(questionId) {
        const db = getDb();
        return db.collection('questions').deleteOne({ _id: new mongodb.ObjectId(questionId) }).then().catch();
    }
}

module.exports = Question;