const mysql = require('mysql2');
const pool = mysql.createPool({ //Pool é melhor que createConnection quando se trata de requisições simultâneas
  host: 'localhost',
  user: 'root',
  database: 'app-database',
  password: 'root'
});
const db = pool.promise();

class QuestionsMySQL {

  static add(newQuestion) {
    return new Promise((resolve) => {
      newQuestion.status = newQuestion.status || 'new2';
      //Begin Transaction
      db.execute("INSERT INTO questions (number, status, description) VALUES (?, ?, ?)",
      [newQuestion.number, newQuestion.status, newQuestion.description])
      .then(result => {
          // if (newQuestion.options && newQuestion.options.array) {
          //   newQuestion.options.array.forEach(option => {
          //     db.execute("INSERT INTO options (option, questionId) VALUES (?, ?)",
          //       [ option, newQuestion.id]);
          //   });
          // }
          resolve(result[0].insertId);
        })
        .catch(err => resolve(err));
      //Commit Transaction
    });
  }

  static get(questionId) {
    return new Promise((resolve) => {
      if (questionId) {
        db.execute("SELECT * FROM questions WHERE questions.id = ?", [questionId]) // Prevents SQL injection :)
        .then(([questions, tableInfo]) => {
          resolve(questions);
        })
        .catch(err => resolve(err));
      } else {
        db.execute("SELECT * FROM questions").then(results => {
          let questions = results[0]; // Data
          let tableInfo = results[1]; // Metadata
          resolve(questions);
        })
        .catch(err => resolve(err));
      }
    });
  }

  static update(questionId, updatedQuestion) {
    return new Promise((resolve) => {
      db.execute("UPDATE questions SET number = ?, status = ?, description = ? WHERE questions.id = ?",
       [updatedQuestion.number, updatedQuestion.status, updatedQuestion.description, questionId]) // Prevents SQL injection :)
        .then(result => {
          resolve(result.affectedRows);
        })
        .catch(err => resolve(err));
    });
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      db.execute("DELETE FROM questions WHERE questions.id = ?", [questionId]) // Prevents SQL injection :)
        .then(result => {
          resolve(result.affectedRows);
        })
        .catch(err => resolve(err));
    });
  }
}

module.exports = QuestionsMySQL;