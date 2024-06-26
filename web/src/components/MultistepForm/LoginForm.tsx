import { Dispatch, SetStateAction, useState } from "react";
import facebook from "../../assets/facebook_.svg";
import google from "../../assets/google_.svg";
import instagram from "../../assets/instagram_.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./MultistepForm.css";

type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
  setUserExists: Dispatch<SetStateAction<boolean>>;
  handleLogin: () => void;
  setError: (error: string) => void;
  error: string;
};

export function LoginForm({
  email,
  password,
  updateFields,
  setUserExists,
  handleLogin,
  error,
}: LoginFormProps) {
  const { t } = useTranslation();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };
  return (
    <>
      <div className="login-con">
        {error && (
          <div className="error-con">
            <p className="error-message">{error}</p>
          </div>
        )}
        <h2>{t("Login om vakspecialist te vinden")}</h2>
        <div className="login-form-con">
          <div className="login-form">
            <div className="login-form-email-con">
              <label>{t("Email")}</label>
              <input
                required
                type="email"
                placeholder="Bijv. joe@hotmail.com"
                value={email}
                onKeyDown={handleKeyDown}
                onChange={(e) => updateFields({ email: e.target.value })}
              />
            </div>
            <div className="login-form-password-con">
              <label>{t("Wachtwoord")}</label>
              <input
                required
                type="password"
                placeholder="Wachtwoord"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={(e) => updateFields({ password: e.target.value })}
              />
            </div>
          </div>
          <p className="login-link">
            {t("Nog geen account?")}{" "}
            <a href="/register" onClick={() => setUserExists(false)}>
              {t("Account aanmaken")}
            </a>
          </p>
          <Link className="login-link" to="/nl/wachtwoord-vergeten">
            {t("Wachtwoord vergeten?")}
          </Link>
          <button className="Button-login" type="button" onClick={handleLogin}>
            {t("Login")}
          </button>
        </div>
      </div>
    </>
  );
}
