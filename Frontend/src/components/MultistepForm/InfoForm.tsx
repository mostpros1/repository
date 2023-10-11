export function InfoForm() {
    return (
        <>
            <div className="info-con">
                <h2>Aanvullende informatie (niet verplicht)</h2>
                <div className="text-field-con">
                    <h4>Deel hier a.u.b niet je contactgegevens.</h4>
                    <form>
                        <textarea className="text-field" name="" placeholder="Beschrijf je klus hier met aanvullende informatie denk aan eventuele schade, enz.">
                        </textarea>
                    </form>
                </div>           
            </div>
        </>
    )
}