package com.example.lab3.ui.courses

import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.adapters.ReviewAdapter
import com.example.lab3.api.ApiClient
import kotlinx.coroutines.launch

class CourseReviewsActivity : AppCompatActivity() {
    private lateinit var reviewAdapter: ReviewAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_course_reviews)

        val tvReviewsTitle = findViewById<TextView>(R.id.tvReviewsTitle)
        val rvReviews = findViewById<RecyclerView>(R.id.rvReviews)
        rvReviews.layoutManager = LinearLayoutManager(this)

        reviewAdapter = ReviewAdapter(emptyList())
        rvReviews.adapter = reviewAdapter

        val courseId = intent.getIntExtra("COURSE_ID", -1)
        val courseTitle = intent.getStringExtra("COURSE_TITLE") ?: "Курс"

        tvReviewsTitle.text = "Відгуки:\n$courseTitle"

        if (courseId != -1) {
            loadReviews(courseId)
        } else {
            Toast.makeText(this, "Помилка ID курсу", Toast.LENGTH_SHORT).show()
        }
    }

    private fun loadReviews(courseId: Int) {
        lifecycleScope.launch {
            try {
                val reviews = ApiClient.apiService.getCourseReviews(courseId)
                if (reviews.isEmpty()) {
                    Toast.makeText(this@CourseReviewsActivity, "Поки що немає відгуків", Toast.LENGTH_SHORT).show()
                } else {
                    reviewAdapter.updateData(reviews)
                }
            } catch (e: Exception) {
                Toast.makeText(this@CourseReviewsActivity, "Помилка завантаження", Toast.LENGTH_SHORT).show()
            }
        }
    }
}