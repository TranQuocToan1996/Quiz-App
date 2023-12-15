import { AnswerObject } from "../App"
import { ButtonWrapper, Wrapper } from "./QuestionCard.styles"

type QuestionCardProps = {
    question: string
    answers: string[]
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerObject | undefined
    questionNumber: number
    totalQuestions: number
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
}) => (
    <Wrapper>
        <p className="questionNumber">
            Question: {questionNumber}/{totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        <div className="answers">
            {answers.map(answer => (
                <ButtonWrapper
                    key={answer}
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}>
                    <button onClick={callback} value={answer} disabled={userAnswer ? true : false}>
                        <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
)

export default QuestionCard