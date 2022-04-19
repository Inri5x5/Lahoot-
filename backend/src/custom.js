/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  const removedCorrectAnswers = question.answers.map(ans => {
    delete ans['correct']
    return ans
  });
  return {
    questionId: question.idd,
    type: question.questionType,
    text: question.question,
    timeLimit: question.timeLimit,
    points: question.points,
    mediaType: question.mediaType,
    attachment: question.questionAttachment,
    answers: removedCorrectAnswers, 
  };
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  const correctAnswers = question.answers.filter(answer => answer.correct === true);
  const correctAnswerIds = correctAnswers.map(correctAnswer => correctAnswer.id);
  return correctAnswerIds;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.answers.map(answer => answer.id);
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};
