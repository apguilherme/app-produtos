import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

import api from '../services/api'

export default function Home() {

    const [products, setProducts] = useState([])
    const [erro, setErro] = useState('')

    // get products
    async function getProducts() {
        await api.get('/produto',
            {
                headers: {
                    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjcwOWNhYzA3N2Y2MTI1YzQwM2E3YSIsImlhdCI6MTYwNTk4ODE5OSwiZXhwIjoxNjA2MDc0NTk5fQ.ZTz8IU_D48MlpFbXs2n4PnYylfIXZJMTLww7FCEl8yo'
                }
            }
        ).then(dados => setProducts(dados.data)).catch(err => setErro(err))
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed</Text>

            {
                products.length > 0 &&
                <View>
                {
                    products.map(produto => <Text key={produto._id}>{produto.nomeProduto} - {produto.descricao}</Text>)
                }
                </View>
            }

            {
                erro.length > 0 &&
                erro
            }

        </View>
    )
}
