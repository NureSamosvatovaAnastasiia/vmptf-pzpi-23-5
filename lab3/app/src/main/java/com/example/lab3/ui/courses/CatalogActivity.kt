package com.example.lab3.ui.courses

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.adapters.CourseAdapter
import com.example.lab3.api.ApiClient
import kotlinx.coroutines.launch

class CatalogActivity : AppCompatActivity() {
    private lateinit var courseAdapter: CourseAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_catalog)

        val rvCourses = findViewById<RecyclerView>(R.id.rvCourses)
        rvCourses.layoutManager = LinearLayoutManager(this)

        courseAdapter = CourseAdapter(
            courses = emptyList(),
            enrolledCourseIds = emptySet(),
            onEnrollClick = { courseId -> enrollInCourse(courseId) },
            onCourseClick = { course ->
                val intent = Intent(this, CourseReviewsActivity::class.java)
                intent.putExtra("COURSE_ID", course.id)
                intent.putExtra("COURSE_TITLE", course.title)
                startActivity(intent)
            }
        )
        rvCourses.adapter = courseAdapter

        loadData()
    }

    private fun loadData() {
        lifecycleScope.launch {
            try {
                val courses = ApiClient.apiService.getCourses()

                var enrolledIds = emptySet<Int>()
                try {
                    val myCourses = ApiClient.apiService.getMyCourses()
                    enrolledIds = myCourses.map { it.id }.toSet()
                } catch (e: Exception) {
                    Log.e("API_ERROR", "Не вдалося отримати мої курси: ${e.message}")
                }

                courseAdapter.updateData(courses, enrolledIds)
            } catch (e: Exception) {
                Toast.makeText(this@CatalogActivity, "Помилка каталогу: ${e.message}", Toast.LENGTH_LONG).show()
                Log.e("API_ERROR", "Помилка завантаження курсів", e)
            }
        }
    }

    private fun enrollInCourse(courseId: Int) {
        lifecycleScope.launch {
            try {
                ApiClient.apiService.enrollInCourse(mapOf("courseId" to courseId))
                Toast.makeText(this@CatalogActivity, "Ви успішно записані!", Toast.LENGTH_SHORT).show()
                loadData()
            } catch (e: Exception) {
                Toast.makeText(this@CatalogActivity, "Помилка запису: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }
}