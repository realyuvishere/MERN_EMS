import React from 'react'
import { View , Text} from 'react-native'
import { Token } from '../lib/contexts/Token'
import { styles } from '../lib/styles/styles'

const ProfileScreen = ({navigation}) => {
    const auth = React.useContext(Token)
    return (
        <>
            <View style={styles.centered}>
                <Text>Username: {auth.username}</Text>
                <Text>Name: {auth.name}</Text>
                <Text>Email: {auth.email}</Text>
            </View>
        </>
    )
}

export default ProfileScreen