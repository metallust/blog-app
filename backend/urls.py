from django.urls import path
from .views import UserCreateView, BlogPostListCreateView, BlogPostDetailView, MyDetailView, CommentPostView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # add post and get all posts
    path('posts/', BlogPostListCreateView.as_view(), name='post_list_create'),

    # get post by id
    path('posts/<int:pk>/', BlogPostDetailView.as_view(), name='post_detail'),

    # get user
    path('me/', MyDetailView.as_view(), name="user_detail"),

    path('posts/comments/<int:pk>', CommentPostView.as_view(), name='comment-post'),
]
