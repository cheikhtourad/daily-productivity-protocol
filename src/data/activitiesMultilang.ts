import { Language } from '@/contexts/LanguageContext'

export interface MultilingualActivity {
  id: string
  startTime: string
  endTime: string
  timeSlot: string
  titles: {
    ar: string
    en: string
    fr: string
  }
  descriptions: {
    ar: string
    en: string
    fr: string
  }
  methodologies: {
    ar: string[]
    en: string[]
    fr: string[]
  }
  completed: boolean
}

export interface MultilingualPhase {
  titles: {
    ar: string
    en: string
    fr: string
  }
  timeRange: string
  activities: MultilingualActivity[]
}

export interface MultilingualDailyActivities {
  phases: MultilingualPhase[]
}

export const multilingualDailyActivities: MultilingualDailyActivities = {
  phases: [
    {
      titles: {
        ar: "🌅 المرحلة الأولى: الاستيقاظ والتحضير",
        en: "🌅 Phase 1: Wake Up and Preparation", 
        fr: "🌅 Phase 1: Réveil et Préparation"
      },
      timeRange: "06:00 - 08:00",
      activities: [
        {
          id: "wake-hydrate",
          startTime: "06:00",
          endTime: "06:15",
          timeSlot: "06:00 - 06:15",
          titles: {
            ar: "الاستيقاظ المبكر والترطيب الفوري",
            en: "Early Wake Up and Immediate Hydration",
            fr: "Réveil Matinal et Hydratation Immédiate"
          },
          descriptions: {
            ar: "استيقظ في نفس الوقت يومياً واشرب كوبين من الماء فور الاستيقاظ لتنشيط الجسم",
            en: "Wake up at the same time daily and drink two glasses of water immediately upon waking to activate the body",
            fr: "Réveillez-vous à la même heure chaque jour et buvez deux verres d'eau immédiatement au réveil pour activer le corps"
          },
          methodologies: {
            ar: ["تنظيم الساعة البيولوجية", "ترطيب الجسم", "تنشيط الدورة الدموية"],
            en: ["Circadian rhythm regulation", "Body hydration", "Blood circulation activation"],
            fr: ["Régulation du rythme circadien", "Hydratation du corps", "Activation de la circulation sanguine"]
          },
          completed: false
        },
        {
          id: "morning-movement",
          startTime: "06:15",
          endTime: "06:30",
          timeSlot: "06:15 - 06:30",
          titles: {
            ar: "الحركة الصباحية والتمدد",
            en: "Morning Movement and Stretching",
            fr: "Mouvement Matinal et Étirements"
          },
          descriptions: {
            ar: "تمارين خفيفة وتمدد لمدة 15 دقيقة لتنشيط العضلات والمفاصل",
            en: "Light exercises and stretching for 15 minutes to activate muscles and joints",
            fr: "Exercices légers et étirements pendant 15 minutes pour activer les muscles et les articulations"
          },
          methodologies: {
            ar: ["تنشيط العضلات", "تحسين المرونة", "تحفيز الإندورفين"],
            en: ["Muscle activation", "Flexibility improvement", "Endorphin stimulation"],
            fr: ["Activation musculaire", "Amélioration de la flexibilité", "Stimulation des endorphines"]
          },
          completed: false
        },
        {
          id: "meditation-mindfulness",
          startTime: "06:30",
          endTime: "06:45",
          timeSlot: "06:30 - 06:45",
          titles: {
            ar: "التأمل واليقظة الذهنية",
            en: "Meditation and Mindfulness",
            fr: "Méditation et Pleine Conscience"
          },
          descriptions: {
            ar: "جلسة تأمل قصيرة مع تمارين التنفس العميق لتصفية الذهن وتحضير اليوم",
            en: "Short meditation session with deep breathing exercises to clear the mind and prepare for the day",
            fr: "Séance de méditation courte avec exercices de respiration profonde pour clarifier l'esprit et préparer la journée"
          },
          methodologies: {
            ar: ["تقليل التوتر", "تحسين التركيز", "اليقظة الذهنية"],
            en: ["Stress reduction", "Focus improvement", "Mindfulness"],
            fr: ["Réduction du stress", "Amélioration de la concentration", "Pleine conscience"]
          },
          completed: false
        },
        {
          id: "personal-hygiene",
          startTime: "06:45",
          endTime: "07:15",
          timeSlot: "06:45 - 07:15",
          titles: {
            ar: "النظافة الشخصية والعناية الذاتية",
            en: "Personal Hygiene and Self-Care",
            fr: "Hygiène Personnelle et Soins Personnels"
          },
          descriptions: {
            ar: "روتين النظافة الشخصية الكامل مع العناية بالبشرة والشعر",
            en: "Complete personal hygiene routine with skin and hair care",
            fr: "Routine d'hygiène personnelle complète avec soins de la peau et des cheveux"
          },
          methodologies: {
            ar: ["العناية الصحية", "تعزيز الثقة", "الاستعداد النفسي"],
            en: ["Health care", "Confidence boost", "Mental preparation"],
            fr: ["Soins de santé", "Renforcement de la confiance", "Préparation mentale"]
          },
          completed: false
        },
        {
          id: "healthy-breakfast",
          startTime: "07:15",
          endTime: "08:00",
          timeSlot: "07:15 - 08:00",
          titles: {
            ar: "الإفطار الصحي المتوازن",
            en: "Balanced Healthy Breakfast",
            fr: "Petit-Déjeuner Sain et Équilibré"
          },
          descriptions: {
            ar: "وجبة إفطار صحية ومتوازنة تحتوي على البروتين والكربوهيدرات المعقدة والفيتامينات",
            en: "Healthy and balanced breakfast containing protein, complex carbohydrates, and vitamins",
            fr: "Petit-déjeuner sain et équilibré contenant des protéines, des glucides complexes et des vitamines"
          },
          methodologies: {
            ar: ["تغذية الدماغ", "توفير الطاقة", "تنظيم السكر"],
            en: ["Brain nutrition", "Energy provision", "Blood sugar regulation"],
            fr: ["Nutrition du cerveau", "Fourniture d'énergie", "Régulation de la glycémie"]
          },
          completed: false
        }
      ]
    },
    {
      titles: {
        ar: "💼 المرحلة الثانية: العمل والإنتاجية",
        en: "💼 Phase 2: Work and Productivity",
        fr: "💼 Phase 2: Travail et Productivité"
      },
      timeRange: "08:00 - 12:00",
      activities: [
        {
          id: "daily-planning",
          startTime: "08:00",
          endTime: "08:30",
          timeSlot: "08:00 - 08:30",
          titles: {
            ar: "تخطيط اليوم وتحديد الأولويات",
            en: "Daily Planning and Priority Setting",
            fr: "Planification Quotidienne et Définition des Priorités"
          },
          descriptions: {
            ar: "مراجعة قائمة المهام وتحديد أهم 3 مهام لليوم مع تخصيص الوقت المناسب لكل منها",
            en: "Review task list and identify the top 3 tasks for the day with appropriate time allocation for each",
            fr: "Réviser la liste des tâches et identifier les 3 principales tâches de la journée avec une allocation de temps appropriée pour chacune"
          },
          methodologies: {
            ar: ["مصفوفة أيزنهاور", "تقنية SMART", "إدارة الوقت"],
            en: ["Eisenhower Matrix", "SMART technique", "Time management"],
            fr: ["Matrice d'Eisenhower", "Technique SMART", "Gestion du temps"]
          },
          completed: false
        },
        {
          id: "deep-work-1",
          startTime: "08:30",
          endTime: "10:00",
          timeSlot: "08:30 - 10:00",
          titles: {
            ar: "جلسة العمل العميق الأولى",
            en: "First Deep Work Session",
            fr: "Première Session de Travail Profond"
          },
          descriptions: {
            ar: "فترة تركيز مكثف لمدة 90 دقيقة على أهم مهمة لليوم بدون مقاطعات",
            en: "90-minute intensive focus period on the most important task of the day without interruptions",
            fr: "Période de concentration intensive de 90 minutes sur la tâche la plus importante de la journée sans interruptions"
          },
          methodologies: {
            ar: ["العمل العميق", "تقنية بوموردو", "حجب المشتتات"],
            en: ["Deep Work", "Pomodoro Technique", "Distraction blocking"],
            fr: ["Travail Profond", "Technique Pomodoro", "Blocage des distractions"]
          },
          completed: false
        },
        {
          id: "active-break",
          startTime: "10:00",
          endTime: "10:15",
          timeSlot: "10:00 - 10:15",
          titles: {
            ar: "استراحة نشطة ومنشطة",
            en: "Active and Energizing Break",
            fr: "Pause Active et Énergisante"
          },
          descriptions: {
            ar: "استراحة قصيرة مع حركة خفيفة، تمدد، أو تمرين تنفس لإعادة شحن الطاقة",
            en: "Short break with light movement, stretching, or breathing exercise to recharge energy",
            fr: "Courte pause avec mouvement léger, étirements ou exercice de respiration pour recharger l'énergie"
          },
          methodologies: {
            ar: ["استراحة نشطة", "تجديد الطاقة", "منع الإرهاق"],
            en: ["Active break", "Energy renewal", "Fatigue prevention"],
            fr: ["Pause active", "Renouvellement d'énergie", "Prévention de la fatigue"]
          },
          completed: false
        },
        {
          id: "deep-work-2",
          startTime: "10:15",
          endTime: "11:45",
          timeSlot: "10:15 - 11:45",
          titles: {
            ar: "جلسة العمل العميق الثانية",
            en: "Second Deep Work Session",
            fr: "Deuxième Session de Travail Profond"
          },
          descriptions: {
            ar: "فترة تركيز ثانية لإنجاز المهمة الثانية أو مواصلة العمل على المشروع الرئيسي",
            en: "Second focus period to complete the second task or continue working on the main project",
            fr: "Deuxième période de concentration pour terminer la deuxième tâche ou continuer à travailler sur le projet principal"
          },
          methodologies: {
            ar: ["استمرارية التركيز", "تقسيم المهام", "متابعة التقدم"],
            en: ["Focus continuity", "Task division", "Progress tracking"],
            fr: ["Continuité de la concentration", "Division des tâches", "Suivi des progrès"]
          },
          completed: false
        },
        {
          id: "review-communication",
          startTime: "11:45",
          endTime: "12:00",
          timeSlot: "11:45 - 12:00",
          titles: {
            ar: "مراجعة الإنجاز والتواصل",
            en: "Achievement Review and Communication",
            fr: "Révision des Réalisations et Communication"
          },
          descriptions: {
            ar: "مراجعة ما تم إنجازه والرد على الرسائل المهمة وتحديث حالة المشاريع",
            en: "Review what has been accomplished and respond to important messages and update project status",
            fr: "Réviser ce qui a été accompli et répondre aux messages importants et mettre à jour le statut du projet"
          },
          methodologies: {
            ar: ["تقييم الأداء", "تواصل فعال", "إدارة المشاريع"],
            en: ["Performance evaluation", "Effective communication", "Project management"],
            fr: ["Évaluation des performances", "Communication efficace", "Gestion de projet"]
          },
          completed: false
        }
      ]
    },
    {
      titles: {
        ar: "🍽️ المرحلة الثالثة: استراحة وتجديد",
        en: "🍽️ Phase 3: Break and Renewal",
        fr: "🍽️ Phase 3: Pause et Renouvellement"
      },
      timeRange: "12:00 - 14:00",
      activities: [
        {
          id: "mindful-lunch",
          startTime: "12:00",
          endTime: "13:00",
          timeSlot: "12:00 - 13:00",
          titles: {
            ar: "غداء صحي مع أكل واعي",
            en: "Healthy Lunch with Mindful Eating",
            fr: "Déjeuner Sain avec Alimentation Consciente"
          },
          descriptions: {
            ar: "تناول وجبة غداء متوازنة بعيداً عن الشاشات مع التركيز على الطعم والامتنان",
            en: "Eat a balanced lunch away from screens focusing on taste and gratitude",
            fr: "Prendre un déjeuner équilibré loin des écrans en se concentrant sur le goût et la gratitude"
          },
          methodologies: {
            ar: ["الأكل الواعي", "الهضم الصحي", "الامتنان"],
            en: ["Mindful eating", "Healthy digestion", "Gratitude"],
            fr: ["Alimentation consciente", "Digestion saine", "Gratitude"]
          },
          completed: false
        },
        {
          id: "power-nap-relaxation",
          startTime: "13:00",
          endTime: "14:00",
          timeSlot: "13:00 - 14:00",
          titles: {
            ar: "قيلولة قصيرة أو استرخاء عميق",
            en: "Power Nap or Deep Relaxation",
            fr: "Sieste Énergisante ou Relaxation Profonde"
          },
          descriptions: {
            ar: "قيلولة لمدة 20-30 دقيقة أو جلسة استرخاء عميق لإعادة شحن الطاقة الذهنية",
            en: "20-30 minute nap or deep relaxation session to recharge mental energy",
            fr: "Sieste de 20-30 minutes ou séance de relaxation profonde pour recharger l'énergie mentale"
          },
          methodologies: {
            ar: ["قيلولة فعالة", "استرخاء العضلات", "تجديد الطاقة"],
            en: ["Effective napping", "Muscle relaxation", "Energy renewal"],
            fr: ["Sieste efficace", "Relaxation musculaire", "Renouvellement d'énergie"]
          },
          completed: false
        }
      ]
    },
    {
      titles: {
        ar: "🔄 المرحلة الرابعة: العمل المتقدم والإبداع",
        en: "🔄 Phase 4: Advanced Work and Creativity",
        fr: "🔄 Phase 4: Travail Avancé et Créativité"
      },
      timeRange: "14:00 - 18:00",
      activities: [
        {
          id: "creative-tasks",
          startTime: "14:00",
          endTime: "15:30",
          timeSlot: "14:00 - 15:30",
          titles: {
            ar: "المهام الإبداعية والابتكار",
            en: "Creative Tasks and Innovation",
            fr: "Tâches Créatives et Innovation"
          },
          descriptions: {
            ar: "وقت مخصص للمهام التي تتطلب إبداع وتفكير جانبي مثل التخطيط والتصميم",
            en: "Time dedicated to tasks requiring creativity and lateral thinking such as planning and design",
            fr: "Temps dédié aux tâches nécessitant créativité et pensée latérale comme la planification et la conception"
          },
          methodologies: {
            ar: ["العصف الذهني", "التفكير الجانبي", "حل المشكلات الإبداعي"],
            en: ["Brainstorming", "Lateral thinking", "Creative problem solving"],
            fr: ["Remue-méninges", "Pensée latérale", "Résolution créative de problèmes"]
          },
          completed: false
        },
        {
          id: "collaboration-meetings",
          startTime: "15:30",
          endTime: "17:00",
          timeSlot: "15:30 - 17:00",
          titles: {
            ar: "التعاون والاجتماعات",
            en: "Collaboration and Meetings",
            fr: "Collaboration et Réunions"
          },
          descriptions: {
            ar: "وقت للاجتماعات المهمة والتعاون مع الفريق وتبادل الأفكار",
            en: "Time for important meetings and team collaboration and idea exchange",
            fr: "Temps pour les réunions importantes et la collaboration d'équipe et l'échange d'idées"
          },
          methodologies: {
            ar: ["تواصل فعال", "عمل جماعي", "إدارة الاجتماعات"],
            en: ["Effective communication", "Teamwork", "Meeting management"],
            fr: ["Communication efficace", "Travail d'équipe", "Gestion des réunions"]
          },
          completed: false
        },
        {
          id: "administrative-tasks",
          startTime: "17:00",
          endTime: "18:00",
          timeSlot: "17:00 - 18:00",
          titles: {
            ar: "المهام الإدارية والمتابعة",
            en: "Administrative Tasks and Follow-up",
            fr: "Tâches Administratives et Suivi"
          },
          descriptions: {
            ar: "إنجاز المهام الإدارية، الرد على الإيميلات، وتنظيم الملفات والمستندات",
            en: "Complete administrative tasks, respond to emails, and organize files and documents",
            fr: "Accomplir les tâches administratives, répondre aux e-mails et organiser les fichiers et documents"
          },
          methodologies: {
            ar: ["تنظيم العمل", "إدارة المراسلات", "أرشفة المعلومات"],
            en: ["Work organization", "Correspondence management", "Information archiving"],
            fr: ["Organisation du travail", "Gestion de la correspondance", "Archivage des informations"]
          },
          completed: false
        }
      ]
    },
    {
      titles: {
        ar: "🌆 المرحلة الخامسة: الاسترخاء والنمو الشخصي",
        en: "🌆 Phase 5: Relaxation and Personal Growth",
        fr: "🌆 Phase 5: Détente et Développement Personnel"
      },
      timeRange: "18:00 - 22:00",
      activities: [
        {
          id: "physical-exercise",
          startTime: "18:00",
          endTime: "19:00",
          timeSlot: "18:00 - 19:00",
          titles: {
            ar: "التمرين البدني والنشاط الرياضي",
            en: "Physical Exercise and Sports Activity",
            fr: "Exercice Physique et Activité Sportive"
          },
          descriptions: {
            ar: "تمرين رياضي متكامل يجمع بين تمارين القوة والتحمل لمدة ساعة",
            en: "Comprehensive workout combining strength and endurance exercises for one hour",
            fr: "Entraînement complet combinant exercices de force et d'endurance pendant une heure"
          },
          methodologies: {
            ar: ["تدريب القوة", "تمارين الكارديو", "تحسين اللياقة"],
            en: ["Strength training", "Cardio exercises", "Fitness improvement"],
            fr: ["Entraînement en force", "Exercices cardio", "Amélioration de la forme physique"]
          },
          completed: false
        },
        {
          id: "personal-development",
          startTime: "19:00",
          endTime: "20:00",
          timeSlot: "19:00 - 20:00",
          titles: {
            ar: "التطوير الشخصي والتعلم",
            en: "Personal Development and Learning",
            fr: "Développement Personnel et Apprentissage"
          },
          descriptions: {
            ar: "وقت مخصص للقراءة أو حضور دورة أو تعلم مهارة جديدة لتطوير الذات",
            en: "Time dedicated to reading or attending a course or learning a new skill for self-development",
            fr: "Temps consacré à la lecture ou à suivre un cours ou apprendre une nouvelle compétence pour le développement personnel"
          },
          methodologies: {
            ar: ["التعلم المستمر", "القراءة الفعالة", "تطوير المهارات"],
            en: ["Continuous learning", "Effective reading", "Skill development"],
            fr: ["Apprentissage continu", "Lecture efficace", "Développement des compétences"]
          },
          completed: false
        },
        {
          id: "social-family",
          startTime: "20:00",
          endTime: "21:00",
          timeSlot: "20:00 - 21:00",
          titles: {
            ar: "الوقت الاجتماعي والعائلي",
            en: "Social and Family Time",
            fr: "Temps Social et Familial"
          },
          descriptions: {
            ar: "وقت مخصص للتواصل مع العائلة والأصدقاء وبناء العلاقات الاجتماعية",
            en: "Time dedicated to connecting with family and friends and building social relationships",
            fr: "Temps consacré à se connecter avec la famille et les amis et construire des relations sociales"
          },
          methodologies: {
            ar: ["تقوية الروابط", "التواصل الفعال", "الدعم الاجتماعي"],
            en: ["Strengthening bonds", "Effective communication", "Social support"],
            fr: ["Renforcement des liens", "Communication efficace", "Soutien social"]
          },
          completed: false
        },
        {
          id: "evening-reflection",
          startTime: "21:00",
          endTime: "22:00",
          timeSlot: "21:00 - 22:00",
          titles: {
            ar: "التأمل المسائي والاستعداد للنوم",
            en: "Evening Reflection and Sleep Preparation",
            fr: "Réflexion du Soir et Préparation au Sommeil"
          },
          descriptions: {
            ar: "مراجعة إنجازات اليوم، كتابة المذكرات، والاستعداد للنوم مع تهيئة البيئة المناسبة",
            en: "Review daily achievements, journal writing, and prepare for sleep with appropriate environment setup",
            fr: "Réviser les réalisations quotidiennes, écriture de journal et préparer le sommeil avec un environnement approprié"
          },
          methodologies: {
            ar: ["التأمل الذاتي", "كتابة المذكرات", "نظافة النوم"],
            en: ["Self-reflection", "Journaling", "Sleep hygiene"],
            fr: ["Autoréflexion", "Tenue d'un journal", "Hygiène du sommeil"]
          },
          completed: false
        }
      ]
    }
  ]
}

