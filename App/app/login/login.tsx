import { FormEvent, useState } from "react"
import { useAppForm } from "./useAppForm"
import { InfoForm } from "./steps/step1"
import { InfoFormTwo } from "./steps/step2"
import { InfoFormThree } from "./steps/step3"
import { StyleSheet, View, Text, Pressable } from "react-native"
type AppFormData = {
    input: string
    inputTwo: string
    inputThree: string
  };
const INITIAL_DATA: AppFormData = {
    input: "",
    inputTwo: "",
    inputThree: "",
}

function AppForm() {
    const [data, setData] = useState(INITIAL_DATA)
    function updateFields(fields: Partial<AppFormData>) {
        setData(prev => {
          return { ...prev, ...fields }
        });
      }
      
    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useAppForm([ 
        <InfoForm {...data} updateFields={updateFields}/>,
        <InfoFormTwo {...data} updateFields={updateFields}/>,
        <InfoFormThree {...data} updateFields={updateFields}/>,
    ])
      async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!isLastStep) {
          return next();
        } else {

            //doe late hier de navigatie naar waar je moet zijn
        }
      }
      return(
        <View>
            <Text> ehhaehdlasdhas</Text>
           {step}
           <View style={styles.buttonContainer}>
            {!isFirstStep && <Pressable style={styles.press} onPress={back}><Text style={styles.text}>Back</Text></Pressable>}
            <Pressable style={styles.press} onPress={next}><Text style={styles.text}>{isLastStep ? "Verstuur" : "Volgende"}</Text></Pressable>
           </View>
           
            
        </View>
      )
}
const styles = StyleSheet.create({
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 5,
    },
    press: {
      width: 180,
      height: 60,
      backgroundColor: "#308AE4",
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      
      color: "white",
    }
});
export default AppForm