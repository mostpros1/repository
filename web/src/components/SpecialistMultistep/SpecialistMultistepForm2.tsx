import React, { useState } from 'react';

interface DateTimeSpan {
  date: string;
  startTime: string;
  endTime: string;
}

const SpecialistMultistepForm2: React.FC = () => {
  const [dateTimeSpans, setDateTimeSpans] = useState<DateTimeSpan[]>([
    { date: '', startTime: '', endTime: '' }
  ]);

  const bekirDateTimeSpanChange = (index: number, key: keyof DateTimeSpan, value: string) => {
    const updatedDateTimeSpans = [...dateTimeSpans];
    updatedDateTimeSpans[index][key] = value;
    setDateTimeSpans(updatedDateTimeSpans);
  };

  const bekirAddDateTimeSpan = () => {
    setDateTimeSpans([...dateTimeSpans, { date: '', startTime: '', endTime: '' }]);
  };

  const bekirRemoveDateTimeSpan = (index: number) => {
    const updatedDateTimeSpans = [...dateTimeSpans];
    updatedDateTimeSpans.splice(index, 1);
    setDateTimeSpans(updatedDateTimeSpans);
  };

  const berkirSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can use dateTimeSpans to pass data into the database
    console.log(dateTimeSpans);
  };

  return (
    <>
      <form onSubmit={berkirSubmit}>
        <div>
          {dateTimeSpans.map((span, index) => (
            <div key={index}>
              <input
                type="date"
                className="inputDate"
                name="date-form"
                value={span.date}
                onChange={(e) => bekirDateTimeSpanChange(index, 'date', e.target.value)}
              />
              <input
                type="time"
                className="inputTime"
                name="time-form-start"
                value={span.startTime}
                onChange={(e) => bekirDateTimeSpanChange(index, 'startTime', e.target.value)}
                placeholder="Vanaf hoelaat"
              />
              <input
                type="time"
                className="inputTime"
                name="time-form-end"
                value={span.endTime}
                onChange={(e) => bekirDateTimeSpanChange(index, 'endTime', e.target.value)}
                placeholder="Tot hoelaat"
              />
              {dateTimeSpans.length > 1 && (
                <button className="deleteKnop" type="button" onClick={() => bekirRemoveDateTimeSpan(index)}>X</button>
              )}
            </div>
          ))}
          {dateTimeSpans.length < 5 && (
            <button className="addDateKnop" type="button" onClick={bekirAddDateTimeSpan}>Add Date</button>
          )}
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};

export default SpecialistMultistepForm2;