import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { AuthContext } from '../../contexts/auth';
import api from '../../services/api';

import { styles } from '../styles';


import { SERVER_URL } from '../../url'
import Dialog from "react-native-dialog";

//@ts-ignore
export default function CliRelation({navigation}) {
  const { signOut, user, refreshUser } = React.useContext(AuthContext);

  const [imgBase64, setImgBase64] = useState<any>();
  const [treino, setTreino] = useState<any>();
  const [personal, setPersonal] = useState<any>();
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(false);  
  const [error, setError] = useState("");


  const array = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'}]
  const array2 = [{label: 'Acre', value: 'Acre'},{label: 'Alagoas', value: 'Alagoas'},{label: 'Amapa', value: 'Amapa'},{label: 'Amazonas', value: 'Amazonas'},{label: 'Bahia', value: 'Bahia'},{label: 'Ceara', value: 'Ceara'},{label: 'Distrito Federal', value: 'Distrito Federal'},{label: 'Espirito Santo', value: 'Espirito Santo'},{label: 'Goias', value: 'Goias'},{label: 'Maranhao', value: 'Maranhao'},{label: 'Mato Grosso', value: 'Mato Grosso'},{label: 'Mato Grosso do Sul', value: 'Mato Grosso do Sul'},{label: 'Minas Gerais', value: 'Minas Gerais'},{label: 'Para', value: 'Para'},{label: 'Paraiba', value: 'Paraiba'},{label: 'Parana', value: 'Parana'},{label: 'Pernambuco', value: 'Pernambuco'},{label: 'Piaui', value: 'Piaui'},{label: 'Rio de Janeiro', value: 'Rio de Janeiro'},{label: 'Rio Grande do Norte', value: 'Rio Grande do Norte'},{label: 'Rio Grande do Sul', value: 'Rio Grande do Sul'},{label: 'Rondonia', value: 'Rondonia'},{label: 'Roraima', value: 'Roraima'},{label: 'Santa Catarina', value: 'Santa Catarina'},{label: 'Sao Paulo', value: 'Sao Paulo'},{label: 'Sergipe', value: 'Sergipe'},{label: 'Tocantins', value: 'Tocantins'}]

  async function getTreino() {
    const response = await api.get(`${SERVER_URL}/api/treinoModel/getTreinosByAlunoId`, {
      params: {
        alunoId: user?._id
      }
    });
    setTreino(response.data);
  };

  async function getPersonal() {
    const response = await api.get(`${SERVER_URL}/api/personalModel/getById`, {
      params: {
        userId: user?.personalId
      }
    });
    setPersonal(response.data)
  }

  useEffect(() => {
    getTreino();
    getPersonal();
  }, [navigation]);

  const handleCancel = () => {
    setVisible(false);
    setSenha("");
  };

  const handleDelete = () => {
    api.put(`${SERVER_URL}/api/alunoModel/deletarRelation`, {
      body: {
        alunoId: user?._id, 
        senha, 
      }
    }).then(async response => {
      if(response.data.error) {
        setError(response.data.mensagem)
      } else {
        await refreshUser(user?._id)
      }
      setVisible(false);
      setTimeout(function(){ setError(""); }, 3000);
      setSenha("");
    })
  };

    return personal && personal._id ? (
        <View style={{...styles.container, ...styles.bg}}>
              {!!error && <Text style={{...styles.error}}>{error}</Text>}
              <Dialog.Container visible={visible}>
                <Dialog.Title>Desfazer relação com personal</Dialog.Title>
                <Dialog.Description>
                  Você tem certeza de que deseja cancelar sua relação com o personal?
                </Dialog.Description>
                <Dialog.Input style={Platform.OS === 'android' ? {borderWidth: 1, borderColor: "gray", borderRadius: 4, marginTop: 5, height: 30, paddingHorizontal: 10}: {}} value={senha} placeholder="Digite sua senha para confirmar" secureTextEntry={true} onChangeText={(senha) => setSenha(senha)} />
                <Dialog.Button label="Cancelar" onPress={handleCancel} />
                <Dialog.Button label="Confirmar" onPress={handleDelete} />
            </Dialog.Container>
            <View style={{...styles.bg, ...styles.conjuntoInput, marginBottom: 50}}>
                <View  style={{...styles.bg, ...styles.foto}}>
                  <Image source={{uri: personal?.fotoUrl ? personal?.fotoUrl : `https://uploadofototcc.s3.sa-east-1.amazonaws.com/default.png`, cache:"reload"}} style={{width: 80, height: 80, borderRadius: 400/ 2}}/>
                </View>

                <View style={{...styles.bg, marginLeft: 20}}>
                  <Text style={{...styles.btnText}}>{personal.nome}</Text>
                  <Text style={{marginVertical: 10, ...styles.btnText}}>{personal.email}</Text>
                  <Text style={{...styles.btnText}}>{personal.celular}</Text>
                </View>
              </View>

              <View style={{backgroundColor: "#5A6E03", marginBottom: 20, padding: 10, width: "70%"}}>
              <View style={{backgroundColor: "#5A6E03", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{...styles.btnText}}>Peso:</Text>
                <Text style={{...styles.btnText}}>{user?.peso}</Text>
              </View>
              <View style={{backgroundColor: "#5A6E03", flexDirection: "row", justifyContent: "space-between", marginVertical: 15}}>
                <Text style={{...styles.btnText}}>Massa muscular:</Text>
                <Text style={{...styles.btnText}}>{user?.massaMuscular}</Text>
              </View>
              <View style={{backgroundColor: "#5A6E03", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{...styles.btnText}}>IMC:</Text>
                <Text style={{...styles.btnText}}>{user?.imc}</Text>
              </View>
              </View>

              <View style={{...styles.bg}}>
                <TouchableOpacity style={{...styles.btnCancel}} onPress={() => setVisible(true)}>
                  <Text style={{...styles.btnText}}>Desfazer relação</Text>
                </TouchableOpacity>
              </View>

              <ScrollView>
              <View style={{...styles.agendaCardBg}}>
                {treino?.length > 0 && treino.map((parent: any, index: any) => (
                  <View key={index} style={{...styles.bg}}>
                  <View style={{...styles.agendaCardBg, padding: 10, borderTopRightRadius: 5, borderTopLeftRadius: 5}}>
                    <Text style={{paddingBottom: 15, ...styles.btnText, fontWeight: "bold"}}>{parent.nome}</Text>
                  </View>
                  <View style={{backgroundColor: "#593100", ...styles.profs, padding: 10}}>
                    <Text style={{...styles.btnText}}>Aparelho</Text>
                    <Text style={{marginLeft: 50, ...styles.btnText}}>Série</Text>
                    <Text style={{...styles.btnText}}>Repetições</Text>
                  </View>
                  
                    <View style={{backgroundColor: "#593100", marginBottom: 50, padding: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                      {parent.descricaoTreino.map((value: any, index: any) => (
                        <View key={index} style={{backgroundColor: "#593100", ...styles.profs}}>
                        <View style={{backgroundColor: "#593100"}}>
                          <Text numberOfLines={1} style={{...styles.aparelhoText, ...styles.btnText}}>{value.nome}</Text>
                        </View>
                        <View style={{backgroundColor: "#593100"}}>
                          <Text style={{...styles.btnText, paddingRight: 100}}>{value.serie}</Text>
                        </View>
                        <View style={{backgroundColor: "#593100"}}>
                          <Text style={{...styles.btnText}}>{value.repeticao}</Text>
                        </View>
                      </View>
                      ))}
                    </View>
                </View>
                
                ))}
                
              </View>
              </ScrollView>
              
        </View>
    ) : personal === undefined ? (
        <View style={{...styles.bg, ...styles.container}}/>
      ) : (
        <View style={{...styles.container, ...styles.bg, justifyContent: "center"}}>
          <Text style={{...styles.btnText}}>Você não está associado(a) à nenhum personal.</Text>
          <Text style={{...styles.btnText}}>Encontre algum que lhe agrade cliando no botão abaixo</Text>
          <TouchableOpacity style={{...styles.btnCadastro, marginTop: 50}} onPress={() => navigation.navigate("Pesquisa")}><Text style={{...styles.btnText}}>Pesquisar personal</Text></TouchableOpacity>
        </View>
      )
}

// const styles = StyleSheet.create({
//   bg: {
//     backgroundColor: '#CC8400'
//   },
//   container: {
//     padding: 20,
//     flex: 1,
//     alignItems: 'center',
//   },
//   foto: {
//     alignItems: "center",
//   },
//   profs: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10
//   },
//   itensProf: {
//     marginHorizontal: 40,
//   },
//   conjuntoInput: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   picker: {
//     width: 290, 
//     height: 30, 
//     borderWidth: 1,
//     borderColor: "gray",
//     marginRight: 10,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     color: "#000",
//     marginVertical: 10
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "gray",
//     backgroundColor: "#fff",
//     padding: 0,
//     width: 290,
//     paddingHorizontal: 10,
//     marginVertical: 20,
//     marginRight: 20
//   },
//   btnCadastro: {
//     backgroundColor: "blue",
//     padding: 10,
//     alignItems: "center",
//     marginVertical: 10
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   });