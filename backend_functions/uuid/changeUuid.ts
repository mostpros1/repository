import { Auth } from "aws-amplify";
import { dynamo } from "../../web/declarations.ts";


async function UUID() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;

      const data = await dynamo.query({
        TableName: "Uuids",
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      }).promise();

      if (data.Items && data.Items.length > 0) {
        return data.Items[0].identifyingName;
      } else {
        dynamo.put({
          TableName: "Uuids",
          Item: {
            id: Math.random().toString(36).substring(2),
            email: email,
            identifyingName: Math.random().toString(36).substring(2, 15)
          },
        }).promise();
        return user.attributes.name;
        //throw new Error("No items found");
      }
    } catch (error) {
      console.error("Error getting UUID:", error);
    }
  }

  
  async function changeUuid(newUUID: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;

      const data = await dynamo.query({
        TableName: "Uuids",
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      }).promise();

      if (data.Items && data.Items.length > 0) {
        dynamo.update({
          TableName: "Uuids",
          Key: {
            id: data.Items[0].id,
          },
          UpdateExpression: "set identifyingName = :uuid",
          ExpressionAttributeValues: {
            ":uuid": newUUID,
          },
        }).promise();
        
      } else {
        throw new Error("No items found");
      }
    } catch (error) {
      console.error("Error getting UUID:", error);
    }
  }