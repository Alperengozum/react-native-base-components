import AsyncStorage from "@react-native-async-storage/async-storage";

export const setStorage = async (key:string,value:any) : Promise<void> =>{
  await AsyncStorage.setItem(key, JSON.stringify(value));
}
export const getStorage = async (key:string) =>{
  const data = await AsyncStorage.getItem(key);
  if(typeof data === "undefined" || data === null){
    return undefined;
  }
  if(typeof data === "string"){
    return JSON.parse(data);
  }
}
export const removeStorage = async (key:string) =>{
  await AsyncStorage.removeItem(key)
}
