import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, ScrollView, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {Card, Text} from 'react-native-paper';

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
    <Text>Loading...</Text>
  ) : (
    <ScrollView style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: 200, height: 200}}
          source={{uri: data.sprites.front_default}}
        />
      </View>
      <Card>
        <Card.Title title={data.name} />
        <Card.Content>
          <Text>Height: {data.height}</Text>
          <Text>Weight: {data.weight}</Text>
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title={data.name} />
        <Card.Content>
          {data.abilities.map((item: PokemonAbility) => (
            <Text key={item.ability.name}>{item.ability.name}</Text>
          ))}
        </Card.Content>
      </Card>
      <Card>
        <Card.Title title={data.name} />
        <Card.Content>
          {data.moves.map((item: PokemonMove) => (
            <Text key={item.move.name}>{item.move.name}</Text>
          ))}
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
});

export default PokemonDetail;
