// dynamoDBService.js
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "./dynamoDBClient";

export const saveSelectedDaysToDatabase = async (userId, selectedDays) => {
  try {
    const command = new PutCommand({
      TableName: "UserAvailability",
      Item: {
        userId: userId,
        selectedDays: selectedDays,
      },
    });

    await dynamoClient.send(command);
    console.log("Geselecteerde dagen succesvol opgeslagen.");
  } catch (error) {
    console.error("Fout bij het opslaan van de geselecteerde dagen: ", error);
  }
};
