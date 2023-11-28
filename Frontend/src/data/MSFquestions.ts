import { useLocation } from "react-router-dom";

export function useQuestionData() {
    const location = useLocation();

    const { pathname } = location;

    type Question = {
        key: string;
        label: string;
        options: string[];
    };

    let questionsData: Question[];

    switch (pathname) {
        case '/klussen/loodgieter':
            questionsData = [
                {
                    key: "question1",
                    label: "wat moet er gedaan worden",
                    options: [
                        "Nieuwe leiding aanleggen",
                        "Kapotte leiding maken",
                        "Gas leiding repareren",
                        "Lekkage verhelpen",
                        "Riolering en afvoer ontstoppen",
                        "Anders"
                    ],
                },
                {
                    key: "question2",
                    label: "In welke gedeelte van de woning",
                    options: [
                        "Badkamer of toilet",
                        "Keuken",
                        "Slaapkamers",
                        "Woonkamer",
                        "Zolder",
                        "Garage of schuur",
                        "Anders",
                    ],
                },
                {
                    key: "question3",
                    label: "Om welke onderdeel gaat het",
                    options: [
                        "Toilet",
                        "Douche of bad",
                        "Wasbak",
                        "Wasmachine",
                        "Anders",
                    ],
                },
                {
                    key: "question4",
                    label: "Wanneer moet de klus worden uitgevoerd (niet verplicht)",
                    options: [
                        "Met spoed",
                        "In overleg",
                        "Binnen twee weken",
                        "Binnen een maand",
                        "Binnen een paar maanden",
                        "Anders",
                    ],
                },
                {
                    key: "question5",
                    label: "Wilt u foto's of tekeningen bijvoegen?",
                    options: [
                        "Nee",
                        "Ja",
                        "Ja, ik zal later foto's toevoegen"
                    ],
                },
            ]
            break;

        case '/klussen/hovenier':
            questionsData = [
                {
                    key: "question1",
                    label: "Wat moet er gedaan worden",
                    options: [
                        "Bomen of struiken planten",
                        "Tuinaanleg",
                        "Tuinontwerp",
                        "Tuinonderhoud",
                        "Gras leggen of zaaien",
                        "Anders"
                    ],
                },
                {
                    key: "question2",
                    label: "In welke gedeelte van de tuin",
                    options: [
                        "Voortuin",
                        "Achtertuin",
                        "Zijde van de huis",
                        "Zijtuin",
                        "Anders"
                    ],
                },
                {
                    key: "question3",
                    label: "Om wat voor soort planten gaat het?",
                    options: [
                        "Struiken",
                        "Heggen",
                        "Eik",
                        "Beuk",
                        "Berk",
                        "Dennenboom",
                    ],
                },
                {
                    key: "question4",
                    label: "Wanneer moet de klus worden uitgevoerd (niet verplicht)",
                    options: [
                        "Met spoed",
                        "In overleg",
                        "Binnen twee weken",
                        "Binnen een maand",
                        "Binnen een paar maanden",
                        "Anders",
                    ],
                },
                {
                    key: "question5",
                    label: "Wilt u foto's of tekeningen bijvoegen?",
                    options: [
                        "Nee",
                        "Ja",
                        "Ja, ik zal later foto's toevoegen"
                    ],
                },
            ]
            break;
            case '/klussen/elektricien':
            questionsData = [
                {
                    key: "question1",
                    label: "Wat moet er gedaan worden",
                    options: [
                        "Bomen of struiken planten",
                        "Tuinaanleg",
                        "Tuinontwerp",
                        "Tuinonderhoud",
                        "Gras leggen of zaaien",
                        "Anders"
                    ],
                },
                {
                    key: "question2",
                    label: "In welke gedeelte van de tuin",
                    options: [
                        "Voortuin",
                        "Achtertuin",
                        "Zijde van de huis",
                        "Zijtuin",
                        "Anders"
                    ],
                },
                {
                    key: "question3",
                    label: "Om wat voor soort planten gaat het?",
                    options: [
                        "Struiken",
                        "Heggen",
                        "Eik",
                        "Beuk",
                        "Berk",
                        "Dennenboom",
                    ],
                },
                {
                    key: "question4",
                    label: "Wanneer moet de klus worden uitgevoerd (niet verplicht)",
                    options: [
                        "Met spoed",
                        "In overleg",
                        "Binnen twee weken",
                        "Binnen een maand",
                        "Binnen een paar maanden",
                        "Anders",
                    ],
                },
                {
                    key: "question5",
                    label: "Wilt u foto's of tekeningen bijvoegen?",
                    options: [
                        "Nee",
                        "Ja",
                        "Ja, ik zal later foto's toevoegen"
                    ],
                },
                {
                    key: "question6",
                    label: "Wilt u foto's of tekeningen bijvoegen?",
                    options: [
                        "Nee",
                        "Ja",
                        "Ja, ik zal later foto's toevoegen"
                    ],
                },
            ]
            break;

        default:
            questionsData = [
                {
                    key: "question1",
                    label: "Wat moet er gedaan worden",
                    options: [
                        "Nieuwe leiding aanleggen",
                        "Kapotte leiding maken",
                        "Gas leiding repareren",
                        "Lekkage verhelpen",
                        "Rioleren en afvoer onstoppen of reinigen",
                        "Anders",
                    ],
                },
                {
                    key: "question2",
                    label: "In welke gedeelte van de woning",
                    options: [
                        "Badkamer of toilet",
                        "Keuken",
                        "Slaapkamers",
                        "Woonkamer",
                        "Zolder",
                        "Garage of schuur",
                        "Anders"
                    ],
                },
                {
                    key: "question3",
                    label: "Om welke onderdeel gaat het",
                    options: [
                        "Toilet",
                        "Douche of bad",
                        "Wasbak",
                        "Wasmachine",
                        "Anders",
                    ],
                },
            ]
    }

    return questionsData
}
