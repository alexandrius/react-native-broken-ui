import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Animated from "react-native-reanimated";
import HingeInput from "./HingeInput";

const marginHorizontal = 40;
const inputHeight = 60;

export default function App() {
   const [fullName, setFullName] = useState("");
   const [password, setPassword] = useState("");
   const [fullNameZIndex, setFullNameZindex] = useState(1);
   const [passwordZIndex, setPasswordZindex] = useState(1);

   return (
      <View style={styles.container}>
         <HingeInput
            placeholder="Full Name"
            inputStyle={styles.input}
            style={styles.inputContainer}
            paddingHorizontal={15}
            value={fullName}
            onChangeText={setFullName}
            hingePosition="left"
            startRotation={-2}
            zIndex={fullNameZIndex}
            onFocus={() => {
               setFullNameZindex(2);
               setPasswordZindex(1);
            }}
         />
         <HingeInput
            placeholder="Password"
            inputStyle={styles.input}
            style={styles.inputContainer}
            paddingHorizontal={15}
            value={password}
            onChangeText={setPassword}
            hingePosition="right"
            startRotation={2}
            zIndex={passwordZIndex}
            onFocus={() => {
               setPasswordZindex(2);
               setFullNameZindex(1);
            }}
         />
         <Animated.View style={[styles.loginButton]}>
            <Text style={styles.loginLabel}>Login</Text>
         </Animated.View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#e0e0e0",
   },
   inputContainer: {
      flexDirection: "row",
      marginHorizontal,
      backgroundColor: "white",
      borderRadius: 10,
      marginVertical: 20,
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
   },
   input: {
      fontSize: 18,
      height: inputHeight,
   },
   inputPreviewContainer: {
      position: "absolute",
      height: "100%",
      width: "100%",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 12,
   },
   inputPreview: {
      fontSize: 18,
   },
   loginButton: {
      marginTop: 100,
      height: inputHeight,
      borderRadius: 30,
      backgroundColor: "#fc0345",
      marginHorizontal: 70,
      alignItems: "center",
      justifyContent: "center",
   },
   loginLabel: {
      color: "white",
      fontSize: 20,
   },
});
