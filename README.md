# react-native-progressive-blur

Beautiful gradient blur effects for React Native iOS with customizable direction, intensity, and tint.

![Demo](ios.gif)

## Installation

```sh
npm install react-native-progressive-blur
```

```sh
cd ios && pod install
```

## Usage

```jsx
import { ProgressiveBlurView } from 'react-native-progressive-blur';

<ProgressiveBlurView
  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 200 }}
  direction="topToBottom"
  intensity={80}
  tint="light"
  locations={[0.0, 0.7]}
/>;
```

## Props

| Prop        | Type                                                               | Default         | Description                                                  |
| ----------- | ------------------------------------------------------------------ | --------------- | ------------------------------------------------------------ |
| `direction` | `'topToBottom' \| 'bottomToTop' \| 'leftToRight' \| 'rightToLeft'` | `'topToBottom'` | Blur gradient direction. Omit for uniform blur across view   |
| `intensity` | `number`                                                           | `50`            | Blur strength (0-100)                                        |
| `tint`      | `'default' \| 'light' \| 'dark'`                                   | `'default'`     | Blur style                                                   |
| `locations` | `[number, number]`                                                 | `[0.0, 1.0]`    | Gradient stops (0.0-1.0). Only applies when direction is set |
| `style`     | `ViewStyle`                                                        | -               | React Native style                                           |

## Examples

### Gradient Blur

### Gradient Blur

```jsx
function Header({ title }) {
  return (
    <View style={styles.header}>
      <ProgressiveBlurView
        style={StyleSheet.absoluteFill}
        direction="topToBottom"
        intensity={80}
        tint="light"
        locations={[0.0, 0.8]}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
```

### Uniform Blur

When `direction` is omitted, the entire view is blurred uniformly:

```jsx
function BlurredOverlay() {
  return (
    <View style={styles.container}>
      <Image source={require('./photo.jpg')} style={styles.image} />
      <ProgressiveBlurView
        style={StyleSheet.absoluteFill}
        intensity={60}
        tint="light"
      />
      <Text style={styles.text}>Uniform blur applied</Text>
    </View>
  );
}
```

## Platform

- ✅ iOS 13+
- ❌ Android (not supported)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
