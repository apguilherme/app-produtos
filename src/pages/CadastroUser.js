
import React, { useState } from 'react'
import { Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native'

import api from '../services/api'

export default function CadastroUser() {

    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [nome, onChangeNome] = useState('')
    const [email, onChangeEmail] = useState('')
    const [senha, onChangeSenha] = useState('')
    const [endereco, onChangeEndereco] = useState('')
    const [telefone, onChangeTelefone] = useState('')
    const [cpf, onChangeCpf] = useState('')
    const [cnpj, onChangeCnpj] = useState('')

    // cadastro de usuário
    async function cadastroUser() {
        setErro('')
        setLoading(true)
        await api.post('/auth/user',
            {
                "nomeUser": `${nome}`,
                "password": `${senha}`,
                "enderecoUser": `${endereco}`,
                "email": `${email}`,
                "telefone": `${telefone}`,
                "cpf": `${cpf}`,
                "cnpj": `${cnpj}`
            },
        ).then(dados => {
            setSuccess('Cadastrado com sucesso! Utilize o e-mail e senha cadastrados para fazer login.')
            onChangeNome('')
            onChangeEmail('')
            onChangeSenha('')
            onChangeEndereco('')
            onChangeTelefone('')
            onChangeCpf('')
            onChangeCnpj('')
            setErro('')
        }).catch(err => {
            setErro("Algo deu errado! " + err)
            setSuccess('')
        })
        setLoading(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >

            <Text>Cadastro</Text>

            <TextInput
                style={styles.txtInput}
                placeholder='Nome'
                onChangeText={text => onChangeNome(text)}
                value={nome}
            />

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

            <TextInput
                style={styles.txtInput}
                placeholder='Endereço'
                onChangeText={text => onChangeEndereco(text)}
                value={endereco}
            />

            <TextInput
                style={styles.txtInput}
                placeholder='Telefone'
                onChangeText={text => onChangeTelefone(text)}
                value={telefone}
            />

            <TextInput
                style={styles.txtInput}
                placeholder='CPF'
                onChangeText={text => onChangeCpf(text)}
                value={cpf}
            />

            <TextInput
                style={styles.txtInput}
                placeholder='CNPJ (opcional)'
                onChangeText={text => onChangeCnpj(text)}
                value={cnpj}
            />

            <TouchableOpacity onPress={() => cadastroUser()} style={styles.btn} >
                <Text style={{ fontSize: 16, color: '#fff' }}>Cadastrar</Text>
            </TouchableOpacity>

            {
                loading &&
                <View><ActivityIndicator size="large" color="#FF9052" /></View>
            }

            <Text>{erro.length > 0 && erro}</Text>

            <Text>{success.length > 0 && success}</Text>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    txtInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        margin: '1%',
        borderRadius: 5,
    },
    btn: {
        backgroundColor: "#FF9052",
        padding: 10,
        borderRadius: 5,
        width: '90%',
        alignItems: 'center'
    }
})
