package com.example.lab3.ui.auth

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.example.lab3.MainActivity
import com.example.lab3.R
import com.example.lab3.api.ApiClient
import com.example.lab3.models.LoginRequest
import com.example.lab3.ui.courses.CatalogActivity
import kotlinx.coroutines.launch
import kotlin.jvm.java

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val etUsername = findViewById<EditText>(R.id.etUsername)
        val etPassword = findViewById<EditText>(R.id.etPassword)
        val btnLogin = findViewById<Button>(R.id.btnLogin)
        val btnGoToRegister = findViewById<Button>(R.id.btnGoToRegister)

        btnGoToRegister.setOnClickListener {
            startActivity(Intent(this, RegisterActivity::class.java))
        }
        btnLogin.setOnClickListener {
            val username = etUsername.text.toString()
            val password = etPassword.text.toString()

            if (username.isNotEmpty() && password.isNotEmpty()) {
                lifecycleScope.launch {
                    try {
                        val response = ApiClient.apiService.login(LoginRequest(username, password))
                        ApiClient.authToken = response.token

                        Toast.makeText(this@LoginActivity, "Вхід успішний!", Toast.LENGTH_SHORT).show()
                        startActivity(Intent(this@LoginActivity, MainActivity::class.java))
                        finish()
                    } catch (e: Exception) {
                        Log.e("API_ERROR", "Помилка авторизації: ${e.message}", e)
                        Toast.makeText(this@LoginActivity, "Помилка: ${e.message}", Toast.LENGTH_LONG).show()
                    }
                }
            } else {
                Toast.makeText(this, "Введіть логін та пароль", Toast.LENGTH_SHORT).show()
            }
        }
    }
}