import React, { useEffect, useState } from "react";
import "./CalResult.css";
import { Checkbox } from "@mui/material";
import { dynamo } from "../../../declarations";
import getAvailabilityFromDB from "./cal.tsx";
import { useAvailability } from "../../AvailabilityContext";
import { Auth } from "aws-amplify";

function CalResult() {
  //const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [entries, setEntries] = useState<{
    [date: string]: { text: string; time: string; color: string }[];
  }>({});
  //const [selectedOptions, setSelectedOptions] = useState("");
  const [checkedItems, setCheckedItems] = useState<
    { date: string; time: string }[]
  >([]);
  const [uncheckedItems, setUncheckedItems] = useState<
    { date: string; time: string }[]
  >([]);
  //const [availability, setAvailability] = useState<{ date: string, time: string }[]>([]);
  const [professionalId, setProfessionalId] = useState<number | null>(null);

  const { availability, setAvailability } = useAvailability();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Remove unchecked items from checkedItems array
    const filteredCheckedItems = checkedItems.filter(
      (checkedItem) =>
        !uncheckedItems.some(
          (uncheckedItem) =>
            uncheckedItem.date === checkedItem.date &&
            uncheckedItem.time === checkedItem.time
        )
    );

    // Submit remaining checked items
    console.log("Selected options:", filteredCheckedItems);
    // Your submission logic here

    const itemsForDb = availability.filter(
      (checkedItem) =>
        !filteredCheckedItems.some(
          (uncheckedItem) =>
            uncheckedItem.date === checkedItem.date &&
            uncheckedItem.time === checkedItem.time
        )
    );

    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const email = authenticatedUser.attributes.email;
      const response = await dynamo
        .query({
          TableName: "Professionals",
          IndexName: "emailIndex",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        })
        .promise();

      if (response.Items && response.Items.length > 0) {
        dynamo
          .update({
            TableName: "Professionals",
            Key: {
              id: response.Items[0].id,
            },
            UpdateExpression: `set availability = :availability`,
            ExpressionAttributeValues: {
              ":availability": itemsForDb,
            },
          })
          .promise()
          .then((output) => {
            setAvailability(itemsForDb);
            console.log(output.Attributes);
          })
          .catch(console.error);
        setCheckedItems([]);
      } else {
        console.log("No professional found with the provided email.");
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching professional data in CalResult.tsx: ",
        error
      );
    }
  };

  return (
    <div>
      {/* <section className="DateResultsCal">
        <article className="formContainerResultDateCal">
          <form onSubmit={handleSubmit}>
            Verwijder Beschikbaarheid<br></br>
            {availability
              // .filter(availabilityItem => availabilityItem.date === dateKey)
              .map((filteredAvailabilityItem, index) => (
                <div key={index}>
                  <Checkbox
                    //type="checkbox"
                    name={`delete-date-${index}`}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedItems([
                          ...checkedItems,
                          filteredAvailabilityItem,
                        ]);
                      } else {
                        // Compare both date and time for uniqueness
                        setCheckedItems(
                          checkedItems.filter(
                            (item) =>
                              item.date !== filteredAvailabilityItem.date ||
                              item.time !== filteredAvailabilityItem.time
                          )
                        );
                      }
                    }}
                  />
                  <label
                    htmlFor={`delete-date-${filteredAvailabilityItem.date}`}
                  >
                    {filteredAvailabilityItem.date} om{" "}
                    {filteredAvailabilityItem.time}
                  </label>
                </div>
              ))}
            <button type="submit">Submit</button>
          </form>
        </article>
      </section> */}
    </div>
  );
}

export default CalResult;
