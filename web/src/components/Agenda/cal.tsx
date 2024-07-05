import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  isValid,
} from "date-fns";
import { nl } from "date-fns/locale";
import arrowL from "../../assets/arrowL.png";
import arrowR from "../../assets/arrowR.png";
import "./cal.css";
import { dynamo } from "../../../declarations";
import { Auth } from "aws-amplify";
import { stopXSS } from "../../../../backend_functions/stopXSS";
import { useAvailability } from "../../AvailabilityContext";

interface DayProps {
  isCurrentMonth: boolean;
  hasAvailability: boolean;
  hasEntries: boolean;
}

interface NavButtonProps {
  image: string;
}

interface Entry {
  id?: number;
  text: string;
  time?: string;
  color: string;
}

interface Availability {
  date: string;
  time: string;
}

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f5f5f5;
  width: 100%;
`;

const Day = styled.button<DayProps>`
  position: relative;
  padding: 10px;
  background-color: ${(props) =>
    props.isCurrentMonth ? "transparent" : "transparent"};
  border: 1px solid
    ${(props) => (props.hasAvailability ? "transparent" : "transparent")};
  color: ${(props) => (props.isCurrentMonth ? "#308ae4" : "gray")};
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    border: 0.18rem solid
      ${(props) => (props.hasAvailability ? "#17a1fa47" : "#17a1fa47")};
    background-color: ${(props) =>
      props.isCurrentMonth ? "#3EA3E6" : "#3EA3E6"};
    color: ${(props) => (props.isCurrentMonth ? "blue" : "blue")};
  }

  &.selected {
    border: 0.18rem solid
      ${(props) => (props.hasAvailability ? "#17a1fa47" : "#17a1fa47")};
    background-color: ${(props) =>
      props.isCurrentMonth ? "#3EA3E6" : "#3EA3E6"};
    color: ${(props) => (props.isCurrentMonth ? "blue" : "blue")};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => (props.hasEntries ? "red" : "transparent")};
  }

  .dropdown {
    display: none;
    position: absolute;
    top: calc(100% - 1px);
    left: 50%;
    transform: translate(-50%, 0);
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    z-index: 1000;
    height: 200px;
    overflow-y: auto;
  }

  &:hover .dropdown {
    display: block;
  }
`;

const DaysOfWeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #178feb;
`;

const DayOfWeek = styled.div`
  text-align: center;
  color: white;
  padding: 10px;
  font-size: 12px;
  font-weight: bold;
`;

const MonthYearDisplay = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const NavButton = styled.button<NavButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;

