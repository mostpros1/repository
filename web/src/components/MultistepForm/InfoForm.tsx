type InfoData = {
    aanvullendeInformatie: string
  }
  
  type InfoFormProps = InfoData & {
    updateFields: (fields: Partial<InfoData>) => void
  }
  
  export function InfoForm({aanvullendeInformatie, updateFields }: InfoFormProps) {
    return (
      <>
         <div className="info-con">
                <h2>Aanvullende informatie (niet verplicht)</h2>
                <div className="text-field-con">
                    <h4>Deel hier a.u.b niet je contactgegevens.</h4>
                    <div>
                        <textarea className="text-field" name="" placeholder="Beschrijf je klus hier met aanvullende informatie denk aan eventuele schade, enz." value={aanvullendeInformatie} onChange={e => updateFields({ aanvullendeInformatie: e.target.value })}>
                        </textarea>
                    </div>
                </div>           
            </div>
      </>
    )
  }