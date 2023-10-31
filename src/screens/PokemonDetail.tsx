import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Card, Text, ActivityIndicator} from 'react-native-paper';

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonMove {
  move: {
    name: string;
  };
}

interface PokemonDetailProps {
  item: {
    name: string;
    url: string;
  };
}

const PokemonDetail: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const {item} = route.params as PokemonDetailProps;

  useEffect(() => {
    setLoading(true);
    axios.get(item.url).then(response => {
      setData(response.data);
      setLoading(false);
    });
  }, [item.url]);

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color="#000" />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={{uri: data.sprites.front_default}}
        />
      </View>
      <Card style={styles.cardStyle}>
        <Card.Title title={`Nombre: ${data.name.toUpperCase()}`} />
        <Card.Content>
          <Text>Altura: {data.height}</Text>
          <Text>Peso: {data.weight}</Text>
        </Card.Content>
      </Card>
      <Card style={styles.cardStyle}>
        <Card.Title title="Habilidades" />
        <Card.Content>
          {data.abilities.map((ability: PokemonAbility) => (
            <Text key={ability.ability.name}>{ability.ability.name}</Text>
          ))}
        </Card.Content>
      </Card>
      <Card style={styles.cardStyle}>
        <Card.Title title="Movimientos disponibles" />
        <Card.Content>
          <View style={styles.movesContainer}>
            {data.moves.map((moves: PokemonMove) => (
              <View key={moves.move.name} style={styles.moveItem}>
                <Text>{moves.move.name}</Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  moveItem: {
    width: '50%',
    padding: 5,
  },
  cardStyle: {
    marginBottom: 10,
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PokemonDetail;
