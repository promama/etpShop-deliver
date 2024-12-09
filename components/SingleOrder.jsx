import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductImage from "./ProductImage";
import { currencyFormat } from "../utils/formatCurrency";
import { reset } from "../slices/userSlice";

function SingleOrder(props) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [value, setValue] = useState(parseInt(props.product.rating) || 0);

  return (
    <View>
      <View className="flex-row items-center">
        {/* Product image */}
        <View style={{ width: 80, marginRight: 3 }}>
          <ProductImage url={props.product?.url} />
        </View>
        {/* Product details */}
        <View>
          <View className="flex-row">
            {/* Product name */}
            <Text>{props.product?.productName} </Text>
            {/* Product quantity */}
            <Text style={{ color: "gray" }}>x{props.product?.quantity}</Text>
          </View>
          {/* Product price */}
          <Text>{currencyFormat(props.product?.price)}</Text>
          {/* Product color */}
          <View
            style={{
              borderRadius: 10,
              width: 20,
              height: 20,
              backgroundColor: props.product.color.toString().toLowerCase(),
            }}
          ></View>
          {/* Product size */}
          <Text>size: {props.product?.size}</Text>
        </View>
        {/* Product total amount */}
        <Text className="ml-auto">
          {currencyFormat(props.product?.quantity * props.product?.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    width: 100,
  },
});

export default SingleOrder;
