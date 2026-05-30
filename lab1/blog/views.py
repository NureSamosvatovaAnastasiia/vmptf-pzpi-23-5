from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import Count
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from .models import Category, Article, Comment


def category_list(request):
    categories = Category.objects.annotate(article_count=Count('articles'))
    return render(request, 'blog/category_list.html', {'categories': categories})

def article_list(request):
    sort_by = request.GET.get('sort', 'pub_date_desc')
    
    articles = Article.objects.annotate(comment_count=Count('comments'))
    
    if sort_by == 'pub_date_asc':
        articles = articles.order_by('pub_date')
    elif sort_by == 'pub_date_desc':
        articles = articles.order_by('-pub_date')
    elif sort_by == 'comments_asc':
        articles = articles.order_by('comment_count')
    elif sort_by == 'comments_desc':
        articles = articles.order_by('-comment_count')

    return render(request, 'blog/article_list.html', {'articles': articles, 'sort_by': sort_by})

def article_detail(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    comments = article.comments.all()
    
    if request.method == 'POST' and request.user.is_authenticated:
        text = request.POST.get('text')
        if text:
            Comment.objects.create(article=article, author=request.user, text=text)
            return redirect('article_detail', article_id=article.id)
            
    return render(request, 'blog/article_detail.html', {'article': article, 'comments': comments})

@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    if request.user == comment.author or request.user.is_superuser:
        article_id = comment.article.id
        comment.delete()
        return redirect('article_detail', article_id=article_id)
    return HttpResponseForbidden("У вас немає прав для видалення цього коментаря.")

@login_required
def delete_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if request.user == article.author or request.user.is_superuser:
        article.delete()
        return redirect('article_list')
    return HttpResponseForbidden("У вас немає прав для видалення цієї статті.")

@login_required
def edit_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    
    if request.user != article.author and not request.user.is_superuser:
        return HttpResponseForbidden("У вас немає прав для редагування цієї статті.")
    
    if request.method == 'POST':
        article.title = request.POST.get('title')
        article.text = request.POST.get('text')
        article.save()
        return redirect('article_detail', article_id=article.id)
        
    return render(request, 'blog/edit_article.html', {'article': article})

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('category_list')
    else:
        form = UserCreationForm()
    return render(request, 'blog/register.html', {'form': form})

def custom_logout(request):
    logout(request)
    return redirect('category_list')