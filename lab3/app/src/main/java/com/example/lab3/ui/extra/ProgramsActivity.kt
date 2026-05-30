package com.example.lab3.ui.extra

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.adapters.ProgramAdapter
import com.example.lab3.api.ApiClient
import com.example.lab3.ui.courses.CourseInfoActivity
import kotlinx.coroutines.launch
import kotlin.jvm.java

class ProgramsActivity : AppCompatActivity() {
    private lateinit var programAdapter: ProgramAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_programs)

        val rvPrograms = findViewById<RecyclerView>(R.id.rvPrograms)
        rvPrograms.layoutManager = LinearLayoutManager(this)

        programAdapter = ProgramAdapter(emptyList(), emptyMap()) { courseId, title ->
            val intent = Intent(this, CourseInfoActivity::class.java)
            intent.putExtra("COURSE_ID", courseId)
            startActivity(intent)
        }
        rvPrograms.adapter = programAdapter

        loadProgramsAndCourses()
    }

    private fun loadProgramsAndCourses() {
        lifecycleScope.launch {
            try {
                val programs = ApiClient.apiService.getPrograms()
                val courses = ApiClient.apiService.getCourses()
                val coursesMap = courses.associate { it.id to it.title }

                programAdapter.updateData(programs, coursesMap)
            } catch (e: Exception) {
                Toast.makeText(this@ProgramsActivity, "Помилка завантаження", Toast.LENGTH_SHORT).show()
            }
        }
    }
}