import kraan from '../../assets/kraan.svg'
import gereedschap from '../../assets/Tools.svg'
import gasleiding from '../../assets/Gasleiding.svg'
import lekkage from '../../assets/Lekkage.svg'
import riolering from '../../assets/Onstoppen.svg'
import anders from '../../assets/Group 234.svg'

interface Question {
    key: string;
    label: string;
    options: string[];
}

interface CategoryProps {
    question: Question;
    questions: Record<string, string>;
    updateQuestionAnswers: (answers: Partial<Record<string, string>>) => void;
}
const CategoryForm: React.FC<CategoryProps> = ({ question, questions, updateQuestionAnswers }) => {
    const handleRadioChange = (selectedAnswer: string) => {
        updateQuestionAnswers({ [question.key]: selectedAnswer });
    };

    return (
        <>
            <div className='repaircards-con'>
                {question.options.map((option) => (
                    <div key={question.key} className='repairCard' onClick={() => handleRadioChange(option)}>
                        <input type="radio" value={option} checked={questions[question.key] === option} />
                        <label className='label' key={option}>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CategoryForm