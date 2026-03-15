package com.quranapp.beautiful

import androidx.compose.animation.core.Spring
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bookmark
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.outlined.BookmarkBorder
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Search
import androidx.compose.material.icons.outlined.Settings
import androidx.compose.material.ripple.rememberRipple
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.quranapp.beautiful.data.repository.QuranRepository
import com.quranapp.beautiful.ui.screens.*
import com.quranapp.beautiful.ui.theme.*

enum class Screen {
    HOME, SEARCH, BOOKMARKS, SETTINGS
}

data class NavigationItem(
    val screen: Screen,
    val label: String,
    val iconSelected: ImageVector,
    val iconUnselected: ImageVector
)

@Composable
fun QuranApp() {
    var currentScreen by remember { mutableStateOf(Screen.HOME) }
    val repository = remember { QuranRepository() }
    
    val navigationItems = listOf(
        NavigationItem(Screen.HOME, "Home", Icons.Filled.Home, Icons.Outlined.Home),
        NavigationItem(Screen.SEARCH, "Search", Icons.Filled.Search, Icons.Outlined.Search),
        NavigationItem(Screen.BOOKMARKS, "Bookmarks", Icons.Filled.Bookmark, Icons.Outlined.BookmarkBorder),
        NavigationItem(Screen.SETTINGS, "Settings", Icons.Filled.Settings, Icons.Outlined.Settings)
    )
    
    Scaffold(
        containerColor = WarmIvory,
        bottomBar = {
            FluffyBottomBar(
                items = navigationItems,
                currentScreen = currentScreen,
                onScreenSelected = { currentScreen = it }
            )
        }
    ) { paddingValues ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
        ) {
            when (currentScreen) {
                Screen.HOME -> HomeScreen(
                    repository = repository,
                    onSurahClick = { /* Navigate to reading screen */ }
                )
                Screen.SEARCH -> SearchScreen(repository = repository)
                Screen.BOOKMARKS -> BookmarksScreen(repository = repository)
                Screen.SETTINGS -> SettingsScreen()
            }
        }
    }
}

@Composable
fun FluffyBottomBar(
    items: List<NavigationItem>,
    currentScreen: Screen,
    onScreenSelected: (Screen) -> Unit,
    modifier: Modifier = Modifier
) {
    Surface(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 20.dp, vertical = 16.dp)
            .shadow(
                elevation = 12.dp,
                shape = RoundedCornerShape(28.dp),
                ambientColor = ShadowSoft,
                spotColor = ShadowSoft
            )
            .clip(RoundedCornerShape(28.dp)),
        color = SurfaceElevated,
        tonalElevation = 0.dp
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 12.dp, horizontal = 8.dp),
            horizontalArrangement = Arrangement.SpaceEvenly,
            verticalAlignment = Alignment.CenterVertically
        ) {
            items.forEach { item ->
                BottomBarItem(
                    item = item,
                    isSelected = currentScreen == item.screen,
                    onClick = { onScreenSelected(item.screen) }
                )
            }
        }
    }
}

@Composable
fun BottomBarItem(
    item: NavigationItem,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val backgroundColor = if (isSelected) {
        Brush.linearGradient(listOf(SageLight, SagePrimary))
    } else {
        Brush.linearGradient(listOf(SurfaceElevated, SurfaceElevated))
    }
    
    Box(
        modifier = Modifier
            .clip(RoundedCornerShape(18.dp))
            .background(backgroundColor)
            .clickable(
                onClick = onClick,
                indication = rememberRipple(bounded = true, color = SagePrimary),
                interactionSource = remember { MutableInteractionSource() }
            )
            .padding(horizontal = 20.dp, vertical = 12.dp),
        contentAlignment = Alignment.Center
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Icon(
                imageVector = if (isSelected) item.iconSelected else item.iconUnselected,
                contentDescription = item.label,
                tint = if (isSelected) SurfaceElevated else TextSecondary,
                modifier = Modifier.size(24.dp)
            )
            
            if (isSelected) {
                Spacer(modifier = Modifier.width(8.dp))
                Text(
                    text = item.label,
                    style = MaterialTheme.typography.labelLarge,
                    color = SurfaceElevated
                )
            }
        }
    }
}
