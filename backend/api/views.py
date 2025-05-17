from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TableProperty, QualityMetricsStudentEducation, StudentPerformance, RecommenderDataset

@api_view(['GET'])
def get_data_propertise(request):
    data = list(TableProperty.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
    
@api_view(['GET'])
def get_quality_metrics(request):
    data = list(QualityMetricsStudentEducation.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
    
@api_view(['GET'])
def get_student_perf(request):
    data = list(StudentPerformance.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })

@api_view(['GET'])
def get_recommender_datainfo(request):
    data = list(RecommenderDataset.objects.all().values())
    return Response({
        "message": "Dữ liệu từ MongoDB:",
        "data": data
    })
# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
