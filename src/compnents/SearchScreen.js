import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Heart from '../../src/assets/icons/HEART.svg';
import Heart_Filled from '../../src/assets/icons/HEART_FILLED.svg';

class SearchScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            allCharacters: ''
        }
    }

    componentDidMount() {

    }

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

    renderItem = ({ item }) => (
        <View style={{ flex: 1 / 2, flexDirection: 'column', marginHorizontal: 10, marginTop: 40, marginBottom: 10 }}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('CharDetails', { charDetails: item })}>
                <Image source={{ uri: item.img }} style={styles.imageStyle} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                    <Text style={styles.titleStyle}>{item.name} </Text>
                    <Text style={styles.subTitleStyle}>{item.nickname}</Text>
                </View>
                <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <Heart width={25} height={25} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    render() {
        const { text, allCharacters } = this.state

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 4 }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ text })}
                            value={text}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={{ backgroundColor: '#18CA75', alignItems: 'center', height: 50, justifyContent: 'center' }} onPress={() => this.searchCharacter()}>
                            <Icon name="search" size={30} color={'white'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 10 }}>
                    {allCharacters ? <FlatList
                        data={allCharacters}
                        numColumns={2}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.char_id}
                    /> : null}
                </View>
            </View>
        )
    }
}

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    imageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 220,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        backgroundColor: '#242424',
        color: 'white'
    },
    titleStyle: {
        color: 'white',
        paddingTop: 10
    },
    subTitleStyle: {
        color: 'white',
    }
});