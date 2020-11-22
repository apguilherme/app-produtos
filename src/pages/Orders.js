
import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

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
            setPedidos(dados.data)
            //console.warn(dados.data)
        }).catch(err => setErro(err))
    }

    useEffect(() => {
        getPedidos()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Orders - {userId}</Text>

            {
                pedidos.map(pedidos => <Text>{pedidos._id} - {pedidos.id_usuarioComprador.nomeUser}</Text>)
            }

            {
                erro.length > 0 &&
                erro
            }
        </View>
    )
}
