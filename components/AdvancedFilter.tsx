import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Filter, 
  X, 
  ShieldCheck, 
  Shield, 
  Lock, 
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

export interface FilterOptions {
  genres: string[];
  platforms: string[];
  priceRange: [number, number];
  drmTypes: string[];
  playerCount: string[];
  features: string[];
  releaseYear: [number, number];
  rating: number;
  sortBy: string;
  searchQuery: string;
}

interface AdvancedFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
  totalResults?: number;
}

// Default filter values to prevent undefined errors
const DEFAULT_FILTERS: FilterOptions = {
  genres: [],
  platforms: [],
  priceRange: [0, 100],
  drmTypes: [],
  playerCount: [],
  features: [],
  releaseYear: [2020, 2024],
  rating: 0,
  sortBy: 'relevance',
  searchQuery: ''
};

const genreOptions = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Puzzle',
  'Racing', 'Sports', 'Platformer', 'Fighting', 'Shooter', 'Horror',
  'Indie', 'Casual', 'Arcade', 'Educational'
];

const platformOptions = [
  'Windows', 'macOS', 'Linux', 'Steam Deck'
];

const drmOptions = [
  { value: 'drm-free', label: 'DRM-Free', icon: ShieldCheck },
  { value: 'light-drm', label: 'Light DRM', icon: Shield },
  { value: 'standard-drm', label: 'Standard DRM', icon: Lock }
];

const playerCountOptions = [
  'Single Player', 'Co-op', 'Online Multiplayer', 'Local Multiplayer', 'MMO'
];

const featureOptions = [
  'Cloud Saves', 'Achievements', 'Controller Support', 'VR Support',
  'Workshop Support', 'Trading Cards', 'Full Controller Support',
  'Partial Controller Support', 'Remote Play'
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating-high', label: 'Rating: High to Low' },
  { value: 'rating-low', label: 'Rating: Low to High' },
  { value: 'name-az', label: 'Name: A to Z' },
  { value: 'name-za', label: 'Name: Z to A' },
  { value: 'discount', label: 'Biggest Discount' }
];

