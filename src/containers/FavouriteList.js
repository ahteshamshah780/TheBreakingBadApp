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
        <Card style={styles.card}>
            <Image resizeMode='stretch' style={styles.imageStyle}
                source={{ uri: item.img }} />
            <View style={{ height: '15%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.sectionTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => removeFromFavourite(item.id)}>
                    <Icon name="heart" size={30} color={item.isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={props.favourites}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    card: {
        height: 250,
        width: '100%',
        backgroundColor: '#18CA75',
        marginTop: 15
    },
    imageStyle: {
        height: '85%',
        width: '100%',
        borderRadius: 10
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
    },
});

const mapStateToProps = state => ({
    favourites: state.favourites
})

export default connect(mapStateToProps)(FavouriteList)