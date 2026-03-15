package com.quranapp.beautiful.data

import com.quranapp.beautiful.data.model.Bookmark
import com.quranapp.beautiful.data.model.ReadingProgress
import com.quranapp.beautiful.data.repository.QuranRepository
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.test.runTest
import org.junit.Before
import org.junit.Test
import org.junit.Assert.*

class QuranRepositoryTest {
    
    private lateinit var repository: QuranRepository
    
    @Before
    fun setup() {
        repository = QuranRepository()
    }
    
    @Test
    fun `getAllSurahs returns non-empty list`() {
        val surahs = repository.getAllSurahs()
        assertTrue("Surahs list should not be empty", surahs.isNotEmpty())
    }
    
    @Test
    fun `getAllSurahs returns correct number of surahs`() {
        val surahs = repository.getAllSurahs()
        assertEquals("Should return 6 sample surahs", 6, surahs.size)
    }
    
    @Test
    fun `getSurah returns correct surah by number`() {
        val surah = repository.getSurah(1)
        assertNotNull("Surah 1 should exist", surah)
        assertEquals("Al-Fatihah", surah?.englishName)
        assertEquals("The Opening", surah?.englishNameTranslation)
    }
    
    @Test
    fun `getSurah returns null for non-existent surah`() {
        val surah = repository.getSurah(999)
        assertNull("Non-existent surah should return null", surah)
    }
    
    @Test
    fun `searchSurahs finds surah by English name`() {
        val results = repository.searchSurahs("Fatihah")
        assertEquals("Should find 1 result", 1, results.size)
        assertEquals("Al-Fatihah", results[0].englishName)
    }
    
    @Test
    fun `searchSurahs is case insensitive`() {
        val results = repository.searchSurahs("FATIHAH")
        assertEquals("Should find 1 result", 1, results.size)
    }
    
    @Test
    fun `searchSurahs finds surah by translation`() {
        val results = repository.searchSurahs("Opening")
        assertTrue("Should find results", results.isNotEmpty())
        assertTrue("Should contain Al-Fatihah", 
            results.any { it.englishName == "Al-Fatihah" })
    }
    
    @Test
    fun `searchSurahs returns empty list for no matches`() {
        val results = repository.searchSurahs("NonexistentSurah")
        assertTrue("Should return empty list", results.isEmpty())
    }
    
    @Test
    fun `addBookmark adds bookmark successfully`() = runTest {
        val bookmark = Bookmark(surahNumber = 1, ayahNumber = 1)
        repository.addBookmark(bookmark)
        
        val bookmarks = repository.bookmarks.first()
        assertEquals("Should have 1 bookmark", 1, bookmarks.size)
        assertTrue("Bookmark should be added", bookmarks.contains(bookmark))
    }
    
    @Test
    fun `addBookmark does not add duplicate`() = runTest {
        val bookmark = Bookmark(surahNumber = 1, ayahNumber = 1)
        repository.addBookmark(bookmark)
        repository.addBookmark(bookmark)
        
        val bookmarks = repository.bookmarks.first()
        assertEquals("Should have only 1 bookmark", 1, bookmarks.size)
    }
    
    @Test
    fun `removeBookmark removes bookmark successfully`() = runTest {
        val bookmark = Bookmark(surahNumber = 1, ayahNumber = 1)
        repository.addBookmark(bookmark)
        repository.removeBookmark(bookmark)
        
        val bookmarks = repository.bookmarks.first()
        assertTrue("Bookmarks should be empty", bookmarks.isEmpty())
    }
    
    @Test
    fun `isBookmarked returns true for bookmarked ayah`() = runTest {
        val bookmark = Bookmark(surahNumber = 1, ayahNumber = 1)
        repository.addBookmark(bookmark)
        
        assertTrue("Should be bookmarked", 
            repository.isBookmarked(1, 1))
    }
    
    @Test
    fun `isBookmarked returns false for non-bookmarked ayah`() {
        assertFalse("Should not be bookmarked", 
            repository.isBookmarked(1, 1))
    }
    
    @Test
    fun `updateReadingProgress updates progress`() = runTest {
        val progress = ReadingProgress(surahNumber = 2, ayahNumber = 5, percentage = 50f)
        repository.updateReadingProgress(progress)
        
        val readingProgress = repository.readingProgress.first()
        assertNotNull("Reading progress should be set", readingProgress)
        assertEquals("Should be surah 2", 2, readingProgress?.surahNumber)
        assertEquals("Should be ayah 5", 5, readingProgress?.ayahNumber)
        assertEquals("Should be 50%", 50f, readingProgress?.percentage)
    }
    
    @Test
    fun `surah contains correct number of ayahs`() {
        val surah = repository.getSurah(1)
        assertNotNull("Surah should exist", surah)
        assertEquals("Al-Fatihah should have 7 ayahs", 7, surah?.numberOfAyahs)
        assertEquals("Ayahs list should have 7 items", 7, surah?.ayahs?.size)
    }
    
    @Test
    fun `surah ayahs are in correct order`() {
        val surah = repository.getSurah(1)
        assertNotNull("Surah should exist", surah)
        
        val ayahNumbers = surah?.ayahs?.map { it.numberInSurah }
        assertEquals("First ayah should be 1", 1, ayahNumbers?.get(0))
        assertEquals("Last ayah should be 7", 7, ayahNumbers?.get(6))
    }
    
    @Test
    fun `surah has correct revelation type`() {
        val meccanSurah = repository.getSurah(1)
        assertEquals("Should be Meccan", "Meccan", meccanSurah?.revelationType)
        
        val medinanSurah = repository.getSurah(2)
        assertEquals("Should be Medinan", "Medinan", medinanSurah?.revelationType)
    }
}
