import React from 'react';
import { View, TextInput, Text, StyleSheet} from 'react-native';


export type InfoDataTwo = {
    inputTwo: string;
};


type InfoFormPropsTwo = InfoDataTwo & {
    updateFields: (fields: Partial<InfoDataTwo>) => void;
};

export function InfoFormTwo({ inputTwo, updateFields }: InfoFormPropsTwo) {
    return (
        <View>
            <TextInput value={inputTwo} onChangeText={text => updateFields({ inputTwo: text })} />
            <Text>Stap 2</Text>
        </View>
    );
}