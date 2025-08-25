export interface Activity {
  id: string;
  title: string;
  timeSlot: string;
  startTime: string;
  endTime: string;
  category: 'spiritual' | 'work' | 'personal' | 'family';
  processus: string[];
  methodology: {
    name: string;
    description: string;
  };
  completed: boolean;
}

export interface DailySchedule {
  phases: {
    title: string;
    timeRange: string;
    activities: Activity[];
  }[];
}

export const dailyActivities: DailySchedule = {
  phases: [
    {
      title: "المرحلة الأولى: الانطلاق والتهيئة",
      timeRange: "05:00 – 08:45",
      activities: [
        {
          id: "1",
          title: "التهيئة الروحية والفكرية",
          timeSlot: "05:00 – 05:55",
          startTime: "05:00",
          endTime: "05:55",
          category: "spiritual",
          processus: [
            "الاستيقاظ → شرب كوب ماء",
            "وضوء بماء بارد",
            "ركعتان قيام",
            "10 دقائق ذكر ودعاء مع تحديد نوايا اليوم"
          ],
          methodology: {
            name: "Morning Priming",
            description: "برمجة اليوم في العقل الباطن قبل الضوضاء"
          },
          completed: false
        },
        {
          id: "2",
          title: "صلاة الفجر والتحصيل القرآني",
          timeSlot: "06:00 – 07:00",
          startTime: "06:00",
          endTime: "07:00",
          category: "spiritual",
          processus: [
            "استماع (5 دقائق)",
            "حفظ بالتجزئة (20 دقيقة)",
            "مراجعة تراكمية (15 دقيقة)",
            "اختبار نشط عبر تلاوة أو تطبيق (10 دقائق)"
          ],
          methodology: {
            name: "Spaced Repetition + Active Recall",
            description: "أفضل أسلوب لترسيخ الحفظ"
          },
          completed: false
        },
        {
          id: "3",
          title: "التمرين الرياضي",
          timeSlot: "07:00 – 07:45",
          startTime: "07:00",
          endTime: "07:45",
          category: "personal",
          processus: [
            "إحماء ديناميكي (5 دقائق)",
            "تمرين أساسي مركب (قرفصاء/ضغط/سحب)",
            "تكملة بتمارين مساعدة",
            "تبريد وإطالة (5 دقائق)"
          ],
          methodology: {
            name: "HIIT + Compound Movements",
            description: "أعلى كفاءة في أقل وقت"
          },
          completed: false
        },
        {
          id: "4",
          title: "وقت التنقل (جامعة متنقلة)",
          timeSlot: "متغير",
          startTime: "07:45",
          endTime: "08:45",
          category: "personal",
          processus: [
            "الذهاب → الاستماع لبودكاست/كورسات تقنية (Active Listening)",
            "العودة → الاستماع للقرآن أو كتاب تاريخ (Shutdown Ritual)"
          ],
          methodology: {
            name: "Dead Time to Learning Time",
            description: "تحويل الوقت الضائع إلى وقت تعلم + فصل العمل عن البيت بطقس إغلاق"
          },
          completed: false
        }
      ]
    },
    {
      title: "المرحلة الثانية: العمل والإنتاج",
      timeRange: "08:45 – 17:05",
      activities: [
        {
          id: "5",
          title: "GIZ – استشارات الحوكمة الرقمية",
          timeSlot: "08:45 – 10:15",
          startTime: "08:45",
          endTime: "10:15",
          category: "work",
          processus: [
            "تحديد هدف الجلسة",
            "مراجعة البريد/المهام الرسمية",
            "كتابة تقرير قصير أو إعداد عرض",
            "إرساله أو مشاركته مباشرة"
          ],
          methodology: {
            name: "Inbox Zero + One Thing Focus",
            description: "كل جلسة لها مخرج واحد واضح"
          },
          completed: false
        },
        {
          id: "6",
          title: "Next Technology (CTO)",
          timeSlot: "10:30 – 12:00",
          startTime: "10:30",
          endTime: "12:00",
          category: "work",
          processus: [
            "مراجعة Sprint Board (Jira/Trello)",
            "Daily Check مع الفريق",
            "قرار تقني أو حل عائق",
            "توثيق بالمنصة"
          ],
          methodology: {
            name: "Agile Scrum – Daily Standup",
            description: "تواصل قصير، متابعة مرنة، إنتاجية عالية"
          },
          completed: false
        },
        {
          id: "7",
          title: "صلاة الظهر والغداء + القيلولة",
          timeSlot: "12:00 – 14:15",
          startTime: "12:00",
          endTime: "14:15",
          category: "personal",
          processus: [
            "صلاة",
            "وجبة صحية قليلة الكربوهيدرات",
            "قيلولة 20 دقيقة بمنبه",
            "تمدد بسيط بعد الاستيقاظ"
          ],
          methodology: {
            name: "Power Nap (NASA protocol)",
            description: "أفضل مدة لاستعادة الطاقة"
          },
          completed: false
        },
        {
          id: "8",
          title: "DeepTech (استشارات ومتابعة المشاريع)",
          timeSlot: "14:15 – 15:45",
          startTime: "14:15",
          endTime: "15:45",
          category: "work",
          processus: [
            "مراجعة جدول الاستشارات (Notion)",
            "فتح ملف عرض/عقد",
            "تحديث الأرقام أو الشروط",
            "إخراج نسخة نهائية",
            "إرسال للعميل"
          ],
          methodology: {
            name: "Document First – Iterate Fast",
            description: "البدء بالوثائق ثم التكرار السريع"
          },
          completed: false
        },
        {
          id: "9",
          title: "الأستاذ الجامعي / البحث العلمي",
          timeSlot: "16:00 – 17:05",
          startTime: "16:00",
          endTime: "17:05",
          category: "work",
          processus: [
            "تحديد مهمة (محاضرة / ورقة علمية)",
            "بحث سريع عبر Google Scholar",
            "كتابة مسودة فقرة/شريحة واحدة",
            "مراجعة مختصرة"
          ],
          methodology: {
            name: "Pomodoro Research Writing",
            description: "جلسات 25 دقيقة كتابة علمية مركزة"
          },
          completed: false
        }
      ]
    },
    {
      title: "المرحلة الثالثة: الأسرة والتطوير",
      timeRange: "17:50 – 22:30",
      activities: [
        {
          id: "10",
          title: "تعليم الأبناء",
          timeSlot: "17:50 – 19:30",
          startTime: "17:50",
          endTime: "19:30",
          category: "family",
          processus: [
            "البداية بالقرآن (نشاط هادئ)",
            "درس لغة تفاعلي عبر تطبيق",
            "رياضيات عبر ألعاب",
            "مراجعة قصيرة باللعب أو أسئلة"
          ],
          methodology: {
            name: "Gamification + Protégé Effect",
            description: "التعلم باللعب + التفسير للطفل يعزز الفهم"
          },
          completed: false
        },
        {
          id: "11",
          title: "التطوير الذاتي",
          timeSlot: "20:00 – 21:00",
          startTime: "20:00",
          endTime: "21:00",
          category: "personal",
          processus: [
            "لغات: جلسة محادثة مباشرة (iTalki/HelloTalk) 25 دقيقة",
            "تلخيص 5 دقائق",
            "فقه: قراءة فقرة",
            "إغلاق الكتاب → شرحها بصوت عالٍ"
          ],
          methodology: {
            name: "Active Recall + Use It, Don't Study It",
            description: "التعلم بالممارسة والتلخيص"
          },
          completed: false
        },
        {
          id: "12",
          title: "التخطيط السريع والمراجعة",
          timeSlot: "21:15 – 22:30",
          startTime: "21:15",
          endTime: "22:30",
          category: "personal",
          processus: [
            "فتح دفتر/تطبيق",
            "كتابة 3 مهام رئيسية للغد (MITs)",
            "مراجعة سريعة",
            "إغلاق الملف"
          ],
          methodology: {
            name: "Zeigarnik Effect Shutdown",
            description: "إغلاق الملفات الذهنية قبل النوم لتصفية العقل"
          },
          completed: false
        }
      ]
    }
  ]
};

export const categoryColors = {
  spiritual: 'bg-green-100 text-green-800 border-green-300',
  work: 'bg-blue-100 text-blue-800 border-blue-300',
  personal: 'bg-purple-100 text-purple-800 border-purple-300',
  family: 'bg-orange-100 text-orange-800 border-orange-300'
};

export const categoryIcons = {
  spiritual: '🕌',
  work: '💼',
  personal: '💪',
  family: '👨‍👩‍👧‍👦'
};
