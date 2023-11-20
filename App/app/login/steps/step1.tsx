import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';


type InfoData = {
    input: string;
};


type InfoFormProps = InfoData & {
    updateFields: (fields: Partial<InfoData>) => void;
};

export function InfoForm({ input, updateFields }: InfoFormProps) {
    return (
        <View>
            <TextInput value={input} onChangeText={text => updateFields({ input: text })} />
            <Text>Stap 1</Text>
        </View>
    );
}
const styles = StyleSheet.create({

})