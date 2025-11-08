import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useGameStore } from '../state/useGameStore';
import { motion } from 'framer-motion';

export function LandingPage() {
  const { isDarkMode, balance } = useGameStore();

  const services = [
    { icon: '🎰', title: 'Слоты', subtitle: 'Классика жанра', link: '/slots' },
    { icon: '✈️', title: 'Авиатор', subtitle: 'Поймай X', link: '/aviator' },
    { icon: '💳', title: 'Депнуть', subtitle: 'С карты', link: '/account' },
    { icon: '💰', title: 'Баланс', subtitle: `${balance.toLocaleString()} ₽`, link: '/account' },
    { icon: '📊', title: 'Статистика', subtitle: 'Твоих игр', link: '/account' },
    { icon: '🎁', title: 'Бонусы', subtitle: 'Скоро будет', link: '#' },
    { icon: '⚙️', title: 'Админка', subtitle: 'Для своих', link: '/admin' },
    { icon: '🌙', title: 'Тема', subtitle: isDarkMode ? 'Темная' : 'Светлая', link: '#' },
  ];

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-6 transition-colors ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>
                Онлайн-казино для малого бизнеса
              </h1>
              <p className={`text-lg sm:text-xl mb-8 max-w-xl transition-colors ${
                isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
              }`}>
                Без очередей и ожидания на линии. Удобное приложение и личный кабинет. Поддержка 24/7 в чате
              </p>
              <Link
                to="/account"
                className="inline-block px-8 py-4 bg-tbank-yellow text-tbank-black font-black text-xl rounded-2xl hover:bg-yellow-400 transition-all shadow-tbank-lg hover:shadow-tbank-xl transform hover:scale-105"
              >
                Депнуть
              </Link>
            </motion.div>

            {/* Right: Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className={`relative rounded-3xl p-8 ${
                isDarkMode ? 'bg-gradient-to-br from-zinc-900 to-zinc-800' : 'bg-gradient-to-br from-white to-tbank-gray-50'
              } shadow-tbank-xl`}>
                {/* Decorative Elements */}
                <div className="relative h-96 flex items-center justify-center">
                  {/* Card 1 */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [-5, -8, -5]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute left-8 top-12 w-48 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-2xl"
                  >
                    <div className="p-4">
                      <div className="w-12 h-8 bg-yellow-400 rounded mb-4 opacity-50"></div>
                      <div className="text-white text-xs font-bold">T-CARD</div>
                    </div>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [5, 8, 5]
                    }}
                    transition={{ 
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                    className="absolute right-8 top-16 w-48 h-32 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl"
                  >
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-tbank-yellow rounded-full flex items-center justify-center text-xs font-black">
                          Т
                        </div>
                        <span className="text-xs font-bold text-gray-800">БИЗНЕС</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className={`relative z-10 w-40 h-80 rounded-3xl border-4 overflow-hidden shadow-2xl ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="h-full flex flex-col items-center justify-center p-4">
                      <div className="mb-6">
                        <img src="/logo.png" alt="Т-Банк" className="h-12 w-auto" />
                      </div>
                      <div className={`text-4xl font-black mb-2 ${
                        isDarkMode ? 'text-white' : 'text-tbank-black'
                      }`}>
                        {balance.toLocaleString()}
                      </div>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                        игровой баланс
                      </div>
                      <div className="mt-8 space-y-2 w-full">
                        <div className={`h-8 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'}`}></div>
                        <div className={`h-8 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-tbank-gray-50'}`}></div>
                        <div className="h-12 bg-tbank-yellow rounded-lg"></div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Floating Coins */}
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 360]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute left-32 bottom-12 text-5xl"
                  >
                    💰
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, -25, 0],
                      rotate: [0, -360]
                    }}
                    transition={{ 
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.8
                    }}
                    className="absolute right-24 bottom-20 text-4xl"
                  >
                    🎰
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Bar */}
      <section className={`border-t transition-colors ${
        isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-tbank-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={service.link}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl min-w-[120px] transition-all hover:scale-105 ${
                      isDarkMode 
                        ? 'bg-zinc-800 hover:bg-zinc-700' 
                        : 'bg-tbank-gray-50 hover:bg-tbank-gray-100'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${
                      isDarkMode ? 'bg-zinc-900' : 'bg-white'
                    } shadow-tbank`}>
                      {service.icon}
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${
                        isDarkMode ? 'text-white' : 'text-tbank-black'
                      }`}>
                        {service.title}
                      </div>
                      <div className={`text-xs ${
                        isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
                      }`}>
                        {service.subtitle}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl sm:text-4xl font-black text-center mb-12 transition-colors ${
            isDarkMode ? 'text-white' : 'text-tbank-black'
          }`}>
            Почему Т-Казино?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl transition-colors ${
                isDarkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-tbank-lg`}
            >
              <div className="text-5xl mb-4">🎰</div>
              <h3 className={`text-xl font-black mb-2 ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>Две игры</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Классические слоты и Авиатор. Больше не нужно!
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl transition-colors ${
                isDarkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-tbank-lg`}
            >
              <div className="text-5xl mb-4">⚡️</div>
              <h3 className={`text-xl font-black mb-2 ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>Быстро</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Никаких задержек. Моментальные выплаты и пополнения
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl transition-colors ${
                isDarkMode ? 'bg-zinc-900' : 'bg-white'
              } shadow-tbank-lg`}
            >
              <div className="text-5xl mb-4">🔥</div>
              <h3 className={`text-xl font-black mb-2 ${
                isDarkMode ? 'text-white' : 'text-tbank-black'
              }`}>Цитаты Олега</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'}`}>
                Настоящие, без цензуры. "Миш, мне похуй, я так чувствую"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t mt-16 transition-colors ${
        isDarkMode ? 'border-zinc-800' : 'border-tbank-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm transition-colors ${
            isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
          }`}>
            © 2024 Т-Казино. Виртуальная игра в образовательных целях
          </p>
        </div>
      </footer>
    </div>
  );
}

