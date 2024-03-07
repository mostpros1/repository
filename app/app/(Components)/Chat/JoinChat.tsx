import React, { ReactElement } from 'react'; // Import ReactElement for proper typing
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useChatBackend } from './ChatBackend';
import { useUser } from '../../context/UserContext';

interface JoinChatProps {
  signOut: () => void; // Define the signOut function as a prop
}

const JoinChat: React.FC<JoinChatProps> = ({ signOut }): ReactElement => {
  const { user } = useUser();
  const {
    recipientEmail,
    setShowJoinButton,
    showAlert,
    handleStartNewChat,
    handleAlertInputChange,
    handleAlertConfirm,
    handleAlertCancel,
  } = useChatBackend(user, signOut); // Ensure useChatBackend is correctly receiving user and signOut

  return (
    <View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={handleStartNewChat}
          title="Start New Chat"
        />
      </View>

      {showAlert && (
        <View style={{ margin: 10 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            onChangeText={handleAlertInputChange}
            value={recipientEmail}
            placeholder="Enter recipient's email"
          />
          <Button
            onPress={() => {
              handleAlertConfirm();
              setShowJoinButton(true);
            }}
            title="Confirm"
          />
          <Button
            onPress={handleAlertCancel}
            title="Cancel"
          />
        </View>
      )}
    </View>
  );
};

export default JoinChat;
