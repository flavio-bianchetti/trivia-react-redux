const RANDOM_SUBTRACT = 0.5;

function createAnswerObject(question) {
  const result = [
    {
      text: question.correct_answer,
      tesiId: 'correct-answer',
    },
    {
      text: question.incorrect_answers[0],
      tesiId: 'wrong-answer-1',
    },
  ];

  if (question.incorrect_answers.length > 1) {
    return [
      ...result,
      {
        text: question.incorrect_answers[1],
        tesiId: 'wrong-answer-2',
      },
      {
        text: question.incorrect_answers[2],
        tesiId: 'wrong-answer-3',
      },
    ];
  }
  return result;
}

export default function randomAnswers(question) {
  const answers = createAnswerObject(question);
  return answers.sort(() => Math.random() - RANDOM_SUBTRACT);
}
