import React from 'react'
import { Button } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {Token, TokenProvider} from './lib/contexts/Token'
import LoginScreen from './screens/login'
import RegisterScreen from './screens/register'
import EmployeeDetailsScreen from './screens/employeeDetails'
import EmployeesListScreen from './screens/employeesList'
import ProfileScreen from './screens/profile'
import CreateEmployeeScreen from './screens/createEmployee'
import EditEmployeeScreen from './screens/editEmployee'

const Tab = createBottomTabNavigator()
const EmployeeStack = createNativeStackNavigator()
const AuthStack = createNativeStackNavigator()

const EmployeeStackScreen = () => {
  return (
    <EmployeeStack.Navigator>
      <EmployeeStack.Group>
        <EmployeeStack.Screen name="Employees" component={EmployeesListScreen} options={({navigation, route}) => ({
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddEmployee')}
              title="+ Add"
            />
          ),
        })}/>
      </EmployeeStack.Group>
      <EmployeeStack.Group screenOptions={{presentation: 'modal'}}>
        <EmployeeStack.Screen name="EmployeeDetails" component={EmployeeDetailsScreen} />
        <EmployeeStack.Screen name="AddEmployee" component={CreateEmployeeScreen} />
        <EmployeeStack.Screen name="EditEmployee" component={EditEmployeeScreen} />
      </EmployeeStack.Group>
    </EmployeeStack.Navigator>
  )
}

const Main = () => {
  const auth = React.useContext(Token)

  return (
    <>
    {auth.token ? 
      <>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="EmployeesStack" component={EmployeeStackScreen} options={{tabBarLabel: 'Employees'}} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </>
    :
      <>
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      </>
    }
    </>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <TokenProvider>
        <Main />
      </TokenProvider>
    </NavigationContainer>
  )
}

export default App
