package com.quranapp.beautiful.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val LightColorScheme = lightColorScheme(
    primary = SagePrimary,
    onPrimary = SurfaceElevated,
    primaryContainer = SageLight,
    onPrimaryContainer = TextPrimary,
    
    secondary = DustyRose,
    onSecondary = TextPrimary,
    secondaryContainer = BlushPink,
    onSecondaryContainer = TextPrimary,
    
    tertiary = SoftLavender,
    onTertiary = SurfaceElevated,
    tertiaryContainer = LavenderLight,
    onTertiaryContainer = TextPrimary,
    
    background = WarmIvory,
    onBackground = TextPrimary,
    
    surface = SurfaceCard,
    onSurface = TextPrimary,
    surfaceVariant = CloudWhite,
    onSurfaceVariant = TextSecondary,
    
    error = ErrorSoft,
    onError = SurfaceElevated,
    errorContainer = ErrorSoft,
    onErrorContainer = TextPrimary,
    
    outline = BorderLight,
    outlineVariant = BorderLight.copy(alpha = 0.5f),
    scrim = SurfaceOverlay
)

@Composable
fun QuranAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = LightColorScheme
    
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = WarmIvory.toArgb()
            window.navigationBarColor = WarmIvory.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = true
                isAppearanceLightNavigationBars = true
            }
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
