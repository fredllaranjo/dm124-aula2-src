let NeDB = require('./QuestionsNeDB');
let MySQL = require('./QuestionsMySQL');

class QuestionsDB extends MySQL {}
    
module.exports = QuestionsDB;