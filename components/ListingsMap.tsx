import {StyleSheet, Text, View} from "react-native";
import {Marker} from "react-native-maps";
import {defaultStyles} from "../constants/Styles";
import {useRouter} from "expo-router";
import MapView from 'react-native-map-clustering';
import {memo} from "react";

interface Props {
    listings: any
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
};
const ListingsMap = memo(({listings}: Props) => {
    const router = useRouter();
    const onMarketSelected = (event:ListingGeo)=>{
        router.push(`/listing/${event.properties.id}`);
    }
    const renderCluster = (cluster:any)=>{
        const {id,geometry,onPress,properties} = cluster
        const point = properties.point_count;
        return(
            <Marker onPress={onPress} key={id} coordinate={{
                latitude:+geometry.coordinates[1],
                longitude:+geometry.coordinates[0]
            }}>
                <View style={styles.marker}>
                    <Text style={styles.markerText}>{point}</Text>
                </View>
            </Marker>
        )
    }
    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill  }
                showsUserLocation={true}
                showsMyLocationButton={true}
                provider={'google'}
                initialRegion={INITIAL_REGION}
                clusterColor={'#fff'}
                clusterTextColor={'#000'}
                renderCluster={renderCluster}
                clusterFontFamily={'mon-sb'}
            >
                {listings.features.map((item:ListingGeo)=>{
                    return(
                        <Marker onPress={()=>onMarketSelected(item)} key={item.properties.id} coordinate={{
                             latitude:+item.properties.latitude,
                            longitude:+item.properties.longitude
                        }}>
                            <View style={styles.marker}>
                                <Text style={styles.markerText}>€ {item.properties.price }</Text>
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker:{
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText:{
        fontSize:14,
        fontFamily:'mon-sb',
    }
})

export default ListingsMap;