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
import com.quranapp.beautiful.ui.components.SearchBar
import com.quranapp.beautiful.ui.components.SurahCard
import com.quranapp.beautiful.ui.theme.*

@Composable
fun SearchScreen(
    repository: QuranRepository,
    modifier: Modifier = Modifier
) {
    var searchQuery by remember { mutableStateOf("") }
    val searchResults = remember(searchQuery) {
        if (searchQuery.isNotEmpty()) {
            repository.searchSurahs(searchQuery)
        } else {
            emptyList()
        }
    }
    
    Column(
        modifier = modifier
            .fillMaxSize()
            .background(WarmIvory)
    ) {
        Spacer(modifier = Modifier.height(16.dp))
        
        Text(
            text = "Search Qur'an",
            style = MaterialTheme.typography.displaySmall.copy(
                fontWeight = FontWeight.Bold
            ),
            color = TextPrimary,
            modifier = Modifier.padding(horizontal = 20.dp, vertical = 16.dp)
        )
        
        SearchBar(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = "Search by Surah name..."
        )
        
        Spacer(modifier = Modifier.height(16.dp))
        
        if (searchQuery.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(40.dp)
                ) {
                    Text(
                        text = "🔍",
                        style = MaterialTheme.typography.displayLarge
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "Start typing to search",
                        style = MaterialTheme.typography.titleLarge,
                        color = TextSecondary,
                        textAlign = TextAlign.Center
                    )
                }
            }
        } else if (searchResults.isEmpty()) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier.padding(40.dp)
                ) {
                    Text(
                        text = "No results found",
                        style = MaterialTheme.typography.titleLarge,
                        color = TextSecondary,
                        textAlign = TextAlign.Center
                    )
                    Spacer(modifier = Modifier.height(8.dp))
                    Text(
                        text = "Try different keywords",
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
                items(searchResults, key = { it.number }) { surah ->
                    SurahCard(
                        surah = surah,
                        onClick = { /* Navigate to surah */ }
                    )
                }
            }
        }
    }
}
