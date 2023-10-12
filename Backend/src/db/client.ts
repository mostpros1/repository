import { DynamoDB } from "@aws-sdk/client-dynamodb";
import 'dotenv/config';

const ddbConnection = new DynamoDB({ region: process.env.AWS_REGION });

export default ddbConnection;