import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressiveBlurView } from 'react-native-progressive-blur';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width - 32;

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const LOREM_IPSUM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
  'Nisi ut aliquip ex ea commodo consequat.',
  'Curabitur pretium tincidunt lacus nulla gravida orci.',
  'Mauris blandit aliquet elit eget tincidunt nibh pulvinar.',
  'Pellentesque in ipsum id orci porta dapibus vestibulum.',
  'Vivamus magna justo lacinia eget consectetur sed convallis.',
];

const DATA: GalleryItem[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i}`,
  title: `Image ${i + 1}`,
  description: LOREM_IPSUM[i % LOREM_IPSUM.length],
  imageUrl: `https://picsum.photos/seed/${i + 20}/800/600`,
})) as unknown as GalleryItem[];

function Header({ title }: { title: string }) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[styles.headerContainer, { paddingTop: safeAreaInsets.top }]}
      pointerEvents="box-none"
    >
      <ProgressiveBlurView
        style={styles.headerBlur}
        direction="topToBottom"
        intensity={80}
        tint="dark"
        locations={[0.0, 0.7]}
      />
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
}

function Footer() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[styles.footerContainer, { paddingBottom: safeAreaInsets.bottom }]}
      pointerEvents="box-none"
    >
      <ProgressiveBlurView
        style={styles.footerBlur}
        direction="bottomToTop"
        intensity={9}
        tint="light"
        locations={[0.0, 0.8]}
      />
      <View style={styles.footerContent}>
        <Text style={styles.footerText}> </Text>
      </View>
    </View>
  );
}

export default function App() {
  const safeAreaInsets = useSafeAreaInsets();

  const renderItem = ({ item }: { item: GalleryItem }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          {
            paddingTop: safeAreaInsets.top + 130,
            paddingBottom: safeAreaInsets.bottom + 100,
          },
        ]}
      />
      <Header title="Image Gallery" />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000e0',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: '#e2e2e2',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE * 0.75,
  },
  itemTextContainer: {
    padding: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0000008a',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 10,
  },
  headerBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 255, 195, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: 10,
  },
  footerBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  footerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
});
