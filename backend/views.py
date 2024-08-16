from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost, Comment
from .serializers import BlogPostSerializer, UserSerializer, AuthorDetailSerializer, CommentSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import BasePermission


# Create your views here.
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BlogPostListCreateView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ('GET', 'OPTIONS'):
            return True
        return obj.author == request.user

class BlogPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated, IsOwner]


class MyDetailView(generics.RetrieveAPIView):
    serializer_class = AuthorDetailSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        return User.objects.prefetch_related('blogpost_set')

class CommentPostView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)

    def perform_create(self, serializer):
        post_id = self.kwargs['pk']
        serializer.save(user=self.request.user, post_id=post_id)