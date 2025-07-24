import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value: string
  onChangeText:  (text:string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <View className="flex-row items-center rounded-full px-5 py-4 border border-white">
      <Image
        source={icons.search}
        className="size-5 mr-2"
        resizeMode="contain"
        tintColor="#ffffff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 ml-2 text-white"
      ></TextInput>
    </View>
  );
};

export default SearchBar;
