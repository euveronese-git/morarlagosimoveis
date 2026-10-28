import React, { useState, useEffect } from 'react';
import { Property, PropertyFilterState } from './types';
import { INITIAL_PROPERTIES } from './data/properties';
import { loadProperties } from './data/loadProperties';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PropertyGrid } from './components/PropertyGrid';
import { InteractiveFormsSection } from './components/InteractiveFormsSection';
import { BranchesSection } from './components/BranchesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { MortgageCalculator } from './components/MortgageCalculator';
import { PropertyEvaluationModal } from './components/PropertyEvaluationModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

const DEFAULT_FILTERS: PropertyFilterState = {
  category: 'todos',
  type: 'todos',
  city: '',
  neighborhood: '',
  maxPrice: 20000000,
  bedrooms: 'todos',
  searchTerm: '',
  sortBy: 'relevancia'
};

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [filters, setFilters] = useState<PropertyFilterState>(DEFAULT_FILTERS);
  
  // Favorites persisted state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('morarlagos_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [mortgageModalPrice, setMortgageModalPrice] = useState<number | null>(null);
  const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
  const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadProperties().then((list) => {
      if (!cancelled) setProperties(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('morarlagos_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }, [favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleFilterChange = (newFilters: Partial<PropertyFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const favoritePropertiesList = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Header */}
      <Header
        favoritesCount={favorites.length}
        onOpenFavorites={() => setFavoritesDrawerOpen(true)}
        onOpenEvaluation={() => setEvaluationModalOpen(true)}
        onOpenMortgage={() => setMortgageModalPrice(220000)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Search Filters */}
        <Hero
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => {}}
        />

        <PropertyGrid
          properties={properties}
          filters={filters}
          onFilterChange={handleFilterChange}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onResetFilters={handleResetFilters}
        />

        <ServicesSection />

        <InteractiveFormsSection />

        <AboutSection />

        <BranchesSection />

        {/* Contact & Support Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Overlays */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onOpenMortgage={(price) => setMortgageModalPrice(price)}
        />
      )}

      {mortgageModalPrice !== null && (
        <MortgageCalculator
          initialPrice={mortgageModalPrice}
          onClose={() => setMortgageModalPrice(null)}
        />
      )}

      {evaluationModalOpen && (
        <PropertyEvaluationModal
          onClose={() => setEvaluationModalOpen(false)}
        />
      )}

      <FavoritesDrawer
        isOpen={favoritesDrawerOpen}
        onClose={() => setFavoritesDrawerOpen(false)}
        favoriteProperties={favoritePropertiesList}
        onRemoveFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />
    </div>
  );
}
