import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchShowOrderDetail } from "../../../slices/ordersSlice";
import Orders from "../../../components/Orders";

function NotificationDetail() {
  const params = useLocalSearchParams();
  const singleOrderDetail = useSelector(
    (state) => state.orders.singleOrderDetail
  );
  const access_token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowOrderDetail({ access_token, email, orderId: params.id }));
  }, [dispatch]);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView className="mt-10 ml-5 mr-5">
        {/* <Text>{JSON.stringify(singleOrderDetail)}</Text> */}
        <Text>Delivery infomation:</Text>
        <Orders
          orders={singleOrderDetail}
          availible={singleOrderDetail.availible}
        ></Orders>
      </ScrollView>
    </View>
  );
}

export default NotificationDetail;
