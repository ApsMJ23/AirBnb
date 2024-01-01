import {View} from "react-native";
import React, {useMemo, useState} from "react";
import {Stack} from "expo-router";
import ExploreHeader from "../../components/ExploreHeader";
import Listings from "../../components/Listings";
import listingsData from "../../assets/Data/airbnb-listings.json"
import ListingsMap from "../../components/ListingsMap";
import ListingsDataGeo from '../../assets/Data/airbnb-listings.geo.json'
import ListingsBottomSheet from "../../components/ListingsBottomSheet";

const Explore = () => {
    const [category,setCategory]=useState<string>('Tiny homes');
    const items = useMemo(()=>listingsData as any,[])
    const geoItems = useMemo(()=>ListingsDataGeo as any,[])

    const onDataChanged=(category:string)=>{
        console.log(category);
        setCategory(category);
    }
    return(
        <View style={{flex:1,marginTop:80}}>
            <Stack.Screen options={{
                header:()=><ExploreHeader onCategoryChanged={onDataChanged} />
            }}/>
            {/*<Listings listings={items} category={category}/>*/}
            <ListingsMap listings={geoItems}/>
            <ListingsBottomSheet listings={items} category={category}/>
        </View>
    )
}

export default Explore;