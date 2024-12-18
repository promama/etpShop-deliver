import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNotify,
  fetchShowAllNotification,
  fetchVerify,
  reset,
} from "../../slices/userSlice";
import {
  changeAllOrderList,
  fetchAllOrders,
  resetOrders,
} from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function index() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.orders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  //load all deliverable orders
  useEffect(() => {
    try {
      dispatch(fetchAllOrders({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);

  useEffect(() => {
    //load notification and unread notify
    dispatch(fetchShowAllNotification({ access_token, email }));
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }} className="bg-teal-100">
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text style={{ fontSize: 23, color: "blue" }}>Home page</Text>
        <Pressable
          onPress={() => {
            dispatch(resetOrders());
            dispatch(reset());
          }}
        >
          <Text>log out</Text>
        </Pressable>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : orders.length == 0 ? (
          <View>
            <Text style={{ color: "orange", fontSize: 18 }}>
              There are no new order to take, please comeback later
            </Text>
            <Image
              source={{
                uri: "https://res.cloudinary.com/promama/image/upload/v1734536163/empty-cart_dichne.png",
              }}
              style={{
                width: "100%",
                aspectRatio: 1,
              }}
            ></Image>
          </View>
        ) : (
          orders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <View key={order.orderId}>
                  <Orders orders={order} all={true} />
                </View>
              );
            })
        )}
      </ScrollView>
    </View>
  );
}

export default index;
