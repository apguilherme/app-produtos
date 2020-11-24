import React, { useState } from "react"
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function App() {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Modal has been closed.") }} >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={styles.modalText}>Em breve poderá adicionar produtos...</Text>

                        <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => { setModalVisible(!modalVisible) }} >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableHighlight>

                    </View>
                </View>

            </Modal>

            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={styles.btnAdd}>
                <Text style={{ fontSize: 16, color: '#fff' }}>Adicionar produto <FontAwesome5 name={'plus-circle'} /></Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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
})
