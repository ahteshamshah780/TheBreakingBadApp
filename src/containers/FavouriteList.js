import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Card from '../compnents/Card';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { removeFavourites } from '../actions';

const FavouriteList = (props) => {

    const removeFromFavourite = (id) => {
        props.dispatch(removeFavourites(id))
    }

    const renderItem = ({ item }) => (
        <View style={{ flex: 1/2, flexDirection: 'column', marginHorizontal: 10, marginTop: 40, marginBottom: 10 }}>
            <TouchableOpacity activeOpacity={1}>
                <Image source={{ uri: item.img }} style={styles.imageStyle} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                    <Text style={styles.titleStyle}>{item.name} </Text>
                    <Text style={styles.subTitleStyle}>{item.nickname}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => removeFromFavourite(item.id)}>
                        <Icon name="heart" type={'FontAwesome'} size={25} color={'#18CA75'} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={props.favourites}
                numColumns={2}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 10
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 220,
    },
    titleStyle: {
        color: 'white',
        paddingTop: 10
    },
    subTitleStyle: {
        color: 'white'
    }
});

const mapStateToProps = state => ({
    favourites: state.favourites
})

export default connect(mapStateToProps)(FavouriteList)