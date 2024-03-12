import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export type AccountScreenHeaderProps = {
  username: string;
  ratingAmount: number;
  friendAmount: number;
};

const AccountScreenHeader = ({
  username,
  ratingAmount,
  friendAmount,
}: AccountScreenHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>{username}</Text>
      </View>
      <View style={styles.infoBoxContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxContent}>{ratingAmount}</Text>
          <Text>Ratings</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxContent}>{friendAmount}</Text>
          <Text>Friends</Text>
        </View>
      </View>
      <Text style={styles.ratingsText}>Ratings</Text>
    </View>
  );
};

export default AccountScreenHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: { alignItems: 'center' },
  infoBoxContent: { fontWeight: 'bold', fontSize: 24 },
  infoBoxName: {},
  ratingsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
