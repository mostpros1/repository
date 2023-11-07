import "./SearchChoreForm.css"

type SpecialistData = {
    beroep: string
    email: string
    postCode: string
    stad: string
}

type SearchChoreFormProps = SpecialistData & {
    updateFields: (fields: Partial<SpecialistData>) => void
}

export default function SearchChoreForm({ beroep, email, postCode, stad, updateFields }: SearchChoreFormProps) {
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
                    placeholder="Uw beroep"
                    value={beroep}
                    onChange={e => updateFields({ beroep: e.target.value })}
                />
                <label>Email:</label>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => updateFields({ email: e.target.value })}
                />
                <label>Postcode</label>
                <div className="search_chore_address">
                    <input
                        type="text"
                        placeholder="Postcode"
                        value={postCode}
                        onChange={e => updateFields({ postCode: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Stad"
                        value={stad}
                        onChange={e => updateFields({ stad: e.target.value })}
                    />
                </div>
                <p className="form_login">Al een account? <a href="#">Inloggen</a></p>
            </div>
        </>

    )
}
