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

const CreateEmployeeScreen = ({navigation}) => {
    const [firstname, setfirstname] = React.useState('')
    const [lastname, setlastname] = React.useState('')
    const [contact, setcontact] = React.useState('')
    const [department, setdepartment] = React.useState('')
    const [email, setemail] = React.useState('')
    
    const auth = React.useContext(Token)
    const createEmployee = () => {
        axios.post('/employees/new', {email, department, contact, lastname, firstname}, {headers: {'x-auth-token': auth.token}})
        .then(({status, data}) => {
            if (status === 200) {
                window.alert(data.message)
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
                            <TextInput placeholder="First Name" style={styles.textInput} value={firstname} onChange={(e) => setfirstname(e.target.value)} />
                            <TextInput placeholder="Last Name" style={styles.textInput} value={lastname} onChange={(e) => setlastname(e.target.value)} />
                            <TextInput placeholder="Email" style={styles.textInput} value={email} onChange={(e) => setemail(e.target.value)} />
                            <TextInput placeholder="Contact Number" style={styles.textInput} value={contact} onChange={(e) => setcontact(e.target.value)} />
                            <TextInput placeholder="Department" style={styles.textInput} value={department} onChange={(e) => setdepartment(e.target.value)} />
                        </View>
                        <View style={styles.btnContainer}>
                            <Button title="Submit" onPress={createEmployee} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>
    )
}

export default CreateEmployeeScreen