import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, onValue, push, set, remove, update } from 'firebase/database';
import type { Group } from '../types';

interface GroupsProps {
  setActivePage: (page: string) => void;
}

const Groups: React.FC<GroupsProps> = ({ setActivePage }) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName, setGroupName] = useState('');
  const [link, setLink] = useState('');
  const [buttonName, setButtonName] = useState('');
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const groupsRef = ref(db, 'groups');
    onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      const loadedGroups: Group[] = [];
      for (const id in data) {
        loadedGroups.push({ id, ...data[id] });
      }
      setGroups(loadedGroups.reverse());
      setLoading(false);
    });
  }, []);

  const clearForm = () => {
    setGroupName('');
    setLink('');
    setButtonName('');
    setEditingGroup(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || !link || !buttonName) return;

    if (editingGroup) {
      // Update existing group
      const groupRef = ref(db, `groups/${editingGroup.id}`);
      update(groupRef, { groupName, link, buttonName })
        .then(() => clearForm())
        .catch((error) => console.error("Error updating group:", error));
    } else {
      // Add new group
      const groupsRef = ref(db, 'groups');
      const newGroupRef = push(groupsRef);
      set(newGroupRef, { groupName, link, buttonName })
        .then(() => clearForm())
        .catch((error) => console.error("Error adding group:", error));
    }
  };

  const handleEdit = (group: Group) => {
    setEditingGroup(group);
    setGroupName(group.groupName);
    setLink(group.link);
    setButtonName(group.buttonName);
    window.scrollTo(0, 0);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      const groupRef = ref(db, `groups/${id}`);
      remove(groupRef);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Groups</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-4">{editingGroup ? 'Edit Group' : 'Add New Group'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Group Name" value={groupName} onChange={(e) => setGroupName(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <input type="text" placeholder="Link (e.g., Telegram, WhatsApp)" value={link} onChange={(e) => setLink(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <input type="text" placeholder="Button Name (e.g., Join Now)" value={buttonName} onChange={(e) => setButtonName(e.target.value)} className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-4 text-white focus:ring-primary focus:border-primary" required />
          <div className="flex space-x-4">
            <button type="submit" className="flex-grow bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg transition duration-300">{editingGroup ? 'Update Group' : 'Add Now'}</button>
            {editingGroup && <button type="button" onClick={clearForm} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">Cancel Edit</button>}
          </div>
        </form>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Group List</h2>
        {loading ? <p>Loading groups...</p> : (
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                <thead className="border-b border-gray-600 text-sm text-gray-400">
                    <tr>
                        <th className="py-3 px-4 font-semibold">Group Name</th>
                        <th className="py-3 px-4 font-semibold">Button Name</th>
                        <th className="py-3 px-4 font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-200">
                    {groups.map((group) => (
                    <tr key={group.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="py-3 px-4">{group.groupName}</td>
                        <td className="py-3 px-4">{group.buttonName}</td>
                        <td className="py-3 px-4">
                        <button onClick={() => handleEdit(group)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg mr-2 text-sm">Edit</button>
                        <button onClick={() => handleDelete(group.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm">Delete</button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
        { !loading && groups.length === 0 && <p className="text-gray-400">No groups found. Add one using the form above.</p>}
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

export default Groups;
