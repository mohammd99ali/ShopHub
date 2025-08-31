import { useDispatch } from 'react-redux';
import { updateQuantity } from '../store/slices/cartSlice';

const QuantityControl = ({ itemId, quantity, maxQuantity = 99, onQuantityChange }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      if (onQuantityChange) {
        onQuantityChange(newQuantity);
      } else {
        dispatch(updateQuantity({ id: itemId, quantity: newQuantity }));
      }
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity) {
      if (onQuantityChange) {
        onQuantityChange(value);
      } else {
        dispatch(updateQuantity({ id: itemId, quantity: value }));
      }
    }
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <button
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
        className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 rounded-l-xl hover:bg-gray-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      </button>

      <input
        type="number"
        min="1"
        max={maxQuantity}
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center border-none focus:outline-none focus:ring-0 bg-transparent font-medium text-gray-900"
      />

      <button
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= maxQuantity}
        className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 rounded-r-xl hover:bg-gray-50"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};

export default QuantityControl;
