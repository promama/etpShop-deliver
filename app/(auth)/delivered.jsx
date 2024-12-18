import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccessOrder } from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function delivered() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.success);
  const isLoading = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    try {
      dispatch(fetchSuccessOrder({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }} className="bg-teal-100">
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text style={{ fontSize: 23, color: "blue" }}>
          Success delivered page
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          orders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <View key={order.orderId}>
                  <Orders orders={order} success={true} />
                </View>
              );
            })
        )}
      </ScrollView>
    </View>
  );
}

export default delivered;
