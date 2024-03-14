import React from "react";
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import { Dimensions } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import Footer from '../Footer';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const SpecialistResults = ({ navigation }) => {
  const CustomIcon = (props) => {
    return (
      <View>
        <Icon
          name={props.name}
          size={props.size}
          style={{
            backgroundColor: `${props.bcolor}`,
            color: `${props.color}`,
            paddingLeft: props.pLeft,
            borderRadius: props.rad,
            padding: props.pad,
          }}
        />
      </View>
    );
  };
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.view}>
            <View style={styles.topContainer}>
              <Text style={[styles.bigTitle]}>
                Maak een selectie uit de beste {"\n"} vak specialisten in jouw
                omgeving
              </Text>
            </View>
            <View style={styles.container}>
              <Icon name="tune" size={55} color="black" />
            </View>

            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>
            <View style={styles.card}>
                <View style={styles.titleKmWrapper}>
                    <Text style={[styles.cardTitle]}>Mark van bomen</Text>
                    <View style={styles.kmWrapper}>
                        <Ionicons name="location" size={24} color="#308AE4" />
                        <Text>1.0 KM</Text>
                   </View>
                </View>
                <View style={styles.twoTextWrapper}>
                    <Text style={styles.textBold}>Kapotte leiding maken en lekkage verhelpen.</Text>
                    <Text style={styles.textLight}>De leiding is niet meer in  goede staat deze moet vervangen worden en....</Text>

                </View>

                <View style={styles.locationTimeInfoWrapper}>
                <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Locatie: Amsterdam</Text>
                   </Pressable>
                   <Pressable style={styles.kmWrapper}>
                        <Ionicons name="location" size={32} color="#308AE4" />
                        <Text>Binnen een maand</Text>
                   </Pressable>
                </View>
                <Pressable style={styles.moreInfo}>
                    <Text style={styles.link}>Meer info</Text>
                </Pressable>
            </View>

              <View style={[styles.footerfix]}></View>
            </View>
        </ScrollView>
        <Footer navigation={navigation} activePage="ChatOverview" />
      </SafeAreaView>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
    card:{
        width: windowWidth - 30,
        borderRadius: 9,
        marginBottom: 12,
        paddingTop: 13,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4, 
        },
        shadowOpacity: 0.3, 
        shadowRadius: 6, 
        elevation: 6,
        backgroundColor: "white",
    }, 

    locationTimeInfoWrapper:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        marginTop: 20,
    },

    moreInfo:{
        display: "flex",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },

    twoTextWrapper:{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center",
        paddingLeft: 30,
        paddingRight: 20,
        gap: 10,
        paddingTop: 10,
    },

    titleKmWrapper:{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        paddingLeft: 30,
        paddingRight: 20,
    },

    link:{
        color: "#308AE4",
    },

    kmWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      },
    
      cardTitle:{
        fontSize: 18,
      },

      textBold:{
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
      },

      textLight:{
        fontSize: 15,
        textAlign: "center",
        color: "#8B8D96",
      },

    footerfix: {
      height: 60,
      width: windowWidth,
    },  
      
  view: {
    height: "100%",
    width: windowWidth,
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
  },

  bigTitle:{
    color: "#303030",
    textAlign: "center",
    fontWeight: "bold",
  },

  topContainer: {
    width: windowWidth,
    height: 110,
    display: "flex",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 15,
    flexDirection: "column",
    borderBottomWidth: 6, 
    borderBottomColor: "#f4f4f5", 
  },
  
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90,
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },

});

export default SpecialistResults;
