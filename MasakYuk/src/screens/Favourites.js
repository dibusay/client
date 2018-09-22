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
                        renderItem={({item}) => <RecipeDetail remove={'test'} navigation={navigation} recipe={item} />}
                        keyExtractor={(item ,index) => String(index)} />
                }
                </Content>
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favourites)

