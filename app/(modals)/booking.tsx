import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import Animated, {FadeIn, FadeOut, SlideInDown} from "react-native-reanimated";
import {defaultStyles} from "../../constants/Styles";
import {useRouter} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {useState} from "react";
import Colors from "../../constants/Colors";
import {places} from "../../assets/Data/places";
// @ts-ignore
import DatePicker from "react-native-modern-datepicker";


const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const guestsGropus = [
    {
        name: 'Adults',
        text: 'Ages 13 or above',
        count: 0,
    },
    {
        name: 'Children',
        text: 'Ages 2-12',
        count: 0,
    },
    {
        name: 'Infants',
        text: 'Under 2',
        count: 0,
    },
    {
        name: 'Pets',
        text: 'Pets allowed',
        count: 0,
    },
];

const Booking = () => {
    const router = useRouter();
    const [openCard, setOpenCard] = useState(0);
    const [selectedPlace, setSelectedPlace] = useState(0);
    const [guests, setGuests] = useState(guestsGropus);
    const tody = new Date().toISOString().substring(0, 10);

    const onClearAll = () => {
        setSelectedPlace(0);
        setOpenCard(0);
        setGuests(guestsGropus);
    }
    return (
        <BlurView intensity={70} style={styles.container} tint={'light'}>
            {/*Where*/}
            <View style={styles.card}>
                {openCard !== 0 && (
                    <AnimatedTouchableOpacity onPress={() => setOpenCard(0)} style={styles.cardPreview}
                                              entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>Where</Text>
                        <Text style={styles.previewDate}>I'm Flexible</Text>
                    </AnimatedTouchableOpacity>
                )}
                {openCard === 0 && (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}> Where To? </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            <View style={styles.searchSection}>
                                <Ionicons style={styles.searchIcon} name={'ios-search'} size={20} color={'#000'}/>
                                <TextInput placeholder={'Search Destinations'} placeholderTextColor={Colors.grey}
                                           style={styles.inputField}/>
                            </View>
                        </Animated.View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 16}}
                                    contentContainerStyle={{gap: 25, paddingLeft: 20, marginBottom: 30}}>
                            {places.map((item, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setSelectedPlace(index)} key={index}>
                                        <Image source={item.img}
                                               style={selectedPlace === index ? styles.placeSelected : styles.place}/>
                                        <Text
                                            style={[{paddingTop: 6}, selectedPlace === index ? {fontFamily: 'mon-sb'} : {fontFamily: 'mon'}]}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </>
                )}
            </View>
            {/*When*/}
            <View style={styles.card}>
                {openCard !== 1 && (
                    <AnimatedTouchableOpacity onPress={() => setOpenCard(1)} style={styles.cardPreview}
                                              entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}

                    >
                        <Text style={styles.previewText}>When</Text>
                        <Text style={styles.previewDate}>Any Week</Text>
                    </AnimatedTouchableOpacity>
                )}
                {openCard === 1 && (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}> When's Your Trip? </Animated.Text>
                        <Animated.View style={styles.cardBody}>
                            <DatePicker
                                current={tody}
                                selected={tody}
                                mode={'Calendar'}
                                options={{
                                    defaultFont: 'mon',
                                    headerFont: 'mon-sb',
                                    borderColor: 'transparent',
                                    mainColor: Colors.primary,
                                }}
                            />
                        </Animated.View>
                    </>
                )}
            </View>
            {/*Who*/}
            <View style={styles.card}>
                {openCard !== 2 && (
                    <AnimatedTouchableOpacity onPress={() => setOpenCard(2)} style={styles.cardPreview}
                                              entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}
                    >
                        <Text style={styles.previewText}>Who</Text>
                        <Text style={styles.previewDate}>Add Guests</Text>
                    </AnimatedTouchableOpacity>
                )}
                {openCard === 2 && (
                    <>
                        <Animated.Text entering={FadeIn} style={styles.cardHeader}> Who's Coming? </Animated.Text>
                        <Animated.View style={[styles.cardBody,{paddingBottom:10}]}>
                            {guests.map((item, index) => {
                                return(
                                    <View key={index} style={[styles.guestItem,index+1<guests.length?styles.itemBorder:null]}>
                                        <View>
                                            <Text style={{fontFamily:'mon-sb',fontSize:14}}>{item.name}</Text>
                                            <Text style={{fontFamily:'mon',fontSize:14,color:Colors.grey}}>{item.text}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',gap:10,alignItems:'center',justifyContent:'center'}}>
                                            <TouchableOpacity onPress={()=>{
                                                const newGuests = [...guests];
                                                newGuests[index].count>0?newGuests[index].count--:0
                                                setGuests(newGuests);
                                            }}>
                                                <Ionicons name={'remove-circle-outline'} size={24} color={guests[index].count>0?Colors.grey:'#cdcdcd'}/>
                                            </TouchableOpacity>
                                            <Text style={{fontFamily:'mon',fontSize:16,textAlign:'center',minWidth:18}}>{item.count}</Text>
                                            <TouchableOpacity onPress={()=>{
                                                const newGuests = [...guests];
                                                newGuests[index].count++;
                                                setGuests(newGuests);
                                            }}>
                                                <Ionicons name={'add-circle-outline'} size={24} color={Colors.grey}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            })}
                        </Animated.View>
                    </>
                )}
            </View>

            {/*Footer*/}
            <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={onClearAll}>
                        <Text style={{fontFamily: 'mon-sb', fontSize: 16, textDecorationLine: 'underline'}}>Clear
                            All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()}
                                      style={[defaultStyles.btn, {paddingRight: 20, paddingLeft: 50}]}>
                        <Ionicons name={'search-outline'} size={24} color={'#fff'} style={defaultStyles.btnIcon}/>
                        <Text style={defaultStyles.btnText}>Search</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        margin: 10,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        gap: 20,
    },
    previewText: {
        fontFamily: 'mon-sb',
        fontSize: 14,
        color: Colors.grey
    },
    previewDate: {
        fontFamily: 'mon-sb',
        fontSize: 18,
        color: Colors.dark
    },
    cardPreview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    },
    cardHeader: {
        fontFamily: 'mon-b',
        fontSize: 24,
        padding: 20
    },
    cardBody: {
        paddingHorizontal: 20,
    },
    searchSection: {
        height: 50,
        flexDirection: 'row',
        borderColor: '#ABABAB',
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        alignItems: 'center',

    },
    inputField: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    searchIcon: {
        padding: 10
    },
    placeSelected: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.primary
    },
    place: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    guestItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical:20,
    },
    itemBorder:{
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:Colors.grey
    }
})

export default Booking;