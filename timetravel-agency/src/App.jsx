import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Map, Calendar, Compass, Sparkles, Send, ChevronRight, Loader2 } from 'lucide-react';
import { Mistral } from '@mistralai/mistralai';

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const mistral = new Mistral({ apiKey: apiKey });

const DESTINATIONS = [
  {
    id: 'paris',
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    desc: "Vivez l'effervescence de l'Exposition Universelle et l'inauguration de la Tour Eiffel. Une ère d'élégance et d'innovation.",
    image: '/paris.png',
    detailImage: '/paris_details.png',
    detailText: "Débarquez en plein coeur de Paris lors de l'Exposition Universelle de 1889. Mêlez-vous à la haute société et assistez à l'inauguration spectaculaire de la Tour Eiffel, l'édifice le plus haut du monde à cette époque. Vous déambulerez sur le Champ de Mars sous la supervision discrète de nos agents, vêtu(e) des plus belles créations de la mode parisienne de la fin du 19e siècle."
  },
  {
    id: 'cretaceous',
    title: 'Crétacé',
    subtitle: '-65 Millions d\'années',
    desc: "Un safari temporel unique au coeur d'une jungle luxuriante. Observez les majestueux géants qui dominaient notre monde.",
    image: '/cretaceous.png',
    detailImage: '/cretaceous_details.png',
    detailText: "Une expédition sécurisée de 72 heures au sein d'une nature vierge. À bord de nos dômes temporels invisibles, flottez au-dessus de la canopée et observez des familles de Tricératops en pleine migration. L'atmosphère extrêmement dense et riche en oxygène vous procurera un sentiment de vitalité absolue. Aucun risque de 'Paradoxe du Grand-Père' selon nos algorithmes prédictifs strictes."
  },
  {
    id: 'florence',
    title: 'Florence 1504',
    subtitle: 'Apogée de la Renaissance',
    desc: "Rencontrez les plus grands maîtres de l'art dans la cité toscane. Admirez l'éveil artistique européen à sa source.",
    image: '/florence.png',
    detailImage: '/florence_details.png',
    detailText: "Votre voyage commencera aux portes de la ville, lors d'une aube brumeuse de 1504. Vous serez guidé par l'un de nos agents temporels camouflé en marchand de tissus. Vous aurez l'opportunité unique d'entrer incognito dans l'atelier de Michel-Ange, alors qu'il sculpte secrètement le David, et de croiser Léonard de Vinci dans les rues de Florence. Le séjour inclut des vêtements d'époque authentiques et un dîner privatif reprenant les classiques gastronomiques de l'époque."
  }
];

