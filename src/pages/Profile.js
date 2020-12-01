
import React, { useState, useEffect } from 'react'
import { Text, TextInput, Picker, View, ActivityIndicator, Image, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import api from '../services/api'

import ModalForm from '../components/ModalForm'
import Produto from '../components/Produto'


export default function Profile({ setUserToken, userToken, userId }) {

    const [user, setUser] = useState([])
    const [userProds, setUserProds] = useState([])
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    // states para adicionar produto
    const [nomeProduto, setNomeProduto] = useState('')
    const [unidadeMedida, setUnidadeMedida] = useState('')
    const [qualidade, setQualidade] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valorUnitario, setValorUnitario] = useState('')
    const [enderecoProduto, setEnderecoProduto] = useState('')
    const [id_categoriaProduto, setId_categoriaProduto] = useState('')
    const [linkImagem, setLinkImagem] = useState('')
    const [quantidadeEstoque, setQuantidadeEstoque] = useState('')

    const [categorias, setCategorias] = useState([])

    // get user
    async function getUser() {
        setErro('')
        setLoading(true)
        await api.get(`/user/${userId}`,
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            setUser(dados.data)
            getUserProds()
            getProdCategorias()
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    useEffect(() => {
        if (userToken.auth) {
            getUser()
        }
    }, [])

    // logout
    async function logoutUser() {
        setErro('')
        setLoading(true)
        await api.post('/auth/logout')
            .then(dados => {
                setUserToken(dados.data)
                //console.warn(dados.data)
            }).catch(err => setErro(err))
        setLoading(false)
    }

    // post produto
    async function postProduto() {
        setErro('')
        setLoading(true)
        await api.post('/produto',
            {
                "nomeProduto": `${nomeProduto}`,
                "unidadeMedida": `${unidadeMedida}`,
                "qualidade": `${qualidade}`,
                "descricao": `${descricao}`,
                "valorUnitario": `${valorUnitario}`,
                "enderecoProduto": `${enderecoProduto}`,
                "id_usuarioVendedor": `${userId}`,
                "id_categoriaProduto": `${id_categoriaProduto}`,
                "linkImagem": `${linkImagem}`,
                "quantidadeEstoque": `${quantidadeEstoque}`
            },
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => { getUserProds() }).catch(err => setErro(err))
        setLoading(false)
    }

    // get user produtos
    async function getUserProds() {
        setErro('')
        setLoading(true)
        await api.get(`/produto/user/${userId}`,
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            setUserProds(dados.data)
            if (dados.data.length === 0) {
                setErro('Nenhum produto encontrado.')
            }
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    // get categorias disponíveis dos produtos
    async function getProdCategorias() {
        setErro('')
        setLoading(true)
        await api.get('/categoriaproduto',
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            setCategorias(dados.data)
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    // delete user produto
    async function delProd(idProd) {
        setErro('')
        setLoading(true)
        await api.delete(`/produto/${idProd}`,
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            getUserProds()
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    // edit produto
    async function editProd({nomeProduto, unidadeMedida, qualidade, descricao, valorUnitario, enderecoProduto, id_categoriaProduto, linkImagem, quantidadeEstoque, userId, idProduto}) {
        setErro('')
        setLoading(true)
        await api.put('/produto',
            {
                "unidadeMedida": `${unidadeMedida}`,
                "qualidade": `${qualidade}`,
                "_id": `${idProduto}`,
                "nomeProduto": `${nomeProduto}`,
                "descricao": `${descricao}`,
                "valorUnitario": `${valorUnitario}`,
                "enderecoProduto": `${enderecoProduto}`,
                "id_usuarioVendedor": `${userId}`,
                "id_categoriaProduto": `${id_categoriaProduto}`,
                "linkImagem": `${linkImagem}`,
                "quantidadeEstoque": `${quantidadeEstoque}`,
            },
            {
                headers: {
                    'x-access-token': `${userToken.token}`
                }
            }
        ).then(dados => {
            getUserProds()
            //console.warn(dados.data)
        }).catch(err => setErro(err))
        setLoading(false)
    }

    const renderProduto = ({ item }) => (
        <Produto userId={userId} produto={item} idProduto={item._id} delProd={delProd} editProd={editProd} categorias={categorias} />
    )


    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>

                {
                    loading &&
                    <View><ActivityIndicator size="large" color="#FF9052" /></View>
                }

                {
                    !loading &&
                    <>
                        <View style={styles.vertical}>

                            <Image style={styles.imagemUser} source={{ uri: 'https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png' }} />

                            <Text style={styles.title}>{user.nomeUser}</Text>
                            <Text style={{ color: 'gray' }}>{user.email}</Text>

                        </View>

                        <View style={styles.vertical}>
                            <Text>Endereço: {user.enderecoUser}</Text>
                            <Text>Telefone: {user.telefone}</Text>
                        </View>

                        <View style={styles.horizontal}>

                            <TouchableOpacity onPress={() => logoutUser()} style={styles.btnSair}>
                                <Text style={{ fontSize: 16, color: 'red' }}>Sair <FontAwesome5 name={'sign-out-alt'} /></Text>
                            </TouchableOpacity>

                            <ModalForm
                                btnStyle={styles.btnAdd}
                                btnTxt={'Anunciar'}
                                btnTxtStyle={styles.btnTxtStyle}
                                icon={'plus-circle'}
                            >
                                <>
                                    <Text style={styles.modalText}>Adicionar produto</Text>

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
                                        value={quantidadeEstoque}
                                    />

                                    <Picker
                                        selectedValue={unidadeMedida}
                                        style={{ height: 50, width: '90%' }}
                                        onValueChange={(itemValue, itemIndex) => setUnidadeMedida(itemValue)}
                                    >
                                        <Picker.Item label='Unidade...' value='' />
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

                                    <TouchableOpacity onPress={() => postProduto()} style={styles.btnAdd}>
                                        <Text style={{ fontSize: 16, color: 'white' }}>Adicionar  <FontAwesome5 name={'plus-circle'} /></Text>
                                    </TouchableOpacity>

                                </>

                            </ModalForm>

                        </View>

                        <Text style={styles.divider}></Text>

                        {
                            erro.length > 0 &&
                            <Text>{erro}</Text>
                        }

                        {
                            userProds.length > 0 && // produtos do usuário
                            <>
                                <Text style={{ color: 'gray', fontWeight: 'bold' }}>Meus produtos</Text>
                                <FlatList
                                    data={userProds}
                                    renderItem={renderProduto}
                                    keyExtractor={item => item._id}
                                />
                            </>
                        }
                    </>
                }

            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    imagemUser: {
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#D9DDDC',
        marginBottom: 8,
    },
    vertical: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15,
        padding: 10,
    },
    horizontal: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    divider: {
        borderBottomColor: '#D9DDDC',
        borderBottomWidth: 1,
        margin: 15,
    },
    btnSair: {
        borderRadius: 5,
        borderColor: 'red',
        borderWidth: 1,
        padding: 10,
        marginBottom: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    btnAdd: {
        borderRadius: 5,
        backgroundColor: '#3CB371',
        padding: 10,
        marginBottom: 0,
    },
    btnTxtStyle: {
        fontSize: 16,
        color: '#fff',
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
