import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import type { AppUser } from '../types';

interface MembersProps {
  setActivePage: (page: string) => void;
}

const Members: React.FC<MembersProps> = ({ setActivePage }) => {
  const [members, setMembers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // NOTE: This assumes that when users sign up in your movie app,
    // their uid and email are saved to a 'users' path in the Realtime Database.
    // Listing/deleting users directly from Firebase Auth is not possible from the client-side SDK.
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMembers: AppUser[] = [];
      for (const uid in data) {
        loadedMembers.push({ uid, email: data[uid].email });
      }
      setMembers(loadedMembers);
      setLoading(false);
    });
  }, []);

  const handleRemove = (uid: string) => {
    if (window.confirm('Are you sure you want to remove this member? This will only remove their database record, not their authentication account.')) {
      const userRef = ref(db, `users/${uid}`);
      remove(userRef);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">How To Member (Members List)</h1>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Total Members: {members.length}</h2>
        {loading ? <p>Loading members...</p> : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-gray-600 text-sm text-gray-400">
                        <tr>
                            <th className="py-3 px-4 font-semibold">User Email</th>
                            <th className="py-3 px-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-200">
                        {members.map((member) => (
                        <tr key={member.uid} className="border-b border-gray-700 hover:bg-gray-700/50">
                            <td className="py-3 px-4">{member.email}</td>
                            <td className="py-3 px-4">
                            <button onClick={() => handleRemove(member.uid)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm">Remove</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        { !loading && members.length === 0 && <p className="text-gray-400">No members found in the database.</p>}
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

export default Members;