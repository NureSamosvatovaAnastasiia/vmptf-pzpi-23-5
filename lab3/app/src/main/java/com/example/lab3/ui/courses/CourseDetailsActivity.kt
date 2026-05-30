package com.example.lab3.ui.courses

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.lab3.R
import com.example.lab3.api.ApiClient
import com.example.lab3.models.ReviewRequest
import kotlinx.coroutines.launch

class CourseDetailsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_course_details)

        val tvCourseTitle = findViewById<TextView>(R.id.tvCourseTitle)
        val etRating = findViewById<EditText>(R.id.etRating)
        val etReviewText = findViewById<EditText>(R.id.etReviewText)
        val btnSubmitReview = findViewById<Button>(R.id.btnSubmitReview)
        val courseId = intent.getIntExtra("COURSE_ID", -1)
        val courseTitle = intent.getStringExtra("COURSE_TITLE") ?: "Деталі курсу"

        tvCourseTitle.text = courseTitle

        btnSubmitReview.setOnClickListener {
            val ratingStr = etRating.text.toString()
            val reviewText = etReviewText.text.toString()

            if (courseId != -1 && ratingStr.isNotEmpty() && reviewText.isNotEmpty()) {
                val rating = ratingStr.toIntOrNull()
                if (rating != null && rating in 1..5) {
                    lifecycleScope.launch {
                        try {
                            val request = ReviewRequest(courseId, rating, reviewText)
                            ApiClient.apiService.addReview(request)
                            Toast.makeText(this@CourseDetailsActivity, "Відгук додано!", Toast.LENGTH_SHORT).show()
                            finish()
                        } catch (e: Exception) {
                            Toast.makeText(this@CourseDetailsActivity, "Помилка при додаванні", Toast.LENGTH_SHORT).show()
                        }
                    }
                } else {
                    Toast.makeText(this, "Рейтинг має бути від 1 до 5", Toast.LENGTH_SHORT).show()
                }
            } else {
                Toast.makeText(this, "Заповніть всі поля", Toast.LENGTH_SHORT).show()
            }
        }
    }
}