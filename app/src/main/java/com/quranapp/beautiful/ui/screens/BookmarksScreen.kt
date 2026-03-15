package com.quranapp.beautiful.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import com.quranapp.beautiful.data.repository.QuranRepository
import com.quranapp.beautiful.ui.theme.*
import kotlinx.coroutines.flow.collectLatest

@Composable
fun BookmarksScreen(
    repository: QuranRepository,
    modifier: Modifier = Modifier
) {
    val bookmarks = remember { mutableStateListOf<com.quranapp.beautiful.data.model.Bookmark>() }
    
    LaunchedEffect(Unit) {
        repository.bookmarks.collectLatest { newBookmarks ->
            bookmarks.clear()
            bookmarks.addAll(newBookmarks)
        }
    }
    
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(WarmIvory)
    ) {
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Bookmarks",
            style = MaterialTheme.typography.displaySmall.copy(
                fontWeight = FontWeight.Bold
            ),
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 20.dp, vertical = 16.dp)
        )
        
        Spacer(modifier = Modifier.height(8.dp))
        
        if (bookmarks.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(40.dp)
                ) {
                    Text(
                        text = "📚",
                        style = MaterialTheme.typography.displayLarge
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "No bookmarks yet",
                        style = MaterialTheme.typography.titleLarge,
                        color = TextSecondary,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Start bookmarking your favorite verses",
                        style = MaterialTheme.typography.bodyMedium,
                        color = TextTertiary,
                        textAlign = TextAlign.Center
                    )
                }
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(bottom = 100.dp)
            ) {
                items(bookmarks, key = { it.id }) { bookmark ->
                    // Here you would show bookmark cards
                    // For now, we'll show a simple text
                    Text(
                        text = "Surah ${bookmark.surahNumber}, Ayah ${bookmark.ayahNumber}",
                        modifier = Modifier.padding(20.dp),
                        style = MaterialTheme.typography.bodyLarge,
                        color = TextPrimary
                    )
                }
            }
        }
    }
}
