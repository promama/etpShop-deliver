import { router, Slot } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { changeNotify, fetchVerify, reset } from "../../slices/userSlice";
import { socket } from "../../components/socket";
import { changeAllOrderList, fetchAllOrders } from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function index() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.orders);
  //load all deliverable orders
  useEffect(() => {
    try {
      dispatch(fetchAllOrders({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }} className="bg-teal-100">
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>index page</Text>
        {orders.length == 0 && (
          <Text>There are no new order to take, please comeback later</Text>
        )}
        {orders
          ?.slice(0)
          .reverse()
          .map((order) => {
            return (
              <View key={order.orderId}>
                <Orders orders={order} all={true} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default index;
