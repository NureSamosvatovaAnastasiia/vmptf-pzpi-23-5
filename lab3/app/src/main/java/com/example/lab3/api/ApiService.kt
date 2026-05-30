package com.example.lab3.api

import com.example.lab3.models.*
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface ApiService {
    @POST("/api/auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    @POST("/api/auth/register")
    suspend fun register(@Body request: LoginRequest): Response<Any>

    @GET("/api/courses")
    suspend fun getCourses(): List<Course>

    @POST("/api/enroll")
    suspend fun enrollInCourse(@Body body: Map<String, Int>): Response<Unit>

    @GET("/api/users/me/courses")
    suspend fun getMyCourses(): List<MyCourse>

    @POST("/api/courses/reviews")
    suspend fun addReview(@Body review: ReviewRequest): Response<Unit>

    @GET("/api/programs")
    suspend fun getPrograms(): List<Program>

    @GET("/api/news")
    suspend fun getNews(): List<News>

    @GET("/api/courses/{id}/reviews")
    suspend fun getCourseReviews(@Path("id") courseId: Int): List<Review>

    @GET("/api/courses/{id}")
    suspend fun getCourseById(@Path("id") courseId: Int): Course
}