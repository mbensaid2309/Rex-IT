import React, { useState } from 'react';
import { useNavigate, useLocation, Location, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRegistering, setIsRegistering] = useState(searchParams.get('register') === 'true');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {isRegistering ? 'Inscription' : 'Connexion'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            required
          />
          {isRegistering && (
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              required
            />
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {isRegistering ? "S'inscrire" : 'Se connecter'}
          </button>
        </form>
        <div className="mt-4 text-center">
          {isRegistering ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false);
                  setSearchParams({});
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Se connecter
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Nouveau sur Rex IT ?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true);
                  setSearchParams({ register: 'true' });
                }}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Créer un compte
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
