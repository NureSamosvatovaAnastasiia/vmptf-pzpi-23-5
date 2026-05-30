package com.example.lab3.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.models.Course

class CourseAdapter(
    private var courses: List<Course>,
    private var enrolledCourseIds: Set<Int>,
    private val onEnrollClick: (Int) -> Unit,
    private val onCourseClick: (Course) -> Unit
) : RecyclerView.Adapter<CourseAdapter.CourseViewHolder>() {

    class CourseViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTitle: TextView = view.findViewById(R.id.tvTitle)
        val tvAuthor: TextView = view.findViewById(R.id.tvAuthor)
        val tvPrice: TextView = view.findViewById(R.id.tvPrice)
        val tvRating: TextView = view.findViewById(R.id.tvRating)
        val btnEnroll: Button = view.findViewById(R.id.btnEnroll)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CourseViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_course, parent, false)
        return CourseViewHolder(view)
    }

    override fun onBindViewHolder(holder: CourseViewHolder, position: Int) {
        val course = courses[position]

        holder.tvTitle.text = course.title
        holder.tvAuthor.text = "Автор: ${course.author ?: "Невідомо"}"
        holder.tvPrice.text = "Ціна: ${course.price}"
        holder.tvRating.text = "⭐ Рейтинг: ${course.rating}/5"

        if (enrolledCourseIds.contains(course.id)) {
            holder.btnEnroll.text = "Вже записано"
            holder.btnEnroll.isEnabled = false
            holder.btnEnroll.setBackgroundColor(android.graphics.Color.GRAY)
        } else {
            holder.btnEnroll.text = "Записатися"
            holder.btnEnroll.isEnabled = true
            holder.btnEnroll.setOnClickListener { onEnrollClick(course.id) }
        }

        holder.itemView.setOnClickListener { onCourseClick(course) }
    }

    override fun getItemCount() = courses.size

    fun updateData(newCourses: List<Course>, enrolledIds: Set<Int>) {
        courses = newCourses
        enrolledCourseIds = enrolledIds
        notifyDataSetChanged()
    }
}