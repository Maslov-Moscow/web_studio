from django.db import models


class HeroSection(models.Model):
    """Главная секция (баннер) на домашней странице"""
    badge_text = models.CharField(
        max_length=200,
        verbose_name="Текст бейджа"
    )
    headline = models.TextField(
        verbose_name="Заголовок"
    )
    subheading = models.TextField(
        verbose_name="Подзаголовок"
    )
    primary_cta_text = models.CharField(
        max_length=100,
        verbose_name="Текст основной кнопки"
    )
    primary_cta_url = models.CharField(
        max_length=500,
        verbose_name="URL основной кнопки"
    )
    secondary_cta_text = models.CharField(
        max_length=100,
        verbose_name="Текст вторичной кнопки"
    )
    secondary_cta_url = models.CharField(
        max_length=500,
        verbose_name="URL вторичной кнопки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        verbose_name = "Главная секция"
        verbose_name_plural = "Главная секция"

    def __str__(self):
        return f"Hero Section: {self.headline[:50]}"


class SiteSettings(models.Model):
    """Общие настройки сайта"""
    company_name = models.CharField(
        max_length=200,
        verbose_name="Название компании"
    )
    company_tagline = models.CharField(
        max_length=500,
        verbose_name="Слоган компании"
    )
    company_description = models.TextField(
        verbose_name="Описание компании"
    )
    logo_url = models.URLField(
        blank=True,
        verbose_name="URL логотипа"
    )
    email = models.EmailField(
        verbose_name="Email"
    )
    phone = models.CharField(
        max_length=50,
        verbose_name="Телефон"
    )
    address = models.CharField(
        max_length=500,
        verbose_name="Адрес"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        verbose_name = "Настройки сайта"
        verbose_name_plural = "Настройки сайта"

    def __str__(self):
        return self.company_name


class NavigationItem(models.Model):
    """Элементы навигационного меню"""
    label = models.CharField(
        max_length=100,
        verbose_name="Название"
    )
    href = models.CharField(
        max_length=500,
        verbose_name="Ссылка"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Элемент навигации"
        verbose_name_plural = "Элементы навигации"

    def __str__(self):
        return self.label


class Service(models.Model):
    """Услуги веб-студии"""
    title = models.CharField(
        max_length=200,
        verbose_name="Название"
    )
    description = models.TextField(
        verbose_name="Описание"
    )
    icon = models.CharField(
        max_length=50,
        verbose_name="Иконка",
        help_text="Название иконки (например, 'Search', 'Code', 'Brain')"
    )
    features = models.JSONField(
        verbose_name="Особенности",
        help_text="Список особенностей в формате JSON массива"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

    def __str__(self):
        return self.title


class CompanyStat(models.Model):
    """Статистика и достижения компании"""
    label = models.CharField(
        max_length=200,
        verbose_name="Название"
    )
    value = models.CharField(
        max_length=50,
        verbose_name="Значение"
    )
    description = models.CharField(
        max_length=200,
        verbose_name="Описание"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Статистика компании"
        verbose_name_plural = "Статистика компании"

    def __str__(self):
        return f"{self.label}: {self.value}"


class ProcessStep(models.Model):
    """Шаги рабочего процесса"""
    title = models.CharField(
        max_length=200,
        verbose_name="Название"
    )
    description = models.TextField(
        verbose_name="Описание"
    )
    icon = models.CharField(
        max_length=50,
        verbose_name="Иконка"
    )
    points = models.JSONField(
        verbose_name="Ключевые пункты",
        help_text="Список пунктов в формате JSON массива"
    )
    step_number = models.IntegerField(
        verbose_name="Номер шага"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['step_number']
        verbose_name = "Шаг процесса"
        verbose_name_plural = "Шаги процесса"

    def __str__(self):
        return f"Шаг {self.step_number}: {self.title}"


class Client(models.Model):
    """Клиенты и партнеры"""
    name = models.CharField(
        max_length=200,
        verbose_name="Название"
    )
    abbreviation = models.CharField(
        max_length=10,
        verbose_name="Аббревиатура"
    )
    logo_url = models.URLField(
        blank=True,
        verbose_name="URL логотипа"
    )
    website = models.URLField(
        blank=True,
        verbose_name="Веб-сайт"
    )
    description = models.TextField(
        verbose_name="Описание"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Клиент"
        verbose_name_plural = "Клиенты"

    def __str__(self):
        return self.name


class SocialLink(models.Model):
    """Ссылки на социальные сети"""
    platform = models.CharField(
        max_length=100,
        verbose_name="Платформа"
    )
    url = models.URLField(
        verbose_name="URL"
    )
    icon = models.CharField(
        max_length=50,
        verbose_name="Иконка"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Социальная сеть"
        verbose_name_plural = "Социальные сети"

    def __str__(self):
        return self.platform


class TrustIndicator(models.Model):
    """Индикаторы доверия"""
    COLOR_CHOICES = [
        ('green', 'Зелёный'),
        ('blue', 'Синий'),
        ('purple', 'Фиолетовый'),
        ('red', 'Красный'),
        ('yellow', 'Жёлтый'),
    ]

    text = models.CharField(
        max_length=200,
        verbose_name="Текст"
    )
    color = models.CharField(
        max_length=50,
        choices=COLOR_CHOICES,
        verbose_name="Цвет"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Индикатор доверия"
        verbose_name_plural = "Индикаторы доверия"

    def __str__(self):
        return self.text


class SectionHeader(models.Model):
    """Заголовки секций"""
    SECTION_CHOICES = [
        ('services', 'Услуги'),
        ('about', 'О нас'),
        ('process', 'Процесс'),
        ('clients', 'Клиенты'),
    ]

    section_key = models.CharField(
        max_length=50,
        choices=SECTION_CHOICES,
        unique=True,
        verbose_name="Ключ секции"
    )
    badge_text = models.CharField(
        max_length=200,
        verbose_name="Текст бейджа"
    )
    heading = models.CharField(
        max_length=500,
        verbose_name="Заголовок"
    )
    subheading = models.TextField(
        verbose_name="Подзаголовок"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        verbose_name = "Заголовок секции"
        verbose_name_plural = "Заголовки секций"

    def __str__(self):
        return f"{self.get_section_key_display()}: {self.heading}"


class FooterLinkGroup(models.Model):
    """Группы ссылок в футере"""
    group_name = models.CharField(
        max_length=200,
        verbose_name="Название группы"
    )
    links = models.JSONField(
        verbose_name="Ссылки",
        help_text="Массив объектов {label, href} в формате JSON"
    )
    order = models.IntegerField(
        default=0,
        verbose_name="Порядок сортировки"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Дата обновления"
    )

    class Meta:
        ordering = ['order']
        verbose_name = "Группа ссылок в футере"
        verbose_name_plural = "Группы ссылок в футере"

    def __str__(self):
        return self.group_name


class ContactInquiry(models.Model):
    """Обращения через форму контактов"""
    STATUS_CHOICES = [
        ('new', 'Новое'),
        ('in_progress', 'В обработке'),
        ('completed', 'Завершено'),
        ('spam', 'Спам'),
    ]

    name = models.CharField(
        max_length=200,
        verbose_name="Имя"
    )
    email = models.EmailField(
        verbose_name="Email"
    )
    phone = models.CharField(
        max_length=50,
        blank=True,
        verbose_name="Телефон"
    )
    subject = models.CharField(
        max_length=500,
        verbose_name="Тема"
    )
    message = models.TextField(
        verbose_name="Сообщение"
    )
    is_read = models.BooleanField(
        default=False,
        verbose_name="Прочитано"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Обращение"
        verbose_name_plural = "Обращения"

    def __str__(self):
        return f"{self.name} - {self.subject}"
