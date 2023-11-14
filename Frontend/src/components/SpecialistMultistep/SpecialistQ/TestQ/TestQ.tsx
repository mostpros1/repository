// TestQ.tsx
import React from 'react';
import "./TestQ.css"

interface Question {
    key: string;
    label: string;
    options: string[];
  }
  
  interface TestQProps {
    question: Question;
    questions: Record<string, string>;
    updateQuestionAnswers: (answers: Partial<Record<string, string>>) => void;
  }

const TestQ: React.FC<TestQProps> = ({ question, questions, updateQuestionAnswers }) => {
    const handleRadioChange = (selectedAnswer: string) => {
      updateQuestionAnswers({ [question.key]: selectedAnswer });
    };
  
    return (
      <div className="specialist_q_wrapper">
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
                  onChange={() => handleRadioChange(option)}
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  

export default TestQ;
