import { useState } from 'react';
import SearchChoreForm from "./SearchChoreForm/SearchChoreForm";
import { RegisterForm } from "../MultistepForm/RegisterForm";
import { FormEvent } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useNavigate } from "react-router-dom";
import HomeButton from "../ui/HomeButton/HomeButton";
import TestQ from "./SpecialistQ/TestQ/TestQ";
import KvKForm from "./KvKForm/KvKForm";
import NoKvK from "./NoKvK/NoKvK";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import RoofingIcon from "@mui/icons-material/Roofing";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import WhyMostProsImg from "../../assets/workingman.png";
import Allin1ServiceImg from "../../assets/workingmantwo.png";
import VerhuisPFP from "../../assets/Sem_M.png";
import AppStore from "../../assets/Appstore_button.png";
import PlayStore from "../../assets/Google-play-badge-1.png";
import HomePFP from "../../assets/homepagepfp.png";
import StijnPFP from "../../assets/stijn.png";
import JanyPFP from "../../assets/JanyPFP.png";
import TuinPFP from "../../assets/TuinPFP.png";
import ElectrozPFP from "../../assets/ElectrozPFP.png";
import AanemerPFP from "../../assets/AanemerPFP.png";
import GijsPFP from "../../assets/GijsPFPpng.png";
import CarpenterIcon from "@mui/icons-material/Carpenter";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import YardIcon from "@mui/icons-material/Yard";
import "../HomePageTwo/HomePageTwo.css";
import './/SpecialistMultistepForm.css';
import { Margin } from "@mui/icons-material";
import React from 'react';
import Calendar from './Calendar';
import { Auth } from 'aws-amplify';
import { AccountForm } from "../MultistepForm/AccountForm";
import { Datums } from "./Calendar.tsx";
import { dynamo } from "../../../declarations.ts";
import { stopXSS } from "./../../../../backend_functions/stopXSS.ts";
import { taal } from "../ui/NavBar/Navigation";


const PopularCardsData = [
  {
    id: 1,
    name: "Hovenier",
    icon: <YardIcon />,
  },
  {
    id: 2,
    name: "Elektriciën",
    icon: <ElectricBoltIcon />,
  },
  {
    id: 3,
    name: "Loodgieter",
    icon: <PlumbingIcon />,
  },
  {
    id: 4,
    name: "Dakdekker",
    icon: <RoofingIcon />,
  },
  {
    id: 5,
    name: "Schoonmaker",
    icon: <CleaningServicesIcon />,
  },
  {
    id: 6,
    name: "Timmerman",
    icon: <CarpenterIcon />,
  },
  {
    id: 7,
    name: "Zonnepanelen",
    icon: <SolarPowerIcon />,
  },
  {
    id: 8,
    name: "Aannemer",
    icon: <HomeRepairServiceIcon />,
  },
];

type DateTimeSpan = {
  date: Date;
  startTime: string;
  endTime: string;
};

type FormData = {
  beroep: string;
  email: string;
  postCode: string;
  stad: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  bio: string;
  task: string;
  questions: Record<string, string>;
  dateTimeSpans: DateTimeSpan[];
  kvk: number;
  bedrijf: string;
};


interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  dob: string;
  bio: string;
  region: string;
  postcode: string;
  profession: string;
  task: string;
  rating: 0;
  availibility: string[];
  kvk: number;
  bedrijf: string;

}
// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
  beroep: "",
  bio: "",
  email: "",
  postCode: "",
  stad: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  repeatPassword: "",
  questions: {
    question1: "",
    question2: "",
  },
  dateTimeSpans: [{ date: new Date(), startTime: "", endTime: "" }],
  task: '',
  kvk: 0,
  bedrijf: ''
};

type Question = {
  key: string;
  label: string;
  options: string[];
};

const questionsData: Question[] = [
  {
    key: "question1",
    label: "In welke omgeving wilt u werken",
    options: [
      "Amsterdam",
      "Den Haag",
      "Rotterdam",
      "Groningen",
      "Utrecht",
      "Eindhoven",
    ],
  },
  // ... voeg andere vragen toe zoals nodig
];

function SpecialistMultistepForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const [showNoKvK, setShowNoKvK] = useState(false);



  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function updateQuestionAnswers(questionKey: string, answer: string) {
    setData((prev) => {
      if (typeof prev === "function") {
        return prev as FormData;
      }

      const prevData = prev as FormData;

      return {
        ...prevData,
        questions: updateQuestions(prevData.questions, {
          [questionKey]: answer,
        }),
      };
    });
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

  const navigate = useNavigate();

  const questionsSteps = questionsData.map((question) => (
    <TestQ
      key={question.key}
      question={question} // Voeg de vraag als prop toe
      questions={data.questions}
      updateQuestionAnswers={(answers) => {
        updateQuestionAnswers(question.key, answers[question.key] as string);
      }}

    />
  ));

  function DateForm({ dateTimeSpans, updateFields }) {
    const addDateTimeSpan = () => {
      if (dateTimeSpans.length < 5) {
        const newDateTimeSpan = { date: new Date(), startTime: "", endTime: "" };
        updateFields({ dateTimeSpans: [...dateTimeSpans, newDateTimeSpan] });
      }
    };

    return (
      <form action="" method="POST">
        <div>
          <h1>Selecteer uw beschikbaarheid:</h1>
          <Calendar />
        </div>
      </form>
    );
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm({
      steps: [
        <SearchChoreForm {...data} updateFields={updateFields} />,
        ...questionsSteps,
        <DateForm
          dateTimeSpans={data.dateTimeSpans}
          updateFields={(newFields) => setData((prev) => ({ ...prev, ...newFields }))}
        />,
        <AccountForm formConfig={"HOMEOWNER"} setError={() => { }} error={""} {...data} updateFields={updateFields} />,
        <KvKForm setShowNoKvK={setShowNoKvK} updateFields={updateFields} />,


      ],
      onStepChange: () => { },
    });

  function signUp(registerData: RegisterData): void {
    const { firstName, lastName, email, phoneNumber, password, /*bio,*/ region, postcode, profession, /*task, */rating, availibility, kvk, bedrijf } = registerData;


    const signUpProf = async () => {
      try {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: phoneNumber,
            name: firstName,
            "custom:family_name": lastName,
          },
          autoSignIn: { enabled: true },
        });

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),
              //bio: bio !== undefined ? stopXSS(bio) : "", // Check if bio is not undefined
              email: email !== undefined ? stopXSS(email) : "", // Check if email is not undefined
              first_name: firstName !== undefined ? stopXSS(firstName) : "", // Check if firstName is not undefined
              last_name: lastName !== undefined ? stopXSS(lastName) : "", // Check if lastName is not undefined
              region: region !== undefined ? stopXSS(region) : "", // Check if region is not undefined
              postcode: postcode !== undefined ? stopXSS(postcode) : "", // Check if postcode is not undefined
              profession: profession !== undefined ? stopXSS(profession).toLowerCase() : "", // Check if profession is not undefined
              //task: task !== undefined ? stopXSS(task) : "", // Check if task is not undefined
              availibility: availibility, // Assuming availibility is already checked elsewhere
              rating: rating, // Assuming rating is already checked elsewhere
              kvk: kvk, // Assuming kvk is already checked elsewhere
              bedrijf: bedrijf !== undefined ? stopXSS(bedrijf) : "", // Check if bedrijf is not undefined
            },
            TableName: "Professionals",
          })
          .promise()
          .then(data => console.log(data.Attributes))
          .catch(console.error);

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),

              email: stopXSS(email),
              first_name: stopXSS(firstName),
              last_name: stopXSS(lastName),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "PENDING",
              user_role: "PROFESSIONAL",
              stripeCustomerId: ""

            },
            TableName: "Users",
          })
          .promise()
          .catch(console.error)
          
          dynamo.put({
            TableName: "Uuids",
            Item: {
              id: Math.random().toString(36).substring(2),
              email: stopXSS(email),
              identifyingName: Math.random().toString(36).substring(2, 15)
            },
          }).promise();

        navigate(`/${taal}/confirm-mail`, { state: { email: email, postConfig: "PROFESSIONAL" } })
        } catch (error: any) {
        console.error('Error signing up:', error);
        //setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
      }
    };

    signUpProf();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next()
    } else {

      const userData: RegisterData = {
        email: data.email.trim(),
        password: data.password.trim(),
        repeatPassword: data.repeatPassword.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: data.phoneNumber.trim(),
        dob: "", // Add the 'dob' property here
        bio: data.bio,
        region: data.questions.question1,
        postcode: data.postCode,
        profession: data.beroep,
        task: data.task,
        availibility: Datums,
        kvk: data.kvk,
        bedrijf: data.bedrijf,
        rating: 0
      }
      console.log(Datums);
      try {
        console.log("prof: ", userData)
        signUp(userData);

      } catch (error) {
        console.error('Error signing up:', error);
        //setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
      }

    }
  }

  const stepWidth = 100 / steps.length;
  const [activeTab, setActiveTab] = useState("homeOwner");
  const [startIndex, setStartIndex] = useState(0);
  const [reviewAnimation, setReviewAnimation] = useState(false);

  const reviews = {
    homeOwner: [
      {
        rating: 2,
        name: "Lisa S",
        image: TuinPFP,
        text: "“Fijn om weer gebruik te mogen maken van je diensten als loodgieter. Ik zou je zeker aanbevelen aan mijn buren in de straat.",
      },
      {
        rating: 3,
        name: "Stijn B",
        image: StijnPFP,
        text: "“Geweldige service en expertise zorgden ervoor dat mijn renovatie klus snel en kundig is gerealiseerd. Ik beveel deze professionele service ten zeerste aan voor een goede renovatie.",
      },
      {
        rating: 4,
        name: "Jos A",
        image: AanemerPFP,
        text: "“Riolering was verstopt en dit is binnen 2 uur opgelost. Dankjewel Remco van Mezosun.",
      },
      {
        rating: 5,
        name: "Mirlo I",
        image: GijsPFP,
        text: "“Ons dak moest compleet vernieuwd worden. Ik ging online zoeken maar kon geen betrouwbare dakdekker vinden tegen een redelijke prijs-kwaliteit verhouding. Venlo Dakdekker BV” heeft ons goed geholpen. We zijn tevreden met ons nieuwe dak.",
      },
    ],
    professional: [
      {
        rating: 5,
        name: "Leo Bos Verhuisservice BV",
        image: VerhuisPFP,
        text: "“Thea ging verhuizen naar een levensloop bestendige woning. Fijn om haar hiermee te ondersteunen en ik heb fijne communicatie met Thea ervaren. Dankjewel.",
      },
      {
        rating: 4,
        name: "Bas Fixo B.V.",
        image: HomePFP,
        text: "“Jan had twee lekkende waterleidingen en nam hiervoor contact met ons op. We hebben de klus gefixt en het wederzijdse vertrouwen met Jan vonden wij prettig",
      },
      {
        rating: 4,
        name: "Electroz B.V.",
        image: ElectrozPFP,
        text: "“Nieuwe groepenkast geplaatst bij mevrouw Vera S. Lekkere koffie met koekje gekregen en gezellig dame om mee te babbelen.",
      },
      {
        rating: 3,
        name: "Houtlab Gijs",
        image: GijsPFP,
        text: "“Ik kreeg de aanvraag binnen om naast het kunstgras hockeyveldje een tuinhuis te maken. Binnen 1 week heb ik dit kunnen realiseren en alles verliep soepel met de huiseigenaar.",
      },
    ],
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProOnboardingClick = () => {
    navigate(`/${taal}/pro-onboarding`); 
  };

  const handleClick = (tab) => {
    setReviewAnimation(true);
    setTimeout(() => {
      setActiveTab(tab);
      setStartIndex(0);
      setReviewAnimation(false);
    }, 400);
  };
  

  const handleLeftClick = () => {
    setReviewAnimation(true);
    setTimeout(() => {
      setStartIndex((prevIndex) =>
        prevIndex === 0 ? reviews[activeTab].length - 2 : prevIndex - 1
      );
      setReviewAnimation(false);
    }, 400);
  };

  const handleRightClick = () => {
    setReviewAnimation(true);
    setTimeout(() => {
      setStartIndex((prevIndex) =>
        prevIndex === reviews[activeTab].length - 2 ? 0 : prevIndex + 1
      );
      setReviewAnimation(false);
    }, 400);
  };

  return (
    <form onSubmit={onSubmit} className="form-con">
      <div className="progress-con">
        <h3>
          Stap {currentStepIndex + 1} van {steps.length}
        </h3>
        <div className="progress-bar">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStepIndex ? "active" : ""
                }`}
              style={{ width: `${stepWidth}%` }}
            ></div>
          ))}
        </div>
      </div>
      {showNoKvK ? <NoKvK /> : <>{step}</>}
      <>
        <div className="btn-wrapper">
          <button
            type="button"
            onClick={() => {
              showNoKvK ? setShowNoKvK(false) : back();
            }}
            className={`form-btn back${showNoKvK ? " with-no-kvk" : ""}`}
            style={{ display: isFirstStep ? 'none' : 'inline-block' }}
          >
            Vorige
          </button>
          {showNoKvK ? <></> : <button type="submit" className="form-btn">
            {isLastStep ? "Verstuur" : "Volgende"}
          </button>}

        </div>
      </>
    </form>
  );
}

export default SpecialistMultistepForm;
