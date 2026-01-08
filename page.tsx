"use client";

import { useState, useMemo } from "react";
import { games, BoardGame } from "@/data/games";
import { Filters as FiltersType } from "@/types/filters";
import Filters from "@/components/Filters";
import GameCard from "@/components/GameCard";

export default function Home() {
  const [filters, setFilters] = useState<FiltersType>({
    playerCount: null,
    category: null,
    minAge: null,
    searchQuery: "",
  });

  const filteredGames = useMemo(() => {
    return games.filter((game: BoardGame) => {
      // Filter by player count
      if (filters.playerCount !== null) {
        if (
          filters.playerCount < game.minPlayers ||
          filters.playerCount > game.maxPlayers
        ) {
          return false;
        }
      }

      // Filter by category
      if (filters.category !== null) {
        if (!game.categories.includes(filters.category)) {
          return false;
        }
      }

      // Filter by age
      if (filters.minAge !== null) {
        if (game.minAge > filters.minAge) {
          return false;
        }
      }

      // Filter by search query
      if (filters.searchQuery.trim() !== "") {
        const query = filters.searchQuery.toLowerCase();
        if (
          !game.name.toLowerCase().includes(query) &&
          !game.description.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                BoardGame Finder
              </h1>
              <p className="text-sm text-gray-500">
                Znajdz idealna gre planszowa
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Filters filters={filters} onFiltersChange={setFilters} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredGames.length === 0 ? (
              <span>Brak wynikow</span>
            ) : filteredGames.length === 1 ? (
              <span>
                Znaleziono <strong className="text-indigo-600">1</strong> gre
              </span>
            ) : filteredGames.length < 5 ? (
              <span>
                Znaleziono{" "}
                <strong className="text-indigo-600">{filteredGames.length}</strong>{" "}
                gry
              </span>
            ) : (
              <span>
                Znaleziono{" "}
                <strong className="text-indigo-600">{filteredGames.length}</strong>{" "}
                gier
              </span>
            )}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Dane testowe (wkrotce API BGG)</span>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nie znaleziono gier
            </h3>
            <p className="text-gray-500 mb-6">
              Sprobuj zmienic kryteria wyszukiwania
            </p>
            <button
              onClick={() =>
                setFilters({
                  playerCount: null,
                  category: null,
                  minAge: null,
                  searchQuery: "",
                })
              }
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Wyczysc filtry
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
              <span>BoardGame Finder</span>
            </div>
            <p className="text-sm text-gray-400">
              Wkrotce integracja z BoardGameGeek API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
