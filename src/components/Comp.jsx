import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';

const baseURL = 'https://randomuser.me/api/?results=20&password=number,8-8&nat=br';

export function Comp() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        // Ajuste para limitar a um usuário
        setData(response.data.results.slice(0, 1));
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
      });
  }, []);

  if (!data) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.container}>
            <View style={styles.imageView}></View>
            <View style={styles.info}>
              <Text style={styles.data}>{`Nome: ${item.name.first} ${item.name.last}`}</Text>
              <Text style={styles.data}>{`Email: ${item.email}`}</Text>
            </View>
            <TouchableOpacity style={styles.button}>
            <AntDesign name="rightcircleo" size={36} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        width: '95%',
        height:130,
        marginBottom: 5,
        elevation: 5
      },
    
      imageView: {
        borderWidth: 1,
        borderColor: 'black',
        width: 90,
        height: 90,
        borderRadius: 45
      },
    
      info: {
        marginLeft: 20,
        width: 180
      },
    
      data: {
        marginVertical: 3,
        fontSize: 15
      },
    
      button: {
      }
});
