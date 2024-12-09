import React from "react";
import { Image, StyleSheet, Text } from "react-native";

function ProductImage(props) {
  return (
    <Image
      style={styles.image}
      source={{ uri: props.url }}
      resizeMode="cover"
    ></Image>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export default ProductImage;
