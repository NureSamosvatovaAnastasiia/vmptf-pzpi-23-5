package com.example.lab3

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.appcompat.app.AppCompatActivity
import com.example.lab3.R
import com.example.lab3.ui.courses.CatalogActivity
import com.example.lab3.ui.courses.MyCoursesActivity
import com.example.lab3.ui.extra.NewsActivity
import com.example.lab3.ui.extra.ProgramsActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.btnCatalog).setOnClickListener {
            startActivity(Intent(this, CatalogActivity::class.java))
        }
        findViewById<Button>(R.id.btnMyCourses).setOnClickListener {
            startActivity(Intent(this, MyCoursesActivity::class.java))
        }
        findViewById<Button>(R.id.btnPrograms).setOnClickListener {
            startActivity(Intent(this, ProgramsActivity::class.java))
        }
        findViewById<Button>(R.id.btnNews).setOnClickListener {
            startActivity(Intent(this, NewsActivity::class.java))
        }
    }
}