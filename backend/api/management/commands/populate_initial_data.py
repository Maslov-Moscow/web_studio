from django.core.management.base import BaseCommand
from api.models import (
    HeroSection, SiteSettings, NavigationItem, Service, CompanyStat,
    ProcessStep, Client, SocialLink, TrustIndicator, SectionHeader,
    FooterLinkGroup
)


class Command(BaseCommand):
    help = 'Заполнение базы данных начальными данными'

    def handle(self, *args, **kwargs):
        self.stdout.write('Заполнение начальными данными...')

        # Очистка существующих данных
        HeroSection.objects.all().delete()
        SiteSettings.objects.all().delete()
        NavigationItem.objects.all().delete()
        Service.objects.all().delete()
        CompanyStat.objects.all().delete()
        ProcessStep.objects.all().delete()
        Client.objects.all().delete()
        SocialLink.objects.all().delete()
        TrustIndicator.objects.all().delete()
        SectionHeader.objects.all().delete()
        FooterLinkGroup.objects.all().delete()

        # Создание HeroSection
        hero = HeroSection.objects.create(
            badge_text='Цифровые решения для современного бизнеса',
            headline='Трансформируйте свой бизнес с помощью передовых цифровых решений',
            subheading='Мы специализируемся на SEO и цифровом маркетинге, разработке программного обеспечения на заказ и интеграции искусственного интеллекта/LLM, чтобы помочь малому и среднему бизнесу в регионе СНГ достичь своих целей цифровой трансформации.',
            primary_cta_text='Start Your Project',
            primary_cta_url='#contact',
            secondary_cta_text='View Our Work',
            secondary_cta_url='#cases'
        )
        self.stdout.write(self.style.SUCCESS(f'Создано: {hero}'))

        # Создание SiteSettings
        settings = SiteSettings.objects.create(
            company_name='WebStudio',
            company_tagline='Transforming businesses through innovative digital solutions',
            company_description='Transforming businesses through innovative digital solutions. Your trusted partner in the CIS region.',
            logo_url='',
            email='info@webstudio.com',
            phone='+1 (234) 567-890',
            address='Moscow, Russia'
        )
        self.stdout.write(self.style.SUCCESS(f'Создано: {settings}'))

        # Создание NavigationItems
        nav_items = [
            {'label': 'Services', 'href': '#services', 'order': 1},
            {'label': 'About', 'href': '#about', 'order': 2},
            {'label': 'Process', 'href': '#process', 'order': 3},
            {'label': 'Contact', 'href': '#contact', 'order': 4},
        ]
        for item_data in nav_items:
            item = NavigationItem.objects.create(**item_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: NavigationItem {item.label}'))

        # Создание Services
        services_data = [
            {
                'title': 'SEO & Digital Marketing',
                'description': 'Boost your online visibility and drive organic traffic with our comprehensive SEO strategies.',
                'icon': 'Search',
                'features': [
                    'Keyword research and optimization',
                    'On-page and technical SEO',
                    'Content marketing strategy',
                    'Link building campaigns'
                ],
                'order': 1
            },
            {
                'title': 'Custom Software Development',
                'description': 'From concept to deployment, we build robust software solutions tailored to your business needs.',
                'icon': 'Code',
                'features': [
                    'Full-stack web development',
                    'Mobile app development',
                    'API development & integration',
                    'Cloud infrastructure setup'
                ],
                'order': 2
            },
            {
                'title': 'AI/LLM Integration',
                'description': 'Leverage the power of AI and large language models to automate and enhance your business processes.',
                'icon': 'Brain',
                'features': [
                    'ChatGPT & GPT-4 integration',
                    'Custom AI chatbots',
                    'Intelligent automation',
                    'Data analysis & insights'
                ],
                'order': 3
            }
        ]
        for service_data in services_data:
            service = Service.objects.create(**service_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: Service {service.title}'))

        # Создание CompanyStats
        stats_data = [
            {'label': 'Projects Completed', 'value': '50+', 'description': 'Successful Projects', 'order': 1},
            {'label': 'Happy Clients', 'value': '30+', 'description': 'Satisfied Clients', 'order': 2},
            {'label': 'Years of Experience', 'value': '5+', 'description': 'Years in Business', 'order': 3},
            {'label': 'Team Members', 'value': '15+', 'description': 'Expert Professionals', 'order': 4},
        ]
        for stat_data in stats_data:
            stat = CompanyStat.objects.create(**stat_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: CompanyStat {stat.label}'))

        # Создание ProcessSteps
        process_data = [
            {
                'title': 'Discovery',
                'description': 'Understanding your business goals and requirements',
                'icon': 'FileSearch',
                'points': [
                    'Initial consultation',
                    'Requirements gathering',
                    'Competitive analysis'
                ],
                'step_number': 1
            },
            {
                'title': 'Planning',
                'description': 'Creating a detailed roadmap for success',
                'icon': 'Lightbulb',
                'points': [
                    'Strategy development',
                    'Resource allocation',
                    'Timeline creation'
                ],
                'step_number': 2
            },
            {
                'title': 'Development',
                'description': 'Building your solution with precision',
                'icon': 'Code2',
                'points': [
                    'Agile development',
                    'Regular updates',
                    'Quality assurance'
                ],
                'step_number': 3
            },
            {
                'title': 'Launch',
                'description': 'Deploying and supporting your success',
                'icon': 'Rocket',
                'points': [
                    'Smooth deployment',
                    'Team training',
                    'Ongoing support'
                ],
                'step_number': 4
            }
        ]
        for step_data in process_data:
            step = ProcessStep.objects.create(**step_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: ProcessStep {step.title}'))

        # Создание Clients
        clients_data = [
            {'name': 'TechCorp Inc.', 'abbreviation': 'TC', 'logo_url': '', 'website': '', 'description': 'Leading technology company', 'order': 1},
            {'name': 'Digital Solutions', 'abbreviation': 'DS', 'logo_url': '', 'website': '', 'description': 'Digital transformation experts', 'order': 2},
            {'name': 'InnovateCo', 'abbreviation': 'IC', 'logo_url': '', 'website': '', 'description': 'Innovation leaders', 'order': 3},
            {'name': 'CloudSystems', 'abbreviation': 'CS', 'logo_url': '', 'website': '', 'description': 'Cloud computing specialists', 'order': 4},
            {'name': 'DataHub', 'abbreviation': 'DH', 'logo_url': '', 'website': '', 'description': 'Data management solutions', 'order': 5},
            {'name': 'SmartBiz', 'abbreviation': 'SB', 'logo_url': '', 'website': '', 'description': 'Smart business solutions', 'order': 6},
        ]
        for client_data in clients_data:
            client = Client.objects.create(**client_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: Client {client.name}'))

        # Создание SocialLinks
        social_links_data = [
            {'platform': 'Facebook', 'url': 'https://facebook.com', 'icon': 'Facebook', 'order': 1},
            {'platform': 'Twitter', 'url': 'https://twitter.com', 'icon': 'Twitter', 'order': 2},
            {'platform': 'LinkedIn', 'url': 'https://linkedin.com', 'icon': 'Linkedin', 'order': 3},
            {'platform': 'Github', 'url': 'https://github.com', 'icon': 'Github', 'order': 4},
        ]
        for link_data in social_links_data:
            link = SocialLink.objects.create(**link_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: SocialLink {link.platform}'))

        # Создание TrustIndicators
        trust_indicators_data = [
            {'text': '100% Money Back Guarantee', 'color': 'green', 'order': 1},
            {'text': 'SSL Secured Payment', 'color': 'blue', 'order': 2},
            {'text': '24/7 Customer Support', 'color': 'purple', 'order': 3},
        ]
        for indicator_data in trust_indicators_data:
            indicator = TrustIndicator.objects.create(**indicator_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: TrustIndicator {indicator.text}'))

        # Создание SectionHeaders
        section_headers_data = [
            {
                'section_key': 'services',
                'badge_text': 'Our Services',
                'heading': 'Complete Digital Solutions for Your Business',
                'subheading': 'From strategy to implementation, we provide end-to-end digital services to help you succeed in the modern marketplace.'
            },
            {
                'section_key': 'about',
                'badge_text': 'About Us',
                'heading': 'Your Trusted Digital Partner',
                'subheading': 'We are a team of passionate professionals dedicated to delivering innovative digital solutions that drive real business results.'
            },
            {
                'section_key': 'process',
                'badge_text': 'Our Process',
                'heading': 'How We Work',
                'subheading': 'Our proven methodology ensures successful project delivery from concept to launch and beyond.'
            },
            {
                'section_key': 'clients',
                'badge_text': 'Our Clients',
                'heading': 'Trusted by Leading Companies',
                'subheading': 'We are proud to work with innovative companies across various industries.'
            },
        ]
        for header_data in section_headers_data:
            header = SectionHeader.objects.create(**header_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: SectionHeader {header.section_key}'))

        # Создание FooterLinkGroups
        footer_groups_data = [
            {
                'group_name': 'Quick Links',
                'links': [
                    {'label': 'Services', 'href': '#services'},
                    {'label': 'About Us', 'href': '#about'},
                    {'label': 'Our Process', 'href': '#process'},
                    {'label': 'Contact', 'href': '#contact'}
                ],
                'order': 1
            },
            {
                'group_name': 'Services',
                'links': [
                    {'label': 'SEO & Marketing', 'href': '#services'},
                    {'label': 'Web Development', 'href': '#services'},
                    {'label': 'AI Integration', 'href': '#services'}
                ],
                'order': 2
            },
            {
                'group_name': 'Company',
                'links': [
                    {'label': 'About', 'href': '#about'},
                    {'label': 'Careers', 'href': '#careers'},
                    {'label': 'Privacy Policy', 'href': '#privacy'}
                ],
                'order': 3
            },
        ]
        for group_data in footer_groups_data:
            group = FooterLinkGroup.objects.create(**group_data)
            self.stdout.write(self.style.SUCCESS(f'Создано: FooterLinkGroup {group.group_name}'))

        self.stdout.write(self.style.SUCCESS('Начальные данные успешно загружены!'))
