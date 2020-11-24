import React from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import moment from 'moment'
import 'moment/locale/pt'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function Produto({ produto, postPedido, idProduto }) {

    return (
        <View style={styles.card}>

            <View style={styles.group}>

                <Image style={styles.imagemUser} source={{ uri: 'https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png' }} />

                <View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', }}>Anunciado por {produto.id_usuarioVendedor.nomeUser}</Text>
                    <Text style={{ color: 'gray' }}>{moment(produto.createdAt).calendar()}</Text>
                    <Text style={{ color: 'gray' }}>Em {produto.enderecoProduto}</Text>
                </View>

            </View>

            <Text style={styles.divider}></Text>

            <View style={styles.cardContent}>

                <Text style={styles.title}>
                    {produto.nomeProduto} <Text style={{ color: 'gray' }}> ({produto.qualidade})</Text>
                </Text>

                <View style={styles.group}>

                    <Image style={styles.imagemProduto} source={{ uri: `${produto.linkImagem}` }} />

                    <View>
                        <Text style={{fontWeight: 'bold'}}>R$ {parseFloat(produto.valorUnitario).toFixed(2)}</Text>
                        <Text>{produto.id_categoriaProduto.nomeCategoriaProduto}</Text>
                        <Text>Em estoque: {produto.quantidadeEstoque}</Text>
                    </View>

                </View>

                <Text style={{ color: 'gray', flexShrink: 1 }}>Descrição: {produto.descricao}</Text>

            </View>

            <Text style={styles.divider}></Text>

            <View style={styles.group}>

                <TouchableOpacity onPress={() => console.warn('Detalhes em breve...')} style={styles.btn}>
                    <Text style={styles.btnText}>Detalhes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => postPedido(idProduto)} style={styles.btn}>
                    <Text style={styles.btnText}>Adicionar ao carrinho <FontAwesome5 name={'cart-arrow-down'} /></Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    imagemProduto: {
        width: 120,
        height: 120,
    },
    imagemUser: {
        width: 60,
        height: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D9DDDC',
    },
    card: {
        borderRadius: 10,
        elevation: 1,
        marginHorizontal: 6,
        marginVertical: 8,
        backgroundColor: '#fff',
    },
    cardContent: {
        marginLeft: 15,
        marginRight: 15,
    },
    divider: {
        borderBottomColor: '#D9DDDC',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
    },
    group: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around",
        padding: 5,
        margin: 5,
        marginTop: 15,
    },
    btn: {
        borderRadius: 5,
        backgroundColor: '#4682B4',
        padding: 10,
        marginBottom: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})
