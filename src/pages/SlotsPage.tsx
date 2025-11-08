import { SlotMachine } from '../components/SlotMachine';
import { Header } from '../components/Header';
import { useGameStore } from '../state/useGameStore';

export function SlotsPage() {
  const { isDarkMode } = useGameStore();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-black' : 'bg-tbank-gray-50'}`}>
      <Header />

      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-4 transition-colors ${
              isDarkMode ? 'text-white' : 'text-tbank-black'
            }`}>
              Слот-машина
            </h1>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto transition-colors ${
              isDarkMode ? 'text-gray-400' : 'text-tbank-gray-400'
            }`}>
              Испытайте удачу в виртуальном слот-автомате. Совпадение символов приносит выигрыш
            </p>
          </div>

          <SlotMachine />
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

