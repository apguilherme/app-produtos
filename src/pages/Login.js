
import React, { useState } from 'react'
import { Text, View, TextInput, Button } from 'react-native'

import api from '../services/api'

export default function Login({ setUserToken }) {

    const [erro, setErro] = useState('')
    const [email, onChangeEmail] = useState('')
    const [senha, onChangeSenha] = useState('')

    // login
    async function loginUser() {
        await api.post('/auth/login',
            {
                "email": `${email}`,
                "password": `${senha}`
            },
        ).then(dados => {
            setUserToken(dados.data)
            setErro('')
        }).catch(err => setErro(err.response.data.message))
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Login</Text>

            <Text>Email</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '90%' }}
                autoCapitalize='none'
                autoCompleteType='email'
                placeholder='E-mail'
                onChangeText={text => onChangeEmail(text)}
                value={email}
            />

            <Text>Senha</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: '90%' }}
                autoCapitalize='none'
                autoCompleteType='password'
                placeholder='Senha'
                secureTextEntry={true}
                onChangeText={text => onChangeSenha(text)}
                value={senha}
            />

            <Button
                onPress={loginUser}
                title="Entrar"
                color="#FF9052"
                accessibilityLabel="Entrar"
            />

            <Text>{erro.length > 0 && erro}</Text>

        </View>
    )
}
