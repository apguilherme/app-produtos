import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'

import Produto from '../components/Produto'

import api from '../services/api'

export default function Home({ userToken, userId }) {

    const [products, setProducts] = useState([])
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    // get products
    async function getProducts() {
        setErro('')
        setLoading(true)
        await api.get('/produto',
            {
                headers: {
                    'x-access-token': `${userToken}`
                }
            }
        ).then(dados => setProducts(dados.data)).catch(err => setErro(err))
        setLoading(false)
    }

    // post pedido de produto para user
    async function postPedido(idProduto) {
        setErro('')
        setLoading(true)
        await api.post('/pedido',
            {
                "id_usuarioComprador": `${userId}`,
                "id_produto": `${idProduto}`,
                "quantidadePedido": "1"
            },
            {
                headers: {
                    'x-access-token': `${userToken}`
                }
            }
        ).then(dados => setErro('')).catch(err => setErro(err))
        setLoading(false)
    }

    useEffect(() => {
        getProducts()
    }, [])

    const renderProduto = ({ item }) => (
        <Produto userId={userId} produto={item} postPedido={postPedido} idProduto={item._id} />
    )

    return (
        <SafeAreaView style={styles.container}>

            {
                loading &&
                <View><ActivityIndicator size="large" color="#FF9052" /></View>
            }

            {
                products.length > 0 &&
                <FlatList
                    data={products}
                    renderItem={renderProduto}
                    keyExtractor={item => item._id}
                />
            }
            {
                erro.length > 0 &&
                <Text>{erro}</Text>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
})
