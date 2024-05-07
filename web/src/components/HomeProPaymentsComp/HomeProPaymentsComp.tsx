import React from 'react';
import './HomeProPaymentsComp.css';
import { FaSearch } from 'react-icons/fa';
import { Auth } from 'aws-amplify';
import { cognitoClient, stripeClient } from '../../main';
//import taal from "../ui/NavBar/Navigation";


const HomeProPaymentsComp: React.FC = () => {

  async function stripeSignUp() {
    try {
      const user = await Auth.currentAuthenticatedUser();

      // Extract the user's email from the attributes
      const userEmail = user.attributes.email;

      const stripeAccount = await stripeClient.accounts.create({
        type: 'standard',
        email: userEmail,
        country: 'NL',
      });

      await cognitoClient.adminUpdateUserAttributes({
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: userEmail,
        UserAttributes: [{
          Name: 'custom:stripeAccountId',
          Value: stripeAccount.id
        }]
      }).promise();

      const result = await stripeClient.accountLinks.create({
        account: stripeAccount.id,
        type: 'account_onboarding',
        refresh_url: `${window.location.origin}/nl/payments/onboarding-failed`,
        return_url: `${window.location.origin}/nl/homeowner-dashboard/payments`
      });

      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      // Handle the error more gracefully here, e.g., show a user-friendly message
    }
  }
  return (
    <main className="ProPaymentsMain">
      <section className="ProPaymentsSearchWrapper">
        <p className="ProPaymentsText">
          Payments are going through stripe. Stripe is a safe payment service. It looks like you haven’t connected to stripe yet. Click the button below to connect to stripe and get paid for your services.
        </p>
        <button type="button" className="ProPaymentsButton" onClick={stripeSignUp}>
          Connect to Stripe
        </button>
      </section>

      <section className="ProPayments">
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p className="ProPaymentInfoBold">Date</p>
          </div>
          <div className="divContainerPro">
            <p className="ProPaymentInfoBold">Name</p>
          </div>
          <div className="divContainerPro">
            <p className="ProPaymentInfoBold">Transaction Nr.</p>
          </div>
          <div className="divContainerPro">
            <p className="ProPaymentInfoBold">Status</p>
          </div>
          <div className="divContainerPro">
            <p className="ProPaymentInfoBold">Amount</p>
          </div>
        </article>

        {/* Additional articles */}
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textgreen">Paid</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>

        {/* Additional articles */}
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textred">Declined</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
        <article className="ProPaymentsStroke2">
          <div className="divContainerPro">
            <p>19 Mar, 2024</p>
          </div>
          <div className="divContainerPro">
            <p>S. Barneveld</p>
          </div>
          <div className="divContainerPro">
            <p>2102399123489</p>
          </div>
          <div className="divContainerPro">
            <p className="textorange">Awaiting</p>
          </div>
          <div className="divContainerPro">
            <p>1250,-</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default HomeProPaymentsComp;
