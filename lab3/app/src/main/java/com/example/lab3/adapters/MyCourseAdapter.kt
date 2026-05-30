package com.example.lab3.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ProgressBar
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.models.MyCourse

class MyCourseAdapter(
    private var myCourses: List<MyCourse>,
    private val onCourseClick: (MyCourse) -> Unit
) : RecyclerView.Adapter<MyCourseAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTitle: TextView = view.findViewById(R.id.tvMyCourseTitle)
        val tvStatus: TextView = view.findViewById(R.id.tvMyCourseStatus)
        val pbProgress: ProgressBar = view.findViewById(R.id.pbCourseProgress)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.item_my_course, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val course = myCourses[position]
        holder.tvTitle.text = course.title
        holder.pbProgress.progress = course.progress

        if (course.progress == 100) {
            holder.tvStatus.text = "Курс завершено"
            holder.tvStatus.setTextColor(android.graphics.Color.parseColor("#2E7D32"))
        } else {
            holder.tvStatus.text = "В процесі (${course.progress}%)"
            holder.tvStatus.setTextColor(android.graphics.Color.parseColor("#E65100"))
        }

        holder.itemView.setOnClickListener { onCourseClick(course) }
    }

    override fun getItemCount() = myCourses.size

    fun updateData(newList: List<MyCourse>) {
        myCourses = newList
        notifyDataSetChanged()
    }
}