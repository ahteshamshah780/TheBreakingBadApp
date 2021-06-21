import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, TextInput, Button } from 'react-native';
// import Card from './compnents/Card';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class CharDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            charDetails: ''
        }
    }

    componentDidMount() {
        const charDetails = this.props.navigation.getParam('charDetails')
        this.setState({ charDetails })
    }


    render() {
        const { charDetails } = this.state

        return (
            <View style={styles.container}>
                <Image resizeMode='stretch' style={styles.imageStyle}
                    source={{ uri: charDetails.img }} />

                <View style={{ alignItems: 'center', marginTop: 15 }}>
                    <Text>Name: <Text style={{ color: 'grey' }}>{charDetails.name}</Text></Text>
                    <Text>Birthday: <Text style={{ color: 'grey' }}>{charDetails.birthday}</Text></Text>
                    <Text>Nickname: <Text style={{ color: 'grey' }}>{charDetails.nickname}</Text></Text>
                    <Text>Status: <Text style={{ color: 'grey' }}>{charDetails.status}</Text></Text>
                </View>

            </View>
        )
    }
}

export default CharDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    imageStyle: {
        height: '75%',
        width: '100%',
        borderRadius: 10,
        marginTop: 10
    }
});