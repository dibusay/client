import React, { Component } from 'react';
import { FlatList, Alert} from 'react-native'
import { Container, Content, Spinner, Header, Card, CardItem, Body, Text } from 'native-base';
import { connect } from 'react-redux';
import { fetchRecipes} from '../actions/actionCreators';
import RecipeDetail from './RecipeDetail'

class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ""
        }
    }

    componentDidMount(){
        console.log('from recipes screen',this.props.navigation.state.params.ingredients)
        let labelNamesArr = this.props.navigation.state.params.ingredients
        if(!labelNamesArr.length){
           Alert.alert('The picture is unclear. Please take another picture')
           const {navigate} = this.props.navigation
            navigate('Home')
        }else{
            let query = labelNamesArr.join(",")
            this.setState({
                labels: query
            })
            console.log('query==>', query)
            this.props.fetchRecipes(query)
        }
    }

    render() { 
        let recipes = (
            <FlatList
                data={this.props.data}
                renderItem={({item}) =><RecipeDetail navigation={this.props.navigation} recipe={item} />}
                keyExtractor={(item)=> item.uri}
            />
        )
        let labels = (
            <Card>
                <CardItem>
                    <Body>
                        <Text>Keywords: {this.state.labels}</Text>
                    </Body>
                </CardItem>
            </Card>
        )
        return ( 
            <Container>
                <Content>
                    {
                        this.state.labels ?  labels : <Text></Text>
                    }
                    {
                        this.props.loading ?  <Spinner /> : recipes
                    }
                </Content>
            </Container>
        );
    }
}
 
function mapStateToProps(reduxState){
    console.log('Recipes page: reduxState =>', reduxState.recipes)
    return{
        loading: reduxState.recipes.loading,
        error: reduxState.recipes.error,
        data: reduxState.recipes.data,
    }
}
export default connect(mapStateToProps, { fetchRecipes })(Recipes);
