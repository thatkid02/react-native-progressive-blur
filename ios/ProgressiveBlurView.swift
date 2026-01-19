import UIKit
import React

@objc(ProgressiveBlurView)
class ProgressiveBlurView: UIView {
  private var blurView: UIVisualEffectView?
  private var animator: UIViewPropertyAnimator?
  private var gradientLayer: CAGradientLayer?
  private var contentContainer: UIView?
  private var isMounted = false
  
  // React Props
  private var blurDirection: String = "topToBottom" {
    didSet {
      if isMounted {
        updateGradientDirection()
      }
    }
  }
  
  private var blurIntensity: CGFloat = 50 {
    didSet {
      if isMounted {
        updateBlurIntensity()
      }
    }
  }
  
  private var blurTint: String = "default" {
    didSet {
      if isMounted {
        recreateBlurView()
      }
    }
  }
  
  private var gradientLocations: [NSNumber] = [0.0, 1.0] {
    didSet {
      if isMounted {
        updateGradientLocations()
      }
    }
  }
  
  // Initialization
  override init(frame: CGRect) {
    super.init(frame: frame)
    setupView()
  }
  
  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupView()
  }
  
  private func setupView() {
    backgroundColor = .clear
    clipsToBounds = true
    isMounted = true
    
    createBlurView()
    setupMask()
    createContentContainer()
  }
  
  // Blur Setup
  private func createBlurView() {
    cleanupBlurView()
    
    let effect = UIBlurEffect(style: getBlurStyle())
    let blur = UIVisualEffectView(effect: effect)
    blur.frame = bounds
    blur.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    blur.isUserInteractionEnabled = false
    
    insertSubview(blur, at: 0)
    self.blurView = blur
    
    updateBlurIntensity()
  }
  
  private func getBlurStyle() -> UIBlurEffect.Style {
    switch blurTint {
    case "dark":
      return .dark
    case "light":
      return .light
    default:
      return .regular
    }
  }
  
  private func updateBlurIntensity() {
    guard let blurView = blurView else { return }
    
    animator?.stopAnimation(true)
    animator?.finishAnimation(at: .current)
    animator = nil
    
    let normalized = max(0.01, min(1.0, blurIntensity / 100.0))
    
    blurView.effect = nil
    let newAnimator = UIViewPropertyAnimator(duration: 1, curve: .linear) { [weak self] in
      guard let self = self else { return }
      blurView.effect = UIBlurEffect(style: self.getBlurStyle())
    }
    newAnimator.fractionComplete = normalized
    animator = newAnimator
  }
  
  // Gradient Mask
  private func setupMask() {
    guard let blurView = blurView else { return }
    
    let gradient = CAGradientLayer()
    gradient.frame = bounds
    gradient.colors = [
      UIColor.black.cgColor,
      UIColor.clear.cgColor
    ]
    gradient.locations = gradientLocations
    
    blurView.layer.mask = gradient
    gradientLayer = gradient
    
    updateGradientDirection()
  }
  
  private func updateGradientDirection() {
    guard let gradientLayer = gradientLayer else { return }
    
    switch blurDirection {
    case "bottomToTop":
      gradientLayer.startPoint = CGPoint(x: 0.5, y: 1.0)
      gradientLayer.endPoint = CGPoint(x: 0.5, y: 0.0)
    case "leftToRight":
      gradientLayer.startPoint = CGPoint(x: 0.0, y: 0.5)
      gradientLayer.endPoint = CGPoint(x: 1.0, y: 0.5)
    case "rightToLeft":
      gradientLayer.startPoint = CGPoint(x: 1.0, y: 0.5)
      gradientLayer.endPoint = CGPoint(x: 0.0, y: 0.5)
    default:
      gradientLayer.startPoint = CGPoint(x: 0.5, y: 0.0)
      gradientLayer.endPoint = CGPoint(x: 0.5, y: 1.0)
    }
  }
  
  private func updateGradientLocations() {
    gradientLayer?.locations = gradientLocations
  }
  
  // Content Container (React Root)
  private func createContentContainer() {
    let container = UIView(frame: bounds)
    container.backgroundColor = .clear
    container.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    container.isUserInteractionEnabled = true
    addSubview(container)
    contentContainer = container
  }
  
  // Subview management for React Native
  override func insertSubview(_ newSubview: UIView, at index: Int) {
    if let contentContainer = contentContainer {
      contentContainer.insertSubview(newSubview, at: index)
    } else {
      super.insertSubview(newSubview, at: index)
    }
  }
  
  override func addSubview(_ view: UIView) {
    if let contentContainer = contentContainer, view != contentContainer, view != blurView {
      contentContainer.addSubview(view)
    } else {
      super.addSubview(view)
    }
  }
  
  // Layout
  override func layoutSubviews() {
    super.layoutSubviews()
    blurView?.frame = bounds
    gradientLayer?.frame = bounds
    contentContainer?.frame = bounds
  }
  
  // Cleanup
  private func recreateBlurView() {
    createBlurView()
    setupMask()
  }
  
  private func cleanupBlurView() {
    animator?.stopAnimation(true)
    animator?.finishAnimation(at: .current)
    animator = nil
    
    blurView?.layer.mask = nil
    gradientLayer = nil
    blurView?.removeFromSuperview()
    blurView = nil
  }
  
  deinit {
    contentContainer?.subviews.forEach { $0.removeFromSuperview() }
    cleanupBlurView()
  }
  
  // React Props Setters
  @objc func setDirection(_ value: String) {
    blurDirection = value
  }
  
  @objc func setIntensity(_ value: NSNumber) {
    blurIntensity = CGFloat(truncating: value)
  }
  
  @objc func setTint(_ value: String) {
    blurTint = value
  }
  
  @objc func setLocations(_ value: [NSNumber]) {
    guard value.count == 2 else { return }
    gradientLocations = value
  }
}
