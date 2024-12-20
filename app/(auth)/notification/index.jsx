import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReadNofication,
  fetchShowAllNotification,
} from "../../../slices/userSlice";

function index() {
  const listNotify = useSelector((state) => state.user.notificationList);
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    //load notification and unread notify
    dispatch(fetchShowAllNotification({ access_token, email }));
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }} className="bg-teal-100">
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text style={{ fontSize: 23, color: "blue" }}>notification page</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          listNotify
            .slice(0)
            .reverse()
            .map((noti) => {
              let backgroundColor = "blue-100";
              let textColor = "black";
              let message = "";
              if (noti.isRead === false) {
                backgroundColor = "#e1f5ef";
              }
              if (noti.status === "Finish") {
                message = " is completed";
                textColor = "green";
              } else if (noti.status === "Waiting approve") {
                message = " is waiting for approve";
                textColor = "#ff6500";
              } else if (noti.status === "Delivering") {
                message = " is added to you. Make sure to deliver soon";
                textColor = "blue";
              } else if (noti.status === "Approved") {
                message = " is ready to take";
                textColor = "orange";
              }
              return (
                <Pressable
                  key={noti._id}
                  onPress={() => {
                    dispatch(
                      fetchReadNofication({
                        access_token,
                        email,
                        orderId: noti.orderId,
                      })
                    );
                    router.push(`notification/${noti.orderId}`);
                  }}
                >
                  <View
                    className="flex"
                    style={{ backgroundColor: backgroundColor, marginTop: 2 }}
                  >
                    <Text>Your order {noti.orderId}</Text>
                    <Text style={{ color: textColor }}>{message}</Text>
                    <View className="ml-auto">
                      <Text>{noti.last_update}</Text>
                    </View>
                    <View style={styles.horizontal_ruler}></View>
                  </View>
                </Pressable>
              );
            })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  horizontal_ruler: {
    marginTop: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default index;
