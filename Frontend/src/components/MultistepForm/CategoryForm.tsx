interface Question {
    key: string;
    label: string;
    options: string[];
}

interface CategoryProps {
    question: Question;
    questions: Record<string, string>;
    updateQuestionAnswers: (answers: Partial<Record<string, string>>) => void;
    optionImages: Record<string, string>; // Voeg een prop toe voor het bijhouden van de afbeeldings-URL's per optie
}

const CategoryForm: React.FC<CategoryProps> = ({ question, questions, updateQuestionAnswers, optionImages }) => {
    const handleRadioChange = (selectedAnswer: string) => {
        updateQuestionAnswers({ [question.key]: selectedAnswer });
    };

    return (
        <div className='repaircards-wrapper'>
            <h2>{question.label}</h2>
            <div className='repaircards-con'>
                {question.options.map((option) => (
                    <div key={`${question.key}-${option}`} className='repairCard' onClick={() => handleRadioChange(option)}>
                        <input
                            type="radio"
                            id={`${question.key}-${option}`}
                            value={option}
                            checked={questions[question.key] === option}
                            onChange={() => handleRadioChange(option)}
                        />
                        <label htmlFor={`${question.key}-${option}`} className='label'>
                            {optionImages[option] && <img src={optionImages[option]} alt={option} />} {/* Voeg de img-tag toe */}
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryForm;
