#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ProgressiveBlurViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(direction, NSString)
RCT_EXPORT_VIEW_PROPERTY(intensity, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(tint, NSString)
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray)

@end
