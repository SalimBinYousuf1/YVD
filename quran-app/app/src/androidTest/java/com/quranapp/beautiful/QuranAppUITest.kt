package com.quranapp.beautiful

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import com.quranapp.beautiful.ui.theme.QuranAppTheme
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class QuranAppUITest {
    
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun appLaunches_showsHomeScreen() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Verify bottom navigation is visible
        composeTestRule.onNodeWithText("Home").assertExists()
        composeTestRule.onNodeWithText("Search").assertExists()
        composeTestRule.onNodeWithText("Bookmarks").assertExists()
        composeTestRule.onNodeWithText("Settings").assertExists()
    }
    
    @Test
    fun homeScreen_displaysHeader() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Check for Bismillah text
        composeTestRule.onNodeWithText("بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ").assertExists()
        
        // Check for app title
        composeTestRule.onNodeWithText("Al-Qur'an Al-Kareem").assertExists()
    }
    
    @Test
    fun homeScreen_displaysSurahs() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Wait for content to load
        composeTestRule.waitForIdle()
        
        // Verify Al-Fatihah is displayed
        composeTestRule.onNodeWithText("Al-Fatihah").assertExists()
        composeTestRule.onNodeWithText("The Opening").assertExists()
    }
    
    @Test
    fun navigationBar_switchesToSearchScreen() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Click on Search navigation item
        composeTestRule.onNodeWithText("Search").performClick()
        
        // Wait for screen transition
        composeTestRule.waitForIdle()
        
        // Verify Search screen is displayed
        composeTestRule.onNodeWithText("Search Qur'an").assertExists()
        composeTestRule.onNodeWithText("Start typing to search").assertExists()
    }
    
    @Test
    fun navigationBar_switchesToBookmarksScreen() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Click on Bookmarks navigation item
        composeTestRule.onNodeWithText("Bookmarks").performClick()
        
        // Wait for screen transition
        composeTestRule.waitForIdle()
        
        // Verify Bookmarks screen is displayed
        composeTestRule.onNodeWithText("Bookmarks").assertExists()
        composeTestRule.onNodeWithText("No bookmarks yet").assertExists()
    }
    
    @Test
    fun navigationBar_switchesToSettingsScreen() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Click on Settings navigation item
        composeTestRule.onNodeWithText("Settings").performClick()
        
        // Wait for screen transition
        composeTestRule.waitForIdle()
        
        // Verify Settings screen is displayed
        composeTestRule.onNodeWithText("Settings Coming Soon").assertExists()
    }
    
    @Test
    fun searchScreen_acceptsTextInput() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        // Navigate to Search screen
        composeTestRule.onNodeWithText("Search").performClick()
        composeTestRule.waitForIdle()
        
        // Find and interact with search field
        composeTestRule.onNodeWithText("Search by Surah name...").performTextInput("Fatihah")
        
        // Wait for search results
        composeTestRule.waitForIdle()
        
        // Verify search results appear
        composeTestRule.onNodeWithText("Al-Fatihah").assertExists()
    }
    
    @Test
    fun surahCard_displaysCorrectInformation() {
        composeTestRule.setContent {
            QuranAppTheme {
                QuranApp()
            }
        }
        
        composeTestRule.waitForIdle()
        
        // Verify surah card content
        composeTestRule.onNodeWithText("Al-Fatihah").assertExists()
        composeTestRule.onNodeWithText("The Opening").assertExists()
        composeTestRule.onNodeWithText("7 verses").assertExists()
        composeTestRule.onNodeWithText("Meccan").assertExists()
        composeTestRule.onNodeWithText("الفاتحة").assertExists()
    }
}
