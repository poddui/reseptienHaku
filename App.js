import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';

export default function App() {

  const[ingredient, setIngredient] = useState('');
  const[recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.meals) {
        setRecipes(data.meals);
        console.log(data.meals)
      } else {
        setRecipes([]);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const listSeparator = () => {
    return(
      <View
        style={{
          height: 1,
          width: "100%", 
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    )
  }

  const listEmpty = () => {
    return(
      <Text style={styles.list}>No recipes found!</Text>
    )
  }


  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        keyExtractor={(item) => String(item.idMeal)}
        renderItem={({item}) => {
          return(
            <View>
              <Text>{item.strMeal}</Text>
              <Image
                style={{width: 100, height: 100}}
                source={{
                  uri: `${item.strMealThumb}`,
                }}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={listSeparator}
        ListEmptyComponent={listEmpty}
        data={recipes}
      />
        <TextInput
          style={styles.input}
          onChangeText={setIngredient}
          placeholder="Find recipes by ingredient"
        />
        <TouchableOpacity style={styles.button} onPress={getRecipes}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    width: '80%',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
