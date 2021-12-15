import React from 'react'
import {
    Button,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native'
import axios from '../lib/axios'
import { Token } from '../lib/contexts/Token'
import { styles } from '../lib/styles/styles'

const RegisterScreen = ({navigation}) => {
    const [name, setname] = React.useState('')
    const [username, setusername] = React.useState('')
    const [password, setpassword] = React.useState('')
    const [email, setemail] = React.useState('')

    const auth = React.useContext(Token)

    const registerUser = () => {
        axios.post('/auth/register', {email, username, name, password})
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
                            <TextInput placeholder="Name" style={styles.textInput} value={name} onChange={(e) => setname(e.target.value)} />
                            <TextInput placeholder="Username" style={styles.textInput} value={username} onChange={(e) => setusername(e.target.value)} />
                            <TextInput placeholder="Email" style={styles.textInput} value={email} onChange={(e) => setemail(e.target.value)} />
                            <TextInput placeholder="Password" style={styles.textInput} value={password} onChange={(e) => setpassword(e.target.value)} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title="Submit" onPress={registerUser} />
                            <Button title="Login"  onPress={() => navigation.navigate('Login')} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>

    )
}

export default RegisterScreen

