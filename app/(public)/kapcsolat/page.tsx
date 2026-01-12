"use client";

import { useState, useEffect } from "react";
import CustomSelect from "@/components/CustomSelect";

// --- Office Hours Component ---
const OfficeHours = ({ hours, layout = 'list' }: { hours: Record<string, { start: string; end: string }>, layout?: 'list' | 'grid' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Update the time every minute to keep the status fresh
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getDayName = (day: string) => {
    const dayNames = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];
    return dayNames[parseInt(day, 10)];
  };

  const isToday = (day: string) => {
    return currentDate.getDay() === parseInt(day, 10);
  };

  const getStatus = (day: string) => {
    const hoursData = hours[day];
    if (!hoursData || !isToday(day)) return { text: '', class: '' };

    const [startHour, startMinute] = hoursData.start.split(':').map(Number);
    const [endHour, endMinute] = hoursData.end.split(':').map(Number);

    const startTime = new Date(currentDate);
    startTime.setHours(startHour, startMinute, 0, 0);

    const endTime = new Date(currentDate);
    endTime.setHours(endHour, endMinute, 0, 0);

    if (currentDate < startTime) {
      return { text: 'Még nincs nyitva', class: 'text-orange-500' };
    } else if (currentDate >= startTime && currentDate <= endTime) {
      return { text: 'Nyitva', class: 'text-green-600 dark:text-green-400' };
    } else {
      return { text: 'Már bezárt', class: 'text-red-600 dark:text-red-400' };
    }
  };

  const dayEntries = Object.entries(hours);

  if (layout === 'grid') {
    return (
        <div className="flex text-center text-gray-600 dark:text-gray-300 text-lg">
            {dayEntries.map(([day, hourData]) => {
                const status = getStatus(day);
                return (
                    <div key={day} className="flex-1 border-r border-gray-200 dark:border-gray-700 last:border-r-0 px-2">
                        <div className="font-semibold">{getDayName(day)}</div>
                        <div>{hourData.start} - {hourData.end}</div>
                        {isToday(day) && (
                            <div className="mt-2">
                                <span className="font-bold text-amber-600 dark:text-amber-500">(MA)</span>
                                <span className={`block text-sm ${status.class}`}>{status.text}</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
  }

  return (
    <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
      {dayEntries.map(([day, hourData]) => {
        const status = getStatus(day);
        return (
          <div key={day} className="flex items-center">
            <i className="bi bi-calendar-day flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i>
            <div className="flex flex-col">
              <span>{getDayName(day)}</span>
              <span className="font-semibold">{hourData.start} - {hourData.end}</span>
            </div>
            {isToday(day) && (
              <div className="ml-auto text-right">
                <span className="font-bold text-amber-600 dark:text-amber-500">(MA)</span>
                <span className={`block text-sm ${status.class}`}>{status.text}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


// --- Main Contact Page Component ---
export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('tyukod');
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    <div className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Lépjen velünk kapcsolatba
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Kérdése van? Írjon nekünk, és amint tudunk, válaszolunk!
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-12">
            <div className="flex rounded-lg p-1 bg-gray-200/60 dark:bg-gray-700/60 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('tyukod')}
                className={`px-6 py-2 text-lg font-semibold rounded-md transition-all duration-200 ease-in-out ${
                  activeTab === 'tyukod'
                    ? 'bg-white dark:bg-gray-600 shadow-md text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-600/60'
                }`}
              >
                Tyukodi önkormányzat
              </button>
              <button
                onClick={() => setActiveTab('ura')}
                className={`px-6 py-2 text-lg font-semibold rounded-md transition-all duration-200 ease-in-out ${
                  activeTab === 'ura'
                    ? 'bg-white dark:bg-gray-600 shadow-md text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-gray-600/60'
                }`}
              >
                Urai kirendeltség
              </button>
            </div>
          </div>

          {/* Tyukod Content */}
          {activeTab === 'tyukod' && (
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 sm:p-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Küldjön üzenetet</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <input type="text" name="name" placeholder="Teljes név" className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-150" disabled={submissionStatus === 'loading'} />
                      <input id="email" name="email" type="email" placeholder="Email cím" className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-150" disabled={submissionStatus === 'loading'} />
                      <CustomSelect
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
                        disabled={submissionStatus === 'loading'}
                      />
                      <textarea id="message" name="message" rows={5} placeholder="Írja ide az üzenetét..." className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500 transition-shadow duration-150" disabled={submissionStatus === 'loading'}></textarea>
                      <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-150 transform hover:scale-105" disabled={submissionStatus === 'loading'}>
                        {submissionStatus === 'loading' ? 'Küldés...' : 'Üzenet elküldése'}
                      </button>
                      {submissionStatus === 'success' && (
                        <p className="text-center text-green-600 dark:text-green-400">{submissionMessage}</p>
                      )}
                      {submissionStatus === 'error' && (
                        <p className="text-center text-red-600 dark:text-red-400">{submissionMessage}</p>
                      )}
                    </form>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-8 sm:p-10 md:border-l border-t md:border-t-0 border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Elérhetőségek</h2>
                    <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg">
                      <p className="flex items-start"><i className="bi bi-geo-alt-fill flex-shrink-0 w-6 h-6 mr-4 mt-1 text-amber-600 dark:text-amber-500"></i><span className="font-semibold">Cím: 4762 Tyukod, Árpád u. 33.</span></p>
                      <p className="flex items-start"><i className="bi bi-mailbox2 flex-shrink-0 w-6 h-6 mr-4 mt-1 text-amber-600 dark:text-amber-500"></i><span className="font-semibold">Levelezési cím: 4762 Tyukod, Árpád u. 33.</span></p>
                      <p className="flex items-center"><i className="bi bi-envelope-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><a href="mailto:tyukod@outlook.hu" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors break-all">tyukod@outlook.hu</a></p>
                      <p className="flex items-center"><i className="bi bi-telephone-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><a href="tel:+3644556062" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">44/556-062</a></p>
                      <p className="flex items-center"><i className="bi bi-printer-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><span>44/556-064 (fax)</span></p>
                    </div>
                    <div className="mt-10"><h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Jegyző</h3><p className="text-gray-600 dark:text-gray-300 text-lg">Biró Attiláné</p></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"><div className="p-8 sm:p-10"><div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border-2 border-amber-500/20"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d946.5570964806151!2d22.55592066011662!3d47.85377722317471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47387379c3db517d%3A0x120c5ec0ae0d083!2sPolg%C3%A1rmesteri%20Hivatal%20Tyukod!5e0!3m2!1shu!2sro!4v1765740401963!5m2!1shu!2sro" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></div></div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"><div className="p-8 sm:p-10"><h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ügyfélfogadás</h2><OfficeHours hours={tyukodOfficeHours} /></div></div>
              </div>
            </div>
          )}

          {/* Ura Content */}
          {activeTab === 'ura' && (
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-8 sm:p-10"><div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg border-2 border-amber-500/20"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2679.0917716935337!2d22.60386407625198!3d47.818439071210044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47380b4417037645%3A0xa46d7dc516d3d9de!2sUra%2C%20Kossuth%20%C3%BAt%2043%2C%204763!5e0!3m2!1shu!2shu!4v1765749006439!5m2!1shu!2shu" width="100%" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-8 sm:p-10 md:border-l border-t md:border-t-0 border-gray-200 dark:border-gray-700">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Elérhetőségek</h2>
                    <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg">
                      <p className="flex items-start"><i className="bi bi-geo-alt-fill flex-shrink-0 w-6 h-6 mr-4 mt-1 text-amber-600 dark:text-amber-500"></i><span className="font-semibold">Cím: 4763 Ura, Kossuth út 43.</span></p>
                      <p className="flex items-start"><i className="bi bi-mailbox2 flex-shrink-0 w-6 h-6 mr-4 mt-1 text-amber-600 dark:text-amber-500"></i><span className="font-semibold">Levelezési cím: 4763 Ura, Kossuth út 43.</span></p>
                      <p className="flex items-center"><i className="bi bi-envelope-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><a href="mailto:urahiv@freemail.hu" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">urahiv@freemail.hu</a></p>
                      <p className="flex items-center"><i className="bi bi-telephone-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><a href="tel:44520169" className="hover:text-amber-700 dark:hover:text-amber-400 transition-colors">44/520-169</a></p>
                      <p className="flex items-center"><i className="bi bi-printer-fill flex-shrink-0 w-6 h-6 mr-4 text-amber-600 dark:text-amber-500"></i><span>44/341-965 (fax)</span></p>
                    </div>
                    <div className="mt-10"><h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Jegyző</h3><p className="text-gray-600 dark:text-gray-300 text-lg">Biró Attiláné</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 sm:p-10">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Ügyfélfogadás</h2>
                  <OfficeHours hours={uraOfficeHours} layout="grid" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
