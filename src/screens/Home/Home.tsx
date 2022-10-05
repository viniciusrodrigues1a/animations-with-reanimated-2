import React from 'react';
import {FlatList, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  MainNavigationParams,
  MAIN_NAVIGATION_ROUTES,
} from '../../routes/MainStackNavigation';
import {styles} from './styles';

export type HomeParams = undefined;

type ScreenProp = {
  title: string;
  route: MAIN_NAVIGATION_ROUTES;
};

const screensList: ScreenProp[] = [
  {
    title: 'Move circle and snap to drop zones',
    route: MAIN_NAVIGATION_ROUTES.MOVE_CIRCLE_WITH_PAN,
  },
];

export const Home = () => {
  const navigation = useNavigation<NavigationProp<MainNavigationParams>>();

  const renderItem = ({item}: {item: ScreenProp}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate(item.route)}>
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const itemSeparator = () => (
    <View style={styles.itemSeparatorWrapper}>
      <View style={styles.itemSeparator} />
    </View>
  );

  const ListHeaderComponent = (
    <View style={styles.itemContainer}>
      <Text style={styles.titleText}>Animations with Reanimated 2</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={screensList}
          keyExtractor={item => item.route}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
    </>
  );
};
