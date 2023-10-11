export function EmailForm() {
    return (
        <>
            <div className="email-con">
                <h2>Ontvang reacties van loodgieters in jouw omgeving.</h2>
                <form className="email-field-con">
                    <label>Email</label>
                    <input className="email-input" type="text" placeholder="Bijv. joe@hotmail.com"/> 
                </form>
            </div>
        </>
    )
}