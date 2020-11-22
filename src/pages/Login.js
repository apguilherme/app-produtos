
import React, { useState } from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'

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

            <TextInput
                style={styles.txtInput}
                autoCapitalize='none'
                autoCompleteType='email'
                placeholder='E-mail'
                onChangeText={text => onChangeEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.txtInput}
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

            {
                erro.length > 0 && 
                <Text>{erro}</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    txtInput: {
        height: 40, borderColor: 'gray', borderWidth: 1, width: '90%', margin: '1%',
    }
})
