import React, { useState } from "react";
import "./HomeOwnerNotification.css";

function NotificationToggle({ title, enabled, onToggle }) {
  return (
    <div className="notification-toggle">
      <span>{title}</span>
      <label className="switch">
        <input type="checkbox" checked={enabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

function NotificationCard({ title, description, options }) {
  return (
    <div className="notification-card">
      <h2>{title}</h2>
      <p className="notification-description">{description}</p>{" "}
      {options.map((option, index) => (
        <NotificationToggle
          key={index}
          title={option.title}
          enabled={option.enabled}
          onToggle={() => option.toggle(!option.enabled)}
        />
      ))}
    </div>
  );
}

function HomeOwnerNotification() {
  // Email Notifications State
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [emailMessages, setEmailMessages] = useState(false);

  // Push Notifications State
  const [pushUpdates, setPushUpdates] = useState(true);
  const [pushReminders, setPushReminders] = useState(true);
  const [pushMessages, setPushMessages] = useState(false);

  const emailOptions = [
    {
      title: "Updates over nieuwe vakspecialisten reacties",
      enabled: emailUpdates,
      toggle: setEmailUpdates,
    },
    {
      title: "Reminders over uw huidige klussen",
      enabled: emailReminders,
      toggle: setEmailReminders,
    },
    {
      title: "Nieuwe berichten",
      enabled: emailMessages,
      toggle: setEmailMessages,
    },
  ];

  const pushOptions = [
    {
      title: "Updates over nieuwe reacties",
      enabled: pushUpdates,
      toggle: setPushUpdates,
    },
    {
      title: "Reminders over uw huidige klussen",
      enabled: pushReminders,
      toggle: setPushReminders,
    },
    {
      title: "Nieuwe berichten",
      enabled: pushMessages,
      toggle: setPushMessages,
    },
  ];

  return (
    <div>
      <div className="notification-con">
        <div className="notification-header">
          <p>Notification</p>
        </div>
        <div className="notification-settings">
          <NotificationCard
            title="Email notificaties"
            description="Wijzig hier je email notificaties om op de hoogte te blijven van nieuwe vakspecialisten. U kunt dit altijd uitzetten."
            options={emailOptions}
          />
          <article></article>
          <NotificationCard
            title="Push notificaties"
            description="Wijzig hier je Push notificaties om op de hoogte te blijven van nieuwe reacties op je klussen. U kunt dit altijd uitzetten."
            options={pushOptions}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeOwnerNotification;
