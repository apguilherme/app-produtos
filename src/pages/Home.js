import React, { useState, useEffect } from 'react'
import { SafeAreaView, FlatList, StyleSheet } from 'react-native'

import Produto from '../components/Produto'

import api from '../services/api'

export default function Home({ userToken }) {

    const [products, setProducts] = useState([])
    const [erro, setErro] = useState('')

    // get products
    async function getProducts() {
        await api.get('/produto',
            {
                headers: {
                    'x-access-token': `${userToken}`
                }
            }
        ).then(dados => setProducts(dados.data)).catch(err => setErro(err))
    }

    useEffect(() => {
        getProducts()
    }, [])

    const renderProduto = ({ item }) => (
        <Produto produto={item} />
    )

    return (
        <SafeAreaView style={styles.container}>
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
        padding: 10,
    },
})
