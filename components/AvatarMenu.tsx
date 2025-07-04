import { Image, TouchableOpacity } from "react-native";

export default function AvatarMenu() {
  return (
    <TouchableOpacity
      onPress={() => {
        /* open profile modal */
      }}
    >
      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={{ width: 36, height: 36, borderRadius: 18 }}
      />
    </TouchableOpacity>
  );
}
