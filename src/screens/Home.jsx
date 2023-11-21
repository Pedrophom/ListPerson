import React from 'react';
import { StyleSheet, Text, View, FlatList,Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';

const baseURL = 'https://randomuser.me/api/?results=20&password=number,8-8&nat=br';

export function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL)
      .then(response => {
        setData(response.data.results);
      })
  }, []);

  if (!data) return null;

  return (
    <View style={styles.containerMaster}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={styles.container}>
            <View style={styles.imageView}><Image source={{uri: item.picture.large}} style={styles.image}/></View>
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
    containerMaster: {
      flex: 1,
      alignItems: 'center',
    },

    container: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        height:130,
        marginVertical: 5,
        elevation: 5
      },
    
      imageView: {
        borderWidth: 1,
        borderColor: 'black',
        width: 90,
        height: 90,
        borderRadius: 45
      },

      image: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center'
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
