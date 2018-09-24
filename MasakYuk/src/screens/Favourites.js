import React, {Component} from 'react';
import { Container, Text, Content, Icon, Spinner } from 'native-base'
import { FlatList, AsyncStorage } from 'react-native'
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
        AsyncStorage.getItem('uid')
        .then(uid => {
            console.log('get uid asyncstorage', uid)
            this.props.getUser(uid)
        })
    }

    // componentDidUpdate() {}
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
                        renderItem={({item}) => <RecipeDetail remove={true} navigation={navigation} recipe={item} />}
                        keyExtractor={(item ,index) => String(index)} />
                }
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)

