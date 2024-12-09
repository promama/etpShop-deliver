import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDeliveringOrder,
  fetchShowCancelOrder,
} from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function canceled() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.cancel);

  useEffect(() => {
    try {
      dispatch(fetchShowCancelOrder({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>Cancel delivered page</Text>
        {orders
          ?.slice(0)
          .reverse()
          .map((order) => {
            return (
              <View key={order.orderId}>
                <Orders orders={order} cancel={true} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default canceled;
