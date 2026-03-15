package com.quranapp.beautiful.ui.screens

import androidx.compose.animation.core.animateDpAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.quranapp.beautiful.data.model.Surah
import com.quranapp.beautiful.data.repository.QuranRepository
import com.quranapp.beautiful.ui.components.SurahCard
import com.quranapp.beautiful.ui.theme.*

@Composable
fun HomeScreen(
    repository: QuranRepository,
    onSurahClick: (Surah) -> Unit,
    modifier: Modifier = Modifier
) {
    val surahs = remember { repository.getAllSurahs() }
    var scrollOffset by remember { mutableStateOf(0.dp) }
    
    LazyColumn(
        modifier = modifier
            .fillMaxSize()
            .background(WarmIvory),
        contentPadding = PaddingValues(bottom = 16.dp)
    ) {
        item {
            // Beautiful Header with gradient
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 20.dp, vertical = 24.dp)
                    .shadow(
                        elevation = 8.dp,
                        shape = RoundedCornerShape(24.dp),
                        ambientColor = ShadowSoft,
                        spotColor = ShadowSoft
                    )
                    .clip(RoundedCornerShape(24.dp))
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(SoftPeach, BlushPink, LavenderLight)
                        )
                    )
                    .padding(28.dp)
            ) {
                Column {
                    Text(
                        text = "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
                        style = MaterialTheme.typography.headlineMedium.copy(
                            fontWeight = FontWeight.Normal,
                            fontSize = 20.sp,
                            lineHeight = 36.sp
                        ),
                        color = ArabicText
                    )
                    
                    Spacer(modifier = Modifier.height(16.dp))
                    
                    Text(
                        text = "Al-Qur'an Al-Kareem",
                        style = MaterialTheme.typography.displaySmall.copy(
                            fontWeight = FontWeight.Bold
                        ),
                        color = TextPrimary
                    )
                    
                    Spacer(modifier = Modifier.height(8.dp))
                    
                    Text(
                        text = "Read, reflect, and connect with the divine words",
                        style = MaterialTheme.typography.bodyLarge,
                        color = TextSecondary
                    )
                }
            }
        }
        
        item {
            Spacer(modifier = Modifier.height(16.dp))
            
            Text(
                text = "Surahs",
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontWeight = FontWeight.Bold
                ),
                color = TextPrimary,
                modifier = Modifier.padding(horizontal = 20.dp, vertical = 8.dp)
            )
            
            Spacer(modifier = Modifier.height(8.dp))
        }
        
        items(surahs, key = { it.number }) { surah ->
            SurahCard(
                surah = surah,
                onClick = { onSurahClick(surah) }
            )
        }
        
        item {
            Spacer(modifier = Modifier.height(100.dp))
        }
    }
}
