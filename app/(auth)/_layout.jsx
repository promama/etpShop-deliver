import { router, Slot } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchVerify, reset } from "../../slices/userSlice";
import MyNavBar from "../../components/MyNavBar";

export default function DetailsLayout() {
  const dispatch = useDispatch();
  const allowAccess = useSelector((state) => state.user.allowAccess);
  const message = useSelector((state) => state.user.message);
  const token = useSelector((state) => state.user.token);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    try {
      dispatch(fetchVerify({ access_token: token, email }));
    } catch (err) {
      dispatch(reset());
    }
  }, [dispatch]);

  return (
    <View className=" bg-blue-100 flex-1">
      {allowAccess ? (
        <Slot></Slot>
      ) : (
        <ScrollView>
          <View className="flex justify-center items-center text-center mt-100">
            <Text className="mt-56 items-center">You need to sign in</Text>
            <Pressable
              className="mt-2 p-4 bg-blue-400 rounded-md"
              onPress={() => router.push("/signin")}
            >
              <Text className="text-white">Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      )}
      {/* Nav bar below */}
      <MyNavBar />
    </View>
  );
}
