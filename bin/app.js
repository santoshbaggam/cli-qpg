#!/usr/bin/env node
"use strict";

const program = require('commander');
const colors = require('chalk');
const Table = require('cli-table');
const logic = require('../src/logic');
const print = console.log;
const Questions = require('../src/questions');

program
  .version('1.0.0')
  .description('A command line based question paper generator.')
  .option('-m, --marks <marks>', 'Total marks', 100)
  .option('-e, --easy <easy>', '% of Easy questions', 30)
  .option('-m, --medium <medium>', '% of Medium questions', 30)
  .option('-h, --hard <hard>', '% of Hard questions', 40)
  .action(options => {
    const marks = parseInt(options.marks),
          easy = parseInt(options.easy),
          medium = parseInt(options.medium),
          hard = parseInt(options.hard);

    try {
      // set the logic
      logic.set(marks, easy, medium, hard);
      // evaluate the entries if they meet the criteria
      logic.evaluateMarks();

      let questions = logic.buildQuestions();

      const table = new Table({ head: ['', 'Question', 'Difficulty', 'Marks'] });

      // display the generated questions
      questions.questions.forEach((question, index) => {
        table.push([index + 1, question.text, question.difficulty, question.marks]);
      });
      print(table.toString());

      // the below code is just for the purpose of showing the details for checking the generated questions..
      print(colors.yellow('Questions generated (after adjusting their difficulty ratios):'));
      print('Easy Questions: ' + questions.generated.easy, '=> Marks: ' + questions.generated.easy * Questions.allotedMarks.easy);
      print('Medium Questions: ' + questions.generated.medium, '=> Marks: ' + questions.generated.medium * Questions.allotedMarks.medium);
      print('Hard Questions: ' + questions.generated.hard, '=> Marks: ' + questions.generated.hard * Questions.allotedMarks.hard);
      print(colors.green('Total Marks:',
              (questions.generated.easy * Questions.allotedMarks.easy) +
              (questions.generated.medium * Questions.allotedMarks.medium) +
              (questions.generated.hard * Questions.allotedMarks.hard)
            ));
    } catch (err) {
      print(colors.red(err.message));
    }
  });

program.parse(process.argv);
