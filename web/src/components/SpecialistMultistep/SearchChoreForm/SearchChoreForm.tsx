import "./SearchChoreForm.css"

type SpecialistData = {
    email: string
    postCode: string
    stad: string
}

type SearchChoreFormProps = SpecialistData & {
    updateFields: (fields: Partial<SpecialistData>) => void
}

export default function SearchChoreForm({ email, postCode, stad, updateFields }: SearchChoreFormProps) {
    return (
        <>
            <div className="search_chore_text_con">
                <h1>Zoek uw klus</h1>
                <p>Klussen worden gezocht in alle sectoren en door heel Nederland. Laat ons weten waar u wilt werken, dan helpen wij u bij het vinden van passende klussen.<br/>
                Als u een eenmansbedrijf hebt, voer uw eigen gegevens in. Als u meer mensen hebt die bij uw bedrijf werken, voer de gegevens van het contactpersoon in (bedrijfseigenaar of een filiaalmanager).</p>
            </div>
            <div className="search_chore_form">
                <label>Email:</label>
                <input
                    type="text"
                    placeholder="example@example.com"
                    value={email}
                    onChange={e => updateFields({ email: e.target.value })}
                />
                <label>Postcode</label>
                <div className="search_chore_address">
                    <input
                        type="text"
                        placeholder="1234AB"
                        value={postCode}
                        onChange={e => updateFields({ postCode: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Plaatsnaam"
                        value={stad}
                        onChange={e => updateFields({ stad: e.target.value })}
                    />
                </div>
                <p className="form_login">Al een account? <a href="#">Inloggen</a></p>
            </div>
        </>

    )
}
