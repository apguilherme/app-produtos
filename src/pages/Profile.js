
import React, { useState, useEffect } from 'react'
import { Text, View, ActivityIndicator, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api'

import ModalForm from '../components/ModalForm'

export default function Profile({ setUserToken, userToken, userId }) {

    const [user, setUser] = useState([])
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    // get user
    async function getUser() {
        setErro('')
        setLoading(true)
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
        setLoading(false)
    }

    // post produto
    async function postProduto() {
        setErro('')
        setLoading(true)
        await api.post('/produto',
            {
                "nomeProduto": "TESTE",
                "unidadeMedida": "m2",
                "qualidade": "Velho",
                "descricao": "teste teste teste teste teste teste teste teste teste teste teste teste teste teste teste ",
                "valorUnitario": "5.90",
                "enderecoProduto": "Itu-SP",
                "id_usuarioVendedor": `${userId}`,
                "id_categoriaProduto": "5fb7026bab39bf161023f556",
                "linkImagem": "https://amgestoroutput.s3.amazonaws.com/jcmateriais/img_produtos/1036-07062521.jpg",
                "quantidadeEstoque": "1"
            },
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {setErro('')}).catch(err => setErro(err))
        setLoading(false)
    }

    useEffect(() => {
        if (userToken.auth) {
            getUser()
        }
    }, [])

    // logout
    async function logoutUser() {
        setErro('')
        setLoading(true)
        await api.post('/auth/logout')
            .then(dados => {
                setUserToken(dados.data)
                //console.warn(dados.data)
            }).catch(err => setErro(err))
        setLoading(false)
    }

    return (

        <SafeAreaView style={styles.container}>

            {
                loading &&
                <View><ActivityIndicator size="large" color="#FF9052" /></View>
            }

            <View style={styles.vertical}>

                <Image style={styles.imagemUser} source={{ uri: 'https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png' }} />

                <Text style={styles.title}>{user.nomeUser}</Text>
                <Text style={{ color: 'gray' }}>{user.email}</Text>

            </View>

            <View style={styles.vertical}>
                <Text>Endereço: {user.enderecoUser}</Text>
                <Text>Telefone: {user.telefone}</Text>
            </View>

            <Text style={styles.divider}></Text>

            <View style={styles.horizontal}>
                <TouchableOpacity onPress={() => logoutUser()} style={styles.btnSair}>
                    <Text style={{ fontSize: 16, color: 'red' }}>Sair <FontAwesome5 name={'sign-out-alt'} /></Text>
                </TouchableOpacity>

                <ModalForm />
            </View>

            {
                erro.length > 0 &&
                <Text>{erro}</Text>
            }

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imagemUser: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D9DDDC',
        marginBottom: 8,
    },
    vertical: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 40,
        padding: 10,
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    divider: {
        borderBottomColor: '#D9DDDC',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
    },
    btnSair: {
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        marginBottom: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})
