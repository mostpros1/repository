import './MultistepForm.css'
import { useState } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import { useQuestionData } from '../../data/MSFquestions'
import DateForm from './DateForm'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useHomeOwnerMultistepForm } from '../../hooks/useHomeOwnerMultistepform'
import Calendar from './Calendar'
import kraan from '../../assets/kraan.svg'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { AccountForm } from './AccountForm'
import PageSpecialisten from './PageSpecialisten';

type FormData = {
  postCode: string;
  stad: string;
  date: string;
  questions: Record<string, string>;
  aanvullendeInformatie: string;
  info: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  formConfig: string;
  beroep: string;
};

function MultistepForm() {
  const navigate = useNavigate();
  const questionsData = useQuestionData();

  const INITIAL_DATA: FormData = {
    postCode: "",
    stad: "",
    date: "",
    questions: Object.fromEntries(questionsData.map(question => [question.key, ""])),
    aanvullendeInformatie: "",
    info: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    formConfig: "",
    beroep: ""
  };

  const [data, setData] = useState<FormData>(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const updateDate = (selectedDate: Date) => {
    const formattedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}T00:00:00.000Z`;
    updateFields({ date: formattedDate });
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useHomeOwnerMultistepForm({
    steps: [
      <LocationForm key="location" {...data} updateFields={updateFields} />,
      <DateForm key="date" updateDate={updateDate} updateFields={updateFields} />,
      <InfoForm key="info" {...data} updateFields={updateFields} />,
      <PageSpecialisten key="specialists" date={data.date} />
    ],
    onStepChange: () => {}
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLastStep) {
      console.log("Formulierdata:", data);
      // Optioneel: Verwerk de formulierdata, bijvoorbeeld het verzenden naar een server
    } else {
      next();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form-con'>
      <div className='progress-con'>
        <h3>Stap {currentStepIndex + 1} van {steps.length}</h3>
        <div className="progress-bar">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStepIndex ? "active" : ""}`}
              style={{ width: `${100 / steps.length}%` }}
            ></div>
          ))}
        </div>
      </div>

      {step}

      <div className='btn-wrapper'>
        {!isFirstStep && <button type="button" onClick={back} className='form-btn back'>Vorige</button>}
        <button type="submit" className='form-btn'>{isLastStep ? "Verstuur" : "Volgende"}</button>
      </div>
    </form>
  );
}

export default MultistepForm;
