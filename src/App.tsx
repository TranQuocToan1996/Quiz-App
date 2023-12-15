import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionsState } from "./API";

import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 5
const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionsState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setIsLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setIsLoading(false);
  };
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (gameOver) {
      return
    }
    const curQuestion = questions[questionNumber]
    const answer = event.currentTarget.value
    const correct = curQuestion.correct_answer === answer
    if (correct) setScore(prev => prev + 1)
    const answerObj: AnswerObject = {
      question: curQuestion.question,
      answer,
      correct,
      correctAnswer: curQuestion.correct_answer
    }
    setUserAnswers(prev => [...prev, answerObj])
  }
  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1
    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true)
    } else {
      setQuestionNumber(nextQuestion)
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {!isLoading && (gameOver || userAnswers.length === TOTAL_QUESTION) ? (
          <button onClick={startTrivia} className="Start">Start</button>
        ) : null}
        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {isLoading && <p>Loading Questions ...</p>}
        {!gameOver && !isLoading &&
          <QuestionCard
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTION}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : undefined}
            callback={checkAnswer}
          />}
        {!gameOver && !isLoading && userAnswers.length === questionNumber + 1 && questionNumber !== TOTAL_QUESTION - 1
          ? <button className="next" onClick={nextQuestion}>Next question</button> : null}
      </Wrapper>
    </>
  );
}

export default App;
