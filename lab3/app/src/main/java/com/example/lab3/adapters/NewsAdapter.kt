package com.example.lab3.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.models.News

class NewsAdapter(private var newsList: List<News>) : RecyclerView.Adapter<NewsAdapter.ViewHolder>() {
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val tvTitle: TextView = view.findViewById(R.id.tvNewsTitle)
        val tvDate: TextView = view.findViewById(R.id.tvNewsDate)
        val tvContent: TextView = view.findViewById(R.id.tvNewsContent)
    }
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) = ViewHolder(
        LayoutInflater.from(parent.context).inflate(R.layout.item_news, parent, false)
    )
    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        val news = newsList[position]
        holder.tvTitle.text = news.title
        holder.tvDate.text = news.publishedAt.substring(0, 10)
        holder.tvContent.text = news.content
    }
    override fun getItemCount() = newsList.size
    fun updateData(newList: List<News>) {
        newsList = newList
        notifyDataSetChanged()
    }
}