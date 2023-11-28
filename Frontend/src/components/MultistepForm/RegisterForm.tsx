type RegisterData = {
  firstName: string
  lastName: string
  registerEmail: string
  phoneNumber: string
  registerPassword: string
  repeatRegisterPassword: string
}

type RegisterFormProps = RegisterData & {
  updateFields: (fields: Partial<RegisterData>) => void
}

export function RegisterForm({firstName, lastName, registerEmail, phoneNumber, registerPassword, repeatRegisterPassword, updateFields }: RegisterFormProps) {
      
    return (
        <>
            <div className="register-con">
            <h2>Maak een nieuw account aan</h2>
            <div className="reg-form-con">
                <label htmlFor="">Voornaam:</label>
                <input 
                    required 
                    type="text" 
                    placeholder='Voornaam'
                    value={firstName}
                    onChange={e => updateFields({ firstName: e.target.value })}
                />

                <label htmlFor="" >Achternaam:</label>
                <input 
                    required 
                    type="text" 
                    placeholder='Achternaam'
                    value={lastName}
                    onChange={e => updateFields({ lastName: e.target.value })}
                />

				<label htmlFor="">Email:</label>
				<input 
					required 
					type="email" 
					placeholder='Email'
					value={registerEmail}
					onChange={e => updateFields({ registerEmail: e.target.value })}
				/>

                <label htmlFor="">Telefoonnummer:</label>
                <input 
					required 
					type="tel" 
					placeholder='Telefoonnummer (bijv. +31612345678)'
					value={phoneNumber}
					onChange={e => updateFields({ phoneNumber: e.target.value })}
				/>

				<label htmlFor="">Wachtwoord:</label>
				<input 
						required 
						type="password" 
						placeholder='Wachtwoord (min. 6 tekens)'
						value={registerPassword}
						onChange={e => updateFields({ registerPassword: e.target.value })}
				/>

				<label htmlFor="">Herhaal wachtwoord:</label>
				<input 
						required 
						type="password" 
						placeholder='Herhaal wachtwoord'
						value={repeatRegisterPassword}
						onChange={e => updateFields({ repeatRegisterPassword: e.target.value })}
				/>
                
                  </div>
                  <div className="reg-link">Al een account? <a href="">Inloggen</a></div>
                  <button className="form-btn register-btn">Maak account aan</button>
            </div>
      </>
  )
}