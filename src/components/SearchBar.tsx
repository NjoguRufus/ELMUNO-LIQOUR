import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 max-w-2xl"
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search by name or description..."
          className="w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </motion.form>
  );
};