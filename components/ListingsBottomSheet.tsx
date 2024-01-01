import {Listing} from "../interfaces/listing";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import Listings from "./Listings";
import Colors from "../constants/Colors";
import {Ionicons} from "@expo/vector-icons";


interface Props {
    listings: Listing[];
    category: string;
}

const ListingsBottomSheet = ({listings, category}: Props) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const snapPoints = React.useMemo(() => ['10%', '100%'], []);
    const [refresh, setRefresh] = React.useState<number>(0);
    const showMap= () => {
        bottomSheetRef.current?.collapse();
        setRefresh(refresh+1);
    }
    return (
        <BottomSheet
            style={styles.sheetContainer}
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={false}
            handleIndicatorStyle={{backgroundColor: Colors.grey}}
        >
            <View style={{flex: 1}}>
                <Listings listings={listings} category={category} refresh={refresh}/>
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{fontFamily:'mon-sb',color:'#fff'}}>Map</Text>
                        <Ionicons name={'map'} size={20} color={'#fff'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    absoluteBtn:{
        position:'absolute',
        bottom:30,
        width:'100%',
        alignItems:'center'
    },
    btn:{
        backgroundColor:Colors.dark,
        padding:16,
        height:50,
        alignItems:'center',
        flexDirection:'row',
        borderRadius:30,
        gap:3,
    },
    sheetContainer: {
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius:10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    }

})

export default ListingsBottomSheet;