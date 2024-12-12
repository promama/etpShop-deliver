import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { socket } from "../components/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNotify,
  fetchUnreadNotification,
  fetchVerify,
  reset,
  setNotificaition,
} from "../slices/userSlice";

function MyNavBar() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const listNotify = useSelector((state) => state.user.notificationList);
  const unreadNotify = useSelector((state) => state.user.unreadNotify || 0);
  const allowAccess = useSelector((state) => state.user.allowAccess);

  // useEffect(() => {
  //   dispatch(fetchUnreadNotification({ email: email }));
  // }, [dispatch, email]);

  // useEffect(() => {
  //   //connect to socket server
  //   socket.on("connect");

  //   //user join a room
  //   socket.emit("deliver:join", { room: email });

  //   //listen to join room permit
  //   socket.on("server:acceptjoin", (message) => {
  //     alert(message.message);
  //   });
  // });

  useEffect(() => {
    socket.on("connect");
    socket.emit("deliver:join", { room: email });
    socket.on("deliver:recieve-new-order", (message) => {
      alert(JSON.stringify(message));
      dispatch(changeNotify(message));
    });
  }, [dispatch]);
  return (
    <View className="items-center justify-around flex flex-row bg-inherit pb-2 border border-cyan-300 bg-teal-100">
      {/* Nav Home */}
      <Pressable className="items-center" onPress={() => router.push("/")}>
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="home"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Home</Text>
      </Pressable>
      {/* Nav Delivering */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/delivering")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="cart"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Delivering</Text>
      </Pressable>
      {/* Nav Notification */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/notification")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="bell"
          color="blue"
        ></MaterialCommunityIcons>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: "red",
          }}
        >
          <Text className="text-white items-center">{unreadNotify}</Text>
        </View>
        <Text>Notify</Text>
      </Pressable>
      {/* Nav Success delivered */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/delivered")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="check"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Delivered</Text>
      </Pressable>
      {/* Nav Fail delivered */}
      <Pressable
        className="items-center"
        onPress={() => router.push("/canceled")}
      >
        <MaterialCommunityIcons
          style={{ fontSize: 30 }}
          name="close"
          color="blue"
        ></MaterialCommunityIcons>
        <Text>Cancel</Text>
      </Pressable>
    </View>
  );
}

export default MyNavBar;
