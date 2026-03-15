package com.quranapp.beautiful.data

import com.quranapp.beautiful.data.model.Ayah
import com.quranapp.beautiful.data.model.Bookmark
import com.quranapp.beautiful.data.model.ReadingProgress
import com.quranapp.beautiful.data.model.Surah
import org.junit.Test
import org.junit.Assert.*

class SurahModelTest {
    
    @Test
    fun `Surah creation with all fields`() {
        val ayah = Ayah(
            number = 1,
            numberInSurah = 1,
            text = "Test Arabic Text",
            translation = "Test Translation",
            surahNumber = 1
        )
        
        val surah = Surah(
            number = 1,
            name = "Test Surah",
            englishName = "Test",
            englishNameTranslation = "Testing",
            numberOfAyahs = 1,
            revelationType = "Meccan",
            ayahs = listOf(ayah)
        )
        
        assertEquals(1, surah.number)
        assertEquals("Test Surah", surah.name)
        assertEquals("Test", surah.englishName)
        assertEquals("Testing", surah.englishNameTranslation)
        assertEquals(1, surah.numberOfAyahs)
        assertEquals("Meccan", surah.revelationType)
        assertEquals(1, surah.ayahs.size)
    }
    
    @Test
    fun `Ayah creation with all fields`() {
        val ayah = Ayah(
            number = 1,
            numberInSurah = 1,
            text = "Arabic Text",
            translation = "English Translation",
            surahNumber = 1
        )
        
        assertEquals(1, ayah.number)
        assertEquals(1, ayah.numberInSurah)
        assertEquals("Arabic Text", ayah.text)
        assertEquals("English Translation", ayah.translation)
        assertEquals(1, ayah.surahNumber)
    }
    
    @Test
    fun `Ayah creation with default translation`() {
        val ayah = Ayah(
            number = 1,
            numberInSurah = 1,
            text = "Arabic Text",
            surahNumber = 1
        )
        
        assertEquals("", ayah.translation)
    }
    
    @Test
    fun `Bookmark creation with default values`() {
        val bookmark = Bookmark(
            surahNumber = 1,
            ayahNumber = 5
        )
        
        assertEquals(0, bookmark.id)
        assertEquals(1, bookmark.surahNumber)
        assertEquals(5, bookmark.ayahNumber)
        assertTrue("Timestamp should be set", bookmark.timestamp > 0)
    }
    
    @Test
    fun `Bookmark creation with all fields`() {
        val timestamp = System.currentTimeMillis()
        val bookmark = Bookmark(
            id = 123,
            surahNumber = 2,
            ayahNumber = 10,
            timestamp = timestamp
        )
        
        assertEquals(123, bookmark.id)
        assertEquals(2, bookmark.surahNumber)
        assertEquals(10, bookmark.ayahNumber)
        assertEquals(timestamp, bookmark.timestamp)
    }
    
    @Test
    fun `ReadingProgress creation with default values`() {
        val progress = ReadingProgress(
            surahNumber = 1,
            ayahNumber = 5
        )
        
        assertEquals(1, progress.surahNumber)
        assertEquals(5, progress.ayahNumber)
        assertEquals(0f, progress.percentage, 0.01f)
        assertTrue("LastRead should be set", progress.lastRead > 0)
    }
    
    @Test
    fun `ReadingProgress creation with all fields`() {
        val timestamp = System.currentTimeMillis()
        val progress = ReadingProgress(
            surahNumber = 2,
            ayahNumber = 50,
            percentage = 75.5f,
            lastRead = timestamp
        )
        
        assertEquals(2, progress.surahNumber)
        assertEquals(50, progress.ayahNumber)
        assertEquals(75.5f, progress.percentage, 0.01f)
        assertEquals(timestamp, progress.lastRead)
    }
    
    @Test
    fun `Surah with empty ayahs list`() {
        val surah = Surah(
            number = 1,
            name = "Test",
            englishName = "Test",
            englishNameTranslation = "Test",
            numberOfAyahs = 0,
            revelationType = "Meccan"
        )
        
        assertTrue("Ayahs should be empty", surah.ayahs.isEmpty())
    }
}
