const Questions = require('./questions');

const logic = {
  set: function(marks, easy, medium, hard) {
    this.marks = marks;
    this.easy = easy;
    this.medium = medium;
    this.hard = hard;
  },

  evaluateMarks: function() {
    // min 10 marks, max 100
    if (this.marks < 10 || this.marks > 100)
      throw new Error('For the sake of this demo, total marks has been restricted to a min of 10 and a max of 100.');

      // % of the marks should sum to 100%
    if (this.easy + this.medium + this.hard != 100)
      throw new Error('Difficulty of questions should sum to 100%.');
  },

  buildQuestions: function() {
    const noOfQuestionsBasedOnDifficulty = getQuestionsBasedOnDifficultyRatio(
      this.marks, this.easy, this.medium, this.hard
    );

    // get the respective questions
    const easyQuestions = Questions.getEasy(noOfQuestionsBasedOnDifficulty.easy);
    const mediumQuestions = Questions.getMedium(noOfQuestionsBasedOnDifficulty.medium);
    const hardQuestions = Questions.getHard(noOfQuestionsBasedOnDifficulty.hard);
    // merge all questions
    let questions = easyQuestions.concat(mediumQuestions).concat(hardQuestions);

    return {
      questions: questions,
      generated: noOfQuestionsBasedOnDifficulty
    };
  }
}

function getQuestionsBasedOnDifficultyRatio(marks, easy, medium, hard) {
  // checking the total expected hard marks
  // formula: (total marks)*difficulty%
  let marksRemaining = 0;

  let hardMarks = Math.floor(marks*(hard/100));
  let noOfHardQuestions = Math.floor(hardMarks / Questions.allotedMarks.hard);
  marksRemaining += hardMarks % Questions.allotedMarks.hard;

  let mediumMarks = Math.floor(marks*(medium/100));
  let noOfMediumQuestions = Math.floor(mediumMarks / Questions.allotedMarks.medium);
  marksRemaining += mediumMarks % Questions.allotedMarks.medium;

  let easyMarks = Math.floor(marks*(easy/100));
  let noOfEasyQuestions = Math.floor((easyMarks) / Questions.allotedMarks.easy);
  marksRemaining += easyMarks % Questions.allotedMarks.easy;

  // check the actual marks remaining after making the adjustments
  // to the no of each difficulty questions
  marksRemaining = marks - (
                    (noOfEasyQuestions * Questions.allotedMarks.easy) +
                    (noOfMediumQuestions * Questions.allotedMarks.medium) +
                    (noOfHardQuestions * Questions.allotedMarks.hard)
                  );

  // adjust the questions based on the actual remaining marks
  if (marksRemaining === 1) {
    noOfMediumQuestions = noOfMediumQuestions - 1;
    noOfEasyQuestions = noOfEasyQuestions + 2;
  } else if (marksRemaining % 2 === 0) {
    noOfEasyQuestions += marksRemaining / Questions.allotedMarks.easy;
  } else {
    marksRemaining = marksRemaining - 3; // depends on the marks per difficulty we choose.. 2,3,5 in our case..
    noOfMediumQuestions += 1;
    noOfEasyQuestions += marksRemaining / Questions.allotedMarks.easy;
  }

  return {
    easy: noOfEasyQuestions,
    medium: noOfMediumQuestions,
    hard: noOfHardQuestions
  }
}

module.exports = logic;
