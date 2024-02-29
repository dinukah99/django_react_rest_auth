from rest_framework import serializers
from .utils import Google, register_social_user
from .github import Github
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed, ValidationError


class GoogleSignInSerializer(serializers.Serializer):
    access_token = serializers.CharField(min_length=6)

    def validate_access_token(self, access_token):
        google_user_data = Google.validate(access_token)
        try:
            user_id = google_user_data['sub']
        except:
            raise serializers.ValidationError("This token is invalid or has expired")

        if google_user_data['aud'] != settings.GOOGLE_CLIENT_ID:
            raise AuthenticationFailed(detail='Could not verify user')
        email = google_user_data['email']
        first_name = google_user_data['given_name']
        last_name = google_user_data['family_name']
        provider = 'google'

        return register_social_user(provider, email, first_name, last_name)


class GithubOAuthSerializer(serializers.Serializer):
    code = serializers.CharField(min_length=2)

    def validate_code(self, code):
        access_token = Github.exchange_code_for_token(code)
        if access_token:
            user = Github.retrieve_github_user(access_token)
            full_name = user['name']
            email = user['email']
            names = full_name.split(" ")
            first_name = names[0]
            last_name = names[1] if len(names) > 1 else ""
            provider = 'github'
            return register_social_user(provider, email, first_name, last_name)
        else:
            raise ValidationError("This token is invalid or has expired")
