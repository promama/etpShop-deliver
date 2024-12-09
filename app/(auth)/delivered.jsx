import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccessOrder } from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function delivered() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.success);

  useEffect(() => {
    try {
      dispatch(fetchSuccessOrder({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>Success delivered page</Text>
        {orders
          ?.slice(0)
          .reverse()
          .map((order) => {
            return (
              <View key={order.orderId}>
                <Orders orders={order} success={true} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

export default delivered;
