const Question = require('../models/question');

class QuestionsService {

  static add(newQuestion) {
    return new Promise((resolve) => {
      newQuestion.status = newQuestion.status || 'new2';
      resolve(new Question(newQuestion).save());
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Question.find());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Question.findById(id));
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve) => {
      Question.findById(questionId)
        .then(product => {
          product.number = updatedQuestion.number || product.number;
          product.status = updatedQuestion.status || product.status;
          product.description = updatedQuestion.description || product.description;
          resolve(product.save());
        })
    });
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      resolve(Question.findByIdAndRemove(questionId));
    });
  }
}

module.exports = QuestionsService;