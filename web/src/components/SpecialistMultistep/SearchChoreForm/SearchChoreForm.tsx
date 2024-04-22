import "./SearchChoreForm.css"
import { useState } from 'react';
import specialists from '../../../data/specialists';

type SpecialistData = {
    email: string
    postCode: string
    stad: string
    beroep?: string
    bio?: string
    task?: string
    kvk?: number
}

type SearchChoreFormProps = SpecialistData & {
    updateFields: (fields: Partial<SpecialistData>) => void
}


export default function SearchChoreForm({ beroep, bio, email, postCode, stad, updateFields }: SearchChoreFormProps) {

    const [isValidBeroep, setValidBeroep] = useState(true);

    const handleBeroepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValueBeroep = e.target.value;
        const inputBeroepRegex = /^[A-Za-z\s]*$/; // Allow empty string
        const isValidBeroep = inputBeroepRegex.test(inputValueBeroep);
        console.log('Input Value:', inputValueBeroep)
        setValidBeroep(isValidBeroep);

        if (isValidBeroep || inputValueBeroep === '') {
            updateFields({ beroep: inputValueBeroep });
        }
    };

    const [isValidBio, setValidBio] = useState(true);

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValueBio = e.target.value;
        const inputBioRegex = /^[A-Za-z0-9\s]*$/; // Allow empty string
        const isValidBio = inputBioRegex.test(inputValueBio);

        setValidBio(isValidBio);

        if (isValidBio || inputValueBio === '') {
            updateFields({ bio: inputValueBio });
        }
    };

    const [isValidEmail, setValidEmail] = useState(true);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValueEmail = e.target.value;
        const inputEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        const isValidEmail = inputEmailRegex.test(inputValueEmail);

        setValidEmail(isValidEmail);
        updateFields({ email: inputValueEmail });
    };

    const [postcodeInput, setPostcodeInput] = useState(postCode);
    const [isValidPostcode, setValidPostcode] = useState(true);

    const [stadInput, setStadInput] = useState(stad);
    const [isValidStad, setValidStad] = useState(true);

    const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPostcode = e.target.value;
        const postcodeRegex = /^\d{4}\s?[A-Za-z]{2}$/;
        const isValid = postcodeRegex.test(newPostcode);

        setValidPostcode(isValid);

        setPostcodeInput(newPostcode.slice(0, 6));

        if (isValid || newPostcode === "") {
            updateFields({ postCode: newPostcode.slice(0, 6) });
        }
    };

    const handleStadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStad = e.target.value;
        const stadRegex = /^[A-Za-z\s]+$/;
        const isValidStad = stadRegex.test(newStad);

        setValidStad(isValidStad);

        setStadInput(newStad);

        if (isValidStad || newStad === "") {
            updateFields({ stad: newStad });
        }
    };

    const [task, setTask] = useState('');

    // Assuming you have a state for the displayed task name
    const [displayedTaskName, setDisplayedTaskName] = useState('');


    const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const inputValueTask = e.target.value;
    
        // Find the selected task object
        let selectedTaskLink = '';
        specialists.forEach(specialist => {
            const foundTask = specialist.tasks.find(task => task.task === inputValueTask);
            if (foundTask) {
                selectedTaskLink = foundTask.link;
                setDisplayedTaskName(inputValueTask);
            }
        });
    
        // Remove the leading slash from the selectedTaskLink if it exists
        selectedTaskLink = selectedTaskLink.replace(/^\//, '');
        // Set the task state to the selectedTaskLink'
        updateFields({ task: selectedTaskLink });
        setTask(selectedTaskLink);
    };

    const isValidTask = (task: string): boolean => {
        const allTasks = specialists.flatMap(specialist => specialist.tasks.map(task => task.task));
        return allTasks.includes(task);
    };

    const getValidTasks = (beroep: string) => {
        // Filter specialists based on the entered beroep
        const filteredSpecialists = specialists.filter(specialist => specialist.name === beroep);

        // Extract and filter tasks from the filtered specialists
        const allTasks = filteredSpecialists.flatMap(specialist => specialist.tasks.map(task => task.task));
        return [...new Set(allTasks)]; // Use Set to remove duplicates and then spread back into an array
    };

    return (
        <>
            <div className="search_chore_text_con">
                <h1>Zoek uw klus</h1>
                <p>Klussen worden gezocht in alle sectoren en door heel Nederland. Laat ons weten waar je wilt werken, en we assisteren je bij het vinden van passende klussen.</p>

            </div>
            <div className="search_chore_form">
                <label>Uw hoofdberoep</label>
                <input
                    type="text"
                    required
                    placeholder="Uw beroep"
                    className={`${isValidBeroep ? '' : 'invalid'}`}
                    value={beroep}
                    onChange={handleBeroepChange}
                    pattern="[A-Za-z\s]+"
                />
                {!isValidBeroep && (
                    <p className="error-message">Voer alstublieft een geldige beroep in</p>
                )}
                <label>Klus:</label>
                { /*<select
                    value={displayedTaskName} // Use displayedTaskName here
                    onChange={(e) => handleTaskChange(e)}
                >
                    <option value="">Selecteer een Klus</option>
                    {getValidTasks(beroep || '').map((task, index) => (
                        <option key={index} value={task}>{task}</option>
                    ))}
                </select>*/
                
                    // <select
                    //     id="klus-select" // Voeg een id attribuut toe voor Cypress selectie
                    //     value={displayedTaskName}
                    //     onChange={(e) => handleTaskChange(e)}
                    // >
                    //     <option value="">Selecteer een Klus</option>
                    //     {getValidTasks(beroep || '').map((task, index) => (
                    //         <option key={index} value={task}>{task}</option>
                    //     ))}
                    // </select>

                <select
                    id="klus-select"
                    value={displayedTaskName} // Use displayedTaskName here
                    onChange={(e) => handleTaskChange(e)}
                >
                    <option className="selectie-npm" value="">Selecteer een Klus</option>
                    {getValidTasks(beroep || '').map((task, index) => (
                        <option key={index} id={`task-option-${index + 1}`} value={task}>{task}</option>
                    ))}
                </select>
                }
                
                {!isValidTask(displayedTaskName) && ( // Validate based on displayedTaskName
                    <p className="error-message">Voer alstublieft een geldige opdracht in</p>
                )}
                <label>Uw Bio</label>
                <textarea
                    required={true}
                    placeholder="Uw Bio"
                    value={bio}
                    onChange={handleBioChange}
                />
                {!isValidBio && (
                    <p className="error-message">Voer alstublieft een geldige Bio in</p>
                )}
                <label>Email:</label>
                <input
                    type="email"
                    required
                    placeholder="example@example.com"
                    pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$"
                    value={email}
                    onChange={handleEmailChange}
                />
                {!isValidEmail && (
                    <p className="error-message">Voer alstublieft een geldig e-mailadres in</p>
                )}

                <label>Postcode</label>
                <div className="search_chore_address">
                    <input
                        type="postcode"
                        required
                        placeholder="1234AB"
                        className={`${isValidPostcode ? '' : 'invalid'}`}
                        value={postcodeInput}
                        onChange={handlePostcodeChange}
                        pattern="\d{4}\s?[A-Za-z]{2}"
                    />
                    <input
                        type="text"
                        required
                        placeholder="Plaatsnaam"
                        className={`${isValidStad ? '' : 'invalid'}`}
                        value={stadInput}
                        onChange={handleStadChange}
                        pattern="[A-Za-z\s]+"
                    />
                </div>
                {!isValidPostcode && (
                    <p className="error-message">Voer alstublieft een geldige postcode in (bijv. 1234AB)</p>
                )}

                {!isValidStad && (
                    <p className="error-message">Voer alstublieft een geldige stad in (bijv. Amsterdam)</p>
                )}
                <p className="form_login">Al een account? <a href="#">Inloggen</a></p>
            </div>
        </>
    )
}