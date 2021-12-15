import React from 'react'
import {TouchableOpacity, FlatList, SafeAreaView, Text} from 'react-native'
import axios from '../lib/axios'
import { Token } from '../lib/contexts/Token'


const EmployeesListItem = ({item, ...props}) => {
    const {
        authtoken,
        _id,
        employeeID,
        navigation,
        firstname,
        lastname,
    } = item
    const getEmployeeDetails = () => {
        axios.get(`/employees/single/${_id}`
        , {headers: {'x-auth-token': authtoken}}
        )
        .then(({status, ...resdata}) => {
            if (status === 200) {
                navigation.navigate('EmployeeDetails', {...resdata.data.data})
            }
        })
        .catch((err) => {
            window.alert(err?.response?.data?.message)
        })
    }

    return (
        <>
            <TouchableOpacity onPress={getEmployeeDetails} style={{padding: 20,backgroundColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 4, borderBottomColor: '#333'}}>
                <Text style={{fontSize: 22}}>#{employeeID}: {firstname} {lastname}</Text>
            </TouchableOpacity>
        </>
    )
}


const EmployeesListScreen = ({navigation}) => {
    const [maindata, setmaindata] = React.useState([])
    const auth = React.useContext(Token)

    const fetchData = () => {
        axios.get('/employees/all', {headers: {'x-auth-token': auth.token}})
        .then(({status, data}) => {
            if (status === 200) {
                const newData = data.data.map((item) => {
                    item.navigation = navigation
                    item.authtoken = auth.token
                    return item
                })
                setmaindata(newData)
                // console.log(data)
            }
        })
        .catch((err) => {
            window.alert(err?.response?.data?.message)
        })
    }

    React.useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <>
            <SafeAreaView>
                <FlatList
                    data={maindata}
                    renderItem={EmployeesListItem}
                    keyExtractor={(item) => item._id}
                />
            </SafeAreaView>
        </>
    )
}

export default EmployeesListScreen