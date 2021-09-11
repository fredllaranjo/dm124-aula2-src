let NeDB = require('nedb');
let db = new NeDB({
    filename:'questions.db',
    autoload:true
});

class QuestionsNeDB {
    
    static add(newQuestion){
        return new Promise((resolve) => {
            newQuestion.status = newQuestion.status || 'new2',
            db.insert(newQuestion, (err, question)=> {
              if(err) {
                resolve(null);
              } else {
                resolve(question);
              }
            });
          });
    }

    static get(questionId) {
      return new Promise((resolve) => {
        const query = questionId ? db.findOne({_id: questionId}) : db.find({}).sort({_id:1});
        query.exec((err, questions)=>{
          if(err) {
            resolve(null);
          } else {
            resolve(questions);
          }
        });
      });
    }

    static update(questionId, updatedQuestion) {
      return new Promise((resolve) => {
        db.update({_id: questionId}, updatedQuestion, err =>{
          if(err) {
            resolve(null);
          } else {
            resolve(updatedQuestion);
          }
        });
      });
    }

    static delete(questionId) {
      return new Promise((resolve) => {
        db.remove({_id: questionId}, {}, err =>{
          if(err) {
            resolve(null);
          } else {
            resolve(questionId);
          }
        });
      });
    }
}

module.exports = QuestionsNeDB;