import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                <StatusBar translucent backgroundColor='transparent' />
                <View style={{ flex: 1 }}>
                    <ImageBackground style={styles.imageStyle} source={{ uri: charDetails.img }} >
                        <LinearGradient colors={['rgba(0,0,0,.5)', 'rgba(0,0,0,1)']} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }} >
                            <Image style={styles.insideImageStyle}
                                source={{ uri: charDetails.img }} />
                            <Text style={styles.titleStyle}>{charDetails.name} </Text>
                            <Text style={styles.subTitleStyle}>{charDetails.nickname}</Text>
                        </LinearGradient>
                    </ImageBackground>
                </View>
                <View style={{ flex: 0.5, backgroundColor: 'black', paddingHorizontal: 20 }}>
                    <Text style={styles.labelText}>Portrayed</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.valueText}>{charDetails.portrayed}</Text>
                        <Text style={styles.valueText}>{charDetails.birthday + '  '} <Icon name="gift" size={20} color={'white'} /></Text>
                    </View>

                    <Text style={[styles.labelText, { marginTop: 20 }]}>Occupation</Text>
                    <View>
                        {charDetails ? charDetails.occupation.map((item, i) => {
                            return (
                                <Text key={i} style={styles.valueText}>{item}</Text>
                            )
                        }) : null}
                    </View>
                </View>
            </View>
        )
    }
}

export default CharDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageStyle: {
        flex: 1,
        height: '100%',
        width: '100%'
    },
    insideImageStyle: {
        height: 220,
        width: '40%',
        borderRadius: 10
    },
    titleStyle: {
        color: 'white',
        paddingTop: 10,
        fontFamily: 'Roboto-Bold',
        fontSize: 30,
        marginTop: 30
    },
    subTitleStyle: {
        color: 'white',
        fontFamily: 'Roboto-Light',
        marginBottom: 30
    },
    labelText: {
        color: '#18CA75',
        fontFamily: 'Roboto-Bold'
    },
    valueText: {
        color: 'white',
        fontFamily: 'Roboto-Light'
    }
});