from django.urls import path
from .views import UserCreateView, BlogPostListCreateView, BlogPostDetailView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('posts/', BlogPostListCreateView.as_view(), name='post_list_create'),
    path('posts/<int:pk>/', BlogPostDetailView.as_view(), name='post_detail'),
]
