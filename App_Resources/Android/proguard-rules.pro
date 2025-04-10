-keep class com.tns.** { *          ; }
-keep class org.nativescript.** { * ; }
-keep class androidx.** { *         ; }

-keep class android.os.StrictMode { *                                                            ; }
-keep class okhttp3.Call { *                                                                     ; }
-keep class okhttp3.Dispatcher { *                                                               ; }
-keep class okhttp3.RequestBody { *                                                              ; }
-keep class okhttp3.MediaType { *                                                                ; }
-keep class okhttp3.MultipartBody { *                                                            ; }
-keep class okhttp3.Response { *                                                                 ; }
-keep class okhttp3.ResponseBody { *                                                             ; }
-keep class okhttp3.Headers { *                                                                  ; }
-keep class okhttp3.MultipartBody$Builder { *                                                    ; }
-keep class okhttp3.CacheControl { *                                                             ; }
-keep class okhttp3.CacheControl$Builder { *                                                     ; }
-keep class okhttp3.Request { *                                                                  ; }
-keep class okhttp3.Request$Builder { *                                                          ; }
-keep class okhttp3.Interceptor { *                                                              ; }
-keep class okhttp3.OkHttpClient { *                                                             ; }
-keep class okhttp3.OkHttpClient$Builder { *                                                     ; }
-keep class okhttp3.CertificatePinner { *                                                        ; }
-keep class okhttp3.CertificatePinner$Builder { *                                                ; }
-keep class okhttp3.ConnectionSpec { *                                                           ; }
-keep class okhttp3.Cache { *                                                                    ; }
-keep class okhttp3.Callback { *                                                                 ; }
-keep class okhttp3.FormBody { *                                                                 ; }
-keep class okhttp3.FormBody$Builder { *                                                         ; }
-keep class okhttp3.CookieJar { *                                                                ; }
-keep class java.net.CookieManager { *                                                           ; }
-keep class java.net.CookiePolicy { *                                                            ; }
-keep class com.nativescript.https.QuotePreservingCookieJar { *                                  ; }
-keep class com.nativescript.https.CacheInterceptor { *                                          ; }
-keep class com.nativescript.https.OkHttpResponse { *                                            ; }
-keep class java.util.Collections { *                                                            ; }
-keep class java.security.cert.CertificateFactory { *                                            ; }
-keep class java.security.KeyStore { *                                                           ; }
-keep class java.security.Security { *                                                           ; }
-keep class javax.net.ssl.TrustManagerFactory { *                                                ; }
-keep class javax.net.ssl.SSLContext { *                                                         ; }
-keep class javax.net.ssl.HttpsURLConnection { *                                                 ; }
-keep class java.net.UnknownHostException { *                                                    ; }
-keep class java.util.concurrent.TimeUnit { *                                                    ; }
-keep class org.conscrypt.Conscrypt { *                                                          ; }
-keep class android.view.GestureDetector.SimpleOnGestureListener { *                             ; }
-keep class android.view.View.OnClickListener { *                                                ; }
-keep class android.view.View.OnLayoutChangeListener { *                                         ; }
-keep class android.view.ViewGroup.LayoutParams { *                                              ; }
-keep class androidx.core.view.GestureDetectorCompat { *                                         ; }
-keep class androidx.recyclerview.widget.GridLayoutManager { *                                   ; }
-keep class androidx.recyclerview.widget.GridLayoutManager.SpanSizeLookup { *                    ; }
-keep class androidx.recyclerview.widget.ItemTouchHelper { *                                     ; }
-keep class androidx.recyclerview.widget.ItemTouchHelper.SimpleCallback { *                      ; }
-keep class androidx.recyclerview.widget.LinearLayoutManager { *                                 ; }
-keep class androidx.recyclerview.widget.RecyclerView { *                                        ; }
-keep class androidx.recyclerview.widget.RecyclerView.Adapter { *                                ; }
-keep class androidx.recyclerview.widget.RecyclerView.ItemAnimator { *                           ; }
-keep class androidx.recyclerview.widget.RecyclerView.LayoutManager { *                          ; }
-keep class androidx.recyclerview.widget.RecyclerView.OnItemTouchListener { *                    ; }
-keep class androidx.recyclerview.widget.RecyclerView.OnScrollListener { *                       ; }
-keep class androidx.recyclerview.widget.RecyclerView.RecyclerListener { *                       ; }
-keep class androidx.recyclerview.widget.RecyclerView.RecycledViewPool { *                       ; }
-keep class androidx.recyclerview.widget.RecyclerView.ViewHolder { *                             ; }
-keep class androidx.recyclerview.widget.RecyclerView.ItemDecoration { *                         ; }
-keep class androidx.recyclerview.widget.SimpleItemAnimator { *                                  ; }
-keep class com.h6ah4i.android.widget.advrecyclerview.animator.BaseItemAnimator { *              ; }
-keep class com.h6ah4i.android.widget.advrecyclerview.animator.GeneralItemAnimator { *           ; }
-keep class com.h6ah4i.android.widget.advrecyclerview.animator.RefactoredDefaultItemAnimator { * ; }
-keep class jp.wasabeef.recyclerview.animators.FadeInAnimator { *                                ; }
-keep class jp.wasabeef.recyclerview.animators.BaseItemAnimator { *                              ; }
-keep class android.view.animation.OvershootInterpolator { *                                     ; }
-keep class com.nativescript.collectionview*.* { *                                               ; }
-keep class com.airbnb.lottie.LottieAnimationView { *                                            ; }
-keep class com.airbnb.lottie.model.KeyPath { *                                                  ; }
-keep class com.airbnb.lottie.value.LottieValueCallback { *                                      ; }
-keep class com.airbnb.lottie.LottieProperty { *                                                 ; }
-keep class com.airbnb.lottie.SimpleColorFilter { *                                              ; }
-keep class com.airbnb.lottie.RenderMode { *                                                     ; }
-keep class android.animation.Animator { *                                                       ; }
-keep class android.animation.Animator.AnimatorListener { *                                      ; }
-keep class com.airbnb.lottie.LottieResult { *                                                   ; }
-keep class com.airbnb.lottie.LottieOnCompositionLoadedListener { *                              ; }
-keep class com.airbnb.lottie.LottieComposition { *                                              ; }
-keep class com.airbnb.lottie.LottieCompositionFactory { *                                       ; }
-keep class android.view.WindowManager { *                                                       ; }
-keep class android.view.WindowManager.LayoutParams { *                                          ; }
-keep class com.google.android.material.bottomsheet.BottomSheetBehavior { *                      ; }
-keep class com.google.android.material.bottomsheet.BottomSheetBehavior.BottomSheetCallback { *  ; }
-keep class android.view.LayoutInflater { *                                                      ; }
-keep class com.google.android.material.button.MaterialButton { *                                ; }
-keep class android.graphics.drawable.Drawable { *                                               ; }
-keep class android.graphics.drawable.BitmapDrawable { *                                         ; }
-keep class android.content.DialogInterface.OnKeyListener { *                                    ; }
-keep class com.google.android.material.dialog.MaterialAlertDialogBuilder { *                    ; }
-keep class android.widget.TextView { *                                                          ; }
-keep class android.view.KeyEvent { *                                                            ; }
-keep class androidx.appcompat.app.AlertDialog { *                                               ; }
-keep class androidx.appcompat.app.AlertDialog.Builder { *                                       ; }
-keep class android.os.Bundle { *                                                                ; }
-keep class android.graphics.Bitmap { *                                                          ; }
-keep class android.view.View.OnAttachStateChangeListener { *                                    ; }
-keep class com.nativescript.material.core.TabViewPager { *                                      ; }
-keep class com.nativescript.material.core.TabsBar { *                                           ; }
-keep class com.nativescript.material.core.TabItemSpec { *                                       ; }
-keep class com.nativescript.pager*.* { *                                                        ; }
-keep class androidx.viewpager2.widget.ViewPager2 { *                                            ; }
-keep class androidx.viewpager2.widget.ViewPager2.OnPageChangeCallback { *                       ; }
-keep class androidx.viewpager2.widget.ViewPager2.PageTransformer { *                            ; }
-keep class androidx.viewpager2.widget.CompositePageTransformer { *                              ; }
-keep class androidx.viewpager2.widget.MarginPageTransformer { *                                 ; }
-keep class com.rd.PageIndicatorView2* { *                                                       ; }
-keep class com.rd.animation.type.AnimationType* { *                                             ; }
-keep class com.nativescript.popover.RelativePopupWindow { *                                     ; }
-keep class android.widget.PopupWindow { *                                                       ; }
-keep class android.widget.PopupWindow.OnDismissListener { *                                     ; }
-keep class android.view.ViewGroup.LayoutParams* { *                                             ; }
-keep class com.nativescript.swiperefreshlayout.CarouselFriendlySwipeRefreshLayout { *           ; }
-keep class androidx.swiperefreshlayout.widget.SwipeRefreshLayout { *                            ; }
-keep class androidx.swiperefreshlayout.widget.SwipeRefreshLayout.OnRefreshListener { *          ; }
-keep class androidx.biometric.BiometricManager { *                                              ; }
-keep class androidx.biometric.BiometricManager.Authenticators { *                               ; }
-keep class androidx.biometric.BiometricPrompt { *                                               ; }
-keep class androidx.biometric.BiometricPrompt.AuthenticationCallback { *                        ; }
-keep class androidx.biometric.BiometricPrompt.AuthenticationResult { *                          ; }
-keep class androidx.biometric.BiometricPrompt.CryptoObject { *                                  ; }
-keep class androidx.biometric.BiometricPrompt.PromptInfo { *                                    ; }
-keep class androidx.biometric.BiometricPrompt.PromptInfo.Builder { *                            ; }
-keep class androidx.core.app.TaskStackBuilder.SupportParentable { *                             ; }
-keep class androidx.core.content.ContextCompat { *                                              ; }
-keep class androidx.fragment.app.FragmentActivity { *                                           ; }
-keep class java.io.InputStream { *                                                              ; }
-keep class java.io.Serializable { *                                                             ; }
-keep class java.lang.Class { *                                                                  ; }
-keep class java.lang.Comparable { *                                                             ; }
-keep class java.lang.Integer { *                                                                ; }
-keep class java.lang.Number { *                                                                 ; }
-keep class java.lang.Object { *                                                                 ; }
-keep class java.lang.String { *                                                                 ; }
-keep class java.nio.charset.Charset { *                                                         ; }
-keep class java.nio.charset.StandardCharsets { *                                                ; }
-keep class java.nio.ByteBuffer { *                                                              ; }
-keep class java.security.cert.Certificate { *                                                   ; }
-keep class java.security.spec.AlgorithmParameterSpec { *                                        ; }
-keep class java.security.spec.KeySpec { *                                                       ; }
-keep class java.security.AlgorithmParameters { *                                                ; }
-keep class java.security.InvalidKeyException { *                                                ; }
-keep class java.security.Key { *                                                                ; }
-keep class java.security.KeyStore { *                                                           ; }
-keep class java.security.KeyStore.LoadStoreParameter { *                                        ; }
-keep class java.security.Provider { *                                                           ; }
-keep class java.security.SecureRandom { *                                                       ; }
-keep class java.util.concurrent.Executor { *                                                    ; }
-keep class javax.crypto.spec.IvParameterSpec { *                                                ; }
-keep class javax.crypto.Cipher { *                                                              ; }
-keep class javax.crypto.KeyGenerator { *                                                        ; }
-keep class javax.crypto.SecretKey { *                                                           ; }
-keep class javax.crypto.SecretKeyFactory { *                                                    ; }
-keep class javax.security.auth.Destroyable { *                                                  ; }
-keep class org.nativescript.plugins.fingerprint.Utils { *                                       ; }
-keep class java.util.Base64* { *                                                                ; }
-keep class java.util.Base64 { *                                                                 ; }
-keep class java.lang.reflect.* { *                                                              ; }
-keep class java.io.* { *                                                                        ; }
-keep class java.nio.* { *                                                                       ; }
-keep class java.util.* { *                                                                      ; }
-keep class com.tns*.* { *                                                                       ; }
-keep class org.nativescript*.* { *                                                              ; }
-keep class android.content*.* { *                                                               ; }
-keep class android.app*.* { *                                                                   ; }
-keep class android.os*.* { *                                                                    ; }
-keep class android.view*.* { *                                                                  ; }
-keep class android.net*.* { *                                                                   ; }
-keep class android.graphics*.* { *                                                              ; }
-keep class android.util*.* { *                                                                  ; }
-keep class android.media*.* { *                                                                 ; }
-keep class android.widget*.* { *                                                                ; }
-keep class android.animation*.* { *                                                             ; }
-keep class android.provider*.* { *                                                              ; }
-keep class android.text*.* { *                                                                  ; }
-keep class android.webkit*.* { *                                                                ; }
-keep class androidx.appcompat*.* { *                                                            ; }
-keep class androidx.core*.* { *                                                                 ; }
-keep class androidx.viewpager.widget*.* { *                                                     ; }
-keep class androidx.fragment*.* { *                                                             ; }
-keep class androidx.transition*.* { *                                                           ; }
-keep class androidx.lifecycle*.* { *                                                            ; }
-keep class androidx.activity.ComponentActivity { *                                              ; }
-keep class java.util.Base64* { *                                                                ; }
