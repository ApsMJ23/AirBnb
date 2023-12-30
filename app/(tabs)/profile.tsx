import {Button, Text, View} from "react-native";
import {useAuth} from "@clerk/clerk-expo";
import {Link, router} from "expo-router";


const Profile = () => {
    const {signOut,isSignedIn} = useAuth();

    const handleSignout = async()=>{
        await signOut(()=>router.push('/(tabs)/'));
    }
    return(
        <View>
            <Button title='Log Out' onPress={handleSignout}/>
            {!isSignedIn &&
                <Link href={'/(modals)/login'}><Text>Login</Text></Link>
            }
        </View>
    )
}

export default Profile;