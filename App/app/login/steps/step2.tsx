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
        <View style={styles.view}>
            <TextInput value={inputTwo} onChangeText={text => updateFields({ inputTwo: text })} />
            <Text>Stap 2</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        width: 400,
        height: 400,
        backgroundColor: "Black",
    }
})