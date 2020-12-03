import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet, TouchableOpacity, Picker, TextInput } from 'react-native'

import moment from 'moment'
import 'moment/locale/pt'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import ModalForm from './ModalForm'

export default function Produto({ userId, produto, idProduto, delProd, postPedido, editProd, categorias }) {

    // states para editar produto
    const [nomeProduto, setNomeProduto] = useState(produto.nomeProduto)
    const [unidadeMedida, setUnidadeMedida] = useState(produto.unidadeMedida)
    const [qualidade, setQualidade] = useState(produto.qualidade)
    const [descricao, setDescricao] = useState(produto.descricao)
    const [valorUnitario, setValorUnitario] = useState(produto.valorUnitario)
    const [enderecoProduto, setEnderecoProduto] = useState(produto.enderecoProduto)
    const [id_categoriaProduto, setId_categoriaProduto] = useState(produto.id_categoriaProduto._id)
    const [linkImagem, setLinkImagem] = useState(produto.linkImagem)
    const [quantidadeEstoque, setQuantidadeEstoque] = useState(produto.quantidadeEstoque)

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
                        <Text style={{ fontWeight: 'bold' }}>R$ {parseFloat(produto.valorUnitario).toFixed(2)}</Text>
                        <Text>{produto.id_categoriaProduto.nomeCategoriaProduto}</Text>
                        <Text>Em estoque: {produto.quantidadeEstoque} {produto.unidadeMedida}</Text>
                    </View>

                </View>

                <Text style={{ color: 'gray', flexShrink: 1 }}>Descrição: {produto.descricao}</Text>

            </View>

            <Text style={styles.divider}></Text>

            <View style={styles.group}>

                {
                    produto.id_usuarioVendedor._id === userId && editProd && // pode editar
                    <ModalForm
                        btnStyle={styles.btnEdit}
                        btnTxt={'Editar'}
                        btnTxtStyle={styles.btnText}
                        icon={'edit'}
                    >

                        <>
                            <Text style={{...styles.modalText, fontWeight: 'bold', fontSize: 20}}>Editar produto</Text>

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Nome do produto'
                                onChangeText={text => setNomeProduto(text)}
                                value={nomeProduto}
                            />

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Descrição'
                                onChangeText={text => setDescricao(text)}
                                value={descricao}
                            />

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Valor unitário: R$ 4,00'
                                onChangeText={text => setValorUnitario(text)}
                                value={valorUnitario}
                            />

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Endereço do produto'
                                onChangeText={text => setEnderecoProduto(text)}
                                value={enderecoProduto}
                            />

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Link para a imagem'
                                onChangeText={text => setLinkImagem(text)}
                                value={linkImagem}
                            />

                            <TextInput
                                style={styles.txtInput}
                                placeholder='Quantidade em estoque'
                                onChangeText={text => setQuantidadeEstoque(text)}
                                value={String(quantidadeEstoque)}
                            />

                            <Picker
                                selectedValue={unidadeMedida}
                                style={{ height: 50, width: '90%' }}
                                onValueChange={(itemValue, itemIndex) => setUnidadeMedida(itemValue)}
                            >
                                <Picker.Item label='Unidade...' value='' />
                                <Picker.Item label='unidades' value='unidades' />
                                <Picker.Item label='kg' value='kg' />
                                <Picker.Item label='cm' value='cm' />
                                <Picker.Item label='m' value='m' />
                                <Picker.Item label='m2' value='m2' />
                                <Picker.Item label='m3' value='m3' />
                            </Picker>

                            <Picker
                                selectedValue={qualidade}
                                style={{ height: 50, width: '90%' }}
                                onValueChange={(itemValue, itemIndex) => setQualidade(itemValue)}
                            >
                                <Picker.Item label='Qualidade...' value='' />
                                <Picker.Item label='Novo' value='Novo' />
                                <Picker.Item label='Semi-novo' value='Semi-novo' />
                                <Picker.Item label='Com defeito' value='Com defeito' />
                                <Picker.Item label='Quebrado' value='Quebrado' />
                                <Picker.Item label='Velho' value='Velho' />
                            </Picker>

                            <Picker
                                selectedValue={id_categoriaProduto}
                                style={{ height: 50, width: '90%' }}
                                onValueChange={(itemValue, itemIndex) => setId_categoriaProduto(itemValue)}
                            >
                                <Picker.Item label='Categoria...' value='' />
                                {
                                    categorias.map(item => (
                                        <Picker.Item label={`${item.nomeCategoriaProduto}`} value={`${item._id}`} />
                                    ))
                                }
                            </Picker>

                            <TouchableOpacity onPress={() => editProd({ nomeProduto, unidadeMedida, qualidade, descricao, valorUnitario, enderecoProduto, id_categoriaProduto, linkImagem, quantidadeEstoque, userId, idProduto })} style={styles.btnAdd}>
                                <Text style={{ fontSize: 16, color: 'white' }}>Salvar  <FontAwesome5 name={'edit'} /></Text>
                            </TouchableOpacity>

                        </>

                    </ModalForm>
                }
                {
                    produto.id_usuarioVendedor._id === userId && delProd && // pode apagar anuncio
                    <TouchableOpacity onPress={() => delProd(idProduto)} style={styles.btnDel}>
                        <Text style={styles.btnText}>Apagar anuncio <FontAwesome5 name={'trash-alt'} /></Text>
                    </TouchableOpacity>
                }
                {
                    produto.id_usuarioVendedor._id !== userId && postPedido && // pode add ao carrinho
                    <TouchableOpacity onPress={() => postPedido(idProduto)} style={styles.btnAdd}>
                        <Text style={styles.btnText}>Adicionar ao carrinho <FontAwesome5 name={'cart-arrow-down'} /></Text>
                    </TouchableOpacity>
                }

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
    btnAdd: {
        borderRadius: 5,
        backgroundColor: '#4682B4',
        padding: 10,
        marginBottom: 10,
    },
    btnEdit: {
        borderRadius: 5,
        backgroundColor: 'gray',
        padding: 10,
        marginBottom: 10,
    },
    btnDel: {
        borderRadius: 5,
        backgroundColor: 'red',
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
    txtInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '90%',
        margin: '1%',
        borderRadius: 5,
    },
})
