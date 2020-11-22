
import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, FlatList, StyleSheet } from 'react-native'

import Pedido from '../components/Pedido'

import api from '../services/api'

export default function Orders({ userToken, userId }) {

    const [pedidos, setPedidos] = useState([])
    const [erro, setErro] = useState('')

    // get pedidos do user
    async function getPedidos() {
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
