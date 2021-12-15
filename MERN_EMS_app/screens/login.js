import React from 'react'
import {
    Button,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    StyleSheet,
    Platform,
} from 'react-native'
import axios from '../lib/axios'
import { Token } from '../lib/contexts/Token'
import { styles } from '../lib/styles/styles'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const auth = React.useContext(Token)

    const loginUser = () => {
        axios.post('/auth/login', {email, password})
        .then(({status, data}) => {
            if (status === 200) {
                const {token, user} = data.data
                auth.setData(token, user.username, user.name, user.email)
            }
        })
        .catch((err) => {
            window.alert(err?.response?.data?.message)
        })
    }

    return (
        <>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <View>
                            <TextInput placeholder="Email" style={styles.textInput} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <TextInput placeholder="Password" style={styles.textInput} value={password} onChange={(e) => setPassword(e.target.value)} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title="Submit" onPress={loginUser} />
                            <Button title="Register"  onPress={() => navigation.navigate('Register')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>

    )
}

export default LoginScreen