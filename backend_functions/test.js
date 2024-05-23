import * as fs from 'fs';

// Sample JSON data
const jsonData = {
    "id": "qt_1PJXJGGSS5FaNGjdiQ3Vcc4s",
    "object": "quote",
    "amount_subtotal": 200000,
    "amount_total": 200000,
    "application": null,
    "application_fee_amount": null,
    "application_fee_percent": null,
    "automatic_tax": {
      "enabled": false,
      "liability": null,
      "status": null
    },
    "collection_method": "charge_automatically",
    "computed": {
      "recurring": null,
      "upfront": {}
    },
    "created": 1716454058,
    "currency": "eur",
    "customer": null,
    "default_tax_rates": [],
    "description": null,
    "discounts": [],
    "expires_at": 1719046058,
    "footer": null,
    "from_quote": null,
    "header": null,
    "invoice": null,
    "invoice_settings": {
      "days_until_due": null,
      "issuer": {}
    },
    "lastResponse": {
      "requestId": "req_XplBFbCTgm2St0",
      "type": "cors",
      "url": "https://api.stripe.com/v1/quotes"
    },
    "livemode": false,
    "metadata": {},
    "number": null,
    "on_behalf_of": null,
    "status": "draft",
    "status_transitions": {
      "accepted_at": null,
      "canceled_at": null,
      "finalized_at": null
    },
    "subscription": null,
    "subscription_data": {
      "description": null,
      "effective_date": null,
      "metadata": null
    },
    "subscription_schedule": null,
    "test_clock": null,
    "total_details": {
      "amount_discount": 0,
      "amount_shipping": 0,
      "amount_tax": 0
    },
    "transfer_data": null
  };

// Define the headers for the CSV file
const headers = ['ID', 'Object', 'Amount Subtotal', 'Amount Total'];
const headerRow = headers.join(',') + '\n';

// Convert the JSON data to CSV format
const csvContent = `${jsonData.id},${jsonData.object},${jsonData.amount_subtotal},${jsonData.amount_total}\n`;

// Combine the header and data rows
const csvData = headerRow + csvContent;

// Write the CSV data to a file
fs.writeFile('output.csv', csvData, (err) => {
  if (err) {
    console.error('Error writing CSV file:', err);
  } else {
    console.log('CSV file written successfully.');
  }
});