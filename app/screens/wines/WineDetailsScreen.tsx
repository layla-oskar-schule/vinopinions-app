import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Picker, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import StoreCardList from '../../components/stores/StoreCardList';
import { fetchStoresAsync } from '../../features/stores/storesSlice';
import Store from '../../models/Store';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';
import { WineDetailsScreenRouteProp } from './WinesStackScreen';

const WineDetailsScreen: React.FC<{ route: WineDetailsScreenRouteProp }> = ({
  route,
}): React.ReactElement => {
  const wine: Wine = route.params.wine;
  const dispatch: AppDispatch = useDispatch();
  const stores: Store[] = useSelector((state: RootState) =>
    state.stores.status !== 'failed' ? state.stores.data : [],
  );
  const [selectedStores, setSelectedStores] = useState<Store[]>(wine.stores);

  useEffect(() => {
    dispatch(fetchStoresAsync());
  }, []);

  const updateSelectedStores = (ids: string[]) => {
    const updatedStores = ids.map(
      (id) => stores.find((store) => store.id === id) as Store,
    );
    setSelectedStores(updatedStores);
  };

  // TODO: add winemaker name

  return (
    <View>
      <Text text40 style={styles.text}>
        {wine.name}
      </Text>
      <Text text70 style={styles.text}>
        {wine.grapeVariety}
      </Text>
      <Text text70 style={styles.text}>
        {wine.heritage}
      </Text>
      <Text text70 style={styles.text}>
        {wine.year}
      </Text>
      <View style={styles.pickerContainer}>
        <Picker
          placeholder={'Add Store'}
          label={'Add Store'}
          useSafeArea
          floatingPlaceholder
          value={selectedStores.map((store) => store.id)}
          onChange={(items) => updateSelectedStores(items as string[])}
          enableModalBlur={false}
          showSearch
          searchPlaceholder="Search..."
          topBarProps={{ title: 'Stores' }}
          mode={Picker.modes.MULTI}
        >
          {stores.map((store) => (
            <Picker.Item key={store.id} value={store.id} label={store.name} />
          ))}
        </Picker>
      </View>
      <View>
        <StoreCardList stores={wine.stores} />
      </View>
    </View>
  );
};

export default WineDetailsScreen;

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginLeft: 10,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 8,
  },
});
