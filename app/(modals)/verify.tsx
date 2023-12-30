import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {defaultStyles} from "../../constants/Styles";
import colors from "../../constants/Colors";
import LottieView from "lottie-react-native";
import {useState} from "react";
import {useSignUp} from "@clerk/clerk-expo";
import {router} from "expo-router";


const Verify = ()=>{
    const [code,setCode] = useState('');
    const {isLoaded,signUp,setActive} = useSignUp();
    const onPressVerify = async()=>{
        if(!isLoaded){
            return;
        }
        try{
            const completeSignUp = await signUp?.attemptEmailAddressVerification({
                code:code
            });
            await setActive({session:completeSignUp?.createdSessionId});
        }catch(err:any){
            alert(err.errors[0].message)
        }finally {
            router.push('/(tabs)/')
        }
    }
    return(
        <View style={[defaultStyles.container,{alignItems:'center',justifyContent:'center',gap:10}]}>
            <View style={{marginTop:-250}}>
            <LottieView
                source={require('../../assets/images/WIP.json')}
                autoPlay
                loop
                style={{width: 250, height: 250}}
            />
            </View>
            <TextInput value={code} onChangeText={setCode} autoFocus={true} inputMode='numeric' placeholder={'Enter verification code'} placeholderTextColor={colors.dark} style={[defaultStyles.inputField,{marginBottom:20,width:300,marginTop:-50}]}/>
            <TouchableOpacity style={[defaultStyles.btn,{width:150}]} onPress={onPressVerify}>
                <Text style={defaultStyles.btnText}>Verify</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Verify;