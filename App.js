import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Login from './src/pages/Login'
import CadastroUser from './src/pages/CadastroUser'
import Home from './src/pages/Home'
import Orders from './src/pages/Orders'
import Profile from './src/pages/Profile'

export default function App() {

  const Stack = createStackNavigator()
  const Tab = createBottomTabNavigator()

  const [userToken, setUserToken] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  let getToken = async () => {
    try {
      if (userToken.auth && userToken.token.length > 0) {
        setIsLogged(true)
      }
      else {
        setIsLogged(false)
      }
    }
    catch (error) {
      setIsLogged(false)
    }
  }

  useEffect(() => {
    getToken()
  }, [userToken])

  const tabBottom = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Feed') {
            iconName = 'home'
          }
          else if (route.name === 'Pedidos') {
            iconName = 'shopping-cart'
          }
          else if (route.name === 'Perfil') {
            iconName = 'users'
          }
          else if (route.name === 'Login') {
            iconName = 'sign-in-alt'
          }
          else if (route.name === 'Cadastro') {
            iconName = 'user-plus'
          }
          return <FontAwesome5 name={iconName} />
        },
      })}
      tabBarOptions={{
        activeTintColor: "#FF9052",
        inactiveTintColor: 'gray',
        labelStyle: {fontSize: 15},
        style : {padding: '2%'},
      }}
    >
      {
        !isLogged &&
        <>
          <Tab.Screen name="Login" component={() => <Login setUserToken={setUserToken} />} />
          <Tab.Screen name="Cadastro" component={CadastroUser} />
        </>
      }
      {
        isLogged &&
        <>
          <Tab.Screen name="Feed" component={() => <Home userToken={userToken.token} />} />
          <Tab.Screen name="Pedidos" component={() => <Orders userToken={userToken.token} userId={userToken._id} />} />
          <Tab.Screen name="Perfil" component={() => <Profile setUserToken={setUserToken} userToken={userToken} userId={userToken._id} />} />
        </>
      }
    </Tab.Navigator>
  )

  return (
    <>
      {
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Header"
              options={{ 
                title: 'Sóobra',
                headerStyle: {
                  backgroundColor: "#FF9052",
                },
                headerTitleStyle: {
                  fontWeight: 'bold',
                  color: 'white',
                },
                headerTitleAlign: 'center'
              }}
              component={tabBottom}
            />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  )
}
