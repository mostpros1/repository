// config.js

const config = {
    aws: {
        region: 'eu-north-1', // e.g., 'us-east-1'
        ses: {
            apiVersion: '2010-12-01',
            /*accessKeyId: 'your-access-key-id',
            secretAccessKey: 'your-secret-access-key',*/
            // Set the default 'from' address for SES
            from: {
                default: 'your-default-from-address@example.com'
            }
        }
    }
};

module.exports = config;
