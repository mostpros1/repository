// TestQ.tsx
import React from 'react';
import "./TestQ.css"

interface TestQProps {
    questions: Record<string, string>;
    updateQuestionAnswers: (answers: Partial<Record<string, string>>) => void;
}

interface Question {
    key: string;
    label: string;
    options: string[];
}

const questionsData: Question[] = [
    {
        key: 'question1',
        label: 'In welke omgeving wilt u werken',
        options: ['Amsterdam', 'Den Haag', 'Rotterdam', 'Groningen', 'Utrecht', 'Eindhoven'],
    },
    {
        key: 'question2',
        label: 'In welke omgeving wilt u werken',
        options: ['Amsterdam', 'Den Haag', 'Rotterdam', 'Groningen', 'Utrecht', 'Eindhoven'],
    },
    {
        key: 'question3',
        label: 'In welke omgeving wilt u werken',
        options: ['Amsterdam', 'Den Haag', 'Rotterdam', 'Groningen', 'Utrecht', 'Eindhoven'],
    },
];

const TestQ: React.FC<TestQProps> = ({ questions, updateQuestionAnswers }) => {
    const handleRadioChange = (questionKey: string, selectedAnswer: string) => {
        updateQuestionAnswers({ [questionKey]: selectedAnswer });
    };

    return (
        <div className="specialist_q_wrapper">
        {questionsData.map((question) => (
            <div className="specialist_q_box" key={question.key}>
                <h2>{question.label}</h2>
                <div className="specialist_q_con">
                    {question.options.map((option) => (
                        <label className='specialist_q' key={option}>
                            {option}
                            <input
                                type="radio"
                                value={option}
                                checked={questions[question.key] === option}
                                onChange={() => handleRadioChange(question.key, option)}
                            />
                        </label>
                    ))}
                </div>
            </div>
        ))}
    </div>
    );
};

export default TestQ;