// Helper function to determine category based on activity ID
function getCategoryForActivity(activityId: string): 'spiritual' | 'work' | 'personal' | 'family' {
  const categoryMap: { [key: string]: 'spiritual' | 'work' | 'personal' | 'family' } = {
    'wake-hydrate': 'personal',
    'morning-movement': 'personal',
    'meditation-mindfulness': 'spiritual',
    'personal-hygiene': 'personal',
    'healthy-breakfast': 'personal',
    'daily-planning': 'work',
    'deep-work-1': 'work',
    'active-break': 'personal',
    'deep-work-2': 'work',
    'review-communication': 'work',
    'mindful-lunch': 'personal',
    'power-nap-relaxation': 'personal',
    'creative-tasks': 'work',
    'collaboration-meetings': 'work',
    'administrative-tasks': 'work',
    'physical-exercise': 'personal',
    'personal-development': 'personal',
    'social-family': 'family',
    'evening-reflection': 'spiritual'
  };
  return categoryMap[activityId] || 'personal';
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getLocalizedActivities(language: Language): any {
  return {
    phases: multilingualDailyActivities.phases.map(phase => ({
      ...phase,
      title: phase.titles[language],
      activities: phase.activities.map(activity => ({
        ...activity,
        title: activity.titles[language],
        description: activity.descriptions[language],
        methodology: activity.methodologies[language],
        category: getCategoryForActivity(activity.id)
      }))
    }))
  }
}
