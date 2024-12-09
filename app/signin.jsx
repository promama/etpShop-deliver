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
import { fetchLogin } from "../slices/userSlice";

function signin() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(true);

  const handleSubmit = async () => {
    try {
      const res = await dispatch(
        fetchLogin({
          email,
          password,
        })
      ).unwrap();
      alert(res.message);
      //navigate to prev product page or smth
      router.push("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View className="bg-teal-100 flex-1">
      <View style={styles.container}>
        <Text className="mt-10 items-center">Sign in your account</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            onChangeText={setEmail}
            autoCapitalize="none"
          ></TextInput>
          <View style={styles.horizontal_ruler}></View>
          <View style={styles.password_container}>
            <TextInput
              style={styles.input_password}
              placeholder="Enter your password"
              secureTextEntry={isShowPassword}
              onChangeText={setPassword}
              autoCapitalize="none"
            />
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
            onPress={handleSubmit}
            title="Sign in"
          ></Button>
          <Pressable>
            <Text style={styles.forgot_password}>Forgot password?</Text>
          </Pressable>
          <Pressable>
            <Text
              style={styles.forgot_password}
              onPress={() => {
                router.push("signup");
              }}
            >
              Don't have an account? Sign up
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
    marginLeft: 10,
    fontSize: 30,
  },
  horizontal_ruler: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default signin;
