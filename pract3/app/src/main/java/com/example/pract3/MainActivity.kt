package com.example.pract3

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private val calendarEvents = mutableMapOf<String, MutableList<String>>()

    private val secretWord = "ОКРОШКА"
    private val guessedLetters = mutableSetOf<Char>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        setupTask1()
        setupTask2()
        setupTask3()
        setupTask4()
    }
    private fun setupTask1() {
        val inputSum1 = findViewById<EditText>(R.id.inputSum1)
        val inputSum2 = findViewById<EditText>(R.id.inputSum2)
        val btnCalculateSum = findViewById<Button>(R.id.btnCalculateSum)
        val tvResultSum = findViewById<TextView>(R.id.tvResultSum)

        btnCalculateSum.setOnClickListener {
            val str1 = inputSum1.text.toString()
            val str2 = inputSum2.text.toString()

            if (str1.isNotEmpty() && str2.isNotEmpty()) {
                val sum = str1.toDouble() + str2.toDouble()
                tvResultSum.text = "Сума: $sum"
            } else {
                tvResultSum.text = "Помилка: введіть обидва числа"
            }
        }
    }

    private fun setupTask2() {
        val inputDate = findViewById<EditText>(R.id.inputDate)
        val inputEvent = findViewById<EditText>(R.id.inputEvent)
        val btnAddEvent = findViewById<Button>(R.id.btnAddEvent)
        val btnViewEvents = findViewById<Button>(R.id.btnViewEvents)
        val tvResultCalendar = findViewById<TextView>(R.id.tvResultCalendar)

        btnAddEvent.setOnClickListener {
            val date = inputDate.text.toString().trim()
            val event = inputEvent.text.toString().trim()

            if (date.isNotEmpty() && event.isNotEmpty()) {
                calendarEvents.getOrPut(date) { mutableListOf() }.add(event)
                tvResultCalendar.text = "Подію додано на $date!"
                inputEvent.text.clear()
            } else {
                tvResultCalendar.text = "Введіть дату та назву події"
            }
        }

        btnViewEvents.setOnClickListener {
            val date = inputDate.text.toString().trim()
            if (date.isNotEmpty()) {
                val events = calendarEvents[date]
                if (events != null && events.isNotEmpty()) {
                    tvResultCalendar.text = "Події на $date:\n" + events.joinToString("\n- ", prefix = "- ")
                } else {
                    tvResultCalendar.text = "На $date подій немає."
                }
            } else {
                tvResultCalendar.text = "Введіть дату для пошуку"
            }
        }
    }


    private fun setupTask3() {
        val tvHiddenWord = findViewById<TextView>(R.id.tvHiddenWord)
        val inputLetter = findViewById<EditText>(R.id.inputLetter)
        val btnGuessLetter = findViewById<Button>(R.id.btnGuessLetter)
        val tvResultGame = findViewById<TextView>(R.id.tvResultGame)
        updateHiddenWordDisplay(tvHiddenWord)

        btnGuessLetter.setOnClickListener {
            val letterStr = inputLetter.text.toString().uppercase()
            if (letterStr.isNotEmpty()) {
                val letter = letterStr[0]
                guessedLetters.add(letter)
                inputLetter.text.clear()

                updateHiddenWordDisplay(tvHiddenWord)

                if (secretWord.contains(letter)) {
                    tvResultGame.text = "Є така літера!"
                } else {
                    tvResultGame.text = "Такої літери немає."
                }

                // Перевірка на перемогу
                if (secretWord.all { guessedLetters.contains(it) }) {
                    tvResultGame.text = "Ви відгадали слово: $secretWord"
                }
            }
        }
    }

    private fun updateHiddenWordDisplay(tv: TextView) {
        val displayStr = secretWord.map { if (guessedLetters.contains(it)) it else '_' }.joinToString(" ")
        tv.text = displayStr
    }
    private fun setupTask4() {
        val inputRoman = findViewById<EditText>(R.id.inputRoman)
        val btnConvertRoman = findViewById<Button>(R.id.btnConvertRoman)
        val tvResultRoman = findViewById<TextView>(R.id.tvResultRoman)

        btnConvertRoman.setOnClickListener {
            val roman = inputRoman.text.toString().uppercase().trim()

            if (roman.isNotEmpty()) {

                val romanRegex = Regex(
                    "^M{0,4}(CM|CD|D?C{0,3})" +
                            "(XC|XL|L?X{0,3})" +
                            "(IX|IV|V?I{0,3})$"
                )

                if (!roman.matches(romanRegex)) {
                    tvResultRoman.text = "Помилка: некоректне римське число"
                    return@setOnClickListener
                }

                try {
                    val arabic = romanToArabic(roman)
                    tvResultRoman.text = "Арабське число: $arabic"
                } catch (e: Exception) {
                    tvResultRoman.text = "Помилка: Невірний формат"
                }
            }
        }
    }
    private fun romanToArabic(s: String): Int {
        val romanValues = mapOf(
            'I' to 1, 'V' to 5, 'X' to 10, 'L' to 50,
            'C' to 100, 'D' to 500, 'M' to 1000
        )

        var total = 0
        var prevValue = 0

        for (i in s.length - 1 downTo 0) {
            val char = s[i]
            val currentValue = romanValues[char] ?: throw IllegalArgumentException("Невідомий символ")
            if (currentValue < prevValue) {
                total -= currentValue
            } else {
                total += currentValue
            }
            prevValue = currentValue
        }
        return total
    }
}