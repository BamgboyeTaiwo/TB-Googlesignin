import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import tw from "twrnc";
// import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
// import InitializeAuthentication from './firebase/firebaseinit';
import InitializeAuthentication from "./firebase/firebaseinit";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/firestore";

import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const provider = new GoogleAuthProvider();
  const [Loggedin, setLoggedin] = useState(false);
  const [user, setuser] = useState({});
  // const iosClientid = `950560099966-bd02m9a514el4gg0vsq86m3fk8sh6dre.apps.googleusercontent.com`;
  // "694235095257-qnub27n3o6s0e3lo1sneio03o6ka5k9m.apps.googleusercontent.com",

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();
  const [message, setMessage] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "694235095257-fkbf1u81sm5ii76om74j5b7h8u4v2m7a.apps.googleusercontent.com",
    iosClientId: "950560099966-bd02m9a514el4gg0vsq86m3fk8sh6dre.apps.googleusercontent.com",
    expoClientId: "694235095257-7t7h7mv877d2jfu7r508ct1egmesbqdm.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    setMessage(JSON.stringify(response));
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      console.log(response.authentication.accessToken);  
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>

          <View style={styles.container}>
            {showUserInfo()}
            <Button
              title={accessToken ? "Get User Data" : "Login"}
              onPress={
                accessToken
                  ? getUserData
                  : () => {
                      promptAsync({ useProxy: false, showInRecents: true });
                    }
              }
            />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <View style={tw` h-full w-full `}>
        <View style={tw`my-auto px-[5%] mx-auto`}>
          <Text style={tw``}>Hello</Text>

          {Loggedin ? <Text> User is loggedin</Text> : <Text> User not logged in</Text>}

          {user.email && (
            <View>
              <Text> Welcome {user.displayName}</Text>
            </View>
          )}

          <Text> Biddy and Taiwo Login Platform</Text>

          <TouchableOpacity style={tw` w-25 mx-auto mt-5`}>
            <View style={tw` border py-2 px-2 bg-blue-400 `}>
              <Text> Google Login</Text>
            </View>
          </TouchableOpacity>

          <View >
            {showUserInfo()}
            <Button
            style={tw`bg-blue py-3 px-2 `}
              title={accessToken ? "Get User Data" : "Login"}
              onPress={
                accessToken
                  ? getUserData
                  : () => {
                      promptAsync({ useProxy: false, showInRecents: true });
                    }
              }
            />
            <Text>Hmmm</Text>
            <StatusBar style="auto" />
          </View>

          {/* <button type="" onClick={()=> handlelogin()}>
        Login Now 
      </button> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
