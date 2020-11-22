import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default function Produto({ produto }) {

    // TODO: botão para adicionar produto ao carrinho - post /pedido + token
    /*{
        "id_usuarioComprador": "5fb70ae6c077f6125c403a7c",
        "id_produto": "5fb839128fd15d1aa8eac041",
        "quantidadePedido": "20"
    }*/

    return (
        <View >
            <Text>Produto: {produto.nomeProduto}</Text>
            <Text>Descrição: {produto.descricao}</Text>
            <Text>Qualidade: {produto.qualidade}</Text>
            <Text>Preço unitário: {produto.valorUnitario}</Text>
            <Text>Endereco: {produto.enderecoProduto}</Text>
            <Text>Vendedor: {produto.id_usuarioVendedor.nomeUser}</Text>
            <Text>Categoria: {produto.id_categoriaProduto.nomeCategoriaProduto}</Text>
            <Text>Quantidade estoque: {produto.quantidadeEstoque}</Text>
            <Image style={styles.imagem} source={{ uri: `${produto.linkImagem}` }} />
        </View>
    )
}

const styles = StyleSheet.create({
    imagem: {
        width: 50,
        height: 50,
    },
})
