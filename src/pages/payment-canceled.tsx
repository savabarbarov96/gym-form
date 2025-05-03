import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from "lucide-react";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full p-6 md:p-8 text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <X className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Плащането е отменено
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Вашата поръчка беше отменена и няма да бъдете таксувани. Можете да опитате отново или да се свържете с нас, ако имате въпроси.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Върнете се към началото
          </button>
          
          <button
            onClick={() => navigate('/form')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
          >
            Опитайте отново
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCanceled; 