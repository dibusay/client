import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { NavigationActions } from 'react-navigation'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View>
                <Text>
                    halaman recipe
                </Text>
                <Text>
                    {/* {JSON.stringify(this.props.navigation.state.params.ingredients)} */}
                </Text>
            </View>
        );
    }
}
 
export default Recipes;