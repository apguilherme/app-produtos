import React, { useState } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import ModalForm from '../components/ModalForm'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import moment from 'moment'
import 'moment/locale/pt'

export default function Pedido({ produto, delPedido, idPedido }) {

    return (
        <View style={styles.card}>

            <View style={styles.cardContent}>

                <View style={styles.group}>

                    <Image style={styles.imagemProduto} source={{ uri: `${produto.id_produto.linkImagem}` }} />

                    <View style={{ marginLeft: 10, flexShrink: 1 }}>
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

            <View style={styles.groupBtn}>

                <TouchableOpacity onPress={() => delPedido(idPedido)} style={styles.btn}>
                    <Text style={styles.btnText}>Remover <FontAwesome5 name={'trash-alt'} /></Text>
                </TouchableOpacity>

                <ModalForm
                    btnStyle={styles.btnEnd}
                    btnTxt={'Finalizar'}
                    btnTxtStyle={styles.btnTxtStyle}
                    icon={'shopping-bag'}
                >
                    <>
                        <Text style={{...styles.modalText, fontWeight: 'bold', fontSize: 20}}>Finalizar compra?</Text>

                        <Image style={styles.imagemProdutoEnd} source={{ uri: `${produto.id_produto.linkImagem}` }} />

                        <View style={styles.group}>

                            <View style={{alignItems: 'flex-start'}}>
                                <Text style={{ ...styles.modalText, fontWeight: 'bold' }}>Produto</Text>
                                <Text style={styles.modalText}>{produto.quantidadePedido} {produto.id_produto.unidadeMedida} x {produto.id_produto.nomeProduto}</Text>
                            </View>

                            <View style={{alignItems: 'flex-start', marginLeft: 25}}>
                                <Text style={{ ...styles.modalText, fontWeight: 'bold' }}>Total</Text>
                                <Text style={styles.modalText}>R$ {parseFloat(produto.id_produto.valorUnitario).toFixed(2)}</Text>
                            </View>

                        </View>

                        <Text style={{...styles.subtitle, marginBottom: 25}}>ID Pedido: {idPedido}</Text>

                        <TouchableOpacity onPress={() => console.warn('Compra efetuada!')} style={styles.btnEnd}>
                            <Text style={styles.btnTextEnd}>Finalizar compra <FontAwesome5 name={'shopping-bag'} /></Text>
                        </TouchableOpacity>
                    </>

                </ModalForm>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    imagemProduto: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    imagemProdutoEnd: {
        width: 60,
        height: 60,
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
    groupBtn: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
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
        padding: 12,
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
        flexShrink: 1,
        margin: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btnTxtStyle: {
        fontSize: 16,
        color: '#fff',
    },
})
