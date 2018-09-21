import React, { Component } from 'react';
import { Text, Card, CardItem, Body } from 'native-base';
import { Image } from 'react-native'

export default class RecipeDetail extends Component {
    handleRedirect = () => {
        const { navigate } = this.props.navigation
        navigate('DetailScreen', { detail: this.props.recipe })
    }
    render(){
        let recipe = this.props.recipe;
        return(
                <Card> 
                    <CardItem header button onPress={this.handleRedirect}>
                        <Text note>{recipe.label} </Text>       
                    </CardItem>
                    <CardItem cardBody button onPress={this.handleRedirect}>
                        <Image source={{uri:recipe.image}} style={{height: 200, width: null, flex: 1}}/>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{recipe.calories.toFixed()} calories · {recipe.ingredientLines.length} ingredients </Text>
                        </Body>
                    </CardItem>
                </Card>
        )
    }

}
