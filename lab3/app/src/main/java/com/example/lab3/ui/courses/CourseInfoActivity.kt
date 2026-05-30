package com.example.lab3.ui.courses

import android.graphics.Color
import android.os.Bundle
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.lab3.R
import com.example.lab3.api.ApiClient
import kotlinx.coroutines.launch

class CourseInfoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_course_info)

        val courseId = intent.getIntExtra("COURSE_ID", -1)

        val tvTitle = findViewById<TextView>(R.id.tvInfoTitle)
        val tvDesc = findViewById<TextView>(R.id.tvInfoDesc)
        val tvAuthor = findViewById<TextView>(R.id.tvInfoAuthor)
        val tvPrice = findViewById<TextView>(R.id.tvInfoPrice)
        val btnEnroll = findViewById<Button>(R.id.btnInfoEnroll)

        if (courseId != -1) {
            lifecycleScope.launch {
                try {
                    val course = ApiClient.apiService.getCourseById(courseId)
                    tvTitle.text = course.title
                    tvDesc.text = course.description ?: "Опис відсутній"
                    tvAuthor.text = "Автор: ${course.author ?: "Невідомо"}"
                    tvPrice.text = "Ціна: ${course.price}"

                    val myCourses = ApiClient.apiService.getMyCourses()
                    val isEnrolled = myCourses.any { it.id == courseId }

                    if (isEnrolled) {
                        btnEnroll.text = "Ви вже записані"
                        btnEnroll.isEnabled = false
                        btnEnroll.setBackgroundColor(Color.GRAY)
                    } else {
                        btnEnroll.setOnClickListener {
                            enrollInCourse(courseId, btnEnroll)
                        }
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@CourseInfoActivity, "Помилка завантаження", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }

    private fun enrollInCourse(courseId: Int, btn: Button) {
        lifecycleScope.launch {
            try {
                ApiClient.apiService.enrollInCourse(mapOf("courseId" to courseId))
                Toast.makeText(this@CourseInfoActivity, "Ви успішно записані!", Toast.LENGTH_SHORT).show()

                btn.text = "Ви вже записані"
                btn.isEnabled = false
                btn.setBackgroundColor(Color.GRAY)
            } catch (e: Exception) {
                Toast.makeText(this@CourseInfoActivity, "Помилка запису", Toast.LENGTH_SHORT).show()
            }
        }
    }
}