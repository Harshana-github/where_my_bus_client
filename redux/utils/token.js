import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken = async () => {
  const whereMyBus = await AsyncStorage.getItem("WhereMyBus");
  if (whereMyBus) {
    const parsed = JSON.parse(whereMyBus);
    return parsed.token;
  }
  return null;
};
