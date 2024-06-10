import React, { useState, useEffect } from "react";
import "./HomeProPaymentsComp.css";
import { Auth } from "aws-amplify";
import Stripe from "stripe";
import AWS from "aws-sdk";

interface Transaction {
  date: string;
  name: string;
  transactionId: string;
  status: string;
  amount: number;
}

const HomeProPaymentsComp: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [reportStatus, setReportStatus] = useState<string | null>(null);

  useEffect(() => {
    setTransactions([
      // Voorbeeldtransacties ter illustratie
      // { date: "19 Mar, 2024", name: "A. Hans", transactionId: "2102399123489", status: "Betaald", amount: 1250 },
      // { date: "19 Mar, 2024", name: "A. Hans", transactionId: "2102399123489", status: "Geannuleerd", amount: 1250 },
      // { date: "19 Mar, 2024", name: "A. Hans", transactionId: "2102399123489", status: "In afwachting", amount: 1250 },
      // { date: "19 Mar, 2024", name: "A. Hans", transactionId: "2102399123489", status: "In behandeling", amount: 1250 },
    ]);
  }, []);

  const stripeSignUp = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;
      const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
        apiVersion: "2023-10-16",
      });

      const stripeAccount = await stripe.accounts.create({
        type: "standard",
        email: userEmail,
        country: "NL",
      });

      const cognitoClient = new AWS.CognitoIdentityServiceProvider();
      await cognitoClient
        .adminUpdateUserAttributes({
          UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
          Username: userEmail,
          UserAttributes: [
            { Name: "custom:stripeAccountId", Value: stripeAccount.id },
          ],
        })
        .promise();

      const result = await stripe.accountLinks.create({
        account: stripeAccount.id,
        type: "account_onboarding",
        refresh_url: `${window.location.origin}/nl/payments/onboarding-failed`,
        return_url: `${window.location.origin}/nl/homeowner-dashboard/payments`,
      });

      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      console.log("Kon geen verbinding maken met Stripe");
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status.toLowerCase()) {
      case "betaald":
        return "textgreen";
      case "geannuleerd":
        return "textcancelled";
      case "in afwachting":
        return "textorange";
      case "in behandeling":
        return "textblue";
      default:
        return "";
    }
  };

  const fetchReport = async () => {
    setReportStatus("Rapport wordt gegenereerd...");

    const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      console.error("Stripe secret key is not defined");
      setReportStatus("Stripe geheim sleutel ontbreekt. Controleer configuratie.");
      return;
    }

    console.log("Stripe secret key is available");

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    try {
      const user = await Auth.currentAuthenticatedUser();
      const sessionValid = user.signInUserSession && user.signInUserSession.isValid();

      if (!sessionValid) {
        console.log("Session is invalid, refreshing...");
        await Auth.currentSession();
      }

      const reportRun = await stripe.reporting.reportRuns.create({
        report_type: 'revenue_recognition.debit_credit_by_invoice.1',
        parameters: {
          interval_start: Math.floor(new Date('2024-05-01').getTime() / 1000),
          interval_end: Math.floor(new Date('2024-06-01').getTime() / 1000),
        },
      });

      const reportRunStatus = await stripe.reporting.reportRuns.retrieve(reportRun.id);

      if (reportRunStatus.status === "succeeded" && reportRunStatus.result) {
        const resultId = reportRunStatus.result.id;
        const downloadUrl = `https://files.stripe.com/v1/files/${resultId}/contents`;

        setReportStatus("Rapport succesvol gegenereerd. Downloaden...");
        window.location.href = downloadUrl;
      } else {
        setReportStatus("Genereren van rapport mislukt. Probeer het opnieuw.");
      }
    } catch (err) {
      console.error("Error generating report: ", err);
      setReportStatus("Genereren van rapport mislukt. Probeer het opnieuw.");
    }
  };

  const totalAmount = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  const paidTransactions = transactions.filter(transaction => transaction.status.toLowerCase() === "betaald").length;

  return (
    <main className="ProPaymentsMain">
      <section className="ProPayments">
        <article className="ProPaymentsStroke3">
          <div className="divContainerPro">Datum</div>
          <div className="divContainerPro">Naam</div>
          <div className="divContainerPro">Transactie Nr.</div>
          <div className="divContainerPro">Status</div>
          <div className="divContainerPro">Bedrag</div>
        </article>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <article key={index} className="ProPaymentsStroke2">
              <div className="divContainerPro" data-label="Datum">
                {transaction.date}
              </div>
              <div className="divContainerPro" data-label="Naam">
                {transaction.name}
              </div>
              <div className="divContainerPro" data-label="Transactie Nr.">
                {transaction.transactionId}
              </div>
              <div
                className={`divContainerPro ${getStatusClassName(
                  transaction.status
                )}`}
                data-label="Status"
              >
                {transaction.status}
              </div>
              <div className="divContainerPro" data-label="Bedrag">
                {transaction.amount.toLocaleString("nl-NL", {
                  style: "currency",
                  currency: "EUR",
                })}
              </div>
            </article>
          ))
        ) : (
          <div className="ProPaymentsNoTransactions">
            Geen betalingen gevonden
          </div>
        )}
      </section>
      <section className="ProPaymentsSummary">
        <h2 className="ProPaymentsSummaryTitle">Samenvatting</h2>
        <p>Totaal Bedrag: {totalAmount.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}</p>
        <p>Aantal Betaalde Transacties: {paidTransactions}</p>
        <h3 className="ProPaymentsSummarySubtitle">Handige Tips</h3>
        <ul className="ProPaymentsTipsList">
          <li>Controleer regelmatig je transactiegeschiedenis voor eventuele afwijkingen.</li>
          <li>Zorg ervoor dat je betalingsgegevens up-to-date zijn om betalingsproblemen te voorkomen.</li>
          <li>Neem contact op met onze klantenservice bij vragen over een transactie.</li>
        </ul>
        <button className="ProPaymentsButton" onClick={stripeSignUp}>Verbind met Stripe</button>
      </section>
      <section className="RevenueRecognitionOverview">
        <h2 className="RevenueRecognitionTitle">Revenue Recognition API</h2>
        <p>Automatiseer je transactiekostenverwerkingsproces met Stripe Revenue Recognition.</p>
        <button className="ProPaymentsButton" onClick={fetchReport}>Download Revenue Recognition Rapport</button>
        {reportStatus && <p>{reportStatus}</p>}
        <p className="tekstondergenerate">Je kunt je aanmelden voor een 30-daagse proefperiode van Revenue Recognition of je aanmelden voor het Billing Scale-plan. Wij baseren onze tarieven op Stripe Billing prijzen.</p>
        <a href="https://stripe.com/docs/revenue-recognition" className="RevenueRecognitionLink">Lees meer over Stripe’s Revenue Recognition-methodologie.</a>
      </section>
    </main>
  );
};

export default HomeProPaymentsComp;
