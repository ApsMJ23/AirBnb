import {Button, Text, View} from "react-native";
import {useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";


const Profile = () => {
    const {signOut,isSignedIn} = useAuth();

    const handleSignout = ()=>{
        signOut();
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