import React, { useState } from 'react';
import { FaArrowRight, FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import Logo from '../../Assets/orieneducaLOGO.png';
import { submitToGoogleSheet } from '../../services/googleSheetService';

const translations = {
    fr: {
        hero: "Quelque chose d'extraordinaire arrive bientôt.",
        description: "Nous construisons la plateforme d'orientation scolaire la plus avancée du Maroc. Préparez-vous à découvrir votre avenir avec confiance.",
        notify: "M'avertir",
        placeholder: "Entrez votre email",
        success: "Merci ! Vous serez le premier informé.",
        copyright: "© 2026 Orieneduca. Tous droits réservés.",
        joinWaitlist: "Pour bénéficier du service d'orientation et d'inscription",
        form: {
            title: "Pré-inscription",
            subtitle: "Soyez parmi les premiers à accéder à la plateforme.",
            fullName: "Nom & Prénom",
            email: "Email",
            gender: "Genre",
            male: "Masculin",
            female: "Féminin",
            phone: "Téléphone",
            parentPhone: "Téléphone du parent",
            schoolType: "Type d'établissement",
            public: "Public",
            private: "Privé",
            mission: "Mission",
            stream: "Filière",
            regionalGrade: "Note du Régional",
            submit: "S'inscrire",
            cancel: "Annuler",
            select: "Sélectionner",
            successMessage: "Votre pré-inscription a été enregistrée avec succès !",
            bacOptions: {
                svt: "BAC SVT",
                svt_biof: "BAC SVT - BIOF",
                pc: "BAC SCIENCES PHYSIQUES",
                pc_biof: "BAC SCIENCES PHYSIQUES - BIOF",
                eco: "BAC SCIENCES ÉCONOMIQUES",
                tgc: "BAC TECHNIQUES DE GESTION ET COMPTABILITÉ",
                sma: "BAC SCIENCES MATHÉMATIQUES A",
                sma_biof: "BAC SCIENCES MATHÉMATIQUES A - BIOF",
                smb: "BAC SCIENCES MATHÉMATIQUES B",
                smb_biof: "BAC SCIENCES MATHÉMATIQUES B - BIOF",
                ste: "BAC SCIENCES ET TECHNOLOGIES ÉLECTRIQUES",
                stm: "BAC SCIENCES ET TECHNOLOGIES MÉCANIQUES"
            }
        }
    },
    ar: {
        hero: "شيء استثنائي سيصل قريباً.",
        description: "نحن نبني منصة التوجيه المدرسي الأكثر تقدماً في المغرب. استعد لاكتشاف مستقبلك بثقة.",
        notify: "أخبرني",
        placeholder: "أدخل بريدك الإلكتروني",
        success: "شكراً! ستكون أول من يعلم.",
        copyright: "© 2026 Orieneduca. جميع الحقوق محفوظة.",
        joinWaitlist: "للاستفادة من خدمة التوجيه والتسجيل",
        form: {
            title: "التسجيل القبلي",
            subtitle: "كن من بين الأوائل الذين يستفيدون من المنصة.",
            fullName: "الإسم الكامل",
            email: "البريد الإلكتروني",
            gender: "الجنس",
            male: "ذكر",
            female: "أنثى",
            phone: "رقم الهاتف",
            parentPhone: "رقم هاتف الولي",
            schoolType: "نوع الثانوية",
            public: "عمومي",
            private: "خصوصي",
            mission: "بعثة",
            stream: "الشعبة",
            regionalGrade: "معدل الجهوي",
            submit: "تسجيل",
            cancel: "إلغاء",
            select: "اختر",
            successMessage: "تم تسجيل طلبك بنجاح!",
            bacOptions: {
                svt: "علوم الحياة والأرض",
                svt_biof: "علوم الحياة والأرض - خيار فرنسي",
                pc: "العلوم الفيزيائية",
                pc_biof: "العلوم الفيزيائية - خيار فرنسي",
                eco: "العلوم الاقتصادية",
                tgc: "علوم التدبير المحاسباتي",
                sma: "العلوم الرياضية أ",
                sma_biof: "العلوم الرياضية أ - خيار فرنسي",
                smb: "العلوم الرياضية ب",
                smb_biof: "العلوم الرياضية ب - خيار فرنسي",
                ste: "العلوم والتكنولوجيات الكهربائية",
                stm: "العلوم والتكنولوجيات الميكانيكية"
            }
        }
    }
};

type Language = 'fr' | 'ar';

export const ComingSoon: React.FC = () => {

    const [language, setLanguage] = useState<Language>('fr');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        formEmail: '',
        gender: 'male',
        phone: '',
        parentPhone: '',
        schoolType: '',
        stream: '',
        regionalGrade: ''
    });

    const t = translations[language];
    const isRTL = language === 'ar';


    // ... inside component ...
    const [isLoading, setIsLoading] = useState(false);

    // ...



    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await submitToGoogleSheet({
            ...formData,
            type: 'Registration',
            date: new Date().toISOString()
        });

        setIsLoading(false);

        if (result.success) {
            setFormSubmitted(true);
            setTimeout(() => {
                setIsModalOpen(false);
                setFormSubmitted(false);
                setFormData({
                    fullName: '',
                    formEmail: '',
                    gender: 'male',
                    phone: '',
                    parentPhone: '',
                    schoolType: '',
                    stream: '',
                    regionalGrade: ''
                });
            }, 3000);
        } else {
            alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            {/* Language Toggle */}
            <div className="absolute top-6 right-6 z-20">
                <button
                    onClick={toggleLanguage}
                    className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-4 py-2 rounded-full backdrop-blur-sm border border-gray-700 transition-all text-sm font-medium"
                >
                    {language === 'fr' ? 'العربية' : 'Français'}
                </button>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Logo */}
                <div className="flex items-center justify-center mb-8 animate-fade-in-up">
                    <img src={Logo} alt="Orieneduca Logo" className="h-20 w-auto" />
                </div>

                {/* Main Content */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up delay-100">
                    {t.hero}
                </h1>

                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                    {t.description}
                </p>

                {/* Pre-register Button */}
                <div className="mb-12 animate-fade-in-up delay-300">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-900 transition-all shadow-xl hover:shadow-primary-600/30 transform hover:scale-105"
                    >
                        {t.joinWaitlist}
                        <FaArrowRight className={`h-6 w-6 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </button>
                </div>



                {/* Social Links */}
                <div className="flex justify-center space-x-6 animate-fade-in-up delay-500" dir="ltr">
                    <a href="https://www.instagram.com/orieneduca/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
                        <FaInstagram className="h-6 w-6" />
                    </a>
                    <a href="https://web.facebook.com/orieneduca/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
                        <FaFacebook className="h-6 w-6" />
                    </a>
                    <a href="https://api.whatsapp.com/send/?phone=212703749901&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
                        <FaWhatsapp className="h-6 w-6" />
                    </a>
                    <a href="https://www.linkedin.com/company/orieneduca/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors transform hover:scale-110">
                        <FaLinkedin className="h-6 w-6" />
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-0 w-full text-center text-gray-600 text-sm animate-fade-in-up delay-500">
                {t.copyright}
            </div>

            {/* Registration Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
                        <div className="p-8">
                            {!formSubmitted ? (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-2 text-center">{t.form.title}</h2>
                                    <p className="text-gray-400 mb-8 text-center text-sm">{t.form.subtitle}</p>

                                    <form onSubmit={handleFormSubmit} className="space-y-6">
                                        {/* Full Name */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.fullName} <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.email} <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                name="formEmail"
                                                value={formData.formEmail}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                dir="ltr"
                                            />
                                        </div>

                                        {/* Gender */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.gender} <span className="text-red-500">*</span></label>
                                            <div className="flex space-x-6">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="male"
                                                        checked={formData.gender === 'male'}
                                                        onChange={handleInputChange}
                                                        className="form-radio text-primary-500 focus:ring-primary-500 bg-gray-700 border-gray-600"
                                                    />
                                                    <span className={`ml-2 text-gray-300 ${isRTL ? 'mr-2' : ''}`}>{t.form.male}</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="gender"
                                                        value="female"
                                                        checked={formData.gender === 'female'}
                                                        onChange={handleInputChange}
                                                        className="form-radio text-primary-500 focus:ring-primary-500 bg-gray-700 border-gray-600"
                                                    />
                                                    <span className={`ml-2 text-gray-300 ${isRTL ? 'mr-2' : ''}`}>{t.form.female}</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Phones */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.phone} <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                    dir="ltr"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.parentPhone} <span className="text-red-500">*</span></label>
                                                <input
                                                    type="tel"
                                                    name="parentPhone"
                                                    value={formData.parentPhone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>

                                        {/* School Info */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.schoolType} <span className="text-red-500">*</span></label>
                                            <select
                                                name="schoolType"
                                                value={formData.schoolType}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
                                            >
                                                <option value="">{t.form.select}</option>
                                                <option value="public">{t.form.public}</option>
                                                <option value="private">{t.form.private}</option>
                                                <option value="mission">{t.form.mission}</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.stream} <span className="text-red-500">*</span></label>
                                                <select
                                                    name="stream"
                                                    value={formData.stream}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
                                                >
                                                    <option value="">{t.form.select}</option>
                                                    {Object.entries(t.form.bacOptions).map(([key, label]) => (
                                                        <option key={key} value={key}>{label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">{t.form.regionalGrade} <span className="text-red-500">*</span></label>
                                                <select
                                                    name="regionalGrade"
                                                    value={formData.regionalGrade}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none"
                                                >
                                                    <option value="">{t.form.select}</option>
                                                    <option value="lt10">&lt; 10</option>
                                                    <option value="10-12">10 - 12</option>
                                                    <option value="12-14">12 - 14</option>
                                                    <option value="14-16">14 - 16</option>
                                                    <option value="16-18">16 - 18</option>
                                                    <option value="gt18">&gt; 18</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="flex-1 px-6 py-3 border border-gray-600 text-base font-medium rounded-xl text-gray-300 bg-transparent hover:bg-gray-800 focus:outline-none transition-all"
                                            >
                                                {t.form.cancel}
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className={`flex-1 px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 focus:ring-offset-gray-900 transition-all shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            >
                                                {isLoading ? '...' : t.form.submit}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{t.form.successMessage}</h3>
                                    <p className="text-gray-400">{t.success}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
