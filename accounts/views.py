from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer
from rest_framework.response import Response
from .utils import sendOtp


class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            sendOtp(user['email'])
            # send email function user['email']
            print(user)
            return Response({
                'data': user,
                'message': f'Hi'
                           f'thanks for signing up! Passcode has been sent to your email. Please '
                           f'verify your email to complete the registration.'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
