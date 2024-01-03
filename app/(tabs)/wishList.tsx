import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAuth} from "@clerk/clerk-expo";
import {defaultStyles} from "../../constants/Styles";
import {useRouter} from "expo-router";


const WishList = () => {
    const {isSignedIn, isLoaded} = useAuth();
    const router = useRouter();
    return (
        <SafeAreaView style={defaultStyles.container}>
            <Text style={styles.HeadingText}>WishLists</Text>
            {!isSignedIn && <View style={styles.loginContainer}>
                <Text style={{fontFamily: 'mon-sb', fontSize: 18}}>Log in to view your wishlists</Text>
                <Text style={{
                    fontFamily: 'mon',
                    fontSize: 14,
                    marginTop: 10,
                    color: '#666'
                }}>
                    You can create, view, or edit wishlists once you've logged in.
                </Text>
                <TouchableOpacity onPress={() => router.push('/(modals)/login')}
                                  style={[defaultStyles.btn, {marginTop: 40, padding: 10, width: 100}]}>
                    <Text style={defaultStyles.btnText}>Log In</Text>
                </TouchableOpacity>
            </View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    HeadingText: {
        fontSize: 26,
        fontFamily: 'mon-b',
        marginLeft: 20,
        marginTop: 50,
    },
    loginContainer: {
        padding: 50,
    }
})

export default WishList;