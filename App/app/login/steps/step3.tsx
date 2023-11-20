import React from 'react';
import { View, TextInput, Text} from 'react-native';


export type InfoDataThree = {
    inputThree: string;
};


type InfoFormPropsThree = InfoDataThree & {
    updateFields: (fields: Partial<InfoDataThree>) => void;
};

export function InfoFormThree({ inputThree, updateFields }: InfoFormPropsThree) {
    return (
        <View>
            <TextInput value={inputThree} onChangeText={text => updateFields({ inputThree: text })} />
            <Text>Stap 3</Text>
        </View>
    );
}
