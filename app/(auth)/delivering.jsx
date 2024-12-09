import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveringOrder } from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function delivering() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.delivering);

  useEffect(() => {
    try {
      dispatch(fetchDeliveringOrder({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text>Delivering page</Text>
        {orders?.length == 0 && (
          <Text>All orders are delvered, please take new order</Text>
        )}

        {orders &&
          orders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <View key={order.orderId}>
                  <Orders orders={order} delivering={true} />
                </View>
              );
            })}
      </ScrollView>
    </View>
  );
}

export default delivering;
