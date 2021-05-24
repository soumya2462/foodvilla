/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React, { Component, Fragment } from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import utils
import getImgSource from '../../utils/getImgSource.js';

// import components
import TouchableItem from '../../components/TouchableItem';

// import colors, layout
import Colors from '../../theme/colors';
import Layout from '../../theme/layout';

//import sample data
import sample_data from '../../config/sample-data';

// Categories Config
// CARD_WIDTH = (SCREEN_WIDTH - 2 * categoriesContainer.padding - 4 * card.margin) / 2
const CARD_WIDTH = (Layout.SCREEN_WIDTH - 2 * 8 - 4 * 8) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.08;
const CARD_BORDER_RADIUS = 6;

// Categories Styles
const styles = StyleSheet.create({
  topArea: { flex: 0, backgroundColor: Colors.primaryColor },
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoriesContainer: {
    padding: 8,
  },
  cardImg: {
    borderRadius: CARD_BORDER_RADIUS,
  },
  viewContainer:{
    overflow:'hidden',
    padding:8
  },
  card: {
    //margin: 8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  cardOverlay: {
    flex: 1,
    borderRadius: CARD_BORDER_RADIUS,
    overflow: 'hidden',
  },
  cardContainer: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute'
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: Colors.white,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    paddingHorizontal: 5
  },
  items: {
    paddingBottom: 5,
    fontWeight: '700',
    fontSize: 13,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.88)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

// Categories
export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: sample_data.all_categorories,
    };
  }

  goBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigateTo = screen => () => {
    const { navigation } = this.props;
    navigation.navigate(screen);
  };

  keyExtractor = item => item.key;

  renderCategoryItem = ({ item, index }) => (
    <View style={styles.viewContainer}>
      <TouchableItem
        onPress={this.navigateTo('Category')}
        
      >
        <ImageBackground
          key={index}
          source={getImgSource(item.imageUri)}
          imageStyle={styles.cardImg}
          onPress={this.navigateTo('Category')}
          style={styles.card}>
          <View style={styles.cardOverlay}>
            <TouchableItem
              onPress={this.navigateTo('Category')}
              style={styles.cardContainer}
            // borderless
            >
              <Fragment>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.items}>{`${item.items} items`}</Text>
              </Fragment>
            </TouchableItem>
          </View>
        </ImageBackground>
      </TouchableItem>
    </View>
  );

  render() {
    const { categories } = this.state;

    return (
      <Fragment>
        <SafeAreaView style={styles.topArea} />
        <SafeAreaView style={styles.screenContainer}>
          <StatusBar
            backgroundColor={Colors.primaryColor}
            barStyle="light-content"
          />

          <FlatList
            data={categories}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderCategoryItem}
            numColumns={2}
            contentContainerStyle={styles.categoriesContainer}
          />
        </SafeAreaView>
      </Fragment>
    );
  }
}