const DestinationModal = ({ destination, onClose }) => {
  if (!destination) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl flex flex-col md:flex-row"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="md:w-1/2 min-h-[300px] md:min-h-full relative">
            <img
              src={destination.detailImage}
              alt={`${destination.title} details`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-brand-gold uppercase tracking-widest text-sm font-semibold mb-2">{destination.subtitle}</span>
            <h3 className="text-4xl font-serif mb-6 text-white">{destination.title}</h3>

            <div className="space-y-4 mb-8">
              <p className="text-gray-300 leading-relaxed">
                {destination.detailText}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <Calendar className="w-5 h-5 text-brand-gold mb-2" />
                <span className="text-xs text-gray-400 block mb-1">DURÉE CONSEILLÉE</span>
                <span className="font-semibold">3 à 5 Jours</span>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <Map className="w-5 h-5 text-brand-gold mb-2" />
                <span className="text-xs text-gray-400 block mb-1">SÉCURITÉ TEMPORELLE</span>
                <span className="font-semibold text-green-400">Maximale</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 bg-brand-gold text-brand-dark rounded-xl font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors"
            >
              Fermer le dossier
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const QuizSection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const questions = [
    {
      q: "Quel type d'expérience recherchez-vous ?",
      options: ["Culturelle et artistique", "Aventure et nature", "Élégance et modernité"]
    },
    {
      q: "Votre période préférée ?",
      options: ["Histoire moderne (XIXe siècle)", "Temps anciens", "Renaissance"]
    },
    {
      q: "Vous préférez :",
      options: ["L'effervescence urbaine", "La nature sauvage", "L'art et l'architecture"]
    },
    {
      q: "Votre activité idéale :",
      options: ["Visiter des monuments", "Observer la faune", "Explorer des musées"]
    }
  ];

  const handleAnswer = async (index) => {
    const newAnswers = [...answers, questions[step].options[index]];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsLoading(true);

      const prompt = `En tant qu'agent de voyage temporel expert pour "TimeTravel Agency", analyse les réponses suivantes d'un client à notre quiz :
1. Expérience recherchée : ${newAnswers[0]}
2. Période préférée : ${newAnswers[1]}
3. Préférence d'environnement : ${newAnswers[2]}
4. Activité idéale : ${newAnswers[3]}

Nos 3 seules destinations disponibles sont :
- Paris 1889 (La Belle Époque, Exposition Universelle, Tour Eiffel)
- Crétacé -65 Millions d'années (Safari dinosaures, nature préhistorique)
- Florence 1504 (Apogée de la Renaissance, Art, Michel-Ange)

Choisis LA destination la PLUS adaptée parmi ces 3.
Réponds UNIQUEMENT au format JSON strict avec cette structure :
{
  "destinationId": "paris" | "cretaceous" | "florence",
  "explication": "Un paragraphe d'environ 3-4 phrases expliquant de manière personnalisée et élégante pourquoi cette destination correspond parfaitement à ses choix."
}`;

      try {
        const response = await mistral.chat.complete({
          model: "mistral-small-latest",
          messages: [{ role: "user", content: prompt }],
          responseFormat: { type: "json_object" }
        });

        const data = JSON.parse(response.choices[0].message.content);

        let reco;
        if (data.destinationId === 'paris') reco = DESTINATIONS[0];
        else if (data.destinationId === 'cretaceous') reco = DESTINATIONS[1];
        else reco = DESTINATIONS[2];

        setResult({ ...reco, customDesc: data.explication });
      } catch (error) {
        console.error("Mistral API Error:", error);
        // Fallback
        setResult({ ...DESTINATIONS[0], customDesc: "D'après vos réponses élégantes, Paris 1889 est la destination parfaite. L'effervescence de l'Exposition Universelle correspondra parfaitement à vos attentes de découverte et d'émerveillement." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-24 px-6 md:px-12 bg-brand-gray relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-serif mb-4 gold-gradient-text"
        >
          Trouvez votre époque idéale
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-400 mb-12"
        >
          Répondez à 4 questions pour découvrir votre prochaine destination
        </motion.p>

        <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-brand-gold font-serif text-xl">Question {step + 1}/{questions.length}</span>
                  <div className="flex gap-2">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-1 w-8 rounded-full ${i <= step ? 'bg-brand-gold' : 'bg-white/20'}`} />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl mb-8">{questions[step].q}</h3>
                <div className="grid gap-4">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="p-4 border border-white/10 rounded-xl text-left hover:border-brand-gold hover:bg-brand-gold/10 transition-all duration-300 group flex justify-between items-center"
                    >
                      <span>{opt}</span>
                      <ChevronRight className="w-5 h-5 text-transparent group-hover:text-brand-gold transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Loader2 className="w-12 h-12 text-brand-gold animate-spin mx-auto mb-6" />
                <h3 className="text-2xl font-serif gold-gradient-text animate-pulse">Analyse temporelle en cours...</h3>
                <p className="text-gray-400 mt-2">Notre IA détermine votre époque idéale</p>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Sparkles className="w-16 h-16 text-brand-gold mx-auto mb-6" />
                <h3 className="text-3xl font-serif mb-2">Votre destination idéale :</h3>
                <h4 className="text-4xl text-brand-gold mb-6">{result.title}</h4>
                <div className="max-w-md mx-auto mb-8">
                  <img src={result.image} alt={result.title} className="w-full h-48 object-cover rounded-xl mb-4 border border-white/10" />
                  <p className="text-gray-300 italic">"{result.customDesc}"</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button onClick={resetQuiz} className="px-6 py-3 border border-white/20 rounded-full hover:bg-white/5 transition-colors">
                    Recommencer
                  </button>
                  <button className="px-6 py-3 bg-brand-gold text-brand-dark rounded-full font-semibold hover:bg-yellow-500 transition-colors">
                    Réserver maintenant
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Bonjour ! Je suis l'assistant temporel de TimeTravel Agency. Avez-vous besoin de conseils pour choisir votre prochaine époque ?" }
  ]);
  const [input, setInput] = useState('');

  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsChatLoading(true);

    try {
      const mistralMessages = [
        {
          role: "system",
          content: "Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe. Ton rôle est de conseiller les clients sur les meilleures destinations. Ton ton est professionnel, chaleureux, passionné d'histoire et élégant. Tu ne proposes QUE les 3 destinations suivantes : Paris 1889 (La Belle Époque, Exposition Universelle), Crétacé -65M (dinosaures, nature sauvage) et Florence 1504 (Renaissance, Michel-Ange). Tu peux inventer des prix crédibles en 'Crédits Temporels' (ex: entre 30 000 et 150 000 crédits). Fais des réponses courtes (max 3 phrases)."
        },
        ...newMessages.map(m => ({ role: m.role, content: m.text }))
      ];

      const response = await mistral.chat.complete({
        model: "mistral-small-latest",
        messages: mistralMessages,
      });

      setMessages([...newMessages, {
        role: 'assistant',
        text: response.choices[0].message.content
      }]);
    } catch (error) {
      console.error("Chatbot API Error:", error);
      setMessages([...newMessages, {
        role: 'assistant',
        text: "Veuillez m'excuser, je subis une légère perturbation temporelle. Pourriez-vous reformuler votre question ?"
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-brand-gold text-brand-dark rounded-full shadow-2xl shadow-brand-gold/20 z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 glass-panel rounded-2xl overflow-hidden z-50 flex flex-col h-[500px]"
          >
            <div className="p-4 bg-brand-dark flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-dark" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold leading-tight">Assistant Temporel</h3>
                  <p className="text-xs text-brand-gold">Toujours à l'heure</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-dark/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm whitespace-pre-wrap ${msg.role === 'user'
                    ? 'bg-brand-gold text-brand-dark rounded-br-none'
                    : 'bg-brand-accent text-white rounded-bl-none border border-white/5'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-brand-accent text-gray-400 rounded-2xl rounded-bl-none border border-white/5 p-3 text-sm flex gap-1 items-center">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-brand-dark border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Posez votre question..."
                className="flex-1 bg-brand-accent rounded-full px-4 text-sm focus:outline-none focus:ring-1 focus:ring-brand-gold border border-white/5"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="p-2 bg-brand-gold text-brand-dark rounded-full hover:bg-yellow-500 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

function App() {
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 glass-panel border-x-0 border-t-0 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-brand-gold" />
            <span className="font-serif text-xl font-bold tracking-wider">TIMETRAVEL AGENCY</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest">
            <a href="#destinations" className="hover:text-brand-gold text-gray-300 transition-colors">Destinations</a>
            <a href="#quiz" className="hover:text-brand-gold text-gray-300 transition-colors">Quiz</a>
            <a href="#about" className="hover:text-brand-gold text-gray-300 transition-colors">Agence</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero_bg.png"
            alt="TimeTravel Portal"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight"
          >
            Le Temps n'est plus une limite.<br />
            <span className="gold-gradient-text">C'est votre destinée.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            L'agence numéro un pour les voyages inter-temporels de luxe. Redécouvrez l'histoire en première classe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href="#destinations" className="inline-block px-8 py-4 bg-brand-gold text-brand-dark rounded-full font-semibold uppercase tracking-wider hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
              Découvrir nos Époques
            </a>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-4xl font-serif gold-gradient-text mb-4"
            >
              Époques Disponibles
            </motion.h2>
            <p className="text-gray-400">Sélectionnées pour leur richesse historique et leur sécurité garantie.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group relative rounded-2xl overflow-hidden glass-panel cursor-pointer hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-brand-gold uppercase tracking-widest text-xs font-semibold mb-2 block">{dest.subtitle}</span>
                    <h3 className="text-3xl font-serif mb-3">{dest.title}</h3>
                    <p className="text-sm text-gray-300 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                      {dest.desc}
                    </p>
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-gold hover:text-white transition-colors"
                    >
                      Explorer l'époque <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Modal Overlay */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />

      {/* Quiz Section */}
      <QuizSection />

      {/* Footer */}
      <footer className="bg-brand-dark py-12 px-6 border-t border-white/10 text-center">
        <div className="max-w-4xl mx-auto">
          <Compass className="w-8 h-8 text-brand-gold mx-auto mb-6" />
          <h2 className="font-serif text-2xl mb-4 text-white">TimeTravel Agency</h2>
          <p className="text-gray-500 text-sm mb-8">
            L'usage du voyage temporel est réglementé par l'Autorité Chronologique Mondiale.
            Nous déclinons toute responsabilité en cas de modification accidentelle de votre arbre généalogique.
          </p>
          <p className="text-brand-gold/50 text-xs tracking-widest uppercase">© 2026 TimeTravel Agency - M1/M2 IA Webapp</p>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
