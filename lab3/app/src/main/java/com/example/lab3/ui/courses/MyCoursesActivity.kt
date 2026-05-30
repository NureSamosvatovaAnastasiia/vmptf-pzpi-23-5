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
import com.example.lab3.adapters.MyCourseAdapter
import com.example.lab3.api.ApiClient
import kotlinx.coroutines.launch

class MyCoursesActivity : AppCompatActivity() {
    private lateinit var myCourseAdapter: MyCourseAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_my_courses)

        val rvMyCourses = findViewById<RecyclerView>(R.id.rvMyCourses)
        rvMyCourses.layoutManager = LinearLayoutManager(this)

        myCourseAdapter = MyCourseAdapter(emptyList()) { course ->
            val intent = Intent(this, CourseDetailsActivity::class.java)
            intent.putExtra("COURSE_ID", course.id)
            intent.putExtra("COURSE_TITLE", course.title)
            startActivity(intent)
        }
        rvMyCourses.adapter = myCourseAdapter

        lifecycleScope.launch {
            try {
                val courses = ApiClient.apiService.getMyCourses()
                if (courses.isEmpty()) {
                    Toast.makeText(this@MyCoursesActivity, "Ви ще не записані на жоден курс", Toast.LENGTH_SHORT).show()
                }
                myCourseAdapter.updateData(courses)
            } catch (e: Exception) {
                Toast.makeText(this@MyCoursesActivity, "Помилка: ${e.message}", Toast.LENGTH_LONG).show()
                Log.e("API_ERROR", "Помилка Мої Курси", e)
            }
        }
    }
}