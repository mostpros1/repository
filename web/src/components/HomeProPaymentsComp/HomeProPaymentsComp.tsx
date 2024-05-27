import React, { useState, useEffect } from 'react';
import './HomeProPaymentsComp.css';
import { Auth } from 'aws-amplify';
import { stripeClient, cognitoClient } from '../../main';

interface Transaction {
  date: string;
  name: string;
  transactionId: string;
  status: string;
  amount: number;
}

const HomeProPaymentsComp: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Example transaction data - this would be fetched from an API in a real application
  useEffect(() => {
    setTransactions([
      // { date: "19 Mar, 2024", name: "S. Barneveld", transactionId: "2102399123489", status: "Paid", amount: 1250 },
      // { date: "19 Mar, 2024", name: "S. Barneveld", transactionId: "2102399123489", status: "Cancelled", amount: 1250 },
      // { date: "19 Mar, 2024", name: "S. Barneveld", transactionId: "2102399123489", status: "Awaiting", amount: 1250 },
      // { date: "19 Mar, 2024", name: "S. Barneveld", transactionId: "2102399123489", status: "Pending", amount: 1250 },
      // Add more transactions as needed
    ]);
  }, []);

  const stripeSignUp = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userEmail = user.attributes.email;
      const stripeAccount = await stripeClient.accounts.create({
        type: 'standard',
        email: userEmail,
        country: 'NL',
      });

      await cognitoClient.adminUpdateUserAttributes({
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: userEmail,
        UserAttributes: [{ Name: 'custom:stripeAccountId', Value: stripeAccount.id }]
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
      console.log('Failed to connect to stripe')
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'textgreen';
      case 'cancelled':
        return 'textcancelled'; // Use the new class for cancelled status
      case 'awaiting':
        return 'textorange';
      case 'pending':
        return 'textblue';
      default:
        return '';
    }
  };


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
        <article className="ProPaymentsStroke3">
          <div className="divContainerPro">Date</div>
          <div className="divContainerPro">Name</div>
          <div className="divContainerPro">Transaction Nr.</div>
          <div className="divContainerPro">Status</div>
          <div className="divContainerPro">Amount</div>
        </article>
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <article key={index} className="ProPaymentsStroke2">
              <div className="divContainerPro">{transaction.date}</div>
              <div className="divContainerPro">{transaction.name}</div>
              <div className="divContainerPro">{transaction.transactionId}</div>
              <div className={`divContainerPro ${getStatusClassName(transaction.status)}`}>
                {transaction.status}
              </div>
              <div className="divContainerPro">
                {transaction.amount.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' })}
              </div>
            </article>
          ))
        ) : (
          <div className="ProPaymentsNoTransactions">Geen betalingen gevonden</div>
        )}
      </section>
    </main>
  );
}


export default HomeProPaymentsComp;
