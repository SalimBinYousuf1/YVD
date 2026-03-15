package com.quranapp.beautiful.data.repository

import com.quranapp.beautiful.data.model.Ayah
import com.quranapp.beautiful.data.model.Bookmark
import com.quranapp.beautiful.data.model.ReadingProgress
import com.quranapp.beautiful.data.model.Surah
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

class QuranRepository {
    
    private val _bookmarks = MutableStateFlow<List<Bookmark>>(emptyList())
    val bookmarks: Flow<List<Bookmark>> = _bookmarks.asStateFlow()
    
    private val _readingProgress = MutableStateFlow<ReadingProgress?>(null)
    val readingProgress: Flow<ReadingProgress?> = _readingProgress.asStateFlow()
    
    // Sample Surahs data - First 5 Surahs with first ayah
    private val surahs = listOf(
        Surah(
            number = 1,
            name = "الفاتحة",
            englishName = "Al-Fatihah",
            englishNameTranslation = "The Opening",
            numberOfAyahs = 7,
            revelationType = "Meccan",
            ayahs = listOf(
                Ayah(1, 1, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", "In the name of Allah, the Entirely Merciful, the Especially Merciful.", 1),
                Ayah(2, 2, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "All praise is due to Allah, Lord of the worlds -", 1),
                Ayah(3, 3, "الرَّحْمَٰنِ الرَّحِيمِ", "The Entirely Merciful, the Especially Merciful,", 1),
                Ayah(4, 4, "مَالِكِ يَوْمِ الدِّينِ", "Sovereign of the Day of Recompense.", 1),
                Ayah(5, 5, "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "It is You we worship and You we ask for help.", 1),
                Ayah(6, 6, "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "Guide us to the straight path -", 1),
                Ayah(7, 7, "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ", "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.", 1)
            )
        ),
        Surah(
            number = 2,
            name = "البقرة",
            englishName = "Al-Baqarah",
            englishNameTranslation = "The Cow",
            numberOfAyahs = 286,
            revelationType = "Medinan",
            ayahs = listOf(
                Ayah(1, 1, "الم", "Alif, Lam, Meem.", 2),
                Ayah(2, 2, "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ", "This is the Book about which there is no doubt, a guidance for those conscious of Allah -", 2)
            )
        ),
        Surah(
            number = 3,
            name = "آل عمران",
            englishName = "Ali 'Imran",
            englishNameTranslation = "Family of Imran",
            numberOfAyahs = 200,
            revelationType = "Medinan",
            ayahs = listOf(
                Ayah(1, 1, "الم", "Alif, Lam, Meem.", 3),
                Ayah(2, 2, "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.", 3)
            )
        ),
        Surah(
            number = 4,
            name = "النساء",
            englishName = "An-Nisa",
            englishNameTranslation = "The Women",
            numberOfAyahs = 176,
            revelationType = "Medinan",
            ayahs = listOf(
                Ayah(1, 1, "يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ", "O mankind, fear your Lord, who created you from one soul...", 4)
            )
        ),
        Surah(
            number = 5,
            name = "المائدة",
            englishName = "Al-Ma'idah",
            englishNameTranslation = "The Table Spread",
            numberOfAyahs = 120,
            revelationType = "Medinan",
            ayahs = listOf(
                Ayah(1, 1, "يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ", "O you who have believed, fulfill [all] contracts.", 5)
            )
        ),
        Surah(
            number = 112,
            name = "الإخلاص",
            englishName = "Al-Ikhlas",
            englishNameTranslation = "The Sincerity",
            numberOfAyahs = 4,
            revelationType = "Meccan",
            ayahs = listOf(
                Ayah(1, 1, "قُلْ هُوَ اللَّهُ أَحَدٌ", "Say, He is Allah, [who is] One,", 112),
                Ayah(2, 2, "اللَّهُ الصَّمَدُ", "Allah, the Eternal Refuge.", 112),
                Ayah(3, 3, "لَمْ يَلِدْ وَلَمْ يُولَدْ", "He neither begets nor is born,", 112),
                Ayah(4, 4, "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ", "Nor is there to Him any equivalent.", 112)
            )
        )
    )
    
    fun getAllSurahs(): List<Surah> = surahs
    
    fun getSurah(number: Int): Surah? = surahs.find { it.number == number }
    
    fun searchSurahs(query: String): List<Surah> {
        return surahs.filter { surah ->
            surah.name.contains(query, ignoreCase = true) ||
            surah.englishName.contains(query, ignoreCase = true) ||
            surah.englishNameTranslation.contains(query, ignoreCase = true)
        }
    }
    
    suspend fun addBookmark(bookmark: Bookmark) {
        val currentBookmarks = _bookmarks.value.toMutableList()
        val exists = currentBookmarks.any { 
            it.surahNumber == bookmark.surahNumber && it.ayahNumber == bookmark.ayahNumber 
        }
        if (!exists) {
            currentBookmarks.add(bookmark)
            _bookmarks.value = currentBookmarks
        }
    }
    
    suspend fun removeBookmark(bookmark: Bookmark) {
        val currentBookmarks = _bookmarks.value.toMutableList()
        currentBookmarks.removeAll { 
            it.surahNumber == bookmark.surahNumber && it.ayahNumber == bookmark.ayahNumber 
        }
        _bookmarks.value = currentBookmarks
    }
    
    suspend fun updateReadingProgress(progress: ReadingProgress) {
        _readingProgress.value = progress
    }
    
    fun isBookmarked(surahNumber: Int, ayahNumber: Int): Boolean {
        return _bookmarks.value.any { 
            it.surahNumber == surahNumber && it.ayahNumber == ayahNumber 
        }
    }
}
