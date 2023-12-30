import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useWarmUpBrowser} from "../../hooks/useWarmUpBrowser";
import {defaultStyles} from "../../constants/Styles";
import Colors from "../../constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {useOAuth, useSignIn, useSignUp} from "@clerk/clerk-expo";
import {useEffect, useState} from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { useRouter} from "expo-router";

enum AuthType{
    Google = 'oauth_google',
    Apple = 'oauth_apple',
    Facebook = 'oauth_facebook',
}

const Login=()=>{
    useWarmUpBrowser();
    const router = useRouter();
    const {startOAuthFlow: appleAuth} = useOAuth({strategy:'oauth_apple'});
    const {startOAuthFlow: googleAuth} = useOAuth({strategy:'oauth_google'});
    const {startOAuthFlow:facebookAuth} = useOAuth({strategy:'oauth_facebook'});

    const onSelectAuth = async(type:AuthType)=>{
         const selectedAuth ={
             [AuthType.Apple]:appleAuth,
            [AuthType.Google]:googleAuth,
            [AuthType.Facebook]:facebookAuth,
         }[type];

         try{
             const {createdSessionId,setActive} = await selectedAuth();
             if(createdSessionId){
                 setActive!({session:createdSessionId});
                 router.back();
             }
         }catch (err:any) {
             alert(err.errors[0].message)
         }
    }
    const {signIn,setActive,isLoaded} = useSignIn()
    const {signUp} = useSignUp();
    const [emailAddress,setEmailAddress] = useState('');
    const [password,setPassword] = useState('');
    const [showPasswordInput,setShowPasswordInput] = useState(false);
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(!emailAddress){
            setShowPasswordInput(false)
        }
    },[emailAddress])

    const onSignInPressed = async()=>{
        if(!isLoaded){
            return;
        }
        setLoading(true)
        try{
            const completeSignIn = await signIn?.create({
                identifier:emailAddress,
                password:password
            });
            await setActive({session:completeSignIn?.createdSessionId});
        }catch(err:any){
            if(err.errors[0].code==='form_identifier_not_found'){
                startTheSignUpProcess();
            }
        }finally{
            setLoading(false)
        }
    }
    const clickContinue = ()=>{
        if(!emailAddress)return;
        if(emailAddress!==''&&password!==''){
            console.log('sign in')
            onSignInPressed();
        }
        if(emailAddress){
            setShowPasswordInput(true)
            return;
        }
    }
    const startTheSignUpProcess = async()=>{
        if(!isLoaded){
            return;
        }
        setLoading(true)
        try{
            await signUp?.create({
                emailAddress:emailAddress,
                password:password
            })

            // Sending Verification Email
            await signUp?.prepareEmailAddressVerification({strategy:'email_code'})
        }catch (err:any){
            console.log(err.errors)
        }
        finally {
            router.push('/(modals)/verify')
            setLoading(false)
        }
    }
    return(
        <View style={styles.container}>
            <Spinner visible={loading} />
            <TextInput value={emailAddress} onChangeText={setEmailAddress} autoCapitalize={'none'} placeholderTextColor={Colors.dark} placeholder={'Email'} style={[defaultStyles.inputField,{marginBottom:showPasswordInput?15:30}]}/>
            {showPasswordInput&&<TextInput value={password} onChangeText={setPassword} autoCapitalize={'none'} placeholderTextColor={Colors.dark} placeholder={'Password'} style={[defaultStyles.inputField,{marginBottom:30}]}/>}
            <TouchableOpacity style={[defaultStyles.btn]} onPress={()=>clickContinue()}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={{
                    flex:1,
                    borderBottomColor:'#000',
                    borderBottomWidth:StyleSheet.hairlineWidth,
                }}/>
                <Text style={styles.separator}>or</Text>
                <View style={{
                    flex:1,
                    borderBottomColor:'#000',
                    borderBottomWidth:StyleSheet.hairlineWidth,
                }}/>
            </View>
            <View style={{gap:20}}>
                <TouchableOpacity style={styles.btnOutline}>
                    <Ionicons name="call-outline" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Phone</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onSelectAuth(AuthType.Apple)} style={styles.btnOutline}>
                    <Ionicons name="md-logo-apple" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onSelectAuth(AuthType.Google)} style={styles.btnOutline}>
                    <Ionicons name="md-logo-google" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onSelectAuth(AuthType.Facebook)} style={styles.btnOutline}>
                    <Ionicons name="md-logo-facebook" size={24} style={defaultStyles.btnIcon} />
                    <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:26
    },
    separatorView:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        marginVertical:30,
    },
    separator:{
        color:Colors.grey,
        fontSize:16,
        fontFamily:'mon-sb'
    },
    btnOutline: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 50,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    btnOutlineText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'mon-sb',
    },


})

export default Login;