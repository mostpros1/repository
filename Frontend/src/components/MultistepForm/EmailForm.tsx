type EmailData = {
    email: string
  }
  
  type EmailFormProps = EmailData & {
    updateFields: (fields: Partial<EmailData>) => void
  }
  
  export function EmailForm({email, updateFields }: EmailFormProps) {
    return (
      <>
         <div className="email-con">
                <h2>Ontvang reacties van loodgieters in jouw omgeving.</h2>
                <div className="email-field-con">
                    <label>Email</label>
                    <input className="email-input" required type="text" placeholder="Bijv. joe@hotmail.com" value={email} onChange={e => updateFields({ email: e.target.value })}/> 
                </div>
            </div>
      </>
    )
  }