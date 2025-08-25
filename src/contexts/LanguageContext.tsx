'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'ar' | 'en' | 'fr'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
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

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key
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
