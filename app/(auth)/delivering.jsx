import React, { useEffect } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeliveringOrder } from "../../slices/ordersSlice";
import Orders from "../../components/Orders";

function delivering() {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const orders = useSelector((state) => state.orders.delivering);
  const isLoading = useSelector((state) => state.orders.isLoading);

  useEffect(() => {
    try {
      dispatch(fetchDeliveringOrder({ access_token, email }));
    } catch (err) {
      alert(err);
    }
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }} className="bg-teal-100">
      <ScrollView className="mt-10 ml-5 mr-5">
        <Text style={{ fontSize: 23, color: "blue" }}>Delivering page</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : orders?.length == 0 ? (
          <View>
            <Text style={{ color: "orange", fontSize: 18 }}>
              All orders are delvered, please take new order
            </Text>
            <Image
              source={{
                uri: "https://res.cloudinary.com/promama/image/upload/e_background_removal/f_png/v1734536572/962d3804e5f9614d42f4e17a4b526d92_t_gubmvt.jpg",
              }}
              style={{
                width: "100%",
                aspectRatio: 1,
                borderRadius: 20,
                marginTop: 10,
              }}
            ></Image>
          </View>
        ) : (
          orders &&
          orders
            ?.slice(0)
            .reverse()
            .map((order) => {
              return (
                <View key={order.orderId}>
                  <Orders orders={order} delivering={true} />
                </View>
              );
            })
        )}
      </ScrollView>
    </View>
  );
}

export default delivering;
