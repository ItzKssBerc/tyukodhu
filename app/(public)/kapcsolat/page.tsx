"use client";

import { useState, useEffect } from "react";
import Dropdown from "@/components/Dropdown";

// --- Simplified OfficeHours Component ---
const OfficeHours = ({ hours }: { hours: Record<string, { start: string; end: string }> }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getDayName = (dayIndex: number) => {
    const dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    return dayNames[dayIndex];
  };

  const getStatus = (dayIndex: number) => {
    const hoursData = hours[dayIndex.toString()];
    // Ensure hoursData, hoursData.start, and hoursData.end are defined strings
    if (!hoursData || !hoursData.start || !hoursData.end || currentDate.getDay() !== dayIndex) {
      return { text: '', color: '' };
    }

    const [startHour, startMinute] = hoursData.start.split(':').map(Number);
    const [endHour, endMinute] = hoursData.end.split(':').map(Number);

    const startTime = new Date(currentDate);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(currentDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    if (currentDate >= startTime && currentDate <= endTime) {
      return { text: 'Nyitva', color: 'text-green-600 dark:text-green-400' };
    }
    return { text: 'Zárva', color: 'text-red-600 dark:text-red-400' };
  };

  const weekDays = [1, 2, 3, 4, 5]; // Monday to Friday

  return (
    <div className="space-y-2">
      {weekDays.map(dayIndex => {
        const hourData = hours[dayIndex.toString()];
        const today = currentDate.getDay() === dayIndex;
        const status = getStatus(dayIndex);

        return (
          <div
            key={dayIndex}
            className={`flex justify-between items-center p-3 rounded-lg border ${today
              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700'
              : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
              }`}
          >
            <span className={`font-bold ${today ? 'text-amber-700 dark:text-amber-300' : 'text-gray-800 dark:text-gray-200'}`}>
              {getDayName(dayIndex)}
            </span>
            <div className="flex items-center gap-4">
              <span className={`font-mono font-semibold ${!hourData ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                {hourData ? `${hourData.start} - ${hourData.end}` : 'Zárva'}
              </span>
              {today && hourData && (
                <span className={`text-sm font-bold ${status.color}`}>
                  • {status.text}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  );
};


// --- Contact Info Component ---
const ContactInfo = ({ activeTab, className = "" }: { activeTab: string, className?: string }) => (
  <div className={`bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-xl border border-stone-100 dark:border-stone-800 relative overflow-hidden group ${className}`}>
    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
      <span className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <i className="bi bi-info-circle-fill"></i>
      </span>
      Elérhetőségek
    </h3>

    {activeTab === 'ura' && (
      <div className="absolute -bottom-12 -right-12 text-stone-100 dark:text-stone-800 pointer-events-none transform rotate-12 transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-12">
        <i className="bi bi-bank text-[20rem] opacity-50 dark:opacity-20 transition-all duration-700 group-hover:opacity-30 dark:group-hover:opacity-10 group-hover:text-amber-500/10"></i>
      </div>
    )}

    <div className="space-y-6">
      {activeTab === 'tyukod' ? (
        <>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-geo-alt-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Cím</p>
              <p className="text-stone-900 dark:text-white font-medium">4762 Tyukod, Árpád u. 33.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-envelope-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Email / Posta</p>
              <a href="mailto:tyukod@outlook.hu" className="block text-stone-900 dark:text-white font-medium hover:text-blue-600 transition-colors break-all">tyukod@outlook.hu</a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-telephone-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Telefon / Fax</p>
              <a href="tel:+3644556062" className="block text-stone-900 dark:text-white font-medium hover:text-blue-600 transition-colors">44/556-062</a>
              <span className="text-stone-500 text-sm">Fax: 44/556-064</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-geo-alt-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Cím</p>
              <p className="text-stone-900 dark:text-white font-medium">4763 Ura, Kossuth út 43.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-envelope-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Email / Posta</p>
              <a href="mailto:urahiv@freemail.hu" className="block text-stone-900 dark:text-white font-medium hover:text-blue-600 transition-colors break-all">urahiv@freemail.hu</a>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
            <i className="bi bi-telephone-fill text-2xl text-amber-500 mt-1"></i>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">Telefon / Fax</p>
              <a href="tel:44520169" className="block text-stone-900 dark:text-white font-medium hover:text-blue-600 transition-colors">44/520-169</a>
              <span className="text-stone-500 text-sm">Fax: 44/341-965</span>
            </div>
          </div>
        </>
      )}

      <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">Jegyző</p>
        <p className="text-lg font-bold text-stone-900 dark:text-white">Biró Attiláné</p>
      </div>
    </div>
  </div>
);

// --- Map Card Component ---
const MapCard = ({ activeTab, className = "" }: { activeTab: string, className?: string }) => (
  <div className={`bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden ${className}`}>
    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner border border-stone-200 dark:border-stone-800 relative group">
      <iframe
        src={activeTab === 'tyukod'
          ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.5570964806151!2d22.55592066011662!3d47.85377722317471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47387379c3db517d%3A0x120c5ec0ae0d083!2sPolg%C3%A1rmesteri%20Hivatal%20Tyukod!5e0!3m2!1shu!2sro!4v1765740401963!5m2!1shu!2sro"
          : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.0917716935337!2d22.60386407625198!3d47.818439071210044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47380b4417037645%3A0xa46d7dc516d3d9de!2sUra%2C%20Kossuth%20%C3%BAt%2043%2C%204763!5e0!3m2!1shu!2shu!4v1765749006439!5m2!1shu!2shu"
        }
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale group-hover:grayscale-0 transition-all duration-700"
      ></iframe>
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300"></div>
    </div>
  </div>
);

// --- Office Hours & Map Component ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OfficeHoursAndMap = ({ activeTab, officeHours, className = "", showMap = true }: { activeTab: string, officeHours: any, className?: string, showMap?: boolean }) => (
  <div className={`bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-xl border border-stone-100 dark:border-stone-800 overflow-hidden ${className}`}>
    <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-6 flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
        <i className="bi bi-clock-fill"></i>
      </span>
      Ügyfélfogadás
    </h3>
    <div className={showMap ? "mb-6" : ""}>
      <OfficeHours hours={officeHours} />
    </div>

    {showMap && (
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-inner border border-stone-200 dark:border-stone-800 relative group">
        <iframe
          src={activeTab === 'tyukod'
            ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.5570964806151!2d22.55592066011662!3d47.85377722317471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47387379c3db517d%3A0x120c5ec0ae0d083!2sPolg%C3%A1rmesteri%20Hivatal%20Tyukod!5e0!3m2!1shu!2sro!4v1765740401963!5m2!1shu!2sro"
            : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.0917716935337!2d22.60386407625198!3d47.818439071210044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47380b4417037645%3A0xa46d7dc516d3d9de!2sUra%2C%20Kossuth%20%C3%BAt%2043%2C%204763!5e0!3m2!1shu!2shu!4v1765749006439!5m2!1shu!2shu"
          }
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale group-hover:grayscale-0 transition-all duration-700"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-blue-500/30 rounded-2xl transition-all duration-300"></div>
      </div>
    )}
  </div>
);

// --- Main Contact Page Component ---
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('tyukod');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'cooldown'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [cooldownActive, setCooldownActive] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [cooldownEndTime, setCooldownEndTime] = useState<number | null>(null);

  const tyukodOfficeHours = {
    '1': { start: '8:00', end: '12:00' },
    '2': { start: '8:00', end: '12:00' },
    '3': { start: '8:00', end: '16:00' },
    '4': { start: '8:00', end: '12:00' },
    '5': { start: '8:00', end: '12:00' }
  };

  const uraOfficeHours = {
    '1': { start: '8:00', end: '12:00' },
    '2': { start: '8:00', end: '12:00' },
    '3': { start: '8:00', end: '12:00' },
    '4': { start: '8:00', end: '16:00' },
    '5': { start: '8:00', end: '12:00' }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownActive && cooldownRemaining > 0) {
      timer = setTimeout(() => {
        setCooldownRemaining(cooldownRemaining - 1);
      }, 1000);
    } else if (cooldownActive && cooldownRemaining === 0) {
      setCooldownActive(false);
      setSubmissionStatus('idle'); // Reset status after cooldown
      setCooldownEndTime(null);
    }
    return () => clearTimeout(timer);
  }, [cooldownActive, cooldownRemaining]);

  useEffect(() => {
    // Check local storage for existing cooldown
    const storedCooldownEndTime = localStorage.getItem('formCooldownEndTime');
    if (storedCooldownEndTime) {
      const remaining = Math.max(0, Math.ceil((parseInt(storedCooldownEndTime) - Date.now()) / 1000));
      if (remaining > 0) {
        setCooldownActive(true);
        setCooldownRemaining(remaining);
        setSubmissionStatus('cooldown');
        setCooldownEndTime(parseInt(storedCooldownEndTime));
      } else {
        localStorage.removeItem('formCooldownEndTime');
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownEndTime) {
      localStorage.setItem('formCooldownEndTime', cooldownEndTime.toString());
    } else {
      localStorage.removeItem('formCooldownEndTime');
    }
  }, [cooldownEndTime]);




  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (cooldownActive) {
      setSubmissionMessage(`Kérjük, várjon ${cooldownRemaining} másodpercet az újabb üzenet küldése előtt.`);
      return;
    }

    setSubmissionStatus('loading');
    setSubmissionMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      access_key: "9a9bd9e5-fdd8-44c1-b0ac-c4c0870c7d7e",
      subject: selectedSubject || "Új üzenet a weboldalról (tárgy nélkül)", // Use selected subject or a default
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmissionStatus('success');
        setSubmissionMessage('Üzenet elküldve sikeresen!');
        form.reset(); // Clear the form
        setSelectedSubject(''); // Reset subject dropdown

        // Start cooldown
        setCooldownActive(true);
        setCooldownRemaining(30);
        setCooldownEndTime(Date.now() + 30 * 1000);
        setSubmissionStatus('cooldown');
        setSubmissionMessage('Kérjük, várjon fél percet az újabb üzenet küldése előtt.');

      } else {
        setSubmissionStatus('error');
        setSubmissionMessage(`Hiba történt: ${result.message || 'Ismeretlen hiba'}`);
      }
    } catch (error) {
      setSubmissionStatus('error');
      setSubmissionMessage('Hálózati hiba történt. Kérjük, próbálja meg később.');
      console.error("Form submission error:", error);
    }
  }

  return (
    <div className="min-h-screen theme-transition glass-card">
      {/* Hero Section */}
      <div className="relative bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-amber-100/50 dark:from-blue-900/20 dark:to-amber-900/20" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-50 dark:from-stone-950 to-transparent" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-stone-900 dark:text-white tracking-tight mb-6">
            Lépjen velünk <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-amber-600 dark:from-blue-400 dark:to-amber-400">kapcsolatba</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Kérdése van? Írjon nekünk, és amint tudunk, válaszolunk! Válassza ki az illetékes hivatalt alább.
          </p>
        </div>
      </div>

      <div className="relative z-30 -mt-8 flex justify-center mb-16">
        <div className="inline-flex p-1.5 bg-white dark:bg-stone-900 shadow-2xl border border-stone-200 dark:border-stone-800 rounded-full">
          <button
            onClick={() => setActiveTab('tyukod')}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'tyukod'
              ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
          >
            Tyukodi önkormányzat
          </button>
          <button
            onClick={() => setActiveTab('ura')}
            className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === 'ura'
              ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/30'
              : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
          >
            Urai kirendeltség
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Logic for Tyukod Layout */}
          {activeTab === 'tyukod' && (
            <>
              {/* Left Column: Contact Form and Map */}
              <div className="lg:col-span-7 space-y-6" key="tyukod-left">
                <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-stone-100 dark:border-stone-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                    <i className="bi bi-send-fill text-9xl text-stone-900 dark:text-white"></i>
                  </div>

                  <h2 className="text-3xl font-bold text-stone-900 dark:text-white mb-2 relative z-10">Írjon nekünk</h2>
                  <p className="text-stone-500 dark:text-stone-400 mb-8 relative z-10">Töltse ki az űrlapot, és hamarosan felvesszük önnel a kapcsolatot.</p>

                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1">
                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1">Név</label>
                        <input type="text" id="name" name="name" placeholder="Teljes név" className="block w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-2xl text-stone-900 dark:text-white placeholder-stone-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" disabled={submissionStatus === 'loading' || cooldownActive} />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1">Email</label>
                        <input id="email" name="email" type="email" placeholder="Email cím" className="block w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-2xl text-stone-900 dark:text-white placeholder-stone-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200" disabled={submissionStatus === 'loading' || cooldownActive} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1">Tárgy</label>
                      <Dropdown
                        name="subject"
                        options={[
                          { value: "Általános érdeklődés", label: "Általános érdeklődés" },
                          { value: "Bejelentés", label: "Bejelentés" },
                          { value: "Panasz", label: "Panasz" },
                          { value: "Egyéb", label: "Egyéb" },
                        ]}
                        value={selectedSubject}
                        onChange={setSelectedSubject}
                        placeholder="Válasszon tárgyat"
                        className="w-full"
                        disabled={submissionStatus === 'loading' || cooldownActive}
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400 ml-1">Üzenet</label>
                      <textarea id="message" name="message" rows={6} placeholder="Írja ide az üzenetét..." className="block w-full px-5 py-4 bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-2xl text-stone-900 dark:text-white placeholder-stone-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 resize-none" disabled={submissionStatus === 'loading' || cooldownActive}></textarea>
                    </div>

                    <button type="submit" className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed" disabled={submissionStatus === 'loading' || cooldownActive}>
                      {submissionStatus === 'loading' ? (
                        <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> Küldés...</>
                      ) : cooldownActive ? (
                        <><i className="bi bi-hourglass-split"></i> Kérjük várjon {cooldownRemaining}mp</>
                      ) : (
                        <><i className="bi bi-send-fill"></i> Üzenet elküldése</>
                      )}
                    </button>

                    {/* Status Messages */}
                    <div className="mt-4">
                      {submissionStatus === 'success' && (
                        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                          <i className="bi bi-check-circle-fill text-xl"></i> {submissionMessage}
                        </div>
                      )}
                      {submissionStatus === 'error' && (
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                          <i className="bi bi-exclamation-circle-fill text-xl"></i> {submissionMessage}
                        </div>
                      )}
                      {cooldownActive && submissionStatus === 'cooldown' && (
                        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                          <i className="bi bi-hourglass-split text-xl"></i> {submissionMessage}
                        </div>
                      )}
                    </div>
                  </form>
                </div>

                {/* Map Card in Left Column */}
                <MapCard activeTab={activeTab} />
              </div>

              {/* Right Column: Contact Info & Office Hours (no map) */}
              <div className="lg:col-span-5 space-y-6" key="tyukod-sidebar">
                <ContactInfo activeTab={activeTab} />
                <OfficeHoursAndMap activeTab={activeTab} officeHours={tyukodOfficeHours} showMap={false} />
              </div>
            </>
          )}

          {/* Logic for Ura Layout - Two Equal Columns */}
          {activeTab === 'ura' && (
            <>
              {/* Left Column: Contact Info */}
              <div className="lg:col-span-6" key="ura-left">
                <ContactInfo activeTab={activeTab} className="h-full" />
              </div>

              {/* Right Column: Office Hours & Map (Stacked) */}
              <div className="lg:col-span-6 space-y-6" key="ura-right">
                <OfficeHoursAndMap activeTab={activeTab} officeHours={uraOfficeHours} showMap={false} />
                <MapCard activeTab={activeTab} />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}