const Question = require('../models/question');

class QuestionsService {

  static add(newQuestion) {
    return new Promise((resolve) => {
      newQuestion.status = newQuestion.status || 'new2';
      resolve(new Question(newQuestion.number, newQuestion.status, newQuestion.description, newQuestion.id).save());
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Question.fetchAll());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Question.findById(id));
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve) => {
      updatedQuestion.id = questionId;
      resolve(new Question(updatedQuestion.number, updatedQuestion.status, updatedQuestion.description,
         updatedQuestion.id).save());
    });
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      resolve(Question.deleteById(questionId));
    });
  }
}

module.exports = QuestionsService;