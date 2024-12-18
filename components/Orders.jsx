import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import SingleOrder from "./SingleOrder";
import { currencyFormat } from "../utils/formatCurrency";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCancelOrder,
  fetchFinishOrder,
  fetchTakeOrder,
  setLoading,
  setMyDeliverOrder,
} from "../slices/ordersSlice";
import { socket } from "./socket";

function Orders(props) {
  const [image, setImage] = useState();
  const [reason, setReason] = useState("");
  const email = useSelector((state) => state.user.email);
  const token = useSelector((state) => state.user.token);
  const isOrderLoading = useSelector((state) => state.orders.isLoading);

  const dispatch = useDispatch();
  const blankImage =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const uploadImage = async (mode) => {
    if (mode === "gallery") {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
    }
    try {
      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (err) {
      alert(err);
    }
  };

  const removeImage = async () => {
    try {
      saveImage(null);
    } catch (err) {
      alert(err);
    }
  };

  const saveImage = async (image) => {
    try {
      setImage(image);
    } catch (err) {
      throw err;
    }
  };

  const finishDeliver = async () => {
    // alert(image); image's uri
    const data = new FormData();
    data.append("myFiles", { uri: image, type: "image" });
    data.append(
      "deliverData",
      JSON.stringify({
        orderId: props.orders.orderId,
        email,
      })
    );

    try {
      // const result = await dispatch(fetchFinishOrder(data)).unwrap();
      //change ip
      dispatch(setLoading(true));
      const res = await FileSystem.uploadAsync(
        "http://192.168.100.13:5000/deliver/uploadImage",
        image,
        {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "myFiles",
          mimeType: "image/png",
          parameters: {
            orderId: props.orders.orderId,
            email,
          },
        }
      );
      alert(JSON.parse(res.body).success);
      dispatch(
        setMyDeliverOrder({ listOrder: JSON.parse(res.body).listOrder })
      );
      socket.emit("deliver:finish-order", {
        email,
        orderId: props.orders.orderId,
      });
    } catch (err) {
      dispatch(setLoading(false));
      if (!image) {
        alert("Please choose your image");
      } else {
        alert(JSON.stringify(err));
      }
    }
  };

  const cancelOrder = async () => {
    try {
      const result = await dispatch(
        fetchCancelOrder({
          email,
          orderId: props.orders.orderId,
          access_token: token,
          reason,
        })
      ).unwrap();
      alert(result.success);
      socket.emit("deliver:cancel-order", {
        email,
        orderId: props.orders.orderId,
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  const takeOrder = async () => {
    try {
      const res = await dispatch(
        fetchTakeOrder({
          email,
          access_token: token,
          orderId: props.orders.orderId,
        })
      ).unwrap();
      socket.emit("deliver:take-order", {
        email,
        orderId: props.orders.orderId,
      });
      alert(res.success);
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  useEffect(() => {
    // socket.on("server:acceptjoin", (message) => {
    //   alert(message.message);
    // });
  });

  return (
    <View className="mt-3">
      {isOrderLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {/* Purchases infos */}
          <View className="flex-row mb-2">
            {/* Purchases Id */}
            <Text>Id: {props.orders.orderId}</Text>
            {/* Purchases status */}
            <Text
              className="ml-auto"
              style={{ color: checkStatus(props.orders.status) }}
            >
              {props.orders.status}
            </Text>
          </View>
          {/* Show each product in purchases */}
          {props.orders.productInOrder &&
            props.orders.productInOrder.map((product) => {
              return (
                <View className="mb-3" key={product._id + product.orderId}>
                  <SingleOrder product={product} />
                </View>
              );
            })}
          {/* reciever infos */}
          <View className="mt-2">
            <Text>
              {props.orders.name} - {props.orders.phoneNumber}
            </Text>
            <Text>{props.orders.address}</Text>
          </View>
          {/* Total amount */}
          <View className="ml-auto flex-row mb-2">
            <Text>Total: </Text>
            <Text style={{ color: "red" }}>
              {currencyFormat(props.orders?.total)}
            </Text>
          </View>
          {/* index page button take order */}
          {props.all && (
            <Button title="Take this order" onPress={takeOrder}></Button>
          )}
          {props.availible && (
            <Button title="Take this order" onPress={takeOrder}></Button>
          )}

          {/* delivering page choose and send image */}
          {props.delivering && (
            // add image before finish
            <View>
              {/* image */}
              <Image
                source={image ? { uri: image } : { uri: blankImage }}
                style={{
                  borderRadius: 100,
                  width: 100,
                  height: 100,
                }}
              ></Image>
              {/* button trigger open camera*/}
              <Pressable onPress={() => uploadImage()}>
                <View className="mb-2">
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={30}
                    color="blue"
                  >
                    <Text> Take picture</Text>
                  </MaterialCommunityIcons>
                </View>
              </Pressable>
              {/* button trigger open lib */}
              <Pressable onPress={() => uploadImage("gallery")}>
                <View className="mb-2">
                  <MaterialCommunityIcons
                    name="image-outline"
                    size={30}
                    color="orange"
                  >
                    <Text> Choose image</Text>
                  </MaterialCommunityIcons>
                </View>
              </Pressable>
              {/* button trigger delete image*/}
              <Pressable onPress={() => removeImage()}>
                <View className="mb-4">
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={30}
                    color="red"
                  >
                    <Text> Delete image</Text>
                  </MaterialCommunityIcons>
                </View>
              </Pressable>
              <Button
                title="Finish order"
                onPress={() => finishDeliver()}
              ></Button>
              <TextInput
                style={styles.input}
                placeholder="Cancel reason?"
                onChangeText={setReason}
                className="border rounded-lg"
              ></TextInput>
              <Button
                color="orange"
                title="Cancel order"
                onPress={() => cancelOrder()}
              ></Button>
            </View>
          )}

          {/* delivered page show image */}
          {props.success && (
            <Image
              style={{
                borderRadius: 100,
                width: 100,
                height: 100,
              }}
              source={{ uri: props.orders.url }}
            ></Image>
          )}

          {/* cancel page show reason */}
          {props.cancel && (
            <Text className="text-orange-400">
              Cancel reason: {props.orders.failReason}
            </Text>
          )}
          <View style={styles.horizontal_ruler}></View>
        </View>
      )}
    </View>
  );
}

export function checkStatus(status) {
  if (status === "Approved") {
    return "orange";
  } else if (status === "Delivering") {
    return "blue";
  } else if (status === "Delivered") {
    return "#1bff00";
  } else if (status === "Cancelled") {
    return "red";
  } else return "black";
}

const styles = StyleSheet.create({
  horizontal_ruler: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    width: 300,
    padding: 10,
    margin: 10,
    borderColor: "gray",
  },
});

export default Orders;
