import React, { useState, ReactElement } from "react";
import { useChatBackend } from "./ChatBackend";

const JoinChat: React.FC = (user, signOut): ReactElement => {
  const {
    recipientEmail,
    setShowJoinButton,
    showAlert,
    handleStartNewChat,
    handleAlertInputChange,
    handleAlertConfirm,
    handleAlertCancel,
  } = useChatBackend(user, signOut);
  return (
    <>
      <div>
        <div className="button_containerc">
          <button
            type="button"
            className="buttonc"
            onClick={handleStartNewChat}
          >
            Start New Chat
          </button>
        </div>

        {
          // @ts-ignore
          showAlert && (
            <div className="alert">
              <input
                type="text"
                placeholder="Enter recipient's email"
                value={recipientEmail}
                onChange={handleAlertInputChange}
              />
              <button
                onClick={() => {
                  handleAlertConfirm();
                  setShowJoinButton(true);
                }}
              >
                Confirm
              </button>
              <button onClick={handleAlertCancel}>Cancel</button>
            </div>
          )
        }
      </div>
    </>
  );
};

export default JoinChat;
