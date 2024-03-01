from django.urls import path
from .views import GoogleSignInView, GithubOauthSignInView

urlpatterns = [
    path('google/', GoogleSignInView.as_view(), name='google'),
    path('github/', GithubOauthSignInView.as_view(), name='github')
]
