
import React, { useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

import api from '../services/api'

export default function Login({ setUserToken }) {

    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, onChangeEmail] = useState('')
    const [senha, onChangeSenha] = useState('')

    // login
    async function loginUser() {
        setErro('')
        setLoading(true)
        await api.post('/auth/login',
            {
                "email": `${email}`,
                "password": `${senha}`
            },
        ).then(dados => {
            setUserToken(dados.data)
        }).catch(err => setErro(err.response.data.message))
        setLoading(false)
    }

    return (
        <View style={styles.container}>
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

            <TouchableOpacity onPress={() => loginUser()} style={styles.btn} >
                <Text style={{ fontSize: 16, color: '#fff' }}>Entrar</Text>
            </TouchableOpacity>

            {
                loading &&
                <View><ActivityIndicator size="large" color="#FF9052" /></View>
            }

            {
                erro.length > 0 && 
                <Text>{erro}</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 10
    },
    txtInput: {
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1, 
        width: '90%', 
        margin: '1%',
        borderRadius: 5,
    },
    btn:{
        backgroundColor: "#FF9052",
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center'
    }
})
