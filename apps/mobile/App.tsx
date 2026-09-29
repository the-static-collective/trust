import { assertMoment } from '@trust/protocol';
import { canonicalMomentFixture } from '@trust/protocol/examples';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { MomentCard } from './src/MomentCard';
import { toMomentViewModel } from './src/momentViewModel';

const moment = assertMoment(canonicalMomentFixture);
const viewModel = toMomentViewModel(moment);

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.brand}>Trust</Text>
          <Text style={styles.tagline}>capture · protect · compose</Text>
        </View>
        <MomentCard moment={viewModel} />
        <Text style={styles.footer}>
          Memory is a rendering. Provenance stays underneath.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#efe7d8',
  },
  scroll: {
    padding: 20,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 20,
  },
  brand: {
    fontSize: 42,
    fontWeight: '800',
  },
  tagline: {
    marginTop: 2,
    fontSize: 15,
    opacity: 0.6,
  },
  footer: {
    marginTop: 18,
    paddingHorizontal: 8,
    fontSize: 12,
    lineHeight: 18,
    opacity: 0.55,
  },
});
