package com.example.lab3.ui.extra

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.lab3.R
import com.example.lab3.adapters.NewsAdapter
import com.example.lab3.api.ApiClient
import kotlinx.coroutines.launch

class NewsActivity : AppCompatActivity() {
    private lateinit var newsAdapter: NewsAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_news)

        val rvNews = findViewById<RecyclerView>(R.id.rvNews)
        rvNews.layoutManager = LinearLayoutManager(this)

        newsAdapter = NewsAdapter(emptyList())
        rvNews.adapter = newsAdapter

        lifecycleScope.launch {
            try {
                val news = ApiClient.apiService.getNews()
                newsAdapter.updateData(news)
            } catch (e: Exception) {
                Toast.makeText(this@NewsActivity, "Помилка завантаження", Toast.LENGTH_SHORT).show()
            }
        }
    }
}