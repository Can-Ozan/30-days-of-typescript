import { Sparkles, Gamepad2, Users, Wrench } from 'lucide-react';

interface Character {
  name: string;
  role: string;
  description: string;
}

interface GameIdeaCardProps {
  theme: string;
  genre: string;
  mechanics: string[];
  characters: Character[];
  description: string;
}

export function GameIdeaCard({ theme, genre, mechanics, characters, description }: GameIdeaCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full transform transition-all duration-300 hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{theme}</h2>
          <p className="text-sm text-gray-500 uppercase tracking-wide">{genre}</p>
        </div>
      </div>

      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        {description}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">Game Mechanics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mechanics.map((mechanic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white rounded-full text-sm font-medium text-orange-700 shadow-sm"
              >
                {mechanic}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Genre Details</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Type: <strong>{genre}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Setting: <strong>{theme}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700">Characters: <strong>{characters.length}</strong></span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Characters</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {characters.map((character, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-800">{character.name}</h4>
                <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full font-medium">
                  {character.role}
                </span>
              </div>
              <p className="text-sm text-gray-600">{character.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}