import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useGameStore } from '../state/useGameStore';
import { motion } from 'framer-motion';

export function PersonalPage() {
  const { isDarkMode, balance } = useGameStore();

  const benefits = [
    { icon: '🎰', title: 'Казино', description: 'Спусти всё за 5 минут' },
    { icon: '✈️', title: 'Авиатор', description: 'Или за 30 секунд' },
    { icon: '📊', title: 'Аналитика', description: 'Смотри как теряешь' },
  ];

  const quotes = [
    "Я дам вам пизды за отсутствие додепа",
    "Миш, мне похуй, я так чувствую",
    "Это было не просто смело, это было охуенно как смело",
    "Какое-то величие, какая-то хуйня, мне вообще они неинтересны",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Hero Banner with Oleg */}
      <section className="relative overflow-hidden">
        <div className="relative h-[600px]">
          {/* Yellow Background with Diagonal */}
          <div className="absolute inset-0 bg-gradient-to-br from-tbank-yellow via-tbank-yellow to-yellow-300">
            {/* Diagonal White Section */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-gray-100 to-white"
              style={{
                clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid lg:grid-cols-2 gap-8 h-full items-center">
              {/* Left: Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="z-10"
              >
                {/* Logo Badge */}
                <div className="inline-block bg-white rounded-3xl p-6 mb-8 shadow-tbank-lg">
                  <img src="/logo.png" alt="Т-Банк" className="h-16 w-auto" />
                </div>

                {/* Quote */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-12 text-tbank-black leading-tight">
                  {randomQuote}
                </h1>

                {/* Signature */}
                <p className="text-2xl font-bold text-gray-700">
                  Олег Тиньков
                </p>
              </motion.div>

              {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-10 flex justify-end"
              >
                <img 
                  src="/oleg-tinkov.png" 
                  alt="Олег Тиньков" 
                  className="h-[500px] w-auto object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Balance CTA */}
      <section className={`py-8 border-y transition-colors ${
        isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-tbank-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Ваш текущий баланс
              </p>
              <p className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-tbank-black'}`}>
                {balance.toLocaleString()} ₽
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/account"
                className="px-8 py-4 bg-tbank-yellow text-tbank-black font-black text-lg rounded-2xl hover:bg-yellow-400 transition-all shadow-tbank-lg hover:shadow-tbank-xl transform hover:scale-105"
              >
                Додепнуть
              </Link>
              <Link
                to="/slots"
                className={`px-8 py-4 font-black text-lg rounded-2xl transition-all ${
                  isDarkMode
                    ? 'bg-zinc-800 text-white hover:bg-zinc-700'
                    : 'bg-tbank-gray-100 text-tbank-black hover:bg-tbank-gray-200'
                }`}
              >
                Играть
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-black text-center mb-4 ${
            isDarkMode ? 'text-white' : 'text-tbank-black'
          }`}>
            Для частных лиц
          </h2>
          <p className={`text-xl text-center mb-12 ${
            isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
          }`}>
            Всё, что нужно для того, чтобы спустить деньги
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl transition-all hover:scale-105 cursor-pointer ${
                  isDarkMode ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-tbank-gray-50'
                } shadow-tbank-lg`}
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className={`text-2xl font-black mb-2 ${
                  isDarkMode ? 'text-white' : 'text-tbank-black'
                }`}>
                  {benefit.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Carousel */}
      <section className={`py-16 ${isDarkMode ? 'bg-zinc-900' : 'bg-tbank-yellow'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className={`text-3xl sm:text-4xl lg:text-5xl font-black mb-6 ${
              isDarkMode ? 'text-white' : 'text-tbank-black'
            }`}>
              "{quotes[Math.floor(Math.random() * quotes.length)]}"
            </p>
            <p className={`text-xl font-bold ${
              isDarkMode ? 'text-gray-400' : 'text-gray-700'
            }`}>
              — Олег Тиньков, основатель
            </p>
          </motion.div>
        </div>
      </section>

      {/* Games Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-4xl font-black text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-tbank-black'
          }`}>
            Наши игры
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Link
              to="/slots"
              className={`group p-8 rounded-2xl transition-all hover:scale-105 ${
                isDarkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-tbank-xl`}
            >
              <div className="text-6xl mb-4">🎰</div>
              <h3 className={`text-3xl font-black mb-3 group-hover:text-tbank-yellow transition-colors ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>
                Слот-машина
              </h3>
              <p className={`text-lg mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
              }`}>
                Классические барабаны. Совпадение символов приносит выигрыш до 10×
              </p>
              <div className="flex items-center gap-2 text-tbank-yellow font-bold">
                <span>Играть сейчас</span>
                <span>→</span>
              </div>
            </Link>

            <Link
              to="/aviator"
              className={`group p-8 rounded-2xl transition-all hover:scale-105 ${
                isDarkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-tbank-xl`}
            >
              <div className="text-6xl mb-4">✈️</div>
              <h3 className={`text-3xl font-black mb-3 group-hover:text-tbank-yellow transition-colors ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>
                Авиатор
              </h3>
              <p className={`text-lg mb-4 ${
                isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
              }`}>
                Самолёт летит вверх с растущим множителем. Успей забрать!
              </p>
              <div className="flex items-center gap-2 text-tbank-yellow font-bold">
                <span>Играть сейчас</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={`py-16 ${isDarkMode ? 'bg-zinc-900' : 'bg-tbank-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-4xl font-black mb-6 ${
            isDarkMode ? 'text-white' : 'text-tbank-black'
          }`}>
            Готовы начать?
          </h2>
          <p className={`text-xl mb-8 ${
            isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
          }`}>
            Пополняйте баланс и испытывайте удачу прямо сейчас
          </p>
          <Link
            to="/account"
            className="inline-block px-12 py-5 bg-tbank-yellow text-tbank-black font-black text-2xl rounded-2xl hover:bg-yellow-400 transition-all shadow-tbank-xl hover:shadow-2xl transform hover:scale-105"
          >
            Депнуть сейчас
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t transition-colors ${
        isDarkMode ? 'border-zinc-800' : 'border-tbank-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
            © 2024 Т-Казино. Виртуальная игра в образовательных целях
          </p>
        </div>
      </footer>
    </div>
  );
}

