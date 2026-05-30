package com.example.lab3.adapters

import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.models.Program

class ProgramAdapter(
    private var programs: List<Program>,
    private var coursesMap: Map<Int, String>,
    private val onCourseClick: (Int, String) -> Unit
) : RecyclerView.Adapter<ProgramAdapter.ViewHolder>() {

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTitle: TextView = view.findViewById(R.id.tvProgramTitle)
        val tvDesc: TextView = view.findViewById(R.id.tvProgramDesc)
        val llCourses: LinearLayout = view.findViewById(R.id.llProgramCourses)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context).inflate(R.layout.item_program, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val program = programs[position]
        holder.tvTitle.text = program.title
        holder.tvDesc.text = program.description ?: "Опис відсутній"

        holder.llCourses.removeAllViews()

        program.courses.forEach { courseId ->
            val courseTitle = coursesMap[courseId] ?: "Курс #$courseId"

            val tvCourseLink = TextView(holder.itemView.context).apply {
                text = "🔗 $courseTitle"
                textSize = 16f
                setTextColor(Color.parseColor("#1565C0"))
                setPadding(0, 8, 0, 8)
                setOnClickListener { onCourseClick(courseId, courseTitle) }
            }
            holder.llCourses.addView(tvCourseLink)
        }
    }

    override fun getItemCount() = programs.size

    fun updateData(newPrograms: List<Program>, newMap: Map<Int, String>) {
        programs = newPrograms
        coursesMap = newMap
        notifyDataSetChanged()
    }
}