from rest_framework import serializers
from .models import Service, CompanyStat, ProcessStep, Client, ContactInquiry


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model"""

    class Meta:
        model = Service
        fields = ['id', 'title', 'description', 'icon', 'features', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CompanyStatSerializer(serializers.ModelSerializer):
    """Serializer for CompanyStat model"""

    class Meta:
        model = CompanyStat
        fields = ['id', 'label', 'value', 'description', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ProcessStepSerializer(serializers.ModelSerializer):
    """Serializer for ProcessStep model"""

    class Meta:
        model = ProcessStep
        fields = ['id', 'title', 'description', 'icon', 'points', 'step_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ClientSerializer(serializers.ModelSerializer):
    """Serializer for Client model"""

    class Meta:
        model = Client
        fields = ['id', 'name', 'abbreviation', 'logo_url', 'website', 'description', 'order', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ContactInquirySerializer(serializers.ModelSerializer):
    """Serializer for ContactInquiry model"""

    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']

    def validate_email(self, value):
        """Validate email format"""
        if not value:
            raise serializers.ValidationError("Email is required")
        return value.lower()

    def validate_message(self, value):
        """Validate message length"""
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long")
        return value
