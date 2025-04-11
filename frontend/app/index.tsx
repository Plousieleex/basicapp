import { Text, View, Button } from "react-native";
import {useRouter, useNavigation} from 'expo-router';
import {useLayoutEffect} from "react";

export default function Index() {
    const router = useRouter();
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Welcome',
            headerTitleAlign: 'center',
        });
    }, [navigation]);
    const handleLogin = () => {
        router.push('/Screens/LoginScreen')
    }
    const handleRegister = () => {
        router.push('/Screens/RegisterScreen')
    }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Login" onPress={handleLogin}/>
        <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
