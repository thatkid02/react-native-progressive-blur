import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ProgressiveBlurView,
  type BlurDirection,
  type BlurTint,
} from 'react-native-progressive-blur';

const { width, height } = Dimensions.get('window');

const DIRECTIONS: Array<{
  label: string;
  value?: BlurDirection;
  icon: string;
}> = [
  { label: 'None', value: undefined, icon: '◉' },
  { label: 'Top', value: 'topToBottom', icon: '↓' },
  { label: 'Bottom', value: 'bottomToTop', icon: '↑' },
  { label: 'Left', value: 'leftToRight', icon: '→' },
  { label: 'Right', value: 'rightToLeft', icon: '←' },
];

const TINTS: Array<{ label: string; value: BlurTint }> = [
  { label: 'Light', value: 'light' },
  { label: 'Default', value: 'default' },
  { label: 'Dark', value: 'dark' },
];

export default function App() {
  const safeAreaInsets = useSafeAreaInsets();
  const [imageRefresh, setImageRefresh] = useState(0);
  const [direction, setDirection] = useState<BlurDirection | undefined>(
    'topToBottom'
  );
  const [tint, setTint] = useState<BlurTint>('light');
  const [intensity, setIntensity] = useState(70);
  const rotationAnim = useRef(new Animated.Value(0)).current;

  const refreshImage = () => {
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      rotationAnim.setValue(0);
    });
    setImageRefresh((prev) => prev + 1);
  };

  const rotateInterpolate = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Full Screen Image */}
      <View style={styles.imageContainer}>
        <Image
          key={imageRefresh}
          source={{
            uri: `https://picsum.photos/seed/demo-${imageRefresh}/1200/1600`,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <ProgressiveBlurView
          key={`blur-${direction}-${tint}-${intensity}-${imageRefresh}`}
          style={styles.blurOverlay}
          direction={direction}
          intensity={intensity}
          tint={tint}
          locations={[0.0, 0.7]}
        />

        {/* Refresh Button */}
        <TouchableOpacity style={styles.refreshButton} onPress={refreshImage}>
          <Animated.Text
            style={[
              styles.refreshIcon,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
          >
            ↻
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {/* Compact Toolbar */}
      <View
        style={[
          styles.toolbar,
          { paddingBottom: Math.max(safeAreaInsets.bottom, 12) },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.toolbarContent}
        >
          {/* Direction Controls */}
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Direction</Text>
            <View style={styles.buttonRow}>
              {DIRECTIONS.map((dir) => (
                <TouchableOpacity
                  key={dir.label}
                  style={[
                    styles.toolButton,
                    direction === dir.value && styles.toolButtonActive,
                  ]}
                  onPress={() => setDirection(dir.value)}
                >
                  <Text style={styles.toolButtonIcon}>{dir.icon}</Text>
                  <Text style={styles.toolButtonText}>{dir.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tint Controls */}
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Tint</Text>
            <View style={styles.buttonRow}>
              {TINTS.map((t) => (
                <TouchableOpacity
                  key={t.value}
                  style={[
                    styles.toolButton,
                    tint === t.value && styles.toolButtonActive,
                  ]}
                  onPress={() => setTint(t.value)}
                >
                  <Text style={styles.toolButtonText}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Intensity Controls */}
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Intensity</Text>
            <View style={styles.buttonRow}>
              {[30, 50, 70, 90].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[
                    styles.toolButton,
                    intensity === val && styles.toolButtonActive,
                  ]}
                  onPress={() => setIntensity(val)}
                >
                  <Text style={styles.toolButtonText}>{val}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  refreshButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  refreshIcon: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  toolbarContent: {
    gap: 20,
    paddingRight: 12,
  },
  controlGroup: {
    gap: 8,
  },
  controlLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 6,
  },
  toolButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolButtonActive: {
    backgroundColor: 'rgba(33, 150, 243, 0.3)',
    borderColor: '#2196f3',
  },
  toolButtonIcon: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  toolButtonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
});
