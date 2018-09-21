import React, {Component} from 'react';
import { Container, Text, Content, Icon, Spinner } from 'native-base'
import { FlatList } from 'react-native'
import { connect } from 'react-redux';

import { getUserData } from '../actions/userAction'
import RecipeDetail from '../components/RecipeDetail'

const mapDispatchToProps = dispatch => {
    return {
        getUser: (uid) => {
            dispatch(getUserData(uid))
        }
    }
}

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

class Favourites extends Component{
    componentDidMount() {
        this.props.getUser('23456')
    }
    render(){
        const { users, navigation } = this.props
        return(
            <Container>
                <Content>
                {
                    users.loading
                    ? <Spinner />
                    : users.favourites.length > 0 && 
                      <FlatList
                        data={users.favourites}
                        renderItem={({item}) => <RecipeDetail navigation={this.props.navigation} recipe={item} />}
                        keyExtractor={(item) => item.uri} />
                    // : <Text>{JSON.stringify(users.favourites)}</Text>
                }
                </Content>
                {/* <Text>{JSON.stringify(this.props.users.favourites)}</Text> */}
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)

