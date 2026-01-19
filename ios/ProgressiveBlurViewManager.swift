import React

@objc(ProgressiveBlurViewManager)
class ProgressiveBlurViewManager: RCTViewManager {
  
  override func view() -> UIView! {
    return ProgressiveBlurView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
