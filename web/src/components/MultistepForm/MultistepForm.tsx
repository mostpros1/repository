import './MultistepForm.css'
import { useState, useEffect } from 'react'
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
import { useUser } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom'
import { AccountForm } from './AccountForm'
import PageSpecialisten from './PageSpecialisten'
import { userInfo } from 'os'
import { dynamo } from '../../../declarations'
import { stopXSS } from '../../../../backend_functions/stopXSS'

type FormData = {
  postCode: string
  stad: string
  date: string;
  questions: Record<string, string>;
  aanvullendeInformatie: string
  info: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
  repeatPassword: string
  profession: string;
  task: string;
}

function MultistepForm() {
  const navigate = useNavigate()
  const questionsData = useQuestionData();

  const INITIAL_DATA: FormData = {
    postCode: "",
    stad: "",
    date: "",
    questions: Object.fromEntries(
      questionsData.map((question) => [question.key, ""])
    ),
    aanvullendeInformatie: "",
    info: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    profession: "",
    task: "",
  }

  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const updateDate = (selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
    updateFields({ date: formattedDate });
  };

  function updateQuestionAnswers(questionKey: string, answer: string) {
    setData((prev) => ({
      ...prev,
      questions: updateQuestions(prev.questions, {
        [questionKey]: answer,
      }),
    }));
  }

  function updateQuestions(
    prevQuestions: Record<string, string>,
    answers: Record<string, string>
  ): Record<string, string> {
    const filteredAnswers: Record<string, string> = {};

    for (const key in answers) {
      if (Object.prototype.hasOwnProperty.call(answers, key)) {
        const value = answers[key];
        if (value !== undefined) {
          filteredAnswers[key] = value;
        }
      }
    }

    const updatedQuestions: Record<string, string> = {
      ...prevQuestions,
      ...filteredAnswers,
    };

    return updatedQuestions;
  }

  const optionImages = {
    "Nieuwe leiding aanleggen": kraan,
    "Kapotte leiding maken": kraan,
    "Anders": kraan
    // ... voeg andere opties en bijbehorende afbeeldingen toe
  };

  const questionsSteps = questionsData.map((question) => (
    <CategoryForm
      key={question.key}
      question={question}
      questions={data.questions}
      updateQuestionAnswers={(answers) => {
        updateQuestionAnswers(question.key, answers[question.key] as string);
      }}
      optionImages={optionImages}
    />
  ));


  const { user, updateUser } = useUser();

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useHomeOwnerMultistepForm(
    user ? {
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        <DateForm updateDate={updateDate} updateFields={updateFields} />,
        <InfoForm {...data} updateFields={updateFields} />,
      ],
      onStepChange: () => { }
    } : {
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        <DateForm updateDate={updateDate} updateFields={updateFields} />,
        <InfoForm {...data} updateFields={updateFields} />,
        <>
          <AccountForm {...data} beroep='' formConfig='HOMEOWNER' updateFields={updateFields} setError={() => { }} error="" />
        </>
      ],
      onStepChange: () => { }
    }
  );
  useEffect(() => {
    const profession = window.location.hash.replace("#", "").split("?")[0];
    const task = window.location.hash.replace("#", "").split("?")[1];


    updateFields({ profession, task });
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('Form Data:', data);
    if (!isLastStep) return next()


    const userData = {
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber
    }

    if (user) {
      const UserData = await dynamo.query({
        TableName: "Users",
        IndexName: "username",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": user.attributes.email,
        },
      }).promise()

      if (UserData && UserData.Items && UserData.Items.length > 0) {
        dynamo
           .put({
                Item: {
                    id: Number(stopXSS(String(Math.floor(Math.random() * 1000000000)))),
                    user_id: UserData.Items[0].id,
                    profession: stopXSS(data.profession),
                    task: stopXSS(data.task),
                    region: stopXSS(data.stad),
                    currentStatus: stopXSS("pending"),
                    date: stopXSS(`${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`),
                    chats: Number(stopXSS(String(0))),
                    isCurrent: stopXSS(String(true))
                },
                TableName: "Klussen"
            })
           .promise()
           .catch(console.error);
    } else {
        console.error("UserData or UserData.Items is undefined");
    }
      const profession = window.location.hash.replace("#", "").split("?")[0];
      const task = window.location.hash.replace("#", "").split("?")[1];

      dynamo.put({
        Item: {
          id: Number(stopXSS(String(Math.floor(Math.random() * 1000000000)))),
          chats: Number(stopXSS(String(0))),
          client_email: stopXSS(user.attributes.email),
          date: stopXSS(`${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`),
          description: stopXSS(task),
          name: stopXSS(profession),
          professional_email: stopXSS("something"),
          currentStatus: stopXSS("pending")
        },
        TableName: "Projects"
      }).promise()
        .catch(console.error)


      const datum = new Date(data.date);
      const date = datum.toISOString().split('T')[0];
      navigate(`/home-owner-result#${profession}?${task}!${date}`);

      //REST API VERSIE
/*
const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      const profession = window.location.hash.replace("#", "").split("?")[0];
      const task = window.location.hash.replace("#", "").split("?")[1];

      const combinedData = {
        user_email: stopXSS(currentAuthenticatedUser.attributes.email),
        profession: stopXSS(data.profession),
        task: stopXSS(data.task),
        region: stopXSS(data.stad),
        client_email: stopXSS(currentAuthenticatedUser.attributes.email),
        description: stopXSS(data.task),
        name: stopXSS(data.profession),
        professional_email: stopXSS("something") // Placeholder value, adjust as needed
      };

      // Sending the combined data to the API using fetch
      fetch('https://your-api-id.execute-api.your-region.amazonaws.com/prod/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const datum = new Date(data.date);
          const date = datum.toISOString().split('T')[0];
          navigate(`/home-owner-result#${profession}?${task}!${date}`);
        })
        .then(data => {
          console.log('Data submitted successfully:', data);
        })
        .catch((error) => {
          console.error('There was a problem with your fetch operation:', error);
        });
*/

    } else {
      if (userData.password != userData.repeatPassword) return console.log("Passwords do not match! (insert function that deals with it here)")
      await Auth.signUp({
        username: userData.email,
        password: userData.password,
        attributes: {
          phone_number: userData.phoneNumber,
          name: userData.firstName,
          "custom:family_name": userData.lastName,
        },
        autoSignIn: { enabled: true },
      })
        .then(() => {
          const profession = window.location.hash.replace("#", "").split("?")[0];
          const task = window.location.hash.replace("#", "").split("?")[1];

          const datum = new Date(data.date);
          const date = datum.toISOString().split('T')[0];
          navigate(`/nl/confirm-mail#home-owner-result#${profession}?${task}!${date}`, { state: { email: userData.email, postConfig: "HOMEOWNER" } })
        })
        .catch(async error => {
          if (error.code == 'UsernameExistsException') {
            await Auth.resendSignUp(userData.email)
            const profession = window.location.hash.replace("#", "").split("?")[0];
            const task = window.location.hash.replace("#", "").split("?")[1];

            const datum = new Date(data.date);
            const date = datum.toISOString().split('T')[0];
            navigate(`/nl/confirm-mail#home-owner-result#${profession}?${task}!${date}`, { state: { email: userData.email, postConfig: "HOMEOWNER" } })
          } else {
            console.error("foutmelding:", error)
          }
        })

      /*
      // Assuming the signUpUser function is defined as shown in your provided code snippet
async function signUpUser(userData) {
const url = 'YOUR_API_GATEWAY_URL'; // Make sure to replace this with your actual API Gateway URL
const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userData),
});

if (!response.ok) {
  throw new Error('Network response was not ok');
}

const data = await response.json();
console.log(data); // Process the response data

// Assuming you want to navigate after successful registration
// You might need to adjust the navigation logic based on your application's routing needs
const profession = window.location.hash.replace("#", "").split("?")[0];
const task = window.location.hash.replace("#", "").split("?")[1];

const datum = new Date(data.date);
const date = datum.toISOString().split('T')[0];
navigate(`/nl/confirm-mail#home-owner-result#${profession}?${task}!${date}`, { 
state: { email: userData.email, postConfig: "HOMEOWNER" },
 })

}

// Your existing code for preparing userData
const userData = {
firstName: stopXSS(data.firstName),
lastName: stopXSS(data.lastName),
email: stopXSS(data.email),
phoneNumber: stopXSS(data.phoneNumber),
password: stopXSS(data.password),
};

// Check if passwords match before proceeding
if (data.password!== data.repeatPassword) {
console.log("Passwords do not match!");
return; // Optionally, you could show an error message to the user instead of just logging it
}

try {
// Attempt to sign up the user via the API
await signUpUser(userData);
} catch (error) {
console.error("Registration failed:", error);
// Handle errors, such as showing an error message to the user
}
      */
    }
  }

  const stepWidth = 100 / steps.length;

  return (
    <form onSubmit={onSubmit} className='form-con'>
      <div className='progress-con'>
        <div className="progress-bar">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStepIndex ? "active" : ""}`}
              style={{ width: `${stepWidth}%` }}
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
  )
}

export default MultistepForm