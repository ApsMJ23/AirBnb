import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";


const SpecificListing = () => {
    const {id} = useLocalSearchParams<{id:string  }>();
    console.log('Page Id: ', id);
    return(
        <View>
            <Text>
                Specific Listing
            </Text>
        </View>
    )
 }

 export default SpecificListing;