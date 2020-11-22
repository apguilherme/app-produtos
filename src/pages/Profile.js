
import React, { useState, useEffect } from 'react'
import { Text, View, Button } from 'react-native'

import api from '../services/api'

export default function Profile({ setUserToken, userToken, userId }) {

    const [user, setUser] = useState([])
    const [erro, setErro] = useState('')

    // get user
    async function getUser() {
        await api.get(`/user/${userId}`,
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            setUser(dados.data)
            //console.warn(dados.data)
        }).catch(err => setErro(err))
    }

    useEffect(() => {
        if (userToken.auth){
            getUser()
        }

    }, [])

    // logout
    async function logoutUser(){
        await api.post('/auth/logout')
        .then(dados => {
            setUserToken(dados.data)
            //console.warn(dados.data)
        }).catch(err => setErro(err))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile - {userId}</Text>

            <Text>{user.nomeUser}</Text>
            <Text>{user.enderecoUser}</Text>
            <Text>{user.email}</Text>
            <Text>{user.telefone}</Text>

            <Button
                onPress={() => logoutUser()}
                title="Sair"
                color="#FF9052"
                accessibilityLabel="Sair"
            />

            {
                erro.length > 0 &&
                <Text>{erro}</Text>
            }
        </View>
    )
}
