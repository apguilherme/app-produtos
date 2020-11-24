
import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, FlatList, StyleSheet, View, ActivityIndicator } from 'react-native'

import Pedido from '../components/Pedido'

import api from '../services/api'

export default function Orders({ userToken, userId }) {

    const [pedidos, setPedidos] = useState([])
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)

    // get pedidos do user
    async function getPedidos() {
        setErro('')
        setLoading(true)
        await api.get(`/pedido/user/${userId}`,
            {
                headers: {
                    'x-access-token': `${userToken}`
                }
            }
        ).then(dados => {
            setErro('')
            setPedidos(dados.data)
            if (dados.data.length === 0){
                setErro('Nenhum item adicionado ao carrinho.')
            }
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    useEffect(() => {
        getPedidos()
    }, [])

    const renderProduto = ({ item }) => (
        <Pedido produto={item} />
    )

    return (
        <SafeAreaView style={styles.container}>
            
            {
                loading &&
                <View><ActivityIndicator size="large" color="#FF9052" /></View>
            }

            {
                pedidos.length > 0 &&
                <FlatList
                    data={pedidos}
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
