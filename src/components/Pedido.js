import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment'
import 'moment/locale/pt'

export default function Pedido({ produto }) {
    return (
        <View style={styles.card}>

            <View style={styles.cardContent}>

                <View style={styles.group}>

                    <Image style={styles.imagemProduto} source={{ uri: `${produto.id_produto.linkImagem}` }} />

                    <View style={{ marginLeft: 10, }}>
                        <Text style={styles.title}>{produto.id_produto.nomeProduto}</Text>
                        <Text style={styles.subtitle}>Descrição: {produto.id_produto.descricao}</Text>
                        <Text style={styles.subtitle}>Qualidade: {produto.id_produto.qualidade}</Text>
                        <Text style={styles.subtitle}>Preço: R$ {parseFloat(produto.id_produto.valorUnitario).toFixed(2)}</Text>
                        <Text style={styles.subtitle}>Quatidade pedido: {produto.quantidadePedido}</Text>
                        <Text style={styles.subtitle}>Endereco: {produto.id_produto.enderecoProduto}</Text>
                        <Text style={styles.subtitle}>Pedido: {moment(produto.dataPedido).calendar()}</Text>
                    </View>

                </View>

            </View>

            <Text style={styles.divider}></Text>

            <View style={styles.group}>

                <TouchableOpacity onPress={() => console.warn('Remover em breve...')} style={styles.btn}>
                    <Text style={styles.btnText}>Remover <FontAwesome5 name={'trash-alt'} /></Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity onPress={() => console.warn('Finalizar em breve...')} style={styles.btnEnd}>
                <Text style={styles.btnTextEnd}>Finalizar compra <FontAwesome5 name={'shopping-bag'} /></Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    imagemProduto: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    card: {
        borderRadius: 10,
        elevation: 1,
        marginHorizontal: 6,
        marginVertical: 8,
        backgroundColor: '#fff',
    },
    cardContent: {
        marginLeft: 1,
        marginRight: 1,
    },
    divider: {
        borderBottomColor: '#D9DDDC',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    group: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 15,
        margin: 1,
    },
    btn: {
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        marginBottom: 1,
    },
    btnEnd: {
        borderRadius: 5,
        backgroundColor: '#3CB371',
        padding: 15,
        marginBottom: 0,
    },
    btnText: {
        fontSize: 16,
        color: 'red',
    },
    btnTextEnd: {
        fontSize: 16,
        color: '#fff',
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 10,
    },
})
