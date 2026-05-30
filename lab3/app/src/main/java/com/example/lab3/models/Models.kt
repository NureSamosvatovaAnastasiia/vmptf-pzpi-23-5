package com.example.lab3.models

data class LoginRequest(val username: String, val password: String)
data class AuthResponse(val token: String, val user: User)
data class User(val id: Int, val username: String)

data class Course(
    val id: Int,
    val title: String,
    val description: String?,
    val author: String?,
    val price: String,
    val rating: Double
)

data class MyCourse(
    val id: Int,
    val title: String,
    val progress: Int,
    val enrolledAt: String
)

data class ReviewRequest(
    val courseId: Int,
    val rating: Int,
    val text: String
)

data class Program(
    val id: Int,
    val title: String,
    val description: String?,
    val courses: List<Int>
)

data class News(
    val id: Int,
    val title: String,
    val content: String,
    val publishedAt: String
)

data class Review(
    val id: Int,
    val rating: Int,
    val text: String?,
    val createdAt: String,
    val user: String
)