package com.progressiveblur

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.ProgressiveBlurViewManagerInterface
import com.facebook.react.viewmanagers.ProgressiveBlurViewManagerDelegate

@ReactModule(name = ProgressiveBlurViewManager.NAME)
class ProgressiveBlurViewManager : SimpleViewManager<ProgressiveBlurView>(),
  ProgressiveBlurViewManagerInterface<ProgressiveBlurView> {
  private val mDelegate: ViewManagerDelegate<ProgressiveBlurView>

  init {
    mDelegate = ProgressiveBlurViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<ProgressiveBlurView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): ProgressiveBlurView {
    return ProgressiveBlurView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: ProgressiveBlurView?, color: Int?) {
    view?.setBackgroundColor(color ?: Color.TRANSPARENT)
  }

  companion object {
    const val NAME = "ProgressiveBlurView"
  }
}
