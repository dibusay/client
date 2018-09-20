import React, { Component } from 'react';
import { Text, Card, CardItem, Body } from 'native-base';
import { Image } from 'react-native'

export default class RecipeDetail extends Component {
    render(){
        let recipe = this.props.recipe;
        return(
                <Card> 
                    <CardItem header button onPress={() => alert("Clicked!")}>
                        <Text note>{recipe.label} </Text>       
                    </CardItem>
                    <CardItem cardBody button onPress={() => alert("Clicked!")}>
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
