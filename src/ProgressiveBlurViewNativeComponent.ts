import type { ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

export type BlurDirection =
  | 'topToBottom'
  | 'bottomToTop'
  | 'leftToRight'
  | 'rightToLeft';
export type BlurTint = 'default' | 'dark' | 'light';

export interface ProgressiveBlurViewProps extends ViewProps {
  direction?: BlurDirection;
  intensity?: number;
  tint?: BlurTint;
  locations?: [number, number];
}

export default requireNativeComponent<ProgressiveBlurViewProps>(
  'ProgressiveBlurView'
);
