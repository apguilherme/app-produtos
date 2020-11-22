import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from './src/pages/Login'
import Home from './src/pages/Home'
import Orders from './src/pages/Orders'
import Profile from './src/pages/Profile'

export default function App() {

  const Tab = createBottomTabNavigator()

  const [userToken, setUserToken] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  let getToken = async () => {
    try {
      if (userToken.auth && userToken.token.length > 0) { 
        setIsLogged(true) 
      }
      else{
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

  return (
    <>
      {
        <NavigationContainer>
          <Tab.Navigator>
            {
              !isLogged &&
              <Tab.Screen name="Login" component={() => <Login setUserToken={setUserToken} />} />
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
        </NavigationContainer>
      }
    </>
  )
}
