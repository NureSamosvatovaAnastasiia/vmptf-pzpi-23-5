package com.example.lab3.ui.courses

import android.os.Bundle
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.example.lab3.R

class CourseContentActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_course_content)

        val tvContentTitle = findViewById<TextView>(R.id.tvContentTitle)
        val courseTitle = intent.getStringExtra("COURSE_TITLE") ?: "Назва курсу"

        tvContentTitle.text = "Початок курсу:\n$courseTitle\n\nТут знаходяться лекції, відео та матеріали для навчання..."
    }
}