const Cal = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availabilities, setAvailabilities] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [entries, setEntries] = useState<{ [date: string]: Entry[] }>({});
  //const [selectedOptions, setSelectedOptions] = useState("");
  const [checkedItems, setCheckedItems] = useState<
    { date: string; time: string }[]
  >([]);
  const [uncheckedItems, setUncheckedItems] = useState<
    { date: string; time: string }[]
  >([]);
  //const [availability, setAvailability] = useState<{ date: string, time: string }[]>([]);
  const { availability, setAvailability } = useAvailability();
  const [professionalId, setProfessionalId] = useState<number | null>(null);

  useEffect(() => {
    setSelectedDate(null); // Reset selectedDate whenever currentMonth changes
  }, [currentMonth]);

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Maa", "Din", "Woe", "Don", "Vri", "Zat", "Zon"];
    return (
      <DaysOfWeekContainer>
        {daysOfWeek.map((day) => (
          <DayOfWeek key={day}>{day}</DayOfWeek>
        ))}
      </DaysOfWeekContainer>
    );
  };

  const clearSelectedDates = () => {
    setSelectedDates([]);
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    function normalizeDate(date) {
      return new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
    }

    // Extracted logic to determine the new state
    const updateSelectedDates = async (clickedDay: Date) => {
      const normalizedClickedDay = normalizeDate(clickedDay);
      const prevSelectedDates = [...selectedDates]; // Make sure to work with a copy of the state to avoid direct mutation
      const dateExists = prevSelectedDates.some(
        (date) =>
          normalizeDate(date).getTime() === normalizedClickedDay.getTime()
      );

      if (dateExists) {
        // Date is selected, remove it
        const updatedDates = prevSelectedDates.filter(
          (date) =>
            normalizeDate(date).getTime() !== normalizedClickedDay.getTime()
        );
        // Attempt to delete the availability
        const dateString = stopXSS(
          normalizedClickedDay.toISOString().split("T")[0]
        );
        const dateToDeleteIndex = availability.findIndex(
          (item) => item.date === dateString
        );
        if (dateToDeleteIndex !== -1) {
          const [dateToDelete] = availability.splice(dateToDeleteIndex, 1);
          await deleteAvailability(dateToDelete);
        }
        return updatedDates;
      } else {
        // Date isn't selected, add it
        addAvailability([normalizedClickedDay]);
        return [...prevSelectedDates, normalizedClickedDay];
      }
    };

    // Usage within handleDateClick
    const handleDateClick = async (clickedDay) => {
      const updatedDates = await updateSelectedDates(clickedDay);
      setSelectedDates(updatedDates);
    };

    return (
      <CalendarContainer>
        {days.map((day) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const isCurrentMonth = day.getMonth() === monthStart.getMonth();
          const hasAvailability = !!availabilities[formattedDate];
          const hasEntries = !!entries[formattedDate];

          return (
            <Day
              key={formattedDate}
              isCurrentMonth={isCurrentMonth}
              hasAvailability={hasAvailability}
              hasEntries={hasEntries}
              className={
                selectedDates.some(
                  (selectedDate) =>
                    selectedDate.getDate() === day.getDate() &&
                    selectedDate.getMonth() === day.getMonth() &&
                    selectedDate.getFullYear() === day.getFullYear()
                )
                  ? "selected"
                  : ""
              }
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
              {/*hasEntries && (
                                <div className="dropdown">
                                    {entries[formattedDate].map((entry, index) => (
                                        <div
                                            key={index}
                                            style={{ backgroundColor: entry.color, padding: '5px', margin: '2px 0', borderRadius: '5px', cursor: 'pointer' }}
                                            onClick={() => {
                                                console.log(entry.id);
                                                if (typeof entry.id !== 'undefined') {
                                                    deleteEntrys(entry.id);
                                                }
                                            }}
                                        >
                                            {entry.text} {entry.time && `- ${entry.time}`}
                                        </div>
                                    ))}
                                </div>
                            )*/}
            </Day>
          );
        })}
      </CalendarContainer>
    );
  };

  useEffect(() => {
    console.log(entries);
  }, [entries]);

  const navigateToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const navigateToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date());
  };

  useEffect(() => {
    const fetchProfessionalData = async () => {
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
          setProfessionalId(response.Items[0].id);
          const output = response.Items[0];
          const beschikbaarheid: Availability[] = [];
          for (let i = 0; i < output.availability.length; i++) {
            console.log(output.availability[i].date);
            beschikbaarheid.push({
              date: output.availability[i].date,
              time: output.availability[i].time,
            });
            console.log(beschikbaarheid);
          }
          setAvailability(beschikbaarheid);
          console.log(response.Items[0].id);
          console.log(response.Items[0].availability);
        } else {
          console.log("No professional found with the provided email.");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching professional data:",
          error
        );
      }
    };

    fetchProfessionalData();
  }, []);

  /*async function getEntriesFromDB() {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;
        dynamo.query({
            TableName: "Calendar",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email
            },
        }).promise().then((data) => {
            console.log(data);
            setEntries(() => {
                const updatedEntries = {}; // Initialize as an empty object to start fresh
                if (data.Items && data.Items.length > 0) {
                    for (let i = 0; i < data.Items.length; i++) {
                        const currentItem = data.Items[i];
                        console.log("currentItem", currentItem);
                        // Check if currentItem.date is a valid date object
                        if (!currentItem || typeof currentItem.enrtys.date === 'undefined') {
                            console.warn("Invalid or missing date value found.");
                            continue;
                        }
                        const dateKey = format(currentItem.enrtys.date, 'yyyy-MM-dd'); // Use only if currentItem.date is valid
                        updatedEntries[dateKey] = [
                            ...(updatedEntries[dateKey] || []), // This line ensures that if there are multiple entries for the same date, they are grouped together
                            { id: currentItem.id, text: currentItem.enrtys.text, time: currentItem.enrtys.time, color: currentItem.enrtys.color }
                        ];
                    }
                } else {
                    console.log("No items found in the query result.");
                }
                console.log("updatedEntries", updatedEntries);
                return updatedEntries;
            })
        }).catch((err) => { console.log(err) });
    }


    useEffect(() => {
        getEntriesFromDB();
    }, []);

    async function addEntrysToDb(date: string, text: string, time: string, color: string) {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const email = authenticatedUser.attributes.email;

        try {
            const data = await dynamo.put({
                Item: {
                    id: Number(stopXSS(String(Math.floor(Math.random() * 1000000)))),
                    email: stopXSS(email),
                    enrtys: {
                        date: stopXSS(date), // Use computed property name to dynamically set the date as the key
                        text: stopXSS(text),
                        time: stopXSS(time),
                        color: stopXSS(color)
                    }
                },
                TableName: "Calendar",
            }).promise();

            console.log(data);
            console.log("Entry added successfully.");
        } catch (err) {
            console.error("Error adding entry:", err);
        }

        getEntriesFromDB();
    }


    const addEntry = (entry: string, time: string, color: string) => {
        if (selectedDates === null) {
            console.error("Selected date is null. Cannot add entry.");
            return;
        }
        selectedDates.forEach(date => {
            const dateKey = format(date, 'yyyy-MM-dd');
            addEntrysToDb(dateKey, entry, time, color);
        });
    };


    async function deleteEntrys(id: number) {
        const data = await dynamo.delete({
            TableName: "Calendar",
            Key: {
                id: id
            }
        }).promise();
        console.log(data);
        await getEntriesFromDB(); // Correctly await the completion of getEntriesFromDB
    }*/

  async function getAvailabilityFromDB() {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      const email = authenticatedUser.attributes.email;
      const data = await dynamo
        .query({
          TableName: "Professionals",
          IndexName: "emailIndex",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        })
        .promise();

      if (data.Items && data.Items.length > 0) {
        const output = data.Items[0];
        const beschikbaarheid = output.availability.map((item) => ({
          date: item.date,
          time: item.time,
        }));

        console.log("Beschikbaarheid:", beschikbaarheid);

        setAvailability(beschikbaarheid);

        // Convert dates to Date objects and set selectedDates
        const dates = beschikbaarheid.map((item) => new Date(item.date));
        setSelectedDates(dates);

        setProfessionalId(data.Items[0].id);
      } else {
        console.error("No items found in the query result.");
      }
    } catch (err) {
      console.error("An error occurred while fetching availability:", err);
    }
  }

  useEffect(() => {
    getAvailabilityFromDB();
  }, []);

  async function addMultipleDays(
    startDate: Date,
    time: string,
    pattern: "weekday" | "weekend" | "daily"
  ) {
    // Convert startDate.value to a Date object

    // Calculate the total number of days in the month
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const userId = professionalId;
    const baseDate = startDate; // Now baseDate is a Date object

    // Determine the starting point based on the pattern
    switch (pattern) {
      case "weekday":
        while (baseDate.getDay() !== 1) {
          // Find the first Monday
          baseDate.setDate(baseDate.getDate() + 1);
        }
        break;
      case "weekend":
        while (baseDate.getDay() !== 6) {
          // Find the first Saturday
          baseDate.setDate(baseDate.getDate() + 1);
        }
        break;
      case "daily":
        // No change needed for daily pattern
        break;
      default:
        throw new Error("Invalid pattern");
    }

    for (let a = 0; a < daysInMonth; a++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + a);

      // Skip weekends for 'weekday' pattern
      if (
        pattern === "weekday" &&
        (currentDate.getDay() === 0 || currentDate.getDay() === 6)
      )
        continue;

      // Skip weekdays for 'weekend' pattern
      if (
        pattern === "weekend" &&
        currentDate.getDay() >= 1 &&
        currentDate.getDay() <= 5
      )
        continue;

      // Assuming 'availability' is an array of objects with 'date' and 'time'
      // You need to construct the 'itemsForDb' based on your requirements
      // For demonstration, we'll just create a dummy object
      const itemsForDb = [
        {
          date: stopXSS(currentDate.toISOString().split("T")[0]), // Format date as YYYY-MM-DD
          time: stopXSS(time), // Example time, replace with actual time or logic to determine time
        },
      ];

      await dynamo
        .update({
          TableName: "Professionals",
          Key: {
            id: userId,
          },
          UpdateExpression: `set availability = list_append(if_not_exists(availability, :emptyList), :newItem)`,
          ExpressionAttributeValues: {
            ":emptyList": [],
            ":newItem": itemsForDb,
          },
        })
        .promise()
        .then((output) => {
          getAvailabilityFromDB();
          console.log(output.Attributes);
        })
        .catch(console.error);
    }

    // Show an alert once all dates have been added
    window.alert("Datums zijn toegevoegt.");
  }

  //meerdere dagen verwijderen
  /*
    const DeleteMultipleDays = async (startDate: Date, pattern: 'weekday' | 'weekend' | 'daily') => {
        // Convert startDate.value to a Date object

        // Validate the start date
        if (isNaN(startDate.getTime())) {
            console.error("Ongeldige startdatum");
            return;
        }

        // Calculate the total number of days in the month
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const existingAvailability = availability || [];

        // Determine the starting point based on the pattern
        const baseDate = new Date(startDate);
        switch (pattern) {
            case 'weekday':
                while (baseDate.getDay() !== 1) { // Find the first Monday
                    baseDate.setDate(baseDate.getDate() + 1);
                }
                break;
            case 'weekend':
                while (baseDate.getDay() !== 6) { // Find the first Saturday
                    baseDate.setDate(baseDate.getDate() + 1);
                }
                break;
            case 'daily':
                // No change needed for daily pattern
                break;
            default:
                throw new Error("Invalid pattern");
        }

        // Construct the new availability list by removing the dates added based on the pattern
        const updatedAvailability = existingAvailability.filter(item => {
            const itemDate = new Date(item.date);
            // Validate each item date
            if (isNaN(itemDate.getTime())) {
                console.error(`Ongeldige datum in beschikbaarheid: ${item.date}`);
                return false; // Skip invalid dates
            }

            let skip = false;
            for (let a = 0; a < daysInMonth; a++) {
                const currentDate = new Date(baseDate);
                currentDate.setDate(baseDate.getDate() + a);

                // Skip weekends for 'weekday' pattern
                if (pattern === 'weekday' && (currentDate.getDay() === 0 || currentDate.getDay() === 6)) continue;

                // Skip weekdays for 'weekend' pattern
                if (pattern === 'weekend' && (currentDate.getDay() >= 1 && currentDate.getDay() <= 5)) continue;

                if (itemDate.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0]) {
                    skip = true;
                    break;
                }
            }
            return !skip;
        });

        console.log("Updated availability: ", updatedAvailability);

        // Update the user's record in the Professionals table
        dynamo.update({
            TableName: "Professionals",
            Key: {
                id: professionalId, // Ensure this variable is defined and holds the correct professional ID
            },
            UpdateExpression: "SET #av = :val",
            ExpressionAttributeNames: {
                "#av": "availability"
            },
            ExpressionAttributeValues: {
                ":val": updatedAvailability
            }
        }).promise()
            .then(output => {
                getAvailabilityFromDB(); // Refresh the availability data
                alert("Deleted days successfully. " + output.Attributes);
            })
            .catch(error => {
                console.error("Failed to delete days:", error);
            });
    };
    */

  const addAvailability = async (dates) => {
    const availabilityArray = Array.isArray(availability)
      ? availability
      : [availability];

    const newDates = dates.map((date) => {
      const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      );
      return {
        date: stopXSS(utcDate.toISOString().split("T")[0]),
        time: stopXSS("hele dag"),
      };
    });

    // Merge existing and new availability dates
    const updatedAvailability = [...availabilityArray, ...newDates];

    try {
      await dynamo
        .update({
          TableName: "Professionals",
          Key: { id: professionalId },
          UpdateExpression: `set availability = :availability`,
          ExpressionAttributeValues: { ":availability": updatedAvailability },
        })
        .promise();

      await getAvailabilityFromDB();
      //await getEntriesFromDB();
      window.alert("Datum toegevoegt.");
    } catch (error) {
      console.error("An error occurred while adding availability: ", error);
    }
  };

  const deleteAvailability = async (date) => {
    try {
      // Ensure availability is an array
      const availabilityArray = Array.isArray(availability)
        ? availability
        : [availability];

      // Prepare dates to delete
      /*const datesToDelete = selectedDates.map(date => {
                const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
                return stopXSS(utcDate.toISOString().split('T')[0]);
            });
*/
      // Filter out dates that need to be deleted from the availability array
      const updatedAvailability = availabilityArray.filter(
        (item) => !date.includes(item.date)
      );

      // Update the DynamoDB table with the filtered availability
      const result = await dynamo
        .update({
          TableName: "Professionals",
          Key: {
            id: professionalId,
          },
          UpdateExpression: `set availability = :availability`,
          ExpressionAttributeValues: {
            ":availability": updatedAvailability,
          },
        })
        .promise();

      // Fetch updated data and log the output
      await getAvailabilityFromDB();
      //await getEntriesFromDB();
      console.log(result.Attributes);

      window.alert("Datum verwijderd.");
    } catch (error) {
      console.error("An error occurred while deleting availability: ", error);
    }
  };

  useEffect(() => {
    console.log(selectedDates);
  }, [selectedDates]);

  const handlePatternButtonClick = (
    pattern: "weekday" | "weekend" | "daily"
  ) => {
    // Handle setting the selected pattern in state or directly call the function
    addMultipleDays(new Date(), "hele dag", pattern); // Example of direct call
  };

  return (
    <div className="calendar-container">
      <ButtonContainer>
        <NavButton image={arrowL} onClick={navigateToPreviousMonth} />
        <MonthYearDisplay>
          {format(currentMonth, "MMMM yyyy", { locale: nl })}
        </MonthYearDisplay>
        <NavButton image={arrowR} onClick={navigateToNextMonth} />
      </ButtonContainer>
      {renderDaysOfWeek()}
      {renderCalendarDays()}

      {/*<form className="entry-form" onSubmit={(e) => {
                e.preventDefault();
                const text = (e.target as any).elements.entryText.value;
                const time = (e.target as any).elements.entryTime.value;
                console.log(time);
                const color = (e.target as any).elements.entryColor.value;
                addEntry(text, time, color);
            }}>
                <div className="form-group">
                    <label>Tekst: <input className='inputFormGroupCal' name="entryText" type="text" required /></label>
                </div>
                <div className="form-group">
                    <label>Tijd: <input className='inputFormGroupCal' name="entryTime" type="time" required /></label>
                </div>
                <div className="form-group">
                    <label>Kleur: <input name="entryColor" type="color" required /></label>
                </div>
                <button className={`submitButton submitButtonStyling ${selectedDates.length >= 1 ? '' : 'disabled'}`} type="submit" disabled={selectedDates.length !== 1}>Toevoegen</button>
                <button className={`submitButtonStyling ${selectedDates.length >= 1 ? '' : 'disabled'}`} type='button' onClick={clearSelectedDates}>Verwijder geselecteerde</button>
            </form>

            <form className="availability-form" onSubmit={(e) => {
                e.preventDefault();
                addAvailibility();
            }}>
                <button className='submitButtonStyling' type="submit">Voeg Beschikbaarheid Toe</button>
            </form>
            <form className="availability-form" onSubmit={(e) => {
                e.preventDefault();
                deleteAvailability();
            }}>
                <button className='submitButtonStyling' type="submit">Verwijder Beschikbaarheid</button>
            </form>*/}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const date = new Date((e.target as any).elements.startdate.value);
          const patroon = (e.target as any).elements.availPattern.value;
            addMultipleDays(date, "hele dag", patroon);
          }}
          >
          <b>Voeg Meerdere Dagen Toe</b>
          <br />
          <div className="form-group">
            <label>
            Start Dag: <input name="startdate" type="date" required />
            </label>
          </div>
          <div className="form-group">
            <div className="repeat-pattern-buttons">
            <p className="repeat-pattern-text">Herhaal patronen: </p>
            <button
              type="button"
              value="weekday"
              onClick={() => handlePatternButtonClick("weekday")}
            >
              Weekdagen
            </button>
            <button
              type="button"
              value="weekend"
              onClick={() => handlePatternButtonClick("weekend")}
            >
              Weekend
            </button>
            <button
              type="button"
              value="daily"
              onClick={() => handlePatternButtonClick("daily")}
            >
              Dagelijks
            </button>
          </div>
        </div>
        <button className="submitButtonStyling" type="submit">
          Voeg Dagen Toe
        </button>
      </form>

      {/* <form className="availability-form" onSubmit={(e) => {
                e.preventDefault();
                const date = new Date((e.target as any).elements.startdate.value);
                const pattern = (e.target as any).elements.pattern.value;
                DeleteMultipleDays(date, pattern);
            }}>
                <div className='patternSection'>
                    <br />
                    <b>Verwijder meerdere Dagen</b>
                    <br />
                    <div className="form-group">
                        <label>Vanaf: <input name="startdate" type="date" required /></label>
                    </div>
                    <br />
                    <label>Select Pattern:</label>
                    <select name="pattern">
                        <option value="weekday">Door de weeks</option>
                        <option value="weekend">Weekend</option>
                        <option value="daily">Elke Dag</option>
                    </select>
                    <br />
                    <button className='submitButtonStyling' type="submit">Verwijder Dagen</button>
                </div>
            </form> */}
    </div>
  );
};

export default Cal;
