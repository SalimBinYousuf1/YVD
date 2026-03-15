package com.quranapp.beautiful.data.model

data class Surah(
    val number: Int,
    val name: String,
    val englishName: String,
    val englishNameTranslation: String,
    val numberOfAyahs: Int,
    val revelationType: String,
    val ayahs: List<Ayah> = emptyList()
)

data class Ayah(
    val number: Int,
    val numberInSurah: Int,
    val text: String,
    val translation: String = "",
    val surahNumber: Int
)

data class Bookmark(
    val id: Long = 0,
    val surahNumber: Int,
    val ayahNumber: Int,
    val timestamp: Long = System.currentTimeMillis()
)

data class ReadingProgress(
    val surahNumber: Int,
    val ayahNumber: Int,
    val percentage: Float = 0f,
    val lastRead: Long = System.currentTimeMillis()
)
