import React, { useState, useEffect } from "react"
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default function ModalForm(props) {

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <View>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { Alert.alert("Clique em fechar.") }} >

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        {props.children}

                        <TouchableHighlight style={{ ...styles.openButton, backgroundColor: "#2196F3" }} onPress={() => { setModalVisible(!modalVisible) }} >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </TouchableHighlight>

                    </View>
                </View>

            </Modal>

            <TouchableOpacity onPress={() => { setModalVisible(true) }} style={props.btnStyle}>
                <Text style={props.btnTxtStyle}>{props.btnTxt} <FontAwesome5 name={props.icon} /></Text>
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
        elevation: 2,
        borderRadius: 5,
        padding: 12,
        marginBottom: 0,
        marginTop: 15,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})
