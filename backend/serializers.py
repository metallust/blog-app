from rest_framework import serializers
from django.contrib.auth.models import User
from .models import BlogPost, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class BlogPostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = BlogPost
        fields = '__all__'

class AuthorDetailSerializer(serializers.ModelSerializer):
    posts = BlogPostSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'posts']  # Include any other relevant fields

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['posts'] = BlogPostSerializer(instance.blogpost_set.all(), many=True).data
        return representation

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    post = serializers.ReadOnlyField(source='post.id')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'user', 'post', 'created_at']