import React from 'react'
import { Button, Text, View } from 'react-native'
import axios from '../lib/axios'
import { Token } from '../lib/contexts/Token'

const EmployeeDetailsScreen = ({navigation, route}) => {
    const {
        contact,
        department,
        email,
        employeeID,
        firstname,
        lastname,
        _id,
    } = route.params

    const auth = React.useContext(Token)
    
    const deleteEmployee = () => {
        axios.delete(`/employees/delete/${_id}`, {headers: {'x-auth-token': auth.token}})
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
            <View style={{padding: 20}}>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>Employee ID: </Text>
                    <Text>#{employeeID}</Text>
                </Text>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>First Name: </Text>
                    <Text>{firstname}</Text>
                </Text>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>Last Name: </Text>
                    <Text>{lastname}</Text>
                </Text>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>Contact Number: </Text>
                    <Text>{contact}</Text>
                </Text>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>Email: </Text>
                    <Text>{email}</Text>
                </Text>
                <Text style={{padding: 18, fontSize: 22}}>
                    <Text style={{fontWeight: 'bold'}}>Department: </Text>
                    <Text>{department}</Text>
                </Text>
                <Button title='Edit' onPress={() => navigation.navigate('EditEmployee', {...route.params})} />
                <Button title='Delete' color={'#fe2917'} onPress={deleteEmployee} />
            </View>
        </>
    )
}

export default EmployeeDetailsScreen