import {FlatList, Image, ListRenderItem, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {Link} from "expo-router";
import {Listing} from "../interfaces/listing";
import {Ionicons} from "@expo/vector-icons";
import Animated, {FadeInLeft, FadeInRight, FadeOutLeft} from "react-native-reanimated";
import {BottomSheetFlatList, BottomSheetFlatListMethods} from "@gorhom/bottom-sheet";
import {defaultStyles} from "../constants/Styles";


interface Props{
    listings: any[];
    category: string;
    refresh:number;
}
const Listings = ({listings:items,category,refresh}:Props) => {
    const [loading,setLoading]=useState<boolean>(false);
    const listRef = React.useRef<BottomSheetFlatListMethods>(null);

    useEffect(() => {
        if(refresh){
            listRef.current?.scrollToOffset({offset:0,animated:true})
        }
    }, [refresh]);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false)
        },300)
    },[category])
    const renderRow:ListRenderItem<Listing>=({item})=>(
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={styles.listing} entering={FadeInRight} exiting={FadeOutLeft}>
                    <Image source={{uri: item.medium_url??'https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg'}} style={styles.image}/>
                    <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
                        <Ionicons name={'heart-outline'} size={24} color={'#000'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:16}}>
                        <Text style={{fontSize:16,fontFamily:'mon-sb'}}>{item.name}</Text>
                        <View style={{flexDirection:'row',gap:4}}>
                            <Ionicons name={'star'} size={16}/>
                            <Text style={{fontFamily:'mon-sb'}}>{item.review_scores_rating/20}</Text>
                        </View>
                    </View>
                    <Text style={{ fontFamily: 'mon' }}>{item.room_type}</Text>
                    <View style={{ flexDirection: 'row', gap: 4 }}>
                        <Text style={{ fontFamily: 'mon-sb' }}>€ {item.price}</Text>
                        <Text style={{ fontFamily: 'mon' }}>night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    )

    return (
        <View style={defaultStyles.container}>
            <BottomSheetFlatList
                ref={listRef}
                data={loading?[]:items} renderItem={renderRow}
                ListHeaderComponent={()=><Text style={styles.info}>{items?.length} Homes</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    listing:{
        padding:16,
        gap:10,
        marginVertical:16,
    },
    image:{
        width:'100%',
        height:300,
        borderRadius:10,
    },
    info:{
        fontFamily:'mon-sb',
        fontSize:16,
        marginTop:4,
        textAlign:"center"
    }
})

export default Listings;