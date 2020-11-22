import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default function Pedido({ produto }) {
    return (
        <View >
            <Text>Produto: {produto.id_produto.nomeProduto}</Text>
            <Text>Descrição: {produto.id_produto.descricao}</Text>
            <Text>Qualidade: {produto.id_produto.qualidade}</Text>
            <Text>Preço unitário: {produto.id_produto.valorUnitario}</Text>
            <Text>Endereco: {produto.id_produto.enderecoProduto}</Text>
            <Text>Quatidade pedida: {produto.quantidadePedido}</Text>
            <Text>Data: {produto.dataPedido}</Text>
            <Image style={styles.imagem} source={{ uri: `${produto.id_produto.linkImagem}` }} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagem: {
        width: 50,
        height: 50,
    },
})
