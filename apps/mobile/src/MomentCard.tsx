import { StyleSheet, Text, View } from 'react-native';

import type { MomentViewModel } from './momentViewModel';

type Props = {
  moment: MomentViewModel;
};

export function MomentCard({ moment }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>MOMENT</Text>
      <Text style={styles.title}>{moment.title}</Text>
      <Text style={styles.subtitle}>{moment.subtitle}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Memory</Text>
        {moment.memoryLines.map((line, index) => (
          <Text key={`memory-${index}`} style={styles.memoryLine}>
            {line}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Perspectives</Text>
        {moment.perspectives.map((item) => (
          <View key={item.key} style={styles.perspective}>
            <Text style={styles.perspectiveKey}>{item.key}</Text>
            <Text style={styles.status}>{item.status}</Text>
            {item.values.map((entry, index) => (
              <Text key={`${item.key}-${index}`} style={styles.value}>
                {entry.observer}: {String(entry.value)}
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View style={[styles.section, styles.provenance]}>
        <Text style={styles.sectionLabel}>Provenance</Text>
        <Text style={styles.meta}>
          {moment.provenance.carrierCount} original carrier
          {moment.provenance.carrierCount === 1 ? '' : 's'} ·{' '}
          {moment.provenance.captureReceiptCount} capture receipt
          {moment.provenance.captureReceiptCount === 1 ? '' : 's'}
        </Text>
        {moment.provenance.capturedAt ? (
          <Text style={styles.meta}>Captured {moment.provenance.capturedAt}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf1',
    borderRadius: 28,
    padding: 24,
    gap: 6,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.6,
  },
  section: {
    marginTop: 20,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  memoryLine: {
    fontSize: 19,
    lineHeight: 28,
  },
  perspective: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 10,
    gap: 3,
  },
  perspectiveKey: {
    fontSize: 15,
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    textTransform: 'uppercase',
    opacity: 0.55,
  },
  value: {
    fontSize: 14,
  },
  provenance: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 14,
  },
  meta: {
    fontSize: 12,
    opacity: 0.6,
  },
});
