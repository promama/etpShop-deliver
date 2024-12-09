import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { React, useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { fetchSignUp } from "../slices/userSlice";

function signup() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setrePassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  const handleSubmit = async () => {
    try {
      const res = await dispatch(
        fetchSignUp({
          email: userName,
          password: password,
          repassword: repassword,
        })
      ).unwrap();
      alert(res.message);
      //navigate to login page
      router.push("/signin");
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <View className="bg-teal-100 flex-1">
      <View style={styles.container}>
        <Text className="mt-10 items-center">Sign up new account</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={setUserName}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.horizontal_ruler}></View>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry={isShowPassword}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          <View style={styles.horizontal_ruler}></View>
          <TextInput
            style={styles.input}
            placeholder="Re-enter your password"
            secureTextEntry={isShowPassword}
            onChangeText={setrePassword}
            autoCapitalize="none"
          />
          <View style={styles.password_container}>
            <MaterialCommunityIcons
              style={styles.icon}
              name={isShowPassword ? "eye-off" : "eye"}
              onPress={() => {
                setIsShowPassword(!isShowPassword);
              }}
            />
          </View>
          <Button
            style={styles.btn_signin}
            title="Sign up"
            onPress={handleSubmit}
          ></Button>
          <Pressable>
            <Text
              style={styles.forgot_password}
              onPress={() => {
                router.push("signin");
              }}
            >
              Already have an account? Sign in
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: 100,
  },
  inputArea: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    width: 300,
    padding: 10,
    margin: 10,
    borderColor: "gray",
  },
  btn_signin: {
    padding: 10,
    margin: 10,
  },
  forgot_password: {
    marginTop: 10,
    marginLeft: "auto",
    color: "blue",
  },
  password_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input_password: {
    flex: 1,
    paddingVertical: 10,
    width: 300,
    padding: 10,
    margin: 10,
    borderColor: "gray",
  },
  icon: {
    marginLeft: "auto",
    padding: 10,
  },
  horizontal_ruler: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default signup;
