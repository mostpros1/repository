// config.js

const config = {
    aws: {
        region: 'eu-north-1', // e.g., 'us-east-1'
        ses: {
            apiVersion: '2010-12-01',
            from: {
                default: 'timon@timonheidenreich.eu'
            }
        }
    }
};

module.exports = config;
