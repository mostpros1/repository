import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Auth } from 'aws-amplify';

const [error, setError] = useState('');

const navigate = useNavigate()

interface RegisterData {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        password: string;
        repeatPassword: string;
        dob: string;
    }

export function signUp(registerData: RegisterData, user_type: string): void {
    const { email, phoneNumber, password, firstName, lastName, dob } = registerData;

    try {
      const signUpUser = async (): Promise<void> => {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: phoneNumber,
            given_name: firstName,
            family_name: lastName,
            birthdate: dob,
            'custom:user_type': user_type,// Include the custom attribute directly
          },
          autoSignIn: { enabled: true }
        });

        navigate('/bevestig-email', { state: { email: email } });
      };

      signUpUser();
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
    }
  }