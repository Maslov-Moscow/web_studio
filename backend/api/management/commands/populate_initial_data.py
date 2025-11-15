from django.core.management.base import BaseCommand
from api.models import Service, CompanyStat, ProcessStep, Client


class Command(BaseCommand):
    help = 'Populate database with initial data from frontend hardcoded content'

    def handle(self, *args, **kwargs):
        self.stdout.write('Populating initial data...')

        # Clear existing data (optional, be careful in production)
        Service.objects.all().delete()
        CompanyStat.objects.all().delete()
        ProcessStep.objects.all().delete()
        Client.objects.all().delete()

        # Create Services
        services_data = [
            {
                'title': 'SEO & Digital Marketing',
                'description': 'Boost your online visibility and reach your target audience with our comprehensive SEO and digital marketing strategies.',
                'icon': 'Search',
                'features': [
                    'Advanced keyword research and analysis',
                    'On-page and technical SEO optimization',
                    'Content marketing and link building',
                    'Social media marketing campaigns',
                    'Analytics and performance tracking'
                ],
                'order': 1
            },
            {
                'title': 'Custom Software Development',
                'description': 'Transform your business ideas into powerful, scalable software solutions tailored to your unique needs.',
                'icon': 'Code',
                'features': [
                    'Full-stack web application development',
                    'Mobile app development (iOS & Android)',
                    'Cloud-native and microservices architecture',
                    'API development and integration',
                    'Legacy system modernization'
                ],
                'order': 2
            },
            {
                'title': 'AI/LLM Integration Solutions',
                'description': 'Harness the power of artificial intelligence and large language models to automate processes and enhance user experiences.',
                'icon': 'Brain',
                'features': [
                    'Custom ChatGPT and AI chatbot development',
                    'Natural language processing integration',
                    'Machine learning model development',
                    'AI-powered automation workflows',
                    'Intelligent data analysis and insights'
                ],
                'order': 3
            }
        ]

        for service_data in services_data:
            service = Service.objects.create(**service_data)
            self.stdout.write(self.style.SUCCESS(f'Created service: {service.title}'))

        # Create Company Stats
        stats_data = [
            {'label': 'Projects Completed', 'value': '150+', 'description': 'Successful Projects', 'order': 1},
            {'label': 'Client Satisfaction', 'value': '98%', 'description': 'Client Satisfaction', 'order': 2},
            {'label': 'Years Experience', 'value': '5+', 'description': 'Years Experience', 'order': 3},
            {'label': 'Happy Clients', 'value': '80+', 'description': 'Happy Clients', 'order': 4},
            {'label': 'Industry Awards', 'value': '15+', 'description': 'Industry Awards', 'order': 5},
            {'label': 'Client Retention', 'value': '98%', 'description': 'Client Retention', 'order': 6},
        ]

        for stat_data in stats_data:
            stat = CompanyStat.objects.create(**stat_data)
            self.stdout.write(self.style.SUCCESS(f'Created stat: {stat.label}'))

        # Create Process Steps
        process_data = [
            {
                'title': 'Discovery & Analysis',
                'description': 'We start by understanding your business goals, target audience, and project requirements through detailed consultation.',
                'icon': 'Search',
                'points': [
                    'Comprehensive business analysis',
                    'Competitor research',
                    'Goal definition and KPI setting'
                ],
                'step_number': 1
            },
            {
                'title': 'Strategy & Planning',
                'description': 'Our team creates a detailed roadmap and strategy tailored to achieve your objectives efficiently.',
                'icon': 'FileText',
                'points': [
                    'Project scope documentation',
                    'Technology stack selection',
                    'Timeline and milestone planning'
                ],
                'step_number': 2
            },
            {
                'title': 'Development & Testing',
                'description': 'We bring your vision to life using cutting-edge technologies while maintaining rigorous quality standards.',
                'icon': 'Code',
                'points': [
                    'Agile development methodology',
                    'Continuous integration/deployment',
                    'Comprehensive quality assurance'
                ],
                'step_number': 3
            },
            {
                'title': 'Launch & Support',
                'description': 'We ensure a smooth launch and provide ongoing support to guarantee your continued success.',
                'icon': 'Rocket',
                'points': [
                    'Seamless deployment process',
                    'Team training and documentation',
                    'Ongoing maintenance and support'
                ],
                'step_number': 4
            }
        ]

        for step_data in process_data:
            step = ProcessStep.objects.create(**step_data)
            self.stdout.write(self.style.SUCCESS(f'Created process step: {step.title}'))

        # Create Clients
        clients_data = [
            {'name': 'TechCorp', 'abbreviation': 'TC', 'order': 1},
            {'name': 'Digital Solutions', 'abbreviation': 'DS', 'order': 2},
            {'name': 'InnovateCo', 'abbreviation': 'IC', 'order': 3},
            {'name': 'CloudSystems', 'abbreviation': 'CS', 'order': 4},
            {'name': 'DataHub', 'abbreviation': 'DH', 'order': 5},
            {'name': 'SmartBiz', 'abbreviation': 'SB', 'order': 6},
            {'name': 'WebPro', 'abbreviation': 'WP', 'order': 7},
            {'name': 'DevLabs', 'abbreviation': 'DL', 'order': 8},
        ]

        for client_data in clients_data:
            client = Client.objects.create(**client_data)
            self.stdout.write(self.style.SUCCESS(f'Created client: {client.name}'))

        self.stdout.write(self.style.SUCCESS('Successfully populated initial data!'))
