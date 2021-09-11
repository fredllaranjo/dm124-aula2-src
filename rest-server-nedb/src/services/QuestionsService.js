const QuestionsDB = require('../database/QuestionsDB');

class QuestionsService {

  static add(newQuestion) {
    return new Promise((resolve) => {
      resolve(QuestionsDB.add(newQuestion));
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(QuestionsDB.get());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(QuestionsDB.get(id));
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise(async (resolve) => {
      const question = await QuestionsService.getById(questionId);
      if(question) {
        const hasValue = updatedQuestion.status != null;
        question.status = hasValue ? updatedQuestion.status : question.status;
        question.description = updatedQuestion.description || question.description;
        question.options = updatedQuestion.options || question.options;
        resolve(QuestionsDB.update(questionId, question));
      }
      resolve(null);
    })
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      resolve(QuestionsDB.delete(questionId));
    });
  }
}

module.exports = QuestionsService;