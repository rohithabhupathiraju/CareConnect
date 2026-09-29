import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bot, Send, Mic, Volume2, Sparkles, User } from 'lucide-react';
import type { Language } from '../../types';

export const AIAssistantPage: React.FC = () => {
  const { currentProfile, vitals, language: globalLang } = useApp();
  const [lang, setLang] = useState<Language>(globalLang);
  const [inputText, setInputText] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const [messages, setMessages] = useState<{ id: string; sender: 'user' | 'ai'; text: string; time: string }[]>([
    {
      id: 'm1',
      sender: 'user',
      text: 'Summarize my last consultation.',
      time: '09:40 AM'
    },
    {
      id: 'm2',
      sender: 'ai',
      text: `Your last consultation was with Dr. Priya Sharma at Apollo Hospitals on 25 September 2026.\n\nYour recorded vitals were:\n• BP: 123/83 mmHg\n• Heart Rate: 72 BPM\n\nA prescription for Paracetamol 500 mg (Twice daily after food) was recorded.\nYour next follow-up is scheduled for Tomorrow at 10:30 AM.`,
      time: '09:40 AM'
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `u_${Date.now()}`, sender: 'user' as const, text: query, time: timeNow };
    
    let aiResponseText = '';
    const qLower = query.toLowerCase();

    if (qLower.includes('medicine') || qLower.includes('prescription')) {
      if (lang === 'TE') {
        aiResponseText = `మీరు ప్రస్తుతం పారాసిటమాల్ 500 mg (రోజుకు 2 సార్లు) మరియు విటమిన్ D3 60,000 IU వాడుతున్నారు. ప్రతీ డోస్ ఆహారం తర్వాత మాత్రమే తీసుకోండి.`;
      } else if (lang === 'HI') {
        aiResponseText = `आपकी सक्रिय दवाओं में पैरासिटामोल 500 mg (दिन में दो बार) और विटामिन D3 शामिल हैं। खुराक भोजन के बाद ही लें।`;
      } else {
        aiResponseText = `Your active medications are Paracetamol 500 mg (twice daily) and Vitamin D3 (60,000 IU). Both should be taken after food as prescribed by Dr. Priya Sharma.`;
      }
    } else if (qLower.includes('bp') || qLower.includes('trend') || qLower.includes('vital')) {
      const latestBp = vitals[0];
      if (lang === 'TE') {
        aiResponseText = `మీ చివరి రక్తపోటు వివరాలు: ${latestBp ? `${latestBp.bpSystolic}/${latestBp.bpDiastolic} mmHg` : '123/83 mmHg'}. మీ రక్తపోటు సాధారణ పరిమితిలోనే ఉంది.`;
      } else if (lang === 'HI') {
        aiResponseText = `आपका नवीनतम ब्लड प्रेशर ${latestBp ? `${latestBp.bpSystolic}/${latestBp.bpDiastolic} mmHg` : '123/83 mmHg'} रिकॉर्ड किया गया है। यह सामान्य सीमा में है।`;
      } else {
        aiResponseText = `Your latest recorded Blood Pressure is ${latestBp ? `${latestBp.bpSystolic}/${latestBp.bpDiastolic} mmHg` : '123/83 mmHg'} at ${latestBp?.time || '09:10 AM'}. BP readings show a stable baseline.`;
      }
    } else {
      if (lang === 'TE') {
        aiResponseText = `నమస్కారం ${currentProfile.name}! మీ హెల్త్ ఐడీ ${currentProfile.healthId} కి సంబంధించిన తాజా నివేదికల ప్రకారం మీ ఆరోగ్య స్థితి నిలకడగా ఉంది. రేపటి డాక్టర్ అపాయింట్‌మెంట్ ఉదయం 10:30 గంటలకు ఉంది.`;
      } else if (lang === 'HI') {
        aiResponseText = `नमस्ते ${currentProfile.name}! आपकी स्वास्थ्य आईडी ${currentProfile.healthId} के अनुसार आपकी स्वास्थ्य स्थिति सामान्य और स्थिर है। कल डॉक्टर प्रिया शर्मा से आपकी मुलाकात 10:30 AM पर है।`;
      } else {
        aiResponseText = `Hello ${currentProfile.name}! Based on your verified Health ID (${currentProfile.healthId}) records from Apollo & CARE Hospitals, your vital parameters are stable. Your hemoglobin level was 9.2 g/dL on 20 Sept report. Next appointment is tomorrow at 10:30 AM with Dr. Priya Sharma.`;
      }
    }

    const aiMsg = { id: `ai_${Date.now()}`, sender: 'ai' as const, text: aiResponseText, time: timeNow };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInputText('');
  };

  const handlePlayVoice = () => {
    setIsPlayingAudio(true);
    try {
      const utterance = new SpeechSynthesisUtterance(
        messages[messages.length - 1]?.text || 'CareConnect AI multi-lingual voice audio playing.'
      );
      if (lang === 'TE') utterance.lang = 'te-IN';
      else if (lang === 'HI') utterance.lang = 'hi-IN';
      else utterance.lang = 'en-US';

      speechSynthesis.speak(utterance);
      utterance.onend = () => setIsPlayingAudio(false);
    } catch (e) {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white p-6 rounded-3xl shadow-xl border border-indigo-900 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              CONNECTED CLINICAL RECORDS AI
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            CareConnect AI Health Assistant
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Ask questions about your verified health records connected under <span className="font-mono font-bold text-teal-300">{currentProfile.healthId}</span>.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 text-xs font-bold">
          {(['EN', 'TE', 'HI'] as const).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                lang === l ? 'bg-teal-500 text-slate-950 font-black shadow-xs' : 'text-slate-300 hover:text-white'
              }`}
            >
              {l === 'EN' ? 'English' : l === 'TE' ? 'తెలుగు' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white'
                    : 'bg-gradient-to-tr from-indigo-700 to-teal-600 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs space-y-1 shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 font-medium whitespace-pre-line leading-relaxed rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`font-bold text-[10px] ${msg.sender === 'user' ? 'text-teal-200' : 'text-teal-700'}`}>
                    {msg.sender === 'user' ? currentProfile.name : 'CareConnect AI (Verified Records)'}
                  </span>
                  <span className={`text-[9px] ${msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>

                <p className="mt-1">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-2 text-xs">
          {[
            'Summarize my last consultation',
            'What are my current active medicines?',
            'How is my BP trend looking?'
          ].map(q => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-semibold transition-all"
            >
              💡 "{q}"
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center gap-3">
          <button
            onClick={handlePlayVoice}
            className={`p-3 rounded-2xl transition-all border ${
              isPlayingAudio
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                : 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200'
            }`}
            title="Play Audio Voice Response"
          >
            {isPlayingAudio ? <Volume2 className="w-5 h-5 animate-bounce" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder={
              lang === 'TE'
                ? 'మీ ఆరోగ్య వివరాల గురించి ప్రశ్నలు అడగండి...'
                : lang === 'HI'
                ? 'अपने स्वास्थ्य रिकॉर्ड से संबंधित प्रश्न पूछें...'
                : 'Ask questions about your verified health records...'
            }
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
          />

          <button
            onClick={() => handleSend()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold p-3 rounded-2xl transition-all shadow-md shadow-teal-600/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
