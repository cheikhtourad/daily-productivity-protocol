'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ar' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, unknown>) => string
  dir: 'rtl' | 'ltr'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  ar: {
    // App Title & Main
    'app.title': 'البروتوكول اليومي',
    'app.subtitle': 'نظام الإنتاجية الشامل',
    'app.description': 'المنهجية العملية',
    'app.footer': 'تطبيق البروتوكول اليومي - نظام إنتاجية شامل مع منهجيات علمية مثبتة',
    
    // Time & Navigation
    'time.current': 'الوقت الحالي',
    'activity.current': 'النشاط الحالي',
    'loading': 'جاري التحميل...',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب جديد',
    'auth.logout': 'تسجيل الخروج',
    'auth.username': 'اسم المستخدم',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.create_account': 'إنشاء حساب',
    'auth.have_account': 'لديك حساب بالفعل؟',
    'auth.no_account': 'ليس لديك حساب؟',
    'auth.welcome': 'مرحباً',
    'auth.tip': 'نصيحة: البيانات محفوظة محلياً في متصفحك فقط',
    
    // Validation
    'validation.required_fields': 'يرجى ملء جميع الحقول المطلوبة',
    'validation.username_min': 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل',
    'validation.password_min': 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    'validation.invalid_credentials': 'اسم المستخدم أو كلمة المرور غير صحيحة',
    'validation.user_exists': 'اسم المستخدم موجود بالفعل',
    'validation.email_required': 'يرجى إدخال البريد الإلكتروني',
    
    // Tabs & Navigation
    'tabs.daily_activities': 'الأنشطة اليومية',
    'tabs.custom_tasks': 'المهام المخصصة',
    
    // Tasks
    'tasks.add': 'إضافة مهمة',
    'tasks.edit': 'تعديل المهمة',
    'tasks.delete': 'حذف المهمة',
    'tasks.complete': 'تأشير كمنجز',
    'tasks.incomplete': 'إلغاء إنجاز المهمة',
    'tasks.title': 'عنوان المهمة',
    'tasks.description': 'الوصف (اختياري)',
    'tasks.category': 'الفئة',
    'tasks.start_time': 'وقت البداية',
    'tasks.end_time': 'وقت النهاية',
    'tasks.save_changes': 'حفظ التغييرات',
    'tasks.cancel': 'إلغاء',
    'tasks.empty': 'لا توجد مهام مخصصة بعد',
    'tasks.empty_subtitle': 'أضف مهمة جديدة لتبدأ في تنظيم يومك',
    'tasks.confirm_delete': 'هل أنت متأكد من حذف هذه المهمة؟',
    
    // Task Categories
    'category.work': 'العمل',
    'category.health': 'الصحة',
    'category.education': 'التعليم',
    'category.family': 'الأسرة',
    'category.hobbies': 'الهوايات',
    'category.personal': 'المهام الشخصية',
    'category.other': 'أخرى',
    
    // Task Validation
    'task.validation.title_required': 'يرجى إدخال عنوان المهمة',
    'task.validation.time_required': 'يرجى تحديد أوقات البداية والنهاية',
    'task.validation.time_order': 'وقت النهاية يجب أن يكون بعد وقت البداية',
    
    // Progress & Timer
    'progress.reset': 'إعادة تعيين التقدم',
    'progress.reset_warning': 'هذا سيمحو كل التقدم المحفوظ',
    'timer.focus': 'فترة تركيز',
    'timer.break': 'استراحة',
    
    // Task Form
    'task.edit_task': 'تعديل المهمة',
    'task.add_new_task': 'إضافة مهمة جديدة',
    'task.form.title': 'عنوان المهمة',
    'task.form.description': 'الوصف (اختياري)',
    'task.form.category': 'الفئة',
    'task.form.start_time': 'وقت البداية',
    'task.form.end_time': 'وقت النهاية',
    'task.form.cancel': 'إلغاء',
    'task.form.save_changes': 'حفظ التغييرات',
    'task.form.add_task': 'إضافة المهمة',
    'task.form.title_placeholder': 'أدخل عنوان المهمة',
    'task.form.description_placeholder': 'أدخل وصف المهمة',
    
    // Activity
    'activity.show_details': 'عرض التفاصيل',
    'activity.mark_complete': 'تمام',
    'activity.unmark_complete': 'إلغاء التمام',
    'activity.process': 'العملية',
    'activity.methodology': 'المنهجية',
    
    // Progress Dashboard
    'progress.daily_progress_dashboard': 'لوحة التقدم اليومي',
    'progress.overall_progress': 'التقدم العام',
    'progress.congratulations_complete': 'مبروك! تمام إنجاز جميع الأنشطة اليوم',
    'progress.excellent_performance': 'أداء ممتاز! أكمل المتبقي لإنجاز مثالي',
    'progress.halfway_there': 'في منتصف الطريق! استمر بنفس القوة',
    'progress.strong_start': 'البداية القوية مفتاح النجاح!',
    
    // Timer
    'timer.pomodoro_timer': 'مؤقت بوموردو',
    'timer.current_activity': 'النشاط الحالي',
    'timer.work': 'عمل',
    'timer.start': 'ابدأ',
    'timer.pause': 'توقف',
    'timer.reset': 'إعادة تعيين',
    'timer.completed_cycles': 'الدورات المكتملة',
    'timer.work_break_duration': '25 دقيقة عمل • 5 دقائق استراحة',
    'timer.break_ended': 'استراحة انتهت!',
    'timer.work_session_ended': 'جلسة عمل انتهت!',
    'timer.back_to_work': 'وقت العودة للعمل',
    'timer.break_time': 'وقت الاستراحة',
    
    // Categories
    'category.spiritual': 'روحية',
    
    // Import
    'import.bulk_task_import': 'استيراد مهام متعددة',
    'import.file_upload': 'رفع ملف',
    'import.text_input': 'إدخال نصي',
    'import.template': 'قالب',
    'import.file_upload_instructions': 'ارفع ملف Excel أو CSV يحتوي على مهامك',
    'import.supported_formats': 'الصيغ المدعومة',
    'import.required_columns': 'الأعمدة المطلوبة',
    'import.optional_columns': 'الأعمدة الاختيارية',
    'import.choose_file': 'اختر ملف',
    'import.processing': 'جاري المعالجة...',
    'import.drag_drop_hint': 'أو اسحب وأفلت الملف هنا',
    'import.text_format_instructions': 'أدخل كل مهمة في سطر منفصل باستخدام الرمز |',
    'import.text_format_example': 'العنوان | الوصف | الفئة | وقت البداية | وقت النهاية',
    'import.text_placeholder': 'مثال:\nاجتماع فريق | مناقشة المشروع | work | 09:00 | 10:30\nتمرين | تمرين صباحي | health | 07:00 | 08:00',
    'import.parse_text': 'تحليل النص',
    'import.template_instructions': 'حمّل قالب Excel لمعرفة التنسيق الصحيح',
    'import.column_descriptions': 'وصف الأعمدة',
    'import.column_title_desc': 'عنوان المهمة (مطلوب)',
    'import.column_description_desc': 'وصم المهمة (اختياري)',
    'import.column_time_desc': 'صيغة HH:MM (مثال: 09:30)',
    'import.download_template': 'تحميل القالب',
    'import.no_valid_tasks': 'لم يتم العثور على مهام صالحة في الملف',
    'import.file_parse_error': 'خطأ في تحليل الملف',
    'import.unsupported_file_type': 'نوع ملف غير مدعوم',
    'import.empty_text': 'يرجى إدخال نص',
    'import.text_parse_error': 'خطأ في تحليل النص',
    'import.preview_title': 'معاينة المهام',
    'import.tasks_found': 'مهام موجودة',
    'import.clear': 'مسح',
    'import.import_tasks': 'استيراد المهام',
    'import.success_message': 'تم استيراد {count} مهمة بنجاح!',
    
    // Form Placeholders
    'placeholder.username': 'أدخل اسم المستخدم',
    'placeholder.email': 'أدخل البريد الإلكتروني',
    'placeholder.password': 'أدخل كلمة المرور',
    'placeholder.task_title': 'أدخل عنوان المهمة',
    'placeholder.task_description': 'أدخل وصف المهمة',
  },
  
  en: {
    // App Title & Main
    'app.title': 'Daily Protocol',
    'app.subtitle': 'Comprehensive Productivity System',
    'app.description': 'Practical Methodology',
    'app.footer': 'Daily Protocol App - Comprehensive productivity system with proven scientific methodologies',
    
    // Time & Navigation
    'time.current': 'Current Time',
    'activity.current': 'Current Activity',
    'loading': 'Loading...',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Create New Account',
    'auth.logout': 'Logout',
    'auth.username': 'Username',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.create_account': 'Create Account',
    'auth.have_account': 'Already have an account?',
    'auth.no_account': "Don't have an account?",
    'auth.welcome': 'Welcome',
    'auth.tip': 'Tip: Data is stored locally in your browser only',
    
    // Validation
    'validation.required_fields': 'Please fill in all required fields',
    'validation.username_min': 'Username must be at least 3 characters',
    'validation.password_min': 'Password must be at least 6 characters',
    'validation.invalid_credentials': 'Invalid username or password',
    'validation.user_exists': 'Username already exists',
    'validation.email_required': 'Please enter email address',
    
    // Tabs & Navigation
    'tabs.daily_activities': 'Daily Activities',
    'tabs.custom_tasks': 'Custom Tasks',
    
    // Tasks
    'tasks.add': 'Add Task',
    'tasks.edit': 'Edit Task',
    'tasks.delete': 'Delete Task',
    'tasks.complete': 'Mark as Complete',
    'tasks.incomplete': 'Mark as Incomplete',
    'tasks.title': 'Task Title',
    'tasks.description': 'Description (Optional)',
    'tasks.category': 'Category',
    'tasks.start_time': 'Start Time',
    'tasks.end_time': 'End Time',
    'tasks.save_changes': 'Save Changes',
    'tasks.cancel': 'Cancel',
    'tasks.empty': 'No custom tasks yet',
    'tasks.empty_subtitle': 'Add a new task to start organizing your day',
    'tasks.confirm_delete': 'Are you sure you want to delete this task?',
    
    // Task Categories
    'category.work': 'Work',
    'category.health': 'Health',
    'category.education': 'Education',
    'category.family': 'Family',
    'category.hobbies': 'Hobbies',
    'category.personal': 'Personal Tasks',
    'category.other': 'Other',
    
    // Task Validation
    'task.validation.title_required': 'Please enter task title',
    'task.validation.time_required': 'Please set start and end times',
    'task.validation.time_order': 'End time must be after start time',
    
    // Progress & Timer
    'progress.reset': 'Reset Progress',
    'progress.reset_warning': 'This will clear all saved progress',
    'timer.focus': 'Focus Session',
    'timer.break': 'Break Time',
    
    // Task Form
    'task.edit_task': 'Edit Task',
    'task.add_new_task': 'Add New Task',
    'task.form.title': 'Task Title',
    'task.form.description': 'Description (Optional)',
    'task.form.category': 'Category',
    'task.form.start_time': 'Start Time',
    'task.form.end_time': 'End Time',
    'task.form.cancel': 'Cancel',
    'task.form.save_changes': 'Save Changes',
    'task.form.add_task': 'Add Task',
    'task.form.title_placeholder': 'Enter task title',
    'task.form.description_placeholder': 'Enter task description',
    
    // Activity
    'activity.show_details': 'Show Details',
    'activity.mark_complete': 'Complete',
    'activity.unmark_complete': 'Undo Complete',
    'activity.process': 'Process',
    'activity.methodology': 'Methodology',
    
    // Progress Dashboard
    'progress.daily_progress_dashboard': 'Daily Progress Dashboard',
    'progress.overall_progress': 'Overall Progress',
    'progress.congratulations_complete': 'Congratulations! All activities completed today',
    'progress.excellent_performance': 'Excellent performance! Complete the remaining for perfect achievement',
    'progress.halfway_there': 'Halfway there! Keep up the momentum',
    'progress.strong_start': 'Strong start is the key to success!',
    
    // Timer
    'timer.pomodoro_timer': 'Pomodoro Timer',
    'timer.current_activity': 'Current Activity',
    'timer.work': 'Work',
    'timer.start': 'Start',
    'timer.pause': 'Pause',
    'timer.reset': 'Reset',
    'timer.completed_cycles': 'Completed Cycles',
    'timer.work_break_duration': '25 minutes work • 5 minutes break',
    'timer.break_ended': 'Break ended!',
    'timer.work_session_ended': 'Work session ended!',
    'timer.back_to_work': 'Time to get back to work',
    'timer.break_time': 'Break time',
    
    // Categories
    'category.spiritual': 'Spiritual',
    
    // Import
    'import.bulk_task_import': 'Bulk Task Import',
    'import.file_upload': 'File Upload',
    'import.text_input': 'Text Input',
    'import.template': 'Template',
    'import.file_upload_instructions': 'Upload an Excel or CSV file containing your tasks',
    'import.supported_formats': 'Supported formats',
    'import.required_columns': 'Required columns',
    'import.optional_columns': 'Optional columns',
    'import.choose_file': 'Choose File',
    'import.processing': 'Processing...',
    'import.drag_drop_hint': 'Or drag and drop file here',
    'import.text_format_instructions': 'Enter each task on a separate line using | as separator',
    'import.text_format_example': 'Title | Description | Category | Start Time | End Time',
    'import.text_placeholder': 'Example:\nTeam Meeting | Project discussion | work | 09:00 | 10:30\nExercise | Morning workout | health | 07:00 | 08:00',
    'import.parse_text': 'Parse Text',
    'import.template_instructions': 'Download an Excel template to see the correct format',
    'import.column_descriptions': 'Column Descriptions',
    'import.column_title_desc': 'Task title (required)',
    'import.column_description_desc': 'Task description (optional)',
    'import.column_time_desc': 'HH:MM format (e.g., 09:30)',
    'import.download_template': 'Download Template',
    'import.no_valid_tasks': 'No valid tasks found in the file',
    'import.file_parse_error': 'Error parsing file',
    'import.unsupported_file_type': 'Unsupported file type',
    'import.empty_text': 'Please enter some text',
    'import.text_parse_error': 'Error parsing text',
    'import.preview_title': 'Task Preview',
    'import.tasks_found': 'tasks found',
    'import.clear': 'Clear',
    'import.import_tasks': 'Import Tasks',
    'import.success_message': 'Successfully imported {count} tasks!',
    
    // Form Placeholders
    'placeholder.username': 'Enter username',
    'placeholder.email': 'Enter email address',
    'placeholder.password': 'Enter password',
    'placeholder.task_title': 'Enter task title',
    'placeholder.task_description': 'Enter task description',
  },
  
  fr: {
    // App Title & Main
    'app.title': 'Protocole Quotidien',
    'app.subtitle': 'Système de Productivité Complet',
    'app.description': 'Méthodologie Pratique',
    'app.footer': 'App Protocole Quotidien - Système de productivité complet avec des méthodologies scientifiques éprouvées',
    
    // Time & Navigation
    'time.current': 'Heure Actuelle',
    'activity.current': 'Activité Actuelle',
    'loading': 'Chargement...',
    
    // Auth
    'auth.login': 'Connexion',
    'auth.register': 'Créer un Nouveau Compte',
    'auth.logout': 'Déconnexion',
    'auth.username': "Nom d'utilisateur",
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.create_account': 'Créer un compte',
    'auth.have_account': 'Vous avez déjà un compte ?',
    'auth.no_account': "Vous n'avez pas de compte ?",
    'auth.welcome': 'Bienvenue',
    'auth.tip': 'Astuce : Les données sont stockées localement dans votre navigateur uniquement',
    
    // Validation
    'validation.required_fields': 'Veuillez remplir tous les champs requis',
    'validation.username_min': "Le nom d'utilisateur doit contenir au moins 3 caractères",
    'validation.password_min': 'Le mot de passe doit contenir au moins 6 caractères',
    'validation.invalid_credentials': "Nom d'utilisateur ou mot de passe incorrect",
    'validation.user_exists': "Le nom d'utilisateur existe déjà",
    'validation.email_required': "Veuillez saisir l'adresse email",
    
    // Tabs & Navigation
    'tabs.daily_activities': 'Activités Quotidiennes',
    'tabs.custom_tasks': 'Tâches Personnalisées',
    
    // Tasks
    'tasks.add': 'Ajouter une Tâche',
    'tasks.edit': 'Modifier la Tâche',
    'tasks.delete': 'Supprimer la Tâche',
    'tasks.complete': 'Marquer comme Terminé',
    'tasks.incomplete': 'Marquer comme Non Terminé',
    'tasks.title': 'Titre de la Tâche',
    'tasks.description': 'Description (Optionnelle)',
    'tasks.category': 'Catégorie',
    'tasks.start_time': 'Heure de Début',
    'tasks.end_time': 'Heure de Fin',
    'tasks.save_changes': 'Enregistrer les Modifications',
    'tasks.cancel': 'Annuler',
    'tasks.empty': 'Aucune tâche personnalisée pour le moment',
    'tasks.empty_subtitle': 'Ajoutez une nouvelle tâche pour commencer à organiser votre journée',
    'tasks.confirm_delete': 'Êtes-vous sûr de vouloir supprimer cette tâche ?',
    
    // Task Categories
    'category.work': 'Travail',
    'category.health': 'Santé',
    'category.education': 'Éducation',
    'category.family': 'Famille',
    'category.hobbies': 'Loisirs',
    'category.personal': 'Tâches Personnelles',
    'category.other': 'Autre',
    
    // Task Validation
    'task.validation.title_required': 'Veuillez saisir le titre de la tâche',
    'task.validation.time_required': 'Veuillez définir les heures de début et de fin',
    'task.validation.time_order': "L'heure de fin doit être postérieure à l'heure de début",
    
    // Progress & Timer
    'progress.reset': 'Réinitialiser le Progrès',
    'progress.reset_warning': 'Ceci effacera tous les progrès sauvegardés',
    'timer.focus': 'Session de Concentration',
    'timer.break': 'Temps de Pause',
    
    // Task Form
    'task.edit_task': 'Modifier la Tâche',
    'task.add_new_task': 'Ajouter une Nouvelle Tâche',
    'task.form.title': 'Titre de la Tâche',
    'task.form.description': 'Description (Optionnelle)',
    'task.form.category': 'Catégorie',
    'task.form.start_time': 'Heure de Début',
    'task.form.end_time': 'Heure de Fin',
    'task.form.cancel': 'Annuler',
    'task.form.save_changes': 'Enregistrer les Modifications',
    'task.form.add_task': 'Ajouter la Tâche',
    'task.form.title_placeholder': 'Saisir le titre de la tâche',
    'task.form.description_placeholder': 'Saisir la description de la tâche',
    
    // Activity
    'activity.show_details': 'Afficher les Détails',
    'activity.mark_complete': 'Terminé',
    'activity.unmark_complete': 'Annuler Terminé',
    'activity.process': 'Processus',
    'activity.methodology': 'Méthodologie',
    
    // Progress Dashboard
    'progress.daily_progress_dashboard': 'Tableau de Bord de Progrès Quotidien',
    'progress.overall_progress': 'Progrès Global',
    'progress.congratulations_complete': 'Félicitations ! Toutes les activités terminées aujourd\'hui',
    'progress.excellent_performance': 'Performance excellente ! Terminez le reste pour un accomplissement parfait',
    'progress.halfway_there': 'À mi-chemin ! Maintenez l\'élan',
    'progress.strong_start': 'Un bon début est la clé du succès !',
    
    // Timer
    'timer.pomodoro_timer': 'Minuterie Pomodoro',
    'timer.current_activity': 'Activité Actuelle',
    'timer.work': 'Travail',
    'timer.start': 'Commencer',
    'timer.pause': 'Pause',
    'timer.reset': 'Réinitialiser',
    'timer.completed_cycles': 'Cycles Terminés',
    'timer.work_break_duration': '25 minutes travail • 5 minutes pause',
    'timer.break_ended': 'Pause terminée !',
    'timer.work_session_ended': 'Session de travail terminée !',
    'timer.back_to_work': 'Il est temps de reprendre le travail',
    'timer.break_time': 'Temps de pause',
    
    // Categories
    'category.spiritual': 'Spirituel',
    
    // Import
    'import.bulk_task_import': 'Importation de Tâches en Lot',
    'import.file_upload': 'Téléchargement de Fichier',
    'import.text_input': 'Saisie de Texte',
    'import.template': 'Modèle',
    'import.file_upload_instructions': 'Téléchargez un fichier Excel ou CSV contenant vos tâches',
    'import.supported_formats': 'Formats supportés',
    'import.required_columns': 'Colonnes requises',
    'import.optional_columns': 'Colonnes optionnelles',
    'import.choose_file': 'Choisir un Fichier',
    'import.processing': 'Traitement en cours...',
    'import.drag_drop_hint': 'Ou glissez-déposez le fichier ici',
    'import.text_format_instructions': 'Entrez chaque tâche sur une ligne séparée en utilisant | comme séparateur',
    'import.text_format_example': 'Titre | Description | Catégorie | Heure de Début | Heure de Fin',
    'import.text_placeholder': 'Exemple:\nRéunion d\'Equipe | Discussion du projet | work | 09:00 | 10:30\nExercice | Entraînement matinal | health | 07:00 | 08:00',
    'import.parse_text': 'Analyser le Texte',
    'import.template_instructions': 'Téléchargez un modèle Excel pour voir le format correct',
    'import.column_descriptions': 'Descriptions des Colonnes',
    'import.column_title_desc': 'Titre de la tâche (requis)',
    'import.column_description_desc': 'Description de la tâche (optionnel)',
    'import.column_time_desc': 'Format HH:MM (ex: 09:30)',
    'import.download_template': 'Télécharger le Modèle',
    'import.no_valid_tasks': 'Aucune tâche valide trouvée dans le fichier',
    'import.file_parse_error': 'Erreur lors de l\'analyse du fichier',
    'import.unsupported_file_type': 'Type de fichier non supporté',
    'import.empty_text': 'Veuillez saisir du texte',
    'import.text_parse_error': 'Erreur lors de l\'analyse du texte',
    'import.preview_title': 'Aperçu des Tâches',
    'import.tasks_found': 'tâches trouvées',
    'import.clear': 'Effacer',
    'import.import_tasks': 'Importer les Tâches',
    'import.success_message': '{count} tâches importées avec succès!',
    
    // Form Placeholders
    'placeholder.username': "Saisir le nom d'utilisateur",
    'placeholder.email': "Saisir l'adresse email",
    'placeholder.password': 'Saisir le mot de passe',
    'placeholder.task_title': 'Saisir le titre de la tâche',
    'placeholder.task_description': 'Saisir la description de la tâche',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar')

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && ['ar', 'en', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
    // Update document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string, params?: Record<string, unknown>): string => {
    let text = translations[language][key as keyof typeof translations[typeof language]] || key
    
    // Replace parameters in the text
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, String(params[param]))
      })
    }
    
    return text
  }

  const dir = language === 'ar' ? 'rtl' : 'ltr'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
