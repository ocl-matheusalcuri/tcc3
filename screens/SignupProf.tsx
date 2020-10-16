import React from "react";
import { StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useState } from "react";
        import { AuthContext } from '../contexts/auth';


//@ts-ignore
export default function SignupProf({navigation}) {
  const { signUp, user, type } = React.useContext(AuthContext);

  const [prof, setProf] = useState<any>({ 
    password: "12345", 
    nome: "Professor 1", 
    celular: "(00) 00000-0000", 
    email: "professor1@hotmail.com", 
    nascimento: "00/00/0000", 
    instagram: "professor1", 
    facebook: "profacessor1", 
    cref: "1233456788", 
    foco: "Fortalecimento", 
    especializacao: "Natação", 
    faixaEtaria: "Idosos"
  });

  async function handleSignUp() {
    await signUp(prof, "personal");
    navigation.navigate("Login");
  }

    return (
      <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.texto}>Crie já sua conta e ativa!</Text>
      <TextInput style={styles.input1} placeholder="Nome" />
      <TextInput style={styles.input2} placeholder="Nascimento" />
      <TextInput style={styles.input3} placeholder="Email" />
      <TextInput style={styles.input4} placeholder="Celular" />
      <TextInput style={styles.input6} placeholder="Instagram" />
      <TextInput style={styles.input7} placeholder="Facebook" />
      <TextInput style={styles.input5} placeholder="CREF" />
      <TextInput secureTextEntry={true} style={styles.input5} placeholder="Senha" />
      <View style={styles.picker}>
      <RNPickerSelect
            placeholder={{label:"Digite sua especialização...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker2}>
      <RNPickerSelect
            placeholder={{label:"Selecione sua Faixa Etária de Atendimento...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <View style={styles.picker3}>
      <RNPickerSelect
            placeholder={{label:"Selecione o foco dos seus treinos...",value:null,inputLabel:null}}
            onValueChange={(value) => console.log(value)}
            items={[
                { label: 'Emagrecer', value: 'Emagrecer' },
                { label: 'Ganhar massa', value: 'Ganhar massa' },
                { label: 'Físico', value: 'Físico' },]}/>
      </View>
      <TouchableOpacity style={styles.botao}  onPress={() => navigation.navigate("Login")}><Text style={styles.textbt}>Criar Conta</Text></TouchableOpacity>
      <TouchableOpacity style={styles.botao2} onPress={() => navigation.navigate("Login")}><Text style={styles.textbt}>Voltar para Login</Text></TouchableOpacity>
    </View>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'orange',
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  opcao: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  logo: {
    width: 250,
    height: 250,
    alignItems: 'center',
    marginTop: -150,
    marginBottom: 10,
  },
  input1: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'stretch',
    marginLeft: 30,
  },
  input2: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: -38,
    marginRight: 30,
  },
  input3: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 30,
  },
  input4: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: -39,
    marginRight: 30,
  },
  input6: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 30,
  },
  input7: {
    padding: 10,
    width: 170,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'flex-end',
    marginTop: -39,
    marginRight: 30,
  },
  input5: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 14,
    marginBottom: 3,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'gray',
    paddingRight: 30, 
    fontWeight: 'bold',
  },
   picker: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
    color:'gray',
    marginBottom: -60
    },
  picker2: {
      padding: 10,
      width: 270,
      backgroundColor: '#808080',
      fontSize: 16,
      fontWeight: 'bold',
      borderRadius: 3,
      alignSelf: 'center',
      marginTop: 75,
      color:'gray',
      marginBottom: -60
      },  
  picker3: {
    padding: 10,
    width: 270,
    backgroundColor: '#808080',
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 75,
    color:'gray',
    marginBottom: -60
    },
  texto: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: -100,
    justifyContent: 'flex-end'
  },
  botao: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 200,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -100,
  },  
  botao2: {
    width: 300,
    height: 40,
    backgroundColor: '#FF8C00',
    marginTop: 110,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: -100,
  }, 
    textbt: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  });