export function AdvancedFilter({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  totalResults 
}: AdvancedFilterProps) {
  // Ensure filters have default values to prevent undefined errors
  const safeFilters = {
    ...DEFAULT_FILTERS,
    ...filters,
    genres: Array.isArray(filters?.genres) ? filters.genres : [],
    platforms: Array.isArray(filters?.platforms) ? filters.platforms : [],
    drmTypes: Array.isArray(filters?.drmTypes) ? filters.drmTypes : [],
    playerCount: Array.isArray(filters?.playerCount) ? filters.playerCount : [],
    features: Array.isArray(filters?.features) ? filters.features : [],
    priceRange: Array.isArray(filters?.priceRange) && filters.priceRange.length === 2 
      ? filters.priceRange as [number, number] 
      : [0, 100] as [number, number],
    releaseYear: Array.isArray(filters?.releaseYear) && filters.releaseYear.length === 2 
      ? filters.releaseYear as [number, number] 
      : [2020, 2024] as [number, number],
    rating: typeof filters?.rating === 'number' ? filters.rating : 0,
    sortBy: typeof filters?.sortBy === 'string' ? filters.sortBy : 'relevance',
    searchQuery: typeof filters?.searchQuery === 'string' ? filters.searchQuery : ''
  };

  const [localFilters, setLocalFilters] = useState<FilterOptions>(safeFilters);
  const [expandedSections, setExpandedSections] = useState({
    search: true,
    sort: true,
    price: true,
    genres: false,
    platforms: false,
    drm: false,
    players: false,
    features: false
  });

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = { ...DEFAULT_FILTERS };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    
    if (localFilters?.genres && Array.isArray(localFilters.genres) && localFilters.genres.length > 0) count++;
    if (localFilters?.platforms && Array.isArray(localFilters.platforms) && localFilters.platforms.length > 0) count++;
    if (localFilters?.drmTypes && Array.isArray(localFilters.drmTypes) && localFilters.drmTypes.length > 0) count++;
    if (localFilters?.playerCount && Array.isArray(localFilters.playerCount) && localFilters.playerCount.length > 0) count++;
    if (localFilters?.features && Array.isArray(localFilters.features) && localFilters.features.length > 0) count++;
    
    if (localFilters?.priceRange && Array.isArray(localFilters.priceRange)) {
      if (localFilters.priceRange[0] > 0 || localFilters.priceRange[1] < 100) count++;
    }
    if (localFilters?.releaseYear && Array.isArray(localFilters.releaseYear)) {
      if (localFilters.releaseYear[0] > 2020 || localFilters.releaseYear[1] < 2024) count++;
    }
    
    if (localFilters?.rating && localFilters.rating > 0) count++;
    if (localFilters?.searchQuery && localFilters.searchQuery.length > 0) count++;
    
    return count;
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <>
      {/* Right Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[var(--slate-dark)] border-l border-[var(--border-subtle)] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SlidersHorizontal className="w-5 h-5 text-[var(--accent-blue)]" />
              <h3 className="text-lg font-semibold">Filters</h3>
              {activeFiltersCount > 0 && (
                <Badge className="modern-badge modern-badge-blue">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="modern-btn-ghost"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="modern-btn-ghost text-[var(--text-muted)] hover:text-[var(--destructive)]"
              disabled={activeFiltersCount === 0}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset All
            </Button>
            
            {totalResults !== undefined && (
              <div className="text-sm text-[var(--text-muted)]">
                {totalResults.toLocaleString()} games
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-full pb-24">
          <div className="p-6 space-y-6">
            {/* Search */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('search')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">Search</h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.search ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.search && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                  <Input
                    placeholder="Search games..."
                    value={localFilters.searchQuery}
                    onChange={(e) => updateFilter('searchQuery', e.target.value)}
                    className="pl-10 bg-[var(--slate-medium)] border-[var(--border-subtle)] text-[var(--text-primary)]"
                  />
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Sort By */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('sort')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">Sort By</h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.sort ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.sort && (
                <Select value={localFilters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="bg-[var(--slate-medium)] border-[var(--border-subtle)] text-[var(--text-primary)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--slate-dark)] border-[var(--border-subtle)] z-[200]">
                    {sortOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        className="text-[var(--text-primary)] hover:bg-[var(--slate-medium)]"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Price Range */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('price')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  Price Range: ${localFilters.priceRange[0]} - ${localFilters.priceRange[1]}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.price ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.price && (
                <div className="space-y-3">
                  <Slider
                    value={localFilters.priceRange}
                    onValueChange={(value) => updateFilter('priceRange', value)}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>Free</span>
                    <span>$100+</span>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Genres */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('genres')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  Genres {localFilters.genres.length > 0 && `(${localFilters.genres.length})`}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.genres ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.genres && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {genreOptions.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={localFilters.genres.includes(genre)}
                        onCheckedChange={(checked) => {
                          const newGenres = checked
                            ? [...localFilters.genres, genre]
                            : localFilters.genres.filter(g => g !== genre);
                          updateFilter('genres', newGenres);
                        }}
                      />
                      <label 
                        htmlFor={`genre-${genre}`} 
                        className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex-1"
                      >
                        {genre}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Platforms */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('platforms')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  Platforms {localFilters.platforms.length > 0 && `(${localFilters.platforms.length})`}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.platforms ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.platforms && (
                <div className="space-y-2">
                  {platformOptions.map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Checkbox
                        id={`platform-${platform}`}
                        checked={localFilters.platforms.includes(platform)}
                        onCheckedChange={(checked) => {
                          const newPlatforms = checked
                            ? [...localFilters.platforms, platform]
                            : localFilters.platforms.filter(p => p !== platform);
                          updateFilter('platforms', newPlatforms);
                        }}
                      />
                      <label 
                        htmlFor={`platform-${platform}`} 
                        className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex-1"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* DRM Types */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('drm')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  DRM Type {localFilters.drmTypes.length > 0 && `(${localFilters.drmTypes.length})`}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.drm ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.drm && (
                <div className="space-y-2">
                  {drmOptions.map((drm) => {
                    const IconComponent = drm.icon;
                    return (
                      <div key={drm.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`drm-${drm.value}`}
                          checked={localFilters.drmTypes.includes(drm.value)}
                          onCheckedChange={(checked) => {
                            const newDrmTypes = checked
                              ? [...localFilters.drmTypes, drm.value]
                              : localFilters.drmTypes.filter(d => d !== drm.value);
                            updateFilter('drmTypes', newDrmTypes);
                          }}
                        />
                        <IconComponent className="w-4 h-4 text-[var(--accent-blue)]" />
                        <label 
                          htmlFor={`drm-${drm.value}`} 
                          className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex-1"
                        >
                          {drm.label}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Player Count */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('players')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  Player Count {localFilters.playerCount.length > 0 && `(${localFilters.playerCount.length})`}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.players ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.players && (
                <div className="space-y-2">
                  {playerCountOptions.map((count) => (
                    <div key={count} className="flex items-center space-x-2">
                      <Checkbox
                        id={`player-${count}`}
                        checked={localFilters.playerCount.includes(count)}
                        onCheckedChange={(checked) => {
                          const newPlayerCount = checked
                            ? [...localFilters.playerCount, count]
                            : localFilters.playerCount.filter(c => c !== count);
                          updateFilter('playerCount', newPlayerCount);
                        }}
                      />
                      <label 
                        htmlFor={`player-${count}`} 
                        className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex-1"
                      >
                        {count}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-[var(--border-subtle)]" />

            {/* Features */}
            <div className="space-y-3">
              <button
                onClick={() => toggleSection('features')}
                className="flex items-center justify-between w-full text-left"
              >
                <h4 className="text-sm font-medium text-[var(--text-primary)]">
                  Features {localFilters.features.length > 0 && `(${localFilters.features.length})`}
                </h4>
                <ChevronRight className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expandedSections.features ? 'rotate-90' : ''}`} />
              </button>
              
              {expandedSections.features && (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {featureOptions.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={localFilters.features.includes(feature)}
                        onCheckedChange={(checked) => {
                          const newFeatures = checked
                            ? [...localFilters.features, feature]
                            : localFilters.features.filter(f => f !== feature);
                          updateFilter('features', newFeatures);
                        }}
                      />
                      <label 
                        htmlFor={`feature-${feature}`} 
                        className="text-sm text-[var(--text-secondary)] cursor-pointer hover:text-[var(--text-primary)] transition-colors flex-1"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}