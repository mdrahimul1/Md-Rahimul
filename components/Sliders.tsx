import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, set, remove } from 'firebase/database';
import type { Slider } from '../types';

interface SlidersProps {
  setActivePage: (page: string) => void;
}

const Sliders: React.FC<SlidersProps> = ({ setActivePage }) => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slidersRef = ref(db, 'sliders');
    onValue(slidersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedSliders: Slider[] = [];
      for (const id in data) {
        loadedSliders.push({ id, ...data[id] });
      }
      setSliders(loadedSliders.reverse());
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    const slidersRef = ref(db, 'sliders');
    const newSliderRef = push(slidersRef);
    set(newSliderRef, { imageUrl })
      .then(() => setImageUrl(''))
      .catch((error) => console.error("Error adding slider:", error));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this slider image?')) {
      const sliderRef = ref(db, `sliders/${id}`);
      remove(sliderRef);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Sliders</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">Add New Slider Image</h2>
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input type="text" placeholder="Slider Image Link" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="flex-grow bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <button type="submit" className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition duration-300">Add Slider</button>
        </form>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Slider List</h2>
        {loading ? <p>Loading sliders...</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sliders.map((slider) => (
              <div key={slider.id} className="relative group">
                <img src={slider.imageUrl} alt="Slider" className="w-full h-40 object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button onClick={() => handleDelete(slider.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
        { !loading && sliders.length === 0 && <p className="text-gray-400">No slider images found. Add one using the form above.</p>}
      </div>
       <div className="mt-8 text-center">
        <button 
          onClick={() => setActivePage('Dashboard')} 
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Sliders;