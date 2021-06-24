import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, StatusBar, Button } from 'react-native';
import Card from './compnents/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addFavourites, removeFavourites } from './actions';
import Heart from '../src/assets/icons/HEART.svg';
import Heart_Filled from '../src/assets/icons/HEART_FILLED.svg';

class BreakingBadChars extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'The Breaking Bad',
        headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
        headerStyle: {
            backgroundColor: 'black'
        },
        headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.navigate('SearchScreen')}>
                    <Icon name="search" type={'FontAwesome'} size={25} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={{ padding: 10, marginRight: 10 }} onPress={() => navigation.navigate('FavouriteList')}>
                    <Heart_Filled width={25} height={25} />
                </TouchableOpacity>
            </View>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            allCharacters: '',
            favourite_ids: [],
            text: ''
        }
    }

    componentDidMount() {
        this.getAllCharacters()
    }

    getAllCharacters = () => {
        fetch('https://www.breakingbadapi.com/api/characters', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let updatedJson = []
                responseJson.map((item) => {
                    item.isFavourite = false
                    updatedJson.push(item)
                })
                console.log('updatedJson', updatedJson[0])

                this.setState({ allCharacters: updatedJson })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    addToFavourite = (item) => {
        if (!this.props.favourites.some(e => e.id === item.char_id)) {
            this.props.dispatch(addFavourites(item))
        } else {
            let id = item.char_id
            this.props.dispatch(removeFavourites(id))
        }
    }

    renderItem = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'column', marginHorizontal: 10, marginTop: 40, marginBottom: 10 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('CharDetails', { charDetails: item })}>
                <Image source={{ uri: item.img }} style={styles.imageStyle} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                    <Text style={styles.titleStyle}>{item.name} </Text>
                    <Text style={styles.subTitleStyle}>{item.nickname}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.addToFavourite(item)}>
                        {(this.props.favourites.some(e => e.id === item.char_id)) ? <Heart_Filled width={25} height={25} /> : <Heart width={25} height={25} />}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    render() {
        const { allCharacters, text } = this.state
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="black" barStyle={'light-content'} />
                {allCharacters ? <FlatList
                    data={allCharacters}
                    numColumns={2}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.char_id}
                /> : null}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    favourites: state.favourites
})

export default connect(mapStateToProps)(BreakingBadChars);

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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    titleStyle: {
        color: 'white',
        paddingTop: 10,
        fontFamily: 'Roboto-Bold'
    },
    subTitleStyle: {
        color: 'white',
        fontFamily: 'Roboto-Light'
    }
});