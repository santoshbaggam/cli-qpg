"use strict";

// import fs module for interacting with the filesystem
const fs = require('fs');

const questionsFilePath = __dirname + '/../data.json';

// check if the questions file exists or not
// throw error if it doesn't
if (! fs.existsSync(questionsFilePath))
  throw new Error('Questions file is required for your application.');

const questions = JSON.parse(fs.readFileSync(questionsFilePath));

const Questions = {
  // assumed marks for each difficulty
  allotedMarks: {
    easy: 2,
    medium: 3,
    hard: 5
  },

  // set the questions
  questions: questions,

  // get all the questions
  get: function() {
    return this.questions;
  },

  // get easy questions based on the limit passed
  getEasy: function(limit) {
    return applyLimit(this.questions.filter(question => {
      return question.difficulty == 'easy';
    }), limit);
  },

  // get medium questions
  getMedium: function(limit) {
    return applyLimit(this.questions.filter(question => {
      return question.difficulty == 'medium';
    }), limit);
  },

  // get hard questions
  getHard: function(limit) {
    return applyLimit(this.questions.filter(question => {
      return question.difficulty == 'hard';
    }), limit);
  }
};

// seperate function to limit the results
// moving out of the class as we want to hide this functionality
function applyLimit(questions, limit) {
  // return all the questions if no limit is specified
  if (limit === 'undefined') return questions;

  return questions.filter((question, index) => {
    return index <= (limit - 1);
  });
}

module.exports = Questions;
