import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, Button } from 'react-native';
import Card from './compnents/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { addFavourites, removeFavourites } from './actions';

class BreakingBadChars extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'The Breaking Bad',
        headerTitleStyle: { color: '#18CA75' },
        headerTintColor: '#18CA75',
        headerRight: () => (
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#18CA75', marginRight: 10 }} onPress={() => navigation.navigate('FavouriteList')}>
                <Text style={{ color: 'white' }}>Favourites</Text>
            </TouchableOpacity>
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
        <Card style={styles.card}>
            <Image resizeMode='stretch' style={styles.imageStyle}
                source={{ uri: item.img }} />
            <View style={{ height: '15%', paddingHorizontal: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.sectionTitle} onPress={() => this.props.navigation.navigate('CharDetails', { charDetails: item })}>{item.name}</Text>
                <TouchableOpacity onPress={() => this.addToFavourite(item)}>
                    <Icon name="heart" size={30} color={this.renderColor(item.char_id)} />
                </TouchableOpacity>
            </View>
        </Card>
    );

    searchCharacter = () => {
        const { text } = this.state

        if (text) {
            fetch(`https://www.breakingbadapi.com/api/characters?name=${text}`, {
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
        } else alert('Please enter text first')
    }

    renderColor = (id) => {
        if (this.props.favourites.some(e => e.id === id)) {
            return 'red'
        } else return 'white'
    }

    render() {
        const { allCharacters, text } = this.state
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', margin: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 4 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ text })}
                            value={text}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ backgroundColor: '#18CA75', alignItems: 'center' }} onPress={() => this.searchCharacter()}>
                            <Icon name="search" size={30} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {allCharacters ? <FlatList
                    data={allCharacters}
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
        paddingHorizontal: 20
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
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
